import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface QuestionarioData {
  idade: string;
  estado_civil: string;
  filhos: string;
  outros_problemas: string[];
  metodos_anteriores: string[];
  expectativa: string;
  motivo_compra: string;
  teve_objecao: string;
  qual_objecao?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível' },
        { status: 503 }
      );
    }

    const body: QuestionarioData = await request.json();
    const { idade, estado_civil, filhos, outros_problemas, metodos_anteriores, expectativa, motivo_compra, teve_objecao, qual_objecao } = body;

    if (!idade || !estado_civil || !filhos) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('questionario_respostas')
      .insert({
        idade,
        estado_civil,
        filhos,
        outros_problemas: outros_problemas || [],
        metodos_anteriores: metodos_anteriores || [],
        expectativa: expectativa || '',
        motivo_compra: motivo_compra || '',
        teve_objecao: teve_objecao || 'Não',
        qual_objecao: qual_objecao || null,
      });

    if (error) {
      console.error('Erro ao salvar questionário:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar respostas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
