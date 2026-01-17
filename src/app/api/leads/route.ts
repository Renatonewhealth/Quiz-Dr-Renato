import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface QuizAnswer {
  questionId: number;
  questionText: string;
  selectedOption: string;
  score: number;
}

interface LeadData {
  name: string;
  whatsapp: string;
  email: string;
  totalScore: number;
  riskLevel: string;
  answers: QuizAnswer[];
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se o Supabase está configurado
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      console.error('Supabase não está configurado');
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível' },
        { status: 503 }
      );
    }

    const body: LeadData = await request.json();
    const { name, whatsapp, email, totalScore, riskLevel, answers } = body;

    // Validação básica
    if (!name || !whatsapp || !email) {
      return NextResponse.json(
        { error: 'Nome, WhatsApp e Email são obrigatórios' },
        { status: 400 }
      );
    }

    // 1. Inserir o lead
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert({
        name,
        whatsapp,
        email,
        total_score: totalScore,
        risk_level: riskLevel,
      })
      .select()
      .single();

    if (leadError) {
      console.error('Erro ao inserir lead:', leadError);
      return NextResponse.json(
        { error: 'Erro ao salvar dados' },
        { status: 500 }
      );
    }

    // 2. Inserir as respostas do quiz
    if (answers && answers.length > 0) {
      const quizResponses = answers.map((answer) => ({
        lead_id: lead.id,
        question_id: answer.questionId,
        question_text: answer.questionText,
        selected_option: answer.selectedOption,
        option_score: answer.score,
      }));

      const { error: responsesError } = await supabaseAdmin
        .from('quiz_responses')
        .insert(quizResponses);

      if (responsesError) {
        console.error('Erro ao inserir respostas:', responsesError);
        // Não retornamos erro aqui pois o lead já foi salvo
      }
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead salvo com sucesso!',
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}



