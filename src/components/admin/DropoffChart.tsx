'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DropoffData } from '@/types/admin';

interface DropoffChartProps {
  data: DropoffData[];
}

export default function DropoffChart({ data }: DropoffChartProps) {
  // Determinar cor baseado na taxa de abandono
  const getColor = (percentage: number) => {
    if (percentage >= 80) return '#10b981'; // Verde
    if (percentage >= 60) return '#f59e0b'; // Laranja
    return '#ef4444'; // Vermelho
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Conclusão por Pergunta
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Quantidade de pessoas que responderam cada pergunta
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="question_id" 
            label={{ value: 'Pergunta', position: 'insideBottom', offset: -5 }}
            tickFormatter={(value) => `Q${value}`}
          />
          <YAxis label={{ value: 'Pessoas', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px' 
            }}
            formatter={(value: any, name: string, props: any) => [
              `${value} pessoas (${props.payload.percentage}%)`,
              'Completaram'
            ]}
            labelFormatter={(label) => `Pergunta ${label}`}
          />
          <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.percentage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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

