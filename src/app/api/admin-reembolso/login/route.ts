import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { createToken } from '@/lib/reembolso-auth';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado' },
        { status: 500 }
      );
    }

    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Find user by email
    const { data: user, error: queryError } = await supabaseAdmin
      .from('usuarios_admin')
      .select('id, email, nome, senha, ativo')
      .eq('email', email)
      .single();

    if (queryError || !user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    if (!user.ativo) {
      return NextResponse.json(
        { error: 'Usuário desativado' },
        { status: 403 }
      );
    }

    // Compare password
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      id: user.id,
      email: user.email,
      nome: user.nome,
    });

    // Update ultimo_acesso
    await supabaseAdmin
      .from('usuarios_admin')
      .update({ ultimo_acesso: new Date().toISOString() })
      .eq('id', user.id);

    // Set httpOnly cookie
    const response = NextResponse.json({
      success: true,
      nome: user.nome,
    });

    response.cookies.set('reembolso_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
