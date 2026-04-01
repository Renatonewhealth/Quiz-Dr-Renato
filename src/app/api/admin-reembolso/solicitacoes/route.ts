import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getReembolsoSession } from '@/lib/reembolso-auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getReembolsoSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 500 }
      );
    }

    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('solicitacoes_reembolso')
      .select('*', { count: 'exact' });

    if (status && status !== 'todos') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(
        `protocolo.ilike.%${search}%,email_cliente.ilike.%${search}%,cpf.ilike.%${search}%,numero_pedido.ilike.%${search}%`
      );
    }

    query = query
      .order('criado_em', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar solicitações', details: error.message },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('Erro ao listar solicitações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
