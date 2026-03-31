import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json({ error: 'Serviço indisponível' }, { status: 503 });
    }

    const { data, error } = await supabaseAdmin
      .from('questionario_respostas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar respostas:', error);
      return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
    }

    const total = data.length;

    // Distribuição por idade
    const idadeCount: Record<string, number> = {};
    data.forEach(r => {
      idadeCount[r.idade] = (idadeCount[r.idade] || 0) + 1;
    });
    const idadeData = Object.entries(idadeCount).map(([name, value]) => ({ name, value }));

    // Distribuição por estado civil
    const estadoCivilCount: Record<string, number> = {};
    data.forEach(r => {
      estadoCivilCount[r.estado_civil] = (estadoCivilCount[r.estado_civil] || 0) + 1;
    });
    const estadoCivilData = Object.entries(estadoCivilCount).map(([name, value]) => ({ name, value }));

    // Distribuição por filhos
    const filhosCount: Record<string, number> = {};
    data.forEach(r => {
      filhosCount[r.filhos] = (filhosCount[r.filhos] || 0) + 1;
    });
    const filhosData = Object.entries(filhosCount).map(([name, value]) => ({ name, value }));

    // Outros problemas (flatten array)
    const problemasCount: Record<string, number> = {};
    data.forEach(r => {
      (r.outros_problemas || []).forEach((p: string) => {
        problemasCount[p] = (problemasCount[p] || 0) + 1;
      });
    });
    const problemasData = Object.entries(problemasCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Métodos anteriores
    const metodosCount: Record<string, number> = {};
    data.forEach(r => {
      (r.metodos_anteriores || []).forEach((m: string) => {
        metodosCount[m] = (metodosCount[m] || 0) + 1;
      });
    });
    const metodosData = Object.entries(metodosCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // % com objeção
    const comObjecao = data.filter(r => r.teve_objecao === 'Sim').length;
    const pctObjecao = total > 0 ? Math.round((comObjecao / total) * 100) : 0;

    // Respostas de texto (para tabela)
    const respostasTexto = data.map(r => ({
      id: r.id,
      created_at: r.created_at,
      expectativa: r.expectativa,
      motivo_compra: r.motivo_compra,
      teve_objecao: r.teve_objecao,
      qual_objecao: r.qual_objecao,
    }));

    return NextResponse.json({
      total,
      comObjecao,
      pctObjecao,
      idadeData,
      estadoCivilData,
      filhosData,
      problemasData,
      metodosData,
      respostasTexto,
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
