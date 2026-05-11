'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DropoffData } from '@/types/admin';

interface DropoffChartProps {
  data: DropoffData[];
}

function getColor(percentage: number) {
  if (percentage >= 80) return '#10b981';
  if (percentage >= 60) return '#f59e0b';
  return '#ef4444';
}

interface TooltipItem {
  active?: boolean;
  payload?: Array<{ payload: DropoffData }>;
}

function CustomTooltip({ active, payload }: TooltipItem) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">Pergunta {item.question_id}</p>
      <p className="text-gray-700">
        <strong>{item.completed}</strong> pessoas responderam
      </p>
      <p className="text-gray-500 text-xs mt-1">
        {item.percentage}% do total
      </p>
      {item.dropFromPrev !== undefined && item.question_id > 1 && (
        <p className="text-red-500 text-xs mt-1">
          {item.dropFromPrev}% abandonaram desde a pergunta anterior
        </p>
      )}
    </div>
  );
}

export default function DropoffChart({ data }: DropoffChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Conclusão por Pergunta</h3>
      <p className="text-sm text-gray-600 mb-4">
        Quantidade de pessoas que responderam cada pergunta no período selecionado
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="question_id"
            label={{ value: 'Pergunta', position: 'insideBottom', offset: -5 }}
            tickFormatter={(value) => `Q${value}`}
          />
          <YAxis label={{ value: 'Pessoas', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.percentage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Tabela detalhada */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 uppercase tracking-wider font-medium pb-2 border-b border-gray-100">
          <span>Pergunta</span>
          <span className="text-right">Responderam</span>
          <span className="text-right">% Total</span>
          <span className="text-right">Drop</span>
        </div>
        {data.map((row) => (
          <div
            key={row.question_id}
            className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-50 last:border-b-0"
          >
            <span className="text-gray-700 font-medium">Q{row.question_id}</span>
            <span className="text-right text-gray-900 font-semibold">{row.completed}</span>
            <span className="text-right text-gray-600">{row.percentage}%</span>
            <span className="text-right">
              {row.question_id === 1 ? (
                <span className="text-gray-400">—</span>
              ) : (
                <span className={`font-medium ${row.dropFromPrev && row.dropFromPrev > 20 ? 'text-red-500' : 'text-gray-600'}`}>
                  {row.dropFromPrev !== undefined ? `-${row.dropFromPrev}%` : '—'}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
          <span className="text-gray-600">≥ 80%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
          <span className="text-gray-600">60-79%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="text-gray-600">{'< 60%'}</span>
        </div>
      </div>
    </div>
  );
}
