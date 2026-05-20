import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateExperimentsCache } from '@/lib/experiments';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { ok: false as const, status: 401, message: 'Não autenticado' };

  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single();
  if (!admin) return { ok: false as const, status: 403, message: 'Acesso negado' };
  return { ok: true as const, userId: user.id };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

  const { slug } = await params;
  const { data, error } = await supabaseAdmin
    .from('experiments')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data)
    return NextResponse.json({ error: 'Experimento não encontrado' }, { status: 404 });

  return NextResponse.json({ experiment: data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

  const { slug } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const allowed: Record<string, unknown> = {};
  if (body.enabled !== undefined) allowed.enabled = Boolean(body.enabled);
  if (body.description !== undefined)
    allowed.description = body.description
      ? String(body.description).slice(0, 500)
      : null;
  if (body.variants !== undefined) {
    if (!Array.isArray(body.variants) || body.variants.length < 2)
      return NextResponse.json({ error: 'precisa de pelo menos 2 variantes' }, { status: 400 });
    allowed.variants = body.variants;
  }
  if (body.entry !== undefined) {
    const entry = String(body.entry);
    if (!entry.startsWith('/'))
      return NextResponse.json({ error: 'entry deve começar com /' }, { status: 400 });
    allowed.entry = entry;
  }
  if (body.cookie_max_age_seconds !== undefined) {
    const n = Number(body.cookie_max_age_seconds);
    if (Number.isFinite(n) && n > 0) allowed.cookie_max_age_seconds = Math.floor(n);
  }

  if (Object.keys(allowed).length === 0)
    return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('experiments')
    .update(allowed)
    .eq('slug', slug)
    .select('*')
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  invalidateExperimentsCache();
  return NextResponse.json({ experiment: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

  const { slug } = await params;
  const { error } = await supabaseAdmin.from('experiments').delete().eq('slug', slug);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  invalidateExperimentsCache();
  return NextResponse.json({ success: true });
}
