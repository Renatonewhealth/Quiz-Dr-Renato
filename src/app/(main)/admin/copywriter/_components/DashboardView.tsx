'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import {
  CopyApplication,
  CopyApplicationStatus,
  seniorityLabel,
  statusBadgeClasses,
  statusLabel,
} from './types';

type StatusCounts = Record<CopyApplicationStatus, number>;
type DailyPoint = { date: string; count: number };
type SeniorityPoint = { seniority: string; count: number };

type Props = {
  total: number;
  statusCounts: StatusCounts;
  daily: DailyPoint[];
  senioritySeries: SeniorityPoint[];
  latest: CopyApplication[];
};

const serifStyle = { fontFamily: 'var(--font-instrument-serif), Georgia, serif' };

export default function DashboardView({
  total,
  statusCounts,
  daily,
  senioritySeries,
  latest,
}: Props) {
  const router = useRouter();

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-[clamp(2rem,3vw,2.75rem)] leading-tight text-[#FAFAFA]"
          style={serifStyle}
        >
          Dashboard
        </h1>
        <p className="text-[#A3A3A3] mt-1 text-sm">Visão geral das aplicações</p>
      </div>

      {/* Row 1 — stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={total} />
        <StatCard
          label="Novas"
          value={statusCounts.new}
          highlightClass="ring-1 ring-[#E8E3D8]/30"
        />
        <StatCard label="Em análise" value={statusCounts.reviewing} />
        <StatCard label="Shortlist" value={statusCounts.shortlist} />
      </div>

      {/* Row 2 — charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-6">
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3]">
              Últimos 30 dias
            </p>
            <h2 className="text-[#FAFAFA] text-xl mt-1" style={serifStyle}>
              Aplicações por dia
            </h2>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={daily}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid stroke="#1F1F1F" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#666666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1F1F1F' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#666666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1F1F1F' }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #2A2A2A',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#FAFAFA',
                  }}
                  labelStyle={{ color: '#A3A3A3' }}
                  cursor={{ stroke: '#2A2A2A', strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#E8E3D8"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#E8E3D8', stroke: '#E8E3D8' }}
                  activeDot={{ r: 5, fill: '#E8E3D8', stroke: '#0A0A0A', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-6">
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3]">
              Distribuição
            </p>
            <h2 className="text-[#FAFAFA] text-xl mt-1" style={serifStyle}>
              Por senioridade
            </h2>
          </div>
          <div className="h-[260px] w-full">
            {senioritySeries.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-[#666666]">
                Nenhum dado ainda.
              </div>
            ) : (
              <ResponsiveContainer>
                <BarChart
                  data={senioritySeries}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
                >
                  <CartesianGrid stroke="#1F1F1F" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#666666"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#1F1F1F' }}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="seniority"
                    stroke="#666666"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#1F1F1F' }}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#121212',
                      border: '1px solid #2A2A2A',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                      color: '#FAFAFA',
                    }}
                    labelStyle={{ color: '#A3A3A3' }}
                    cursor={{ fill: '#1A1A1A' }}
                  />
                  <Bar dataKey="count" fill="#E8E3D8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Row 3 — Last 5 */}
      <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1F1F1F] flex items-center justify-between">
          <h2 className="text-[#FAFAFA] text-xl" style={serifStyle}>
            Últimas 5 aplicações
          </h2>
          <Link
            href="/admin/copywriter/candidatos"
            className="text-sm text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
          >
            Ver todas →
          </Link>
        </div>
        {latest.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[#666666]">
            Nenhuma aplicação ainda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3]">
                <tr>
                  <th className="px-4 py-3 text-left font-normal">Nome</th>
                  <th className="px-4 py-3 text-left font-normal">Senioridade</th>
                  <th className="px-4 py-3 text-left font-normal">Data</th>
                  <th className="px-4 py-3 text-left font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => router.push(`/admin/copywriter/candidatos/${app.id}`)}
                    className="border-t border-[#1F1F1F] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-[#FAFAFA] font-medium">
                      {app.full_name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 rounded-md text-xs bg-[#1A1A1A] border border-[#2A2A2A] text-[#A3A3A3]">
                        {seniorityLabel(app.seniority)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#A3A3A3]">
                      {format(new Date(app.created_at), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs ${statusBadgeClasses(
                          app.status
                        )}`}
                      >
                        {statusLabel(app.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlightClass,
}: {
  label: string;
  value: number;
  highlightClass?: string;
}) {
  return (
    <div
      className={`bg-[#121212] border border-[#1F1F1F] rounded-xl p-6 ${
        highlightClass ?? ''
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3]">
        {label}
      </p>
      <p
        className="text-4xl text-[#FAFAFA] mt-2 leading-none"
        style={serifStyle}
      >
        {value}
      </p>
    </div>
  );
}
