'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  Users,
  Target,
  RefreshCw,
  ChevronRight,
  Eye,
  PlayCircle,
  CheckCircle2,
  UserCheck,
  TestTube,
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
} from 'recharts';
import DateRangePicker, {
  type DateRange,
  presetToRange,
} from '@/components/admin/DateRangePicker';

interface FunnelStage {
  stage: string;
  count: number;
}

interface TopPage {
  page_slug: string;
  unique_sessions: number;
  unique_visitors: number;
}

interface DropoffRow {
  question_id: number;
  sessions: number;
  percentage_of_start: number;
  drop_from_prev: number;
}

interface VariantStat {
  variant: string;
  page_views: number;
  quiz_starts: number;
  completed: number;
  leads: number;
  start_rate: number;
  completion_rate: number;
  lead_rate: number;
}

interface DayPoint {
  date: string;
  count: number;
}

interface AnalyticsResponse {
  range: { from: string; to: string };
  filters: { includeBots: boolean; variant: string | null; page: string | null };
  totals: {
    total_events: number;
    unique_sessions: number;
    unique_visitors: number;
    page_views_sessions: number;
    quiz_starts: number;
    quiz_completed: number;
    leads_captured: number;
  };
  funnel: FunnelStage[];
  topPages: TopPage[];
  pageViewsPerDay: DayPoint[];
  quizStartsPerDay: DayPoint[];
  dropoffByQuestion: DropoffRow[];
  variantStats: VariantStat[];
  uniqueVisitorsByType: Record<string, number>;
}

