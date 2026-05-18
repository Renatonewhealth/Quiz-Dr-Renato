import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
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

    // ---- Date range ----
    const { searchParams } = request.nextUrl;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    // Padrão: últimos 30 dias
    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const from = fromParam ? new Date(fromParam) : defaultFrom;
    const to = toParam ? new Date(toParam) : now;

    // Validar datas
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json(
        { error: 'Datas inválidas' },
        { status: 400 }
      );
    }

    const fromMs = from.getTime();
    const toMs = to.getTime();
    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    // Detecta qual coluna de timestamp uma linha tem (tabelas podem usar
    // created_at, started_at ou updated_at). Filtra em JS pra não quebrar
    // a query caso a coluna não exista (PostgREST erra em select de coluna
    // inexistente e zera tudo).
    function rowTimestamp(row: Record<string, unknown>): number | null {
      const raw =
        (row.created_at as string | undefined) ??
        (row.started_at as string | undefined) ??
        (row.inserted_at as string | undefined) ??
        (row.updated_at as string | undefined);
      if (!raw) return null;
      const t = new Date(raw).getTime();
      return isNaN(t) ? null : t;
    }

    function inRange(row: Record<string, unknown>): boolean {
      const t = rowTimestamp(row);
      if (t === null) return true; // sem timestamp: não exclui
      return t >= fromMs && t <= toMs;
    }

    function rowDateKey(row: Record<string, unknown>): string {
      const t = rowTimestamp(row);
      const d = t === null ? new Date() : new Date(t);
      return d.toISOString().split('T')[0];
    }

    // ---- Leads ----
    const { data: leadsRaw, error: leadsErr } = await supabaseAdmin
      .from('leads')
      .select('*');

    const allLeadsRows = (leadsRaw ?? []) as Record<string, unknown>[];
    const qualificationData = allLeadsRows.filter(inRange);

    const leadsCount = qualificationData.length;
    const qualified = qualificationData.filter(
      (l) => Number(l.total_score) <= 4
    ).length;
    const nonQualified = qualificationData.filter(
      (l) => Number(l.total_score) >= 5
    ).length;

    // ---- Quiz Sessions ----
    const { data: sessionsRaw, error: sessionsErr } = await supabaseAdmin
      .from('quiz_sessions')
      .select('*');

    const allSessionsRows = (sessionsRaw ?? []) as Record<string, unknown>[];
    const allSessions = allSessionsRows.filter(inRange);
    const totalSessions = allSessions.length;

    // Drop-off por pergunta: quantos chegaram a (responderam) cada Q.
    // last_question = N significa que a pessoa respondeu até a pergunta N (1-indexed).
    const TOTAL_QUESTIONS = 8;
    const dropoffByQuestion = [];
    let prevCount = totalSessions;
    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
      const passed = allSessions.filter(
        (s) => Number(s.last_question ?? 0) >= q
      ).length;
      const percentageOfTotal = totalSessions
        ? Math.round((passed / totalSessions) * 100)
        : 0;
      const dropFromPrev = prevCount > 0
        ? Math.round(((prevCount - passed) / prevCount) * 100)
        : 0;
      dropoffByQuestion.push({
        question_id: q,
        completed: passed,
        percentage: percentageOfTotal,
        dropFromPrev,
      });
      prevCount = passed;
    }

    // ---- Leads por dia ----
    const leadsPerDayMap = new Map<string, number>();
    qualificationData.forEach((lead) => {
      const date = rowDateKey(lead);
      leadsPerDayMap.set(date, (leadsPerDayMap.get(date) || 0) + 1);
    });

    const leadsPerDay = Array.from(leadsPerDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // ---- Sessions por dia (útil pra ver curva diária) ----
    const sessionsPerDayMap = new Map<string, number>();
    allSessions.forEach((session) => {
      const date = rowDateKey(session);
      sessionsPerDayMap.set(date, (sessionsPerDayMap.get(date) || 0) + 1);
    });

    const sessionsPerDay = Array.from(sessionsPerDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // ---- Conversion rate ----
    const totalScored = qualified + nonQualified;
    const conversionRate = totalScored > 0
      ? Math.round((qualified / totalScored) * 100)
      : 0;

    // ---- Funnel ----
    const sessionsCompleted = allSessions.filter(
      (s) => s.completed === true
    ).length;

    return NextResponse.json({
      range: { from: fromIso, to: toIso },
      totalLeads: leadsCount,
      totalSessions,
      qualifiedLeads: qualified,
      nonQualifiedLeads: nonQualified,
      conversionRate,
      leadsPerDay,
      sessionsPerDay,
      dropoffByQuestion,
      qualificationSplit: {
        qualified,
        nonQualified,
        qualifiedPercentage: leadsCount
          ? Math.round((qualified / leadsCount) * 100)
          : 0,
        nonQualifiedPercentage: leadsCount
          ? Math.round((nonQualified / leadsCount) * 100)
          : 0,
      },
      funnelData: [
        {
          stage: 'Sessões Iniciadas',
          count: totalSessions,
          percentage: 100,
        },
        {
          stage: 'Quiz Completado',
          count: sessionsCompleted,
          percentage: totalSessions
            ? Math.round((sessionsCompleted / totalSessions) * 100)
            : 0,
        },
        {
          stage: 'Leads Capturados',
          count: leadsCount,
          percentage: totalSessions
            ? Math.round((leadsCount / totalSessions) * 100)
            : 0,
        },
      ],
      _debug: {
        leadsError: leadsErr?.message ?? null,
        sessionsError: sessionsErr?.message ?? null,
        totalLeadsRowsNoFilter: allLeadsRows.length,
        totalSessionsRowsNoFilter: allSessionsRows.length,
        leadsColumns: allLeadsRows[0] ? Object.keys(allLeadsRows[0]) : [],
        sessionsColumns: allSessionsRows[0]
          ? Object.keys(allSessionsRows[0])
          : [],
        sampleSession: allSessionsRows[0] ?? null,
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
