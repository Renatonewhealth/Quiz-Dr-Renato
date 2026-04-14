import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getAuthenticatedUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const statusEnum = z.enum([
  'new',
  'reviewing',
  'shortlist',
  'test-sent',
  'rejected',
  'hired',
]);

const patchSchema = z
  .object({
    status: statusEnum.optional(),
    internal_rating: z
      .number()
      .int()
      .min(0)
      .max(5)
      .nullable()
      .optional(),
    internal_notes: z.string().max(10_000).nullable().optional(),
  })
  .refine(
    (v) =>
      v.status !== undefined ||
      v.internal_rating !== undefined ||
      v.internal_notes !== undefined,
    { message: 'No fields to update' }
  );

const idSchema = z.string().uuid();

type Params = Promise<{ id: string }>;

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { id } = await params;
  const idParsed = idSchema.safeParse(id);
  if (!idParsed.success) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('copy_applications')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('[copy-applications/[id]] GET error', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { id } = await params;
  const idParsed = idSchema.safeParse(id);
  if (!idParsed.success) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const patch: Record<string, unknown> = { ...parsed.data };
  patch.reviewed_by = user.id;
  patch.reviewed_at = new Date().toISOString();
  patch.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from('copy_applications')
    .update(patch)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('[copy-applications/[id]] PATCH error', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}