function StatCard({
  label,
  value,
  hint,
  Icon,
  accent,
}: {
  label: string;
  value: string | number;
  hint?: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function getColorByPct(p: number) {
  if (p >= 80) return '#10b981';
  if (p >= 60) return '#f59e0b';
  return '#ef4444';
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(() => presetToRange('30d'));
  const [pageFilter, setPageFilter] = useState<string>('');
  const [variantFilter, setVariantFilter] = useState<string>('');
  const [includeBots, setIncludeBots] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });
      if (pageFilter) params.set('page', pageFilter);
      if (variantFilter) params.set('variant', variantFilter);
      if (includeBots) params.set('includeBots', '1');

      const res = await fetch(`/api/admin/analytics?${params.toString()}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || `Erro ${res.status}`);
        return;
      }
      const json = (await res.json()) as AnalyticsResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao buscar dados');
    }
  }, [dateRange, pageFilter, variantFilter, includeBots]);

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#667eea] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando analytics...</p>
        </div>
      </div>
    );
  }

  const totals = data?.totals;
  const startRate =
    totals && totals.page_views_sessions > 0
      ? Math.round((totals.quiz_starts / totals.page_views_sessions) * 100)
      : 0;
  const completionRate =
    totals && totals.quiz_starts > 0
      ? Math.round((totals.quiz_completed / totals.quiz_starts) * 100)
      : 0;
  const leadRate =
    totals && totals.quiz_starts > 0
      ? Math.round((totals.leads_captured / totals.quiz_starts) * 100)
      : 0;

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Quiz</h1>
            <p className="text-gray-600 mt-1">
              Funil completo: page view → início do quiz → perguntas → conclusão
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/experiments"
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <TestTube className="w-4 h-4 text-[#667eea]" />
              Experimentos A/B
            </Link>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-gray-600 font-medium mr-1">Página:</label>
            <select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea]"
            >
              <option value="">Todas</option>
              {data?.topPages.map((p) => (
                <option key={p.page_slug} value={p.page_slug}>
                  {p.page_slug}
                </option>
              ))}
            </select>

            <label className="text-sm text-gray-600 font-medium ml-3 mr-1">Variante:</label>
            <select
              value={variantFilter}
              onChange={(e) => setVariantFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea]"
            >
              <option value="">Todas</option>
              {data?.variantStats.map((v) => (
                <option key={v.variant} value={v.variant}>
                  {v.variant}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-600 ml-3">
              <input
                type="checkbox"
                checked={includeBots}
                onChange={(e) => setIncludeBots(e.target.checked)}
                className="accent-[#667eea]"
              />
              Incluir bots
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Visitantes únicos"
          value={totals?.unique_visitors ?? 0}
          hint={`${totals?.unique_sessions ?? 0} sessões`}
          Icon={Users}
          accent="bg-blue-500"
        />
        <StatCard
          label="Sessões com page view"
          value={totals?.page_views_sessions ?? 0}
          hint="Sessões únicas que abriram alguma página"
          Icon={Eye}
          accent="bg-purple-500"
        />
        <StatCard
          label="Iniciaram o quiz"
          value={totals?.quiz_starts ?? 0}
          hint={`${startRate}% das sessões com page view`}
          Icon={PlayCircle}
          accent="bg-amber-500"
        />
        <StatCard
          label="Leads capturados"
          value={totals?.leads_captured ?? 0}
          hint={`${leadRate}% dos que iniciaram`}
          Icon={UserCheck}
          accent="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Completaram o quiz"
          value={totals?.quiz_completed ?? 0}
          hint={`${completionRate}% dos que iniciaram`}
          Icon={CheckCircle2}
          accent="bg-green-600"
        />
        <StatCard
          label="Total de eventos"
          value={totals?.total_events ?? 0}
          hint="No período"
          Icon={Activity}
          accent="bg-gray-700"
        />
        <StatCard
          label="Taxa de conclusão"
          value={`${completionRate}%`}
          hint="Iniciou → Completou"
          Icon={Target}
          accent="bg-indigo-500"
        />
      </div>

      {/* Funil principal */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Funil principal</h3>
        <div className="space-y-2">
          {data?.funnel.map((stage, i) => {
            const max = data.funnel[0]?.count || 1;
            const pctMax = Math.round((stage.count / max) * 100);
            const prev = data.funnel[i - 1]?.count;
            const pctPrev = prev && prev > 0 ? Math.round((stage.count / prev) * 100) : null;
            return (
              <div key={stage.stage} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 font-medium w-44 shrink-0">
                  {stage.stage}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-end pr-2"
                    style={{ width: `${pctMax}%` }}
                  >
                    {pctMax > 15 && (
                      <span className="text-xs text-white font-bold">
                        {stage.count}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-900 font-bold w-20 text-right tabular-nums">
                  {pctMax < 15 ? stage.count : ''}
                  {pctPrev !== null && (
                    <span className="text-xs text-gray-500 font-normal ml-1">
                      ({pctPrev}%)
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drop-off por pergunta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Conclusão por pergunta
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Sessões únicas que responderam até cada pergunta
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data?.dropoffByQuestion ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="question_id" tickFormatter={(v) => `Q${v}`} />
              <YAxis />
              <Tooltip
                formatter={(value, _name, props) => {
                  const p = props?.payload as DropoffRow | undefined;
                  return [
                    `${value} sessões${p ? ` (${p.percentage_of_start}% das iniciadas)` : ''}`,
                    'Responderam',
                  ];
                }}
                labelFormatter={(v) => `Pergunta ${v}`}
              />
              <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
                {(data?.dropoffByQuestion ?? []).map((entry, idx) => (
                  <Cell key={idx} fill={getColorByPct(entry.percentage_of_start)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 border-t border-gray-100 pt-3 text-xs">
            <div className="grid grid-cols-4 gap-2 text-gray-500 uppercase tracking-wider font-medium pb-1">
              <span>Pergunta</span>
              <span className="text-right">Sessões</span>
              <span className="text-right">% Início</span>
              <span className="text-right">Drop</span>
            </div>
            {(data?.dropoffByQuestion ?? []).map((row) => (
              <div
                key={row.question_id}
                className="grid grid-cols-4 gap-2 py-1.5 text-sm border-b border-gray-50 last:border-b-0"
              >
                <span className="text-gray-700 font-medium">Q{row.question_id}</span>
                <span className="text-right text-gray-900 font-semibold tabular-nums">
                  {row.sessions}
                </span>
                <span className="text-right text-gray-600 tabular-nums">
                  {row.percentage_of_start}%
                </span>
                <span className="text-right">
                  {row.question_id === 1 ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <span
                      className={`font-medium tabular-nums ${
                        row.drop_from_prev > 20 ? 'text-red-500' : 'text-gray-600'
                      }`}
                    >
                      -{row.drop_from_prev}%
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Page views por dia */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Tráfego por dia</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sessões únicas com page view e quiz_start
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={(data?.pageViewsPerDay ?? []).map((d) => ({
                date: d.date,
                page_views: d.count,
                quiz_starts:
                  data?.quizStartsPerDay.find((q) => q.date === d.date)?.count ?? 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="page_views"
                stroke="#667eea"
                strokeWidth={2}
                dot={false}
                name="Page views"
              />
              <Line
                type="monotone"
                dataKey="quiz_starts"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Quiz starts"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top pages */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Páginas mais acessadas</h3>
        <p className="text-sm text-gray-600 mb-4">
          Por sessões únicas no período selecionado
        </p>
        <div className="space-y-1">
          <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 uppercase tracking-wider font-medium pb-2 border-b border-gray-100">
            <span className="col-span-7">Página</span>
            <span className="col-span-3 text-right">Sessões únicas</span>
            <span className="col-span-2 text-right">Visitantes únicos</span>
          </div>
          {(data?.topPages ?? []).slice(0, 15).map((p) => (
            <div
              key={p.page_slug}
              className="grid grid-cols-12 gap-2 py-2 text-sm border-b border-gray-50 last:border-b-0"
            >
              <span className="col-span-7 text-gray-900 font-medium truncate">
                {p.page_slug}
              </span>
              <span className="col-span-3 text-right tabular-nums">
                {p.unique_sessions}
              </span>
              <span className="col-span-2 text-right tabular-nums text-gray-600">
                {p.unique_visitors}
              </span>
            </div>
          ))}
          {(data?.topPages ?? []).length === 0 && (
            <p className="text-sm text-gray-400 py-6 text-center">
              Sem page views no período selecionado.
            </p>
          )}
        </div>
      </div>

      {/* Variantes (pra A/B test) */}
      {data && data.variantStats.length > 1 && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Performance por variante
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Comparativo entre variantes (preparado para A/B test)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Variante
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Page views
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Iniciaram
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Início %
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Completaram
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Compl %
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Leads
                  </th>
                  <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Lead %
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.variantStats.map((v) => (
                  <tr key={v.variant} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">{v.variant}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{v.page_views}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{v.quiz_starts}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-600">
                      {v.start_rate}%
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{v.completed}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-600">
                      {v.completion_rate}%
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{v.leads}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-600">
                      {v.lead_rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-8">
        <ChevronRight className="inline w-3 h-3" /> Tracking via{' '}
        <code className="px-1 py-0.5 bg-gray-100 rounded">tracking_events</code>.
        Sessions únicas (24h) vs visitors únicos (perene). Bots filtrados por padrão.
      </p>
    </div>
  );
}
