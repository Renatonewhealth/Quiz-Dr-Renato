import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'purple' | 'green' | 'blue' | 'orange';
}

const colorClasses = {
  purple: {
    bg: 'from-[#667eea] to-[#764ba2]',
    text: 'text-[#667eea]',
    iconBg: 'bg-[#667eea]/10',
  },
  green: {
    bg: 'from-[#10b981] to-[#059669]',
    text: 'text-[#10b981]',
    iconBg: 'bg-[#10b981]/10',
  },
  blue: {
    bg: 'from-[#3b82f6] to-[#2563eb]',
    text: 'text-[#3b82f6]',
    iconBg: 'bg-[#3b82f6]/10',
  },
  orange: {
    bg: 'from-[#f59e0b] to-[#d97706]',
    text: 'text-[#f59e0b]',
    iconBg: 'bg-[#f59e0b]/10',
  },
};

export default function KPICard({ label, value, icon: Icon, trend, color = 'purple' }: KPICardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        {trend && (
          <div className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
      <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
    </div>
  );
}

