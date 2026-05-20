import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateExperimentsCache } from '@/lib/experiments';

export const dynamic = 'force-dynamic';

interface VariantInput {
  id?: unknown;
  path?: unknown;
  weight?: unknown;
}

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

function validatePayload(body: Record<string, unknown>): {
  ok: boolean;
  message?: string;
  payload?: {
    slug: string;
    entry: string;
    enabled: boolean;
    description: string | null;
    variants: Array<{ id: string; path: string; weight: number }>;
    cookie_max_age_seconds: number;
  };
} {
  const slug = String(body.slug ?? '').trim();
  if (!slug) return { ok: false, message: 'slug é obrigatório' };
  if (!/^[a-z0-9][a-z0-9_-]{1,80}$/i.test(slug))
    return { ok: false, message: 'slug inválido (letras, números, _ e -)' };

  const entry = String(body.entry ?? '').trim();
  if (!entry.startsWith('/'))
    return { ok: false, message: 'entry deve começar com /' };
  if (entry.startsWith('/admin') || entry.startsWith('/api'))
    return { ok: false, message: 'entry não pode ser /admin ou /api' };

  const rawVariants = body.variants;
  if (!Array.isArray(rawVariants) || rawVariants.length < 2)
    return { ok: false, message: 'precisa de pelo menos 2 variantes' };

  const variants: Array<{ id: string; path: string; weight: number }> = [];
  const seenIds = new Set<string>();
  for (const raw of rawVariants as VariantInput[]) {
    const vid = String(raw.id ?? '').trim();
    const vpath = String(raw.path ?? '').trim();
    const weight = Number(raw.weight ?? 1);
    if (!vid) return { ok: false, message: 'variante sem id' };
    if (seenIds.has(vid)) return { ok: false, message: `variante "${vid}" duplicada` };
    seenIds.add(vid);
    if (!vpath.startsWith('/'))
      return { ok: false, message: `path da variante "${vid}" deve começar com /` };
    if (vpath === entry)
      return {
        ok: false,
        message: `variante "${vid}" tem path igual ao entry (causa loop)`,
      };
    if (!Number.isFinite(weight) || weight <= 0)
      return { ok: false, message: `peso da variante "${vid}" inválido` };
    variants.push({ id: vid, path: vpath, weight });
  }

  return {
    ok: true,
    payload: {
      slug,
      entry,
      enabled: Boolean(body.enabled),
      description: body.description ? String(body.description).slice(0, 500) : null,
      variants,
      cookie_max_age_seconds:
        Number(body.cookie_max_age_seconds) > 0
          ? Math.floor(Number(body.cookie_max_age_seconds))
          : 30 * 24 * 60 * 60,
    },
  };
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

  const { data, error } = await supabaseAdmin
    .from('experiments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ experiments: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const v = validatePayload(body);
  if (!v.ok || !v.payload)
    return NextResponse.json({ error: v.message }, { status: 400 });

  const { error, data } = await supabaseAdmin
    .from('experiments')
    .insert({
      ...v.payload,
      created_by: auth.userId,
    })
    .select('*')
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  invalidateExperimentsCache();
  return NextResponse.json({ experiment: data });
}
