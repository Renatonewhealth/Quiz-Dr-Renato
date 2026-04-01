import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

function gerarProtocolo(): string {
  const ano = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `REE-${ano}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const protocolo = gerarProtocolo();

    const { data, error: insertError } = await supabaseAdmin
      .from('solicitacoes_reembolso')
      .insert({
        protocolo,
        status: 'pendente',
        numero_pedido: body.numero_pedido,
        email_cliente: body.email,
        cpf: body.cpf,
        telefone: body.telefone,
        codigo_rastreio: body.codigo_rastreio,
        data_recebimento: body.data_recebimento,
        foto_produtos: body.foto_produtos_url,
        foto_rastreio: body.comprovante_entrega_url,
        foto_embalagens: body.foto_embalagens_url,
        foto_selfie: body.selfie_produto_url,
        dias_uso: parseInt(body.dias_uso) || 0,
        capsulas_dia: body.capsulas_por_dia,
        horario: body.horario,
        tomava_com: body.liquido,
        mudanca_alimentacao: body.alimentacao,
        efeitos_sentidos: body.efeitos_texto ? [body.efeitos_texto] : body.efeitos || [],
        motivo_insatisfacao: body.motivo_insatisfacao,
      })
      .select('id')
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Erro ao criar solicitação', details: insertError.message },
        { status: 500 }
      );
    }

    // Insert log entry
    await supabaseAdmin.from('log_acoes').insert({
      solicitacao_id: data.id,
      acao: 'criada',
      detalhes: 'Solicitação de reembolso criada pelo cliente',
    });

    return NextResponse.json({
      success: true,
      protocolo,
    });
  } catch (error) {
    console.error('Erro ao criar solicitação de reembolso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
