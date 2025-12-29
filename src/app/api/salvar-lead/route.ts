import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';

// Schema de validação
const leadSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  score: z.number(),
  resultado: z.string(),
  respostas: z.array(z.object({
    questionId: z.string(),
    optionId: z.string(),
    score: z.number(),
  })),
});

export async function POST(request: NextRequest) {
  try {
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      console.warn('Supabase não configurado - dados não serão salvos');
      return NextResponse.json(
        { success: true, message: 'Lead processado (Supabase não configurado)', data: { id: 'mock-id' } },
        { status: 200 }
      );
    }
    
    const body = await request.json();
    
    // Validar dados
    const validatedData = leadSchema.parse(body);
    
    // Formatar telefone (remover caracteres especiais)
    const telefoneFormatado = validatedData.telefone.replace(/\D/g, '');
    
    // Salvar no Supabase
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert({
        nome: validatedData.nome,
        email: validatedData.email,
        telefone: telefoneFormatado,
        score: validatedData.score,
        resultado: validatedData.resultado,
        respostas: validatedData.respostas,
        whatsapp_enviado: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Erro Supabase:', error);
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar dados' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead salvo com sucesso',
        data: { id: data.id }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na API:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
