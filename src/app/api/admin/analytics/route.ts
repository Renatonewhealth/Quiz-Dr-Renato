import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface TrackingEvent {
  id: string;
  created_at: string;
  session_id: string;
  visitor_id: string | null;
  event_type: string;
  page_slug: string | null;
  variant: string | null;
  question_id: number | null;
  metadata: Record<string, unknown> | null;
  is_bot: boolean | null;
}

const TOTAL_QUESTIONS = 8;

export async function GET(request: NextRequest) {
  try {
    // Auth
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
    if (!adminData) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuração do banco inválida' },
        { status: 500 }
      );
    }

    // Date range
    const { searchParams } = request.nextUrl;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const includeBots = searchParams.get('includeBots') === '1';
    const variantFilter = searchParams.get('variant');
    const pageFilter = searchParams.get('page');

    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const from = fromParam ? new Date(fromParam) : defaultFrom;
    const to = toParam ? new Date(toParam) : now;

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json({ error: 'Datas inválidas' }, { status: 400 });
    }

    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    // Busca eventos no período. Limite alto pra não cortar dados reais.
    let query = supabaseAdmin
      .from('tracking_events')
      .select('*')
      .gte('created_at', fromIso)
      .lte('created_at', toIso)
      .order('created_at', { ascending: true })
      .limit(50000);

    if (!includeBots) {
      query = query.eq('is_bot', false);
    }
    if (variantFilter) {
      query = query.eq('variant', variantFilter);
    }
    if (pageFilter) {
      query = query.eq('page_slug', pageFilter);
    }

    const { data: rawEvents, error: evErr } = await query;
    if (evErr) {
      return NextResponse.json(
        { error: 'Erro ao buscar eventos', details: evErr.message },
        { status: 500 }
      );
    }

    const events = (rawEvents ?? []) as TrackingEvent[];

    // --------- Agregações ---------
    // Por tipo
    const byType = new Map<string, TrackingEvent[]>();
    for (const ev of events) {
      const list = byType.get(ev.event_type) ?? [];
      list.push(ev);
      byType.set(ev.event_type, list);
    }

    function uniqueSessionsOfType(type: string): Set<string> {
      const set = new Set<string>();
      for (const ev of byType.get(type) ?? []) set.add(ev.session_id);
      return set;
    }

    function uniqueVisitorsOfType(type: string): Set<string> {
      const set = new Set<string>();
      for (const ev of byType.get(type) ?? []) {
        if (ev.visitor_id) set.add(ev.visitor_id);
      }
      return set;
    }

    // Page views únicos (sessões únicas por page_slug)
    const pageViewsBySlug = new Map<string, { sessions: Set<string>; visitors: Set<string> }>();
    for (const ev of byType.get('page_view') ?? []) {
      const slug = ev.page_slug ?? '/';
      const entry = pageViewsBySlug.get(slug) ?? {
        sessions: new Set<string>(),
        visitors: new Set<string>(),
      };
      entry.sessions.add(ev.session_id);
      if (ev.visitor_id) entry.visitors.add(ev.visitor_id);
      pageViewsBySlug.set(slug, entry);
    }

    const topPages = Array.from(pageViewsBySlug.entries())
      .map(([slug, entry]) => ({
        page_slug: slug,
        unique_sessions: entry.sessions.size,
        unique_visitors: entry.visitors.size,
      }))
      .sort((a, b) => b.unique_sessions - a.unique_sessions);

    // Funnel principal: total page views → quiz start → cada pergunta → completed → lead
    const totalPageViewSessions = uniqueSessionsOfType('page_view').size;
    const quizStartSessions = uniqueSessionsOfType('quiz_start');
    const quizCompletedSessions = uniqueSessionsOfType('quiz_completed');
    const leadCapturedSessions = uniqueSessionsOfType('lead_captured');

    // Por pergunta: sessions únicas que responderam Q >= q
    // Pegamos o maior question_id respondido por sessão.
    const maxQuestionBySession = new Map<string, number>();
    for (const ev of byType.get('quiz_question_answered') ?? []) {
      const sid = ev.session_id;
      const q = ev.question_id ?? 0;
      const cur = maxQuestionBySession.get(sid) ?? 0;
      if (q > cur) maxQuestionBySession.set(sid, q);
    }

    const dropoffByQuestion: Array<{
      question_id: number;
      sessions: number;
      percentage_of_start: number;
      drop_from_prev: number;
    }> = [];
    const startCount = quizStartSessions.size;
    let prevCount = startCount;
    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
      let passed = 0;
      for (const [, maxQ] of maxQuestionBySession.entries()) {
        if (maxQ >= q) passed++;
      }
      dropoffByQuestion.push({
        question_id: q,
        sessions: passed,
        percentage_of_start: startCount > 0 ? Math.round((passed / startCount) * 100) : 0,
        drop_from_prev: prevCount > 0 ? Math.round(((prevCount - passed) / prevCount) * 100) : 0,
      });
      prevCount = passed;
    }

    // Por dia (page views únicos por dia)
    const pageViewsPerDayMap = new Map<string, Set<string>>();
    for (const ev of byType.get('page_view') ?? []) {
      const day = new Date(ev.created_at).toISOString().split('T')[0];
      const set = pageViewsPerDayMap.get(day) ?? new Set<string>();
      set.add(ev.session_id);
      pageViewsPerDayMap.set(day, set);
    }
    const pageViewsPerDay = Array.from(pageViewsPerDayMap.entries())
      .map(([date, set]) => ({ date, count: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const quizStartsPerDayMap = new Map<string, Set<string>>();
    for (const ev of byType.get('quiz_start') ?? []) {
      const day = new Date(ev.created_at).toISOString().split('T')[0];
      const set = quizStartsPerDayMap.get(day) ?? new Set<string>();
      set.add(ev.session_id);
      quizStartsPerDayMap.set(day, set);
    }
    const quizStartsPerDay = Array.from(quizStartsPerDayMap.entries())
      .map(([date, set]) => ({ date, count: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Por variante (pra A/B)
    const byVariant = new Map<
      string,
      { page_views: Set<string>; quiz_starts: Set<string>; completed: Set<string>; leads: Set<string> }
    >();
    function variantBucket(v: string | null): string {
      return v ?? 'default';
    }
    function ensureVariant(v: string) {
      if (!byVariant.has(v)) {
        byVariant.set(v, {
          page_views: new Set<string>(),
          quiz_starts: new Set<string>(),
          completed: new Set<string>(),
          leads: new Set<string>(),
        });
      }
      return byVariant.get(v)!;
    }
    for (const ev of events) {
      const v = variantBucket(ev.variant);
      const bucket = ensureVariant(v);
      if (ev.event_type === 'page_view') bucket.page_views.add(ev.session_id);
      else if (ev.event_type === 'quiz_start') bucket.quiz_starts.add(ev.session_id);
      else if (ev.event_type === 'quiz_completed') bucket.completed.add(ev.session_id);
      else if (ev.event_type === 'lead_captured') bucket.leads.add(ev.session_id);
    }
    const variantStats = Array.from(byVariant.entries())
      .map(([variant, b]) => ({
        variant,
        page_views: b.page_views.size,
        quiz_starts: b.quiz_starts.size,
        completed: b.completed.size,
        leads: b.leads.size,
        start_rate:
          b.page_views.size > 0
            ? Math.round((b.quiz_starts.size / b.page_views.size) * 100)
            : 0,
        completion_rate:
          b.quiz_starts.size > 0
            ? Math.round((b.completed.size / b.quiz_starts.size) * 100)
            : 0,
        lead_rate:
          b.quiz_starts.size > 0
            ? Math.round((b.leads.size / b.quiz_starts.size) * 100)
            : 0,
      }))
      .sort((a, b) => b.page_views - a.page_views);

    return NextResponse.json({
      range: { from: fromIso, to: toIso },
      filters: { includeBots, variant: variantFilter, page: pageFilter },
      totals: {
        total_events: events.length,
        unique_sessions: new Set(events.map((e) => e.session_id)).size,
        unique_visitors: new Set(
          events.map((e) => e.visitor_id).filter(Boolean) as string[]
        ).size,
        page_views_sessions: totalPageViewSessions,
        quiz_starts: quizStartSessions.size,
        quiz_completed: quizCompletedSessions.size,
        leads_captured: leadCapturedSessions.size,
      },
      funnel: [
        { stage: 'Visitas (page view)', count: totalPageViewSessions },
        { stage: 'Iniciou o quiz', count: quizStartSessions.size },
        { stage: 'Completou o quiz', count: quizCompletedSessions.size },
        { stage: 'Capturou lead', count: leadCapturedSessions.size },
      ],
      topPages,
      pageViewsPerDay,
      quizStartsPerDay,
      dropoffByQuestion,
      variantStats,
      uniqueVisitorsByType: {
        page_view: uniqueVisitorsOfType('page_view').size,
        quiz_start: uniqueVisitorsOfType('quiz_start').size,
        quiz_completed: uniqueVisitorsOfType('quiz_completed').size,
        lead_captured: uniqueVisitorsOfType('lead_captured').size,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar analytics:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar analytics' },
      { status: 500 }
    );
  }
}
