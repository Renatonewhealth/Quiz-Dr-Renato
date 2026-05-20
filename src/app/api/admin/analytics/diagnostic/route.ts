import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface RawCount {
  bucket: string;
  count: number;
}

export async function GET() {
  try {
    // Auth
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user)
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    const { data: admin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
    if (!admin)
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });

    if (!supabaseAdmin)
      return NextResponse.json({ error: 'Supabase off' }, { status: 503 });

    // Total
    const { count: totalCount } = await supabaseAdmin
      .from('tracking_events')
      .select('*', { count: 'exact', head: true });

    // Bots
    const { count: botCount } = await supabaseAdmin
      .from('tracking_events')
      .select('*', { count: 'exact', head: true })
      .eq('is_bot', true);

    // Últimos 30 dias por dia (não-bot)
    const cutoff30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recent30 } = await supabaseAdmin
      .from('tracking_events')
      .select('created_at, event_type, is_bot')
      .gte('created_at', cutoff30)
      .order('created_at', { ascending: false })
      .limit(50000);

    const byDay = new Map<string, { total: number; nonBot: number }>();
    const byType = new Map<string, number>();
    for (const ev of recent30 ?? []) {
      const day = new Date(ev.created_at).toISOString().split('T')[0];
      const dEntry = byDay.get(day) ?? { total: 0, nonBot: 0 };
      dEntry.total += 1;
      if (!ev.is_bot) dEntry.nonBot += 1;
      byDay.set(day, dEntry);

      byType.set(ev.event_type, (byType.get(ev.event_type) ?? 0) + 1);
    }

    const perDay: Array<{ date: string; total: number; non_bot: number }> = Array.from(
      byDay.entries()
    )
      .map(([date, v]) => ({ date, total: v.total, non_bot: v.nonBot }))
      .sort((a, b) => b.date.localeCompare(a.date));

    const perType: RawCount[] = Array.from(byType.entries())
      .map(([bucket, count]) => ({ bucket, count }))
      .sort((a, b) => b.count - a.count);

    // Últimos 20 eventos (debug)
    const { data: recent20 } = await supabaseAdmin
      .from('tracking_events')
      .select('created_at, event_type, page_slug, variant, session_id, visitor_id, is_bot, user_agent')
      .order('created_at', { ascending: false })
      .limit(20);

    // Primeiros e últimos eventos (datas extremas)
    const { data: first } = await supabaseAdmin
      .from('tracking_events')
      .select('created_at')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();
    const { data: last } = await supabaseAdmin
      .from('tracking_events')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Range "hoje" baseado em UTC e local
    const now = new Date();
    const todayUtcStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
    );
    const todayUtcEnd = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999)
    );
    const { count: todayUtcCount } = await supabaseAdmin
      .from('tracking_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayUtcStart.toISOString())
      .lte('created_at', todayUtcEnd.toISOString())
      .eq('is_bot', false);

    return NextResponse.json({
      server_time: now.toISOString(),
      table_totals: {
        total_events: totalCount ?? 0,
        bot_events: botCount ?? 0,
        first_event_at: first?.created_at ?? null,
        last_event_at: last?.created_at ?? null,
      },
      today_utc_range: {
        from: todayUtcStart.toISOString(),
        to: todayUtcEnd.toISOString(),
        non_bot_count: todayUtcCount ?? 0,
      },
      last_30_days: {
        per_day: perDay,
        per_type: perType,
      },
      last_20_events: recent20 ?? [],
    });
  } catch (e) {
    console.error('Erro diagnostico:', e);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
