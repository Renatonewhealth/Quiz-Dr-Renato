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
    const { motivo } = await request.json();

    if (!motivo) {
      return NextResponse.json(
        { error: 'Motivo da reprovação é obrigatório' },
        { status: 400 }
      );
    }

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
        { error: `Solicitação não pode ser reprovada. Status atual: ${solicitacao.status}` },
        { status: 400 }
      );
    }

    // Update status to reprovado
    const { error: updateError } = await supabaseAdmin
      .from('solicitacoes_reembolso')
      .update({
        status: 'reprovado',
        reprovado_por: session.id,
        reprovado_em: new Date().toISOString(),
        motivo_reprovacao: motivo,
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', solicitacao.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Erro ao reprovar solicitação', details: updateError.message },
        { status: 500 }
      );
    }

    // Insert log
    await supabaseAdmin.from('log_acoes').insert({
      solicitacao_id: solicitacao.id,
      usuario_id: session.id,
      acao: 'reprovada',
      detalhes: `Solicitação reprovada por ${session.nome}. Motivo: ${motivo}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao reprovar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
