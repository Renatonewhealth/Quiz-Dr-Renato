'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  ChevronLeft,
  RefreshCw,
  Edit3,
  Eye,
  MousePointerClick,
  PlayCircle,
  CheckCircle2,
  UserCheck,
  BarChart3,
  TrendingUp,
  Activity,
} from 'lucide-react';
import DateRangePicker, {
  type DateRange,
  presetToRange,
} from '@/components/admin/DateRangePicker';

// ---------- Types ----------
interface Variant {
  id: string;
  path: string;
  weight?: number;
}

interface DropoffPoint {
  question_id: number;
  sessions: number;
  pct: number;
}

interface VariantResult {
  id: string;
  path: string;
  page_views: number;
  clicks: number;
  unique_visitors: number;
  quiz_starts: number;
  completed: number;
  leads: number;
  ctr: number;
  start_rate: number;
  completion_rate: number;
  lead_rate: number;
  dropoff: DropoffPoint[];
}

interface ResultsResponse {
  experiment: {
    id: string;
    slug: string;
    entry: string;
    enabled: boolean;
    description: string | null;
    variants: Variant[];
    created_at: string;
    updated_at: string;
  };
  range: { from: string; to: string };
  variants: VariantResult[];
  totals: {
    page_views: number;
    clicks: number;
    starts: number;
    completed: number;
    leads: number;
  };
}

// Palette for variant colors (kept in sync between table cells / charts)
const VARIANT_PALETTE = [
  '#667eea',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
];

function colorFor(idx: number) {
  return VARIANT_PALETTE[idx % VARIANT_PALETTE.length];
}

// ---------- Stat Card ----------
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
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

