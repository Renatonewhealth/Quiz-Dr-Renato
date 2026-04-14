import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import DashboardView from './_components/DashboardView';
import type { CopyApplication, CopyApplicationStatus } from './_components/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type StatusCounts = Record<CopyApplicationStatus, number>;

type DailyPoint = { date: string; count: number };
type SeniorityPoint = { seniority: string; count: number };

export default async function CopywriterDashboardPage() {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return (
      <div className="max-w-3xl">
        <h1
          className="text-[clamp(2rem,3vw,2.75rem)] leading-tight text-[#FAFAFA]"
          style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
        >
          Dashboard
        </h1>
        <p className="text-[#A3A3A3] mt-2">Serviço indisponível.</p>
      </div>
    );
  }

  // Fetch all rows — admin area, small table expected
  const { data: all, error } = await supabaseAdmin
    .from('copy_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[copywriter dashboard] fetch error', error);
  }

  const apps: CopyApplication[] = (all as CopyApplication[] | null) ?? [];

  const total = apps.length;

  const statusCounts: StatusCounts = {
    new: 0,
    reviewing: 0,
    shortlist: 0,
    'test-sent': 0,
    rejected: 0,
    hired: 0,
  };
  for (const a of apps) {
    const s = (a.status ?? 'new') as CopyApplicationStatus;
    if (s in statusCounts) statusCounts[s] += 1;
  }

  // Last 30 days line chart
  const now = new Date();
  const daily: DailyPoint[] = [];
  const countsByDate = new Map<string, number>();
  for (const a of apps) {
    const d = new Date(a.created_at);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 30 && diffDays >= 0) {
      const key = d.toISOString().slice(0, 10);
      countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1);
    }
  }
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    daily.push({ date: label, count: countsByDate.get(key) ?? 0 });
  }

  // Seniority distribution
  const seniorityCounts = new Map<string, number>();
  for (const a of apps) {
    const key = a.seniority ?? '—';
    seniorityCounts.set(key, (seniorityCounts.get(key) ?? 0) + 1);
  }
  const seniorityLabelMap: Record<string, string> = {
    junior: 'Júnior',
    'pleno-novo': 'Pleno (novo)',
    'pleno-senior': 'Pleno (sênior)',
    senior: 'Sênior',
  };
  const senioritySeries: SeniorityPoint[] = Array.from(seniorityCounts.entries())
    .map(([key, count]) => ({
      seniority: seniorityLabelMap[key] ?? key,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Last 5
  const latest = apps.slice(0, 5);

  return (
    <DashboardView
      total={total}
      statusCounts={statusCounts}
      daily={daily}
      senioritySeries={senioritySeries}
      latest={latest}
    />
  );
}
