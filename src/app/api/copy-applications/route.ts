import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { copyApplicationSchema } from '@/lib/schemas/copy-application';

// --- In-memory rate limiter (per-instance) ---
// 3 submissions / IP / hour
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const rateStore = new Map<string, number[]>();

function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const list = (rateStore.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    const oldest = list[0];
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    rateStore.set(ip, list);
    return { allowed: false, retryAfter };
  }
  list.push(now);
  rateStore.set(ip, list);
  return { allowed: true };
}

function getIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON.' },
      { status: 400 }
    );
  }

  const parsed = copyApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Dados inválidos.',
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: silent success
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ success: true, id: null });
  }

  // Rate limit
  const ip = getIp(request);
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Muitas aplicações. Tente novamente mais tarde.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfter ?? 3600) },
      }
    );
  }

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: 'Serviço indisponível.' },
      { status: 503 }
    );
  }

  const userAgent = request.headers.get('user-agent') ?? null;
  const ipForDb = ip === 'unknown' ? null : ip;

  const insertPayload = {
    full_name: data.full_name,
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    years_experience: data.years_experience,
    seniority: data.seniority,
    operations_worked: data.operations_worked,
    niches: data.niches,
    specialty: data.specialty,
    results_brought: data.results_brought,
    books_read: data.books_read,
    top_copywriters: data.top_copywriters,
    recommended_by: data.recommended_by && data.recommended_by.length > 0 ? data.recommended_by : null,
    answer_unique_mechanism: data.answer_unique_mechanism,
    answer_superstructure: data.answer_superstructure,
    answer_offer_block: data.answer_offer_block,
    portfolio_url: data.portfolio_url,
    opportunity_preference: data.opportunity_preference,
    free_space: data.free_space && data.free_space.length > 0 ? data.free_space : null,
    ip_address: ipForDb,
    user_agent: userAgent,
    completion_time_seconds: data.completion_time_seconds ?? null,
  };

  const { data: inserted, error } = await supabaseAdmin
    .from('copy_applications')
    .insert(insertPayload)
    .select('id')
    .single();

  if (error) {
    console.error('[copy-applications] insert error', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar aplicação.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: inserted?.id ?? null });
}
