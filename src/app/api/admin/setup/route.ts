import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 500 }
      );
    }

    const { email, senha, nome } = await request.json();

    if (!email || !senha || !nome) {
      return NextResponse.json(
        { error: 'Email, senha e nome são obrigatórios' },
        { status: 400 }
      );
    }

    // Check if any admin already exists
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('usuarios_admin')
      .select('id')
      .limit(1);

    if (checkError) {
      return NextResponse.json(
        { error: 'Erro ao verificar administradores existentes', details: checkError.message },
        { status: 500 }
      );
    }

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Já existe um administrador cadastrado. Setup não permitido.' },
        { status: 403 }
      );
    }

    // Hash password
    const senhaHash = await bcrypt.hash(senha, 12);

    // Insert admin user
    const { data, error: insertError } = await supabaseAdmin
      .from('usuarios_admin')
      .insert({
        email,
        senha: senhaHash,
        nome,
        ativo: true,
      })
      .select('id, email, nome')
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Erro ao criar administrador', details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Administrador criado com sucesso',
      admin: data,
    });
  } catch (error) {
    console.error('Erro no setup:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
