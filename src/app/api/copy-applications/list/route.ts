import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getAuthenticatedUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');
  const seniorityParam = searchParams.get('seniority');
  const search = searchParams.get('search')?.trim() ?? '';
  const sort = searchParams.get('sort') ?? 'recent';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const limit = Math.min(
    200,
    Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10) || 50)
  );

  const statusList = statusParam ? statusParam.split(',').filter(Boolean) : [];
  const seniorityList = seniorityParam ? seniorityParam.split(',').filter(Boolean) : [];

  let query = supabaseAdmin.from('copy_applications').select('*', { count: 'exact' });

  if (statusList.length > 0) query = query.in('status', statusList);
  if (seniorityList.length > 0) query = query.in('seniority', seniorityList);

  if (search) {
    // ilike OR search on name/instagram
    query = query.or(`full_name.ilike.%${search}%,instagram.ilike.%${search}%`);
  }

  if (sort === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else if (sort === 'rating') {
    query = query.order('internal_rating', { ascending: false, nullsFirst: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('[copy-applications/list] error', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return NextResponse.json({
    data: data ?? [],
    total,
    page,
    totalPages,
    limit,
  });
}
