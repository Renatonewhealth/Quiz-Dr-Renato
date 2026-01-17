import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
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

    // Parâmetros de query
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortField = searchParams.get('sort') || 'created_at';
    const sortOrder = (searchParams.get('order') || 'desc') as 'asc' | 'desc';
    const filterQualified = searchParams.get('qualified'); // 'true', 'false', or null

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Construir query
    let query = supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact' });

    // Filtro de qualificação
    if (filterQualified === 'true') {
      query = query.lte('total_score', 4);
    } else if (filterQualified === 'false') {
      query = query.gte('total_score', 5);
    }

    // Ordenação e paginação
    query = query
      .order(sortField, { ascending: sortOrder === 'asc' })
      .range(from, to);

    const { data: leads, error, count } = await query;

    if (error) {
      throw error;
    }

    // Buscar respostas para cada lead
    const leadsWithResponses = await Promise.all(
      (leads || []).map(async (lead) => {
        const { data: responses } = await supabaseAdmin!
          .from('quiz_responses')
          .select('question_id, question_text, selected_option, option_score')
          .eq('lead_id', lead.id)
          .order('question_id', { ascending: true });

        return {
          ...lead,
          responses: responses || [],
        };
      })
    );

    return NextResponse.json({
      leads: leadsWithResponses,
      totalCount: count || 0,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar leads' },
      { status: 500 }
    );
  }
}



