import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
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

  const statusList = statusParam ? statusParam.split(',').filter(Boolean) : [];
  const seniorityList = seniorityParam ? seniorityParam.split(',').filter(Boolean) : [];

  let query = supabaseAdmin
    .from('copy_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusList.length > 0) query = query.in('status', statusList);
  if (seniorityList.length > 0) query = query.in('seniority', seniorityList);
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,instagram.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[copy-applications/export] error', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }

  const rows = (data ?? []).map((a) => ({
    id: a.id,
    created_at: a.created_at,
    updated_at: a.updated_at,
    full_name: a.full_name,
    instagram: a.instagram,
    whatsapp: a.whatsapp,
    years_experience: a.years_experience,
    seniority: a.seniority,
    operations_worked: a.operations_worked,
    niches: a.niches,
    specialty: a.specialty,
    results_brought: a.results_brought,
    books_read: a.books_read,
    top_copywriters: a.top_copywriters,
    answer_unique_mechanism: a.answer_unique_mechanism,
    answer_superstructure: a.answer_superstructure,
    answer_offer_block: a.answer_offer_block,
    portfolio_url: a.portfolio_url,
    free_space: a.free_space,
    status: a.status,
    internal_rating: a.internal_rating,
    internal_notes: a.internal_notes,
    reviewed_by: a.reviewed_by,
    reviewed_at: a.reviewed_at,
    ip_address: a.ip_address,
    user_agent: a.user_agent,
    completion_time_seconds: a.completion_time_seconds,
  }));

  const csv = Papa.unparse(rows);

  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const filename = `copywriter-applications-${y}-${m}-${d}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
