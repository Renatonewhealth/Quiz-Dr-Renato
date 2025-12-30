import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Verificar autenticação
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se é admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!adminData) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuração do banco inválida' },
        { status: 500 }
      );
    }

    // 1. Total de leads
    const { count: totalLeads } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true });

    // 2. Qualificados vs Não qualificados
    const { data: qualificationData } = await supabaseAdmin
      .from('leads')
      .select('total_score');

    const qualified = qualificationData?.filter(l => l.total_score <= 4).length || 0;
    const nonQualified = qualificationData?.filter(l => l.total_score >= 5).length || 0;

    // 3. Drop-off por pergunta
    const { data: dropoffData } = await supabaseAdmin
      .from('quiz_responses')
      .select('question_id, lead_id');

    // Agrupar por question_id
    const dropoffMap = new Map<number, Set<string>>();
    dropoffData?.forEach(response => {
      if (!dropoffMap.has(response.question_id)) {
        dropoffMap.set(response.question_id, new Set());
      }
      dropoffMap.get(response.question_id)?.add(response.lead_id);
    });

    const dropoffByQuestion = Array.from(dropoffMap.entries())
      .map(([question_id, leadIds]) => ({
        question_id,
        completed: leadIds.size,
        percentage: totalLeads ? Math.round((leadIds.size / (totalLeads || 1)) * 100) : 0,
      }))
      .sort((a, b) => a.question_id - b.question_id);

    // 4. Leads por dia (últimos 30 dias)
    const { data: leadsPerDayData } = await supabaseAdmin
      .from('leads')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    // Agrupar por data
    const leadsPerDayMap = new Map<string, number>();
    leadsPerDayData?.forEach(lead => {
      const date = new Date(lead.created_at).toISOString().split('T')[0];
      leadsPerDayMap.set(date, (leadsPerDayMap.get(date) || 0) + 1);
    });

    const leadsPerDay = Array.from(leadsPerDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // 5. Taxa de conversão (quiz completado → formulário enviado)
    const totalQualified = qualified + nonQualified;
    const conversionRate = totalQualified > 0 
      ? Math.round((qualified / totalQualified) * 100) 
      : 0;

    // 6. Dados para o funil
    const { count: sessionsStarted } = await supabaseAdmin
      .from('quiz_sessions')
      .select('*', { count: 'exact', head: true });

    const { count: sessionsCompleted } = await supabaseAdmin
      .from('quiz_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('completed', true);

    return NextResponse.json({
      totalLeads: totalLeads || 0,
      qualifiedLeads: qualified,
      nonQualifiedLeads: nonQualified,
      conversionRate,
      leadsPerDay,
      dropoffByQuestion,
      qualificationSplit: {
        qualified,
        nonQualified,
        qualifiedPercentage: totalLeads ? Math.round((qualified / (totalLeads || 1)) * 100) : 0,
        nonQualifiedPercentage: totalLeads ? Math.round((nonQualified / (totalLeads || 1)) * 100) : 0,
      },
      funnelData: [
        { stage: 'Sessões Iniciadas', count: sessionsStarted || 0, percentage: 100 },
        { stage: 'Quiz Completado', count: sessionsCompleted || 0, percentage: sessionsStarted ? Math.round(((sessionsCompleted || 0) / sessionsStarted) * 100) : 0 },
        { stage: 'Viram Formulário', count: qualified, percentage: sessionsStarted ? Math.round((qualified / sessionsStarted) * 100) : 0 },
        { stage: 'Enviaram Formulário', count: qualified, percentage: sessionsStarted ? Math.round((qualified / sessionsStarted) * 100) : 0 },
      ],
    });
  } catch (error) {
    console.error('Erro ao buscar analytics:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar analytics' },
      { status: 500 }
    );
  }
}

