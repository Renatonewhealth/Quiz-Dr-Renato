import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getReembolsoSession } from '@/lib/reembolso-auth';

export async function POST(
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
    const { observacoes } = await request.json();

    // Find the solicitacao
    const { data: solicitacao, error: findError } = await supabaseAdmin
      .from('solicitacoes_reembolso')
      .select('id, status')
      .eq('protocolo', protocolo)
      .single();

    if (findError || !solicitacao) {
      return NextResponse.json(
        { error: 'Solicitação não encontrada' },
        { status: 404 }
      );
    }

    if (solicitacao.status !== 'pendente') {
      return NextResponse.json(
        { error: `Solicitação não pode ser aprovada. Status atual: ${solicitacao.status}` },
        { status: 400 }
      );
    }

    // Update status to aprovado
    const { error: updateError } = await supabaseAdmin
      .from('solicitacoes_reembolso')
      .update({
        status: 'aprovado',
        aprovado_por: session.id,
        aprovado_em: new Date().toISOString(),
        observacoes_aprovacao: observacoes || null,
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', solicitacao.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Erro ao aprovar solicitação', details: updateError.message },
        { status: 500 }
      );
    }

    // Insert log
    await supabaseAdmin.from('log_acoes').insert({
      solicitacao_id: solicitacao.id,
      usuario_id: session.id,
      acao: 'aprovada',
      detalhes: observacoes
        ? `Solicitação aprovada por ${session.nome}. Observações: ${observacoes}`
        : `Solicitação aprovada por ${session.nome}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao aprovar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
