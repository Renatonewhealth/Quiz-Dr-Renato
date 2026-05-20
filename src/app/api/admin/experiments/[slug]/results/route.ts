import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface TrackingEvent {
  session_id: string;
  visitor_id: string | null;
  event_type: string;
  variant: string | null;
  question_id: number | null;
  created_at: string;
}

const TOTAL_QUESTIONS = 8;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Auth
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user)
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

    const { data: admin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
    if (!admin)
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });

    if (!supabaseAdmin)
      return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

    const { slug } = await params;

    const { data: expRow } = await supabaseAdmin
      .from('experiments')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (!expRow)
      return NextResponse.json({ error: 'Experimento não encontrado' }, { status: 404 });

    const variants = (expRow.variants ?? []) as Array<{
      id: string;
      path: string;
      weight?: number;
    }>;

    // Range
    const { searchParams } = request.nextUrl;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const now = new Date();
    const defaultFrom = new Date(expRow.created_at);
    const from = fromParam ? new Date(fromParam) : defaultFrom;
    const to = toParam ? new Date(toParam) : now;
    if (isNaN(from.getTime()) || isNaN(to.getTime()))
      return NextResponse.json({ error: 'Datas inválidas' }, { status: 400 });

    // Eventos do experimento (variant começa com "<slug>:")
    const fromIso = from.toISOString();
    const toIso = to.toISOString();
    const { data: rawEvents, error: evErr } = await supabaseAdmin
      .from('tracking_events')
      .select('session_id, visitor_id, event_type, variant, question_id, created_at')
      .gte('created_at', fromIso)
      .lte('created_at', toIso)
      .like('variant', `${slug}:%`)
      .eq('is_bot', false)
      .limit(100000);

    if (evErr)
      return NextResponse.json({ error: evErr.message }, { status: 500 });

    const events = (rawEvents ?? []) as TrackingEvent[];

    function variantIdFromTag(tag: string | null): string | null {
      if (!tag || !tag.startsWith(slug + ':')) return null;
      return tag.slice(slug.length + 1);
    }

    // Inicializa stats por variante
    const stats: Record<
      string,
      {
        page_views: Set<string>;
        quiz_starts: Set<string>;
        completed: Set<string>;
        leads: Set<string>;
        visitors: Set<string>;
        maxQuestionBySession: Map<string, number>;
      }
    > = {};
    for (const v of variants) {
      stats[v.id] = {
        page_views: new Set(),
        quiz_starts: new Set(),
        completed: new Set(),
        leads: new Set(),
        visitors: new Set(),
        maxQuestionBySession: new Map(),
      };
    }

    for (const ev of events) {
      const vid = variantIdFromTag(ev.variant);
      if (!vid || !stats[vid]) continue;
      if (ev.visitor_id) stats[vid].visitors.add(ev.visitor_id);
      switch (ev.event_type) {
        case 'page_view':
          stats[vid].page_views.add(ev.session_id);
          break;
        case 'quiz_start':
          stats[vid].quiz_starts.add(ev.session_id);
          break;
        case 'quiz_completed':
          stats[vid].completed.add(ev.session_id);
          break;
        case 'lead_captured':
          stats[vid].leads.add(ev.session_id);
          break;
        case 'quiz_question_answered': {
          const q = ev.question_id ?? 0;
          const cur = stats[vid].maxQuestionBySession.get(ev.session_id) ?? 0;
          if (q > cur) stats[vid].maxQuestionBySession.set(ev.session_id, q);
          break;
        }
      }
    }

    const variantResults = variants.map((v) => {
      const s = stats[v.id]!;
      const pv = s.page_views.size;
      const starts = s.quiz_starts.size;
      const completed = s.completed.size;
      const leads = s.leads.size;
      const dropoff: Array<{ question_id: number; sessions: number; pct: number }> = [];
      for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
        let passed = 0;
        for (const [, maxQ] of s.maxQuestionBySession.entries()) {
          if (maxQ >= q) passed++;
        }
        dropoff.push({
          question_id: q,
          sessions: passed,
          pct: starts > 0 ? Math.round((passed / starts) * 100) : 0,
        });
      }
      return {
        id: v.id,
        path: v.path,
        page_views: pv,
        unique_visitors: s.visitors.size,
        quiz_starts: starts,
        completed,
        leads,
        start_rate: pv > 0 ? Math.round((starts / pv) * 100) : 0,
        completion_rate: starts > 0 ? Math.round((completed / starts) * 100) : 0,
        lead_rate: starts > 0 ? Math.round((leads / starts) * 100) : 0,
        dropoff,
      };
    });

    return NextResponse.json({
      experiment: {
        id: expRow.id,
        slug: expRow.slug,
        entry: expRow.entry,
        enabled: expRow.enabled,
        description: expRow.description,
        variants: expRow.variants,
        created_at: expRow.created_at,
        updated_at: expRow.updated_at,
      },
      range: { from: fromIso, to: toIso },
      variants: variantResults,
      totals: {
        page_views: variantResults.reduce((s, v) => s + v.page_views, 0),
        starts: variantResults.reduce((s, v) => s + v.quiz_starts, 0),
        completed: variantResults.reduce((s, v) => s + v.completed, 0),
        leads: variantResults.reduce((s, v) => s + v.leads, 0),
      },
    });
  } catch (e) {
    console.error('Erro analytics experimento:', e);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
