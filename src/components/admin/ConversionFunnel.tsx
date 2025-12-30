'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FunnelData } from '@/types/admin';

interface ConversionFunnelProps {
  data: FunnelData[];
}

const COLORS = ['#667eea', '#764ba2', '#10b981', '#059669'];

export default function ConversionFunnel({ data }: ConversionFunnelProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Funil de Conversão
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis type="number" />
          <YAxis dataKey="stage" type="category" width={150} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px' 
            }}
            formatter={(value: any) => [`${value} usuários`, 'Total']}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-600 mb-1">{item.stage}</p>
            <p className="text-2xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>
              {item.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

