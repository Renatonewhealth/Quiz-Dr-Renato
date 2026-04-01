import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getReembolsoSession } from '@/lib/reembolso-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ protocolo: string }> }
) {
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

    const { protocolo } = await params;

    // Fetch solicitacao
    const { data: solicitacao, error: solicitacaoError } = await supabaseAdmin
      .from('solicitacoes_reembolso')
      .select('*')
      .eq('protocolo', protocolo)
      .single();

    if (solicitacaoError || !solicitacao) {
      return NextResponse.json(
        { error: 'Solicitação não encontrada' },
        { status: 404 }
      );
    }

    // Fetch logs
    const { data: logs, error: logsError } = await supabaseAdmin
      .from('log_acoes')
      .select('*')
      .eq('solicitacao_id', solicitacao.id)
      .order('criado_em', { ascending: false });

    if (logsError) {
      return NextResponse.json(
        { error: 'Erro ao buscar logs', details: logsError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      solicitacao,
      logs: logs || [],
    });
  } catch (error) {
    console.error('Erro ao buscar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