// ---------- Page ----------
export default function ExperimentResultsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ? decodeURIComponent(params.slug) : '';

  const [data, setData] = useState<ResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [highlightVariant, setHighlightVariant] = useState<string | null>(null);

  // Initial range: from creation date (or fallback to 30d) to now
  const initRange = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/experiments/${encodeURIComponent(slug)}`,
        { cache: 'no-store' },
      );
      if (res.ok) {
        const json = (await res.json()) as {
          experiment: { created_at: string };
        };
        const from = new Date(json.experiment.created_at);
        const to = new Date();
        setDateRange({ from, to, preset: 'custom' });
        return;
      }
    } catch {
      // fall through
    }
    setDateRange(presetToRange('30d'));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    initRange();
  }, [slug, initRange]);

  const fetchResults = useCallback(async () => {
    if (!slug || !dateRange) return;
    try {
      setError(null);
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });
      const res = await fetch(
        `/api/admin/experiments/${encodeURIComponent(slug)}/results?${params.toString()}`,
        { cache: 'no-store' },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || `Erro ${res.status}`);
        return;
      }
      const json = (await res.json()) as ResultsResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao buscar resultados');
    }
  }, [slug, dateRange]);

  useEffect(() => {
    if (!dateRange) return;
    setLoading(true);
    fetchResults().finally(() => setLoading(false));
  }, [dateRange, fetchResults]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchResults();
    setRefreshing(false);
  };

  // ---------- Derived ----------
  const leaders = useMemo(() => {
    if (!data) {
      return {
        page_views: null,
        clicks: null,
        ctr: null,
        unique_visitors: null,
        quiz_starts: null,
        start_rate: null,
        completed: null,
        completion_rate: null,
        leads: null,
        lead_rate: null,
      } as Record<string, string | null>;
    }
    const pickMax = (key: keyof VariantResult) => {
      let best: VariantResult | null = null;
      for (const v of data.variants) {
        if (best === null || (v[key] as number) > (best[key] as number)) {
          best = v;
        }
      }
      return best && (best[key] as number) > 0 ? best.id : null;
    };
    return {
      page_views: pickMax('page_views'),
      clicks: pickMax('clicks'),
      ctr: pickMax('ctr'),
      unique_visitors: pickMax('unique_visitors'),
      quiz_starts: pickMax('quiz_starts'),
      start_rate: pickMax('start_rate'),
      completed: pickMax('completed'),
      completion_rate: pickMax('completion_rate'),
      leads: pickMax('leads'),
      lead_rate: pickMax('lead_rate'),
    };
  }, [data]);

  // Build funnel chart data: 1 row per stage with variant keys
  const funnelData = useMemo(() => {
    if (!data) return [];
    const stages: Array<{ key: keyof VariantResult; label: string }> = [
      { key: 'page_views', label: 'Page views' },
      { key: 'clicks', label: 'Cliques' },
      { key: 'quiz_starts', label: 'Iniciaram' },
      { key: 'completed', label: 'Completaram' },
      { key: 'leads', label: 'Leads' },
    ];
    return stages.map((s) => {
      const row: Record<string, number | string> = { stage: s.label };
      for (const v of data.variants) {
        row[v.id] = v[s.key] as number;
      }
      return row;
    });
  }, [data]);

  // ---------- Loading ----------
  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#667eea] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  // ---------- Error before data ----------
  if (!data) {
    return (
      <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
        <Link
          href="/admin/experiments"
          className="text-sm text-[#667eea] hover:text-[#5568d3] font-medium flex items-center gap-1 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para experimentos
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error || 'Experimento não encontrado.'}
        </div>
      </div>
    );
  }

  const exp = data.experiment;
  const hasNoData = data.totals.page_views === 0;

  // Mapping of variant id -> color (stable per index in experiment definition)
  const variantColor: Record<string, string> = {};
  data.variants.forEach((v, i) => {
    variantColor[v.id] = colorFor(i);
  });

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Back link */}
      <Link
        href="/admin/experiments"
        className="text-sm text-[#667eea] hover:text-[#5568d3] font-medium flex items-center gap-1 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar para experimentos
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900 font-mono">
                {exp.slug}
              </h1>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  exp.enabled
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                {exp.enabled ? 'Ativo' : 'Pausado'}
              </span>
            </div>
            {exp.description && (
              <p className="text-gray-600 mt-2">{exp.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/experiments?edit=${encodeURIComponent(exp.slug)}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </Link>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              Atualizar
            </button>
          </div>
        </div>

        {/* Stat strip */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs font-medium mr-2">
              Entry:
            </span>
            <code className="px-2 py-0.5 bg-gray-100 rounded font-mono text-gray-700 text-xs">
              {exp.entry}
            </code>
          </div>
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs font-medium mr-2">
              Criado:
            </span>
            <span className="text-gray-700">
              {new Date(exp.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div>
            <span className="text-gray-500 uppercase tracking-wider text-xs font-medium mr-2">
              Variantes:
            </span>
            <span className="text-gray-700 font-semibold tabular-nums">
              {exp.variants.length}
            </span>
          </div>
        </div>

        {/* Date range filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          {dateRange && (
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard
          label="Total page views"
          value={data.totals.page_views}
          Icon={Eye}
          accent="bg-purple-500"
        />
        <StatCard
          label="Total cliques"
          value={data.totals.clicks}
          Icon={MousePointerClick}
          accent="bg-blue-500"
        />
        <StatCard
          label="Total iniciaram"
          value={data.totals.starts}
          Icon={PlayCircle}
          accent="bg-amber-500"
        />
        <StatCard
          label="Total completaram"
          value={data.totals.completed}
          Icon={CheckCircle2}
          accent="bg-green-600"
        />
        <StatCard
          label="Total leads"
          value={data.totals.leads}
          Icon={UserCheck}
          accent="bg-emerald-500"
        />
      </div>

      {/* Empty state */}
      {hasNoData ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2 font-medium">
            Sem dados ainda no período selecionado.
          </p>
          <p className="text-sm text-gray-500">
            Espere os primeiros visitantes ou ajuste o range de data.
          </p>
        </div>
      ) : (
        <>
          {/* Comparison table */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Comparativo entre variantes
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Linhas clicáveis filtram o funil abaixo. Células destacadas indicam
              a variante líder em cada métrica.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      Variante
                    </th>
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      Path
                    </th>
                    <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      Page views
                    </th>
                    <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      Cliques
                    </th>
                    <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      CTR %
                    </th>
                    <th className="text-right px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                      Visitantes únicos
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
                      Concl %
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
                  {data.variants.map((v) => {
                    const selected = highlightVariant === v.id;
                    const leadCls = 'bg-emerald-50 text-emerald-700 font-semibold';
                    return (
                      <tr
                        key={v.id}
                        onClick={() =>
                          setHighlightVariant(selected ? null : v.id)
                        }
                        className={`border-t border-gray-100 cursor-pointer transition-colors ${
                          selected ? 'bg-[#667eea]/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: variantColor[v.id] }}
                            />
                            <span className="font-bold text-gray-900 font-mono">
                              {v.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <code className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-700">
                            {v.path}
                          </code>
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.page_views === v.id ? leadCls : ''
                          }`}
                        >
                          {v.page_views}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.clicks === v.id ? leadCls : ''
                          }`}
                        >
                          {v.clicks}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.ctr === v.id ? leadCls : 'text-gray-600'
                          }`}
                        >
                          {v.ctr}%
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.unique_visitors === v.id ? leadCls : ''
                          }`}
                        >
                          {v.unique_visitors}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.quiz_starts === v.id ? leadCls : ''
                          }`}
                        >
                          {v.quiz_starts}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.start_rate === v.id ? leadCls : 'text-gray-600'
                          }`}
                        >
                          {v.start_rate}%
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.completed === v.id ? leadCls : ''
                          }`}
                        >
                          {v.completed}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.completion_rate === v.id
                              ? leadCls
                              : 'text-gray-600'
                          }`}
                        >
                          {v.completion_rate}%
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.leads === v.id ? leadCls : ''
                          }`}
                        >
                          {v.leads}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            leaders.lead_rate === v.id ? leadCls : 'text-gray-600'
                          }`}
                        >
                          {v.lead_rate}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Funnel chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h3 className="text-lg font-bold text-gray-900">
                Funil por variante
              </h3>
              {highlightVariant && (
                <button
                  onClick={() => setHighlightVariant(null)}
                  className="text-xs text-[#667eea] hover:text-[#5568d3] font-medium"
                >
                  Limpar filtro (variante {highlightVariant})
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Comparação stage-by-stage do funil. Clique numa variante na tabela
              para destacar.
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.variants.map((v) => (
                  <Bar
                    key={v.id}
                    dataKey={v.id}
                    fill={variantColor[v.id]}
                    radius={[4, 4, 0, 0]}
                    fillOpacity={
                      highlightVariant && highlightVariant !== v.id ? 0.25 : 1
                    }
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>

            {/* Deltas */}
            {data.variants.length >= 2 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Deltas vs. variante {data.variants[0].id} (baseline)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                  {data.variants.slice(1).map((v) => {
                    const base = data.variants[0];
                    const dStart = v.start_rate - base.start_rate;
                    const dCompl = v.completion_rate - base.completion_rate;
                    const dLead = v.lead_rate - base.lead_rate;
                    const fmt = (n: number) =>
                      `${n > 0 ? '+' : ''}${n.toFixed(0)}pp`;
                    const cls = (n: number) =>
                      n > 0
                        ? 'text-emerald-600'
                        : n < 0
                          ? 'text-red-600'
                          : 'text-gray-500';
                    return (
                      <div
                        key={v.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: variantColor[v.id] }}
                          />
                          <span className="font-mono font-bold text-gray-900">
                            {v.id}
                          </span>
                          <span className="text-xs text-gray-500">
                            vs {base.id}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Início</p>
                            <p className={`font-semibold ${cls(dStart)}`}>
                              {fmt(dStart)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Concl</p>
                            <p className={`font-semibold ${cls(dCompl)}`}>
                              {fmt(dCompl)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Lead</p>
                            <p className={`font-semibold ${cls(dLead)}`}>
                              {fmt(dLead)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Per-variant dropoff cards */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Drop-off por variante
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sessões únicas que responderam até cada pergunta, por variante.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.variants.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: variantColor[v.id] }}
                      />
                      <h4 className="text-base font-bold text-gray-900">
                        Variante{' '}
                        <span className="font-mono">{v.id}</span>
                      </h4>
                    </div>
                    <code className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-700">
                      {v.path}
                    </code>
                  </div>

                  {v.dropoff.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center">
                      Sem dados de drop-off para essa variante no período.
                    </p>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={v.dropoff}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f3f4f6"
                          />
                          <XAxis
                            dataKey="question_id"
                            tickFormatter={(val) => `Q${val}`}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value, _name, props) => {
                              const p = props?.payload as
                                | DropoffPoint
                                | undefined;
                              return [
                                `${value} sessões${p ? ` (${p.pct}% do start)` : ''}`,
                                'Responderam',
                              ];
                            }}
                            labelFormatter={(val) => `Pergunta ${val}`}
                          />
                          <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                            {v.dropoff.map((_, i) => (
                              <Cell key={i} fill={variantColor[v.id]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>

                      <div className="mt-3 border-t border-gray-100 pt-2 text-xs">
                        <div className="grid grid-cols-3 gap-2 text-gray-500 uppercase tracking-wider font-medium pb-1">
                          <span>Pergunta</span>
                          <span className="text-right">Sessões</span>
                          <span className="text-right">% do start</span>
                        </div>
                        {v.dropoff.map((row) => (
                          <div
                            key={row.question_id}
                            className="grid grid-cols-3 gap-2 py-1 text-sm border-b border-gray-50 last:border-b-0"
                          >
                            <span className="text-gray-700 font-medium">
                              Q{row.question_id}
                            </span>
                            <span className="text-right text-gray-900 font-semibold tabular-nums">
                              {row.sessions}
                            </span>
                            <span className="text-right text-gray-600 tabular-nums">
                              {row.pct}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer hint */}
      <p className="text-xs text-gray-400 text-center mt-8 flex items-center justify-center gap-1">
        <Activity className="w-3 h-3" />
        Dados calculados em tempo real a partir do{' '}
        <code className="px-1 py-0.5 bg-gray-100 rounded">tracking_events</code>{' '}
        no período selecionado.
      </p>

    </div>
  );
}
