import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // TODO: Implementar salvamento no Supabase
    return NextResponse.json(
      { message: 'Endpoint Supabase - Em desenvolvimento' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao salvar lead' },
      { status: 500 }
    );
  }
}

