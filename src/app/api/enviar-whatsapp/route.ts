import { NextRequest, NextResponse } from 'next/server';
import { enviarResultadoWhatsApp } from '@/lib/zapi';
import { z } from 'zod';

// Schema de validação
const whatsappSchema = z.object({
  telefone: z.string().min(10, 'Telefone inválido'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  resultado: z.string().min(1, 'Resultado é obrigatório'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = whatsappSchema.parse(body);
    
    // Formatar telefone (remover caracteres especiais, adicionar código do país)
    let telefoneFormatado = validatedData.telefone.replace(/\D/g, '');
    if (!telefoneFormatado.startsWith('55')) {
      telefoneFormatado = '55' + telefoneFormatado;
    }
    
    // Enviar mensagem via Z-API
    const result = await enviarResultadoWhatsApp(
      telefoneFormatado,
      validatedData.nome,
      validatedData.resultado
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso',
        data: result
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na API WhatsApp:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro ao enviar mensagem' },
      { status: 500 }
    );
  }
}
