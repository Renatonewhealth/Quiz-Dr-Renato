import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Configuração do banco inválida' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { session_id, action, question, lead_id } = body;

    // Pegar User-Agent e IP
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'Unknown';

    if (action === 'start') {
      // Criar nova sessão
      const { data, error } = await supabaseAdmin
        .from('quiz_sessions')
        .insert({
          session_id,
          last_question: 0,
          completed: false,
          user_agent: userAgent,
          ip_address: ip,
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar sessão:', error);
        return NextResponse.json(
          { error: 'Erro ao criar sessão' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, session: data });
    }

    if (action === 'update') {
      // Atualizar progresso da sessão
      const { error } = await supabaseAdmin
        .from('quiz_sessions')
        .update({
          last_question: question,
          updated_at: new Date().toISOString(),
        })
        .eq('session_id', session_id);

      if (error) {
        console.error('Erro ao atualizar sessão:', error);
        return NextResponse.json(
          { error: 'Erro ao atualizar sessão' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'complete') {
      // Marcar sessão como completa
      const { error } = await supabaseAdmin
        .from('quiz_sessions')
        .update({
          completed: true,
          last_question: question,
          lead_id: lead_id || null,
          updated_at: new Date().toISOString(),
        })
        .eq('session_id', session_id);

      if (error) {
        console.error('Erro ao completar sessão:', error);
        return NextResponse.json(
          { error: 'Erro ao completar sessão' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro na API de sessão:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

