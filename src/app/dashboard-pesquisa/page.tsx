'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#dc2626', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', '#ef4444', '#b91c1c', '#991b1b', '#7f1d1d'];

interface ChartItem { name: string; value: number; }
interface TextResposta {
  id: string;
  created_at: string;
  expectativa: string;
  motivo_compra: string;
  teve_objecao: string;
  qual_objecao: string | null;
}
interface DashboardData {
  total: number;
  comObjecao: number;
  pctObjecao: number;
  idadeData: ChartItem[];
  estadoCivilData: ChartItem[];
  filhosData: ChartItem[];
  problemasData: ChartItem[];
  metodosData: ChartItem[];
  respostasTexto: TextResposta[];
}

export default function DashboardPesquisaPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const PER_PAGE = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard-pesquisa');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const paginatedTexto = data?.respostasTexto.slice((page - 1) * PER_PAGE, page * PER_PAGE) || [];
  const totalPages = data ? Math.ceil(data.respostasTexto.length / PER_PAGE) : 1;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#dc2626] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div>
          <h1 className="text-xl font-black tracking-wide">H9 PHARMA</h1>
          <p className="text-xs text-red-200">Painel de Respostas — Questionário de Experiência</p>
        </div>
        <button
          onClick={fetchData}
          className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          ↻ Atualizar
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#dc2626] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Carregando dados...</p>
          </div>
        </div>
      ) : !data || data.total === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-400 text-lg">Nenhuma resposta ainda.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-[#dc2626]">{data.total}</p>
              <p className="text-sm text-gray-500 mt-1">Total de Respostas</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-orange-500">{data.pctObjecao}%</p>
              <p className="text-sm text-gray-500 mt-1">Tiveram Objeção</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-black text-green-600">{data.total - data.comObjecao}</p>
              <p className="text-sm text-gray-500 mt-1">Sem Objeção</p>
            </div>
          </div>

          {/* Gráficos - Linha 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Idade */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">📊 Faixa de Idade</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.idadeData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} name="Respostas" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Estado Civil */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">💍 Estado Civil</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data.estadoCivilData}
                    cx="50%"
                    cy="45%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {data.estadoCivilData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráficos - Linha 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filhos */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">👶 Quantidade de Filhos</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.filhosData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f87171" radius={[4, 4, 0, 0]} name="Respostas" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Métodos anteriores */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">💊 Métodos Anteriores</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.metodosData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={140} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#b91c1c" radius={[0, 4, 4, 0]} name="Respostas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Outros problemas - gráfico horizontal largo */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4">🩺 Outros Problemas de Saúde</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.problemasData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={160} />
                <Tooltip />
                <Bar dataKey="value" fill="#dc2626" radius={[0, 4, 4, 0]} name="Respostas" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de respostas de texto */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">💬 Respostas de Texto</h2>
              <p className="text-xs text-gray-400 mt-0.5">{data.respostasTexto.length} respostas no total</p>
            </div>
            <div className="divide-y divide-gray-50">
              {paginatedTexto.map(r => (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                      className="text-xs text-[#dc2626] font-medium hover:underline"
                    >
                      {expandedId === r.id ? 'Ocultar ▲' : 'Ver respostas ▼'}
                    </button>
                  </div>

                  {/* Preview */}
                  {expandedId !== r.id && r.motivo_compra && (
                    <p className="text-sm text-gray-600 truncate">{r.motivo_compra}</p>
                  )}

                  {/* Expandido */}
                  {expandedId === r.id && (
                    <div className="space-y-3 mt-2">
                      {r.expectativa && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">O que espera conquistar</p>
                          <p className="text-sm text-gray-800 mt-0.5">{r.expectativa}</p>
                        </div>
                      )}
                      {r.motivo_compra && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Motivo da compra</p>
                          <p className="text-sm text-gray-800 mt-0.5">{r.motivo_compra}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Teve objeção?</p>
                        <p className={`text-sm font-medium mt-0.5 ${r.teve_objecao === 'Sim' ? 'text-orange-600' : 'text-green-600'}`}>
                          {r.teve_objecao}
                        </p>
                        {r.qual_objecao && (
                          <p className="text-sm text-gray-700 mt-1 bg-orange-50 px-3 py-2 rounded-lg">{r.qual_objecao}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-gray-100">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-sm font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30"
                >
                  ← Anterior
                </button>
                <span className="text-sm text-gray-500">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="text-sm font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30"
                >
                  Próxima →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
