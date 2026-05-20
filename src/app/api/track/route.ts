import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Tipos de evento aceitos
const VALID_EVENT_TYPES = new Set([
  'page_view',
  'quiz_start',
  'quiz_question_answered',
  'quiz_completed',
  'lead_captured',
  'cta_click',
]);

interface ClientEvent {
  session_id?: string;
  visitor_id?: string;
  event_type?: string;
  page_slug?: string;
  variant?: string | null;
  question_id?: number | null;
  metadata?: Record<string, unknown> | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  timestamp?: string;
}

function isBot(ua: string | null | undefined): boolean {
  if (!ua) return false;
  const lower = ua.toLowerCase();
  return /bot|spider|crawler|crawl|preview|googlebot|bingbot|slurp|duckduck|baidu|yandex|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|linkedinbot|headlesschrome|puppeteer|playwright/i.test(
    lower
  );
}

function getIp(request: NextRequest): string | null {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return null;
}

function sanitizeString(v: unknown, maxLen = 500): string | null {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !Array.isArray(body.events)) {
      return NextResponse.json(
        { error: 'Body inválido. Esperado: { events: [...] }' },
        { status: 400 }
      );
    }

    const ip = getIp(request);
    const ua = request.headers.get('user-agent');
    const isBotUA = isBot(ua);

    const nowIso = new Date().toISOString();
    const serverNowMs = Date.now();

    const rows = (body.events as ClientEvent[])
      .filter((ev) => {
        if (!ev || typeof ev !== 'object') return false;
        if (!ev.event_type || !VALID_EVENT_TYPES.has(ev.event_type)) return false;
        if (!ev.session_id) return false;
        return true;
      })
      .map((ev) => {
        // Usa timestamp do servidor por padrão. Só aceita o do cliente
        // se estiver dentro de ±5 min do server time (clock skew tolerável)
        // — assim relógios bagunçados não jogam evento pra outro dia.
        let createdAt = nowIso;
        if (ev.timestamp) {
          const clientMs = new Date(ev.timestamp).getTime();
          if (
            Number.isFinite(clientMs) &&
            Math.abs(clientMs - serverNowMs) < 5 * 60 * 1000
          ) {
            createdAt = new Date(clientMs).toISOString();
          }
        }
        return {
          created_at: createdAt,
          session_id: sanitizeString(ev.session_id, 100)!,
          visitor_id: sanitizeString(ev.visitor_id, 100),
          event_type: ev.event_type!,
          page_slug: sanitizeString(ev.page_slug, 200),
          variant: sanitizeString(ev.variant, 50),
          question_id:
            typeof ev.question_id === 'number' && Number.isFinite(ev.question_id)
              ? Math.floor(ev.question_id)
              : null,
          metadata:
            ev.metadata && typeof ev.metadata === 'object' ? ev.metadata : {},
          utm_source: sanitizeString(ev.utm_source, 200),
          utm_medium: sanitizeString(ev.utm_medium, 200),
          utm_campaign: sanitizeString(ev.utm_campaign, 200),
          utm_term: sanitizeString(ev.utm_term, 200),
          utm_content: sanitizeString(ev.utm_content, 200),
          referrer: sanitizeString(ev.referrer, 500),
          ip_address: ip,
          user_agent: ua,
          is_bot: isBotUA,
        };
      });

    if (rows.length === 0) {
      return NextResponse.json({ success: true, inserted: 0 });
    }

    const { error } = await supabaseAdmin
      .from('tracking_events')
      .insert(rows);

    if (error) {
      console.error('[track] insert error:', error);
      return NextResponse.json(
        { error: 'Erro ao gravar eventos', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, inserted: rows.length });
  } catch (error) {
    console.error('[track] unexpected error:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
