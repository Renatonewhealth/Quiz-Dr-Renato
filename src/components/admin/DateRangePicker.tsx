'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export type DateRangePreset = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'all' | 'custom';

export interface DateRange {
  from: Date;
  to: Date;
  preset: DateRangePreset;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

export function presetToRange(preset: DateRangePreset): DateRange {
  const now = new Date();
  switch (preset) {
    case 'today':
      return { preset, from: startOfDay(now), to: endOfDay(now) };
    case 'yesterday': {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return { preset, from: startOfDay(y), to: endOfDay(y) };
    }
    case '7d': {
      const from = new Date(now);
      from.setDate(from.getDate() - 6);
      return { preset, from: startOfDay(from), to: endOfDay(now) };
    }
    case '30d': {
      const from = new Date(now);
      from.setDate(from.getDate() - 29);
      return { preset, from: startOfDay(from), to: endOfDay(now) };
    }
    case '90d': {
      const from = new Date(now);
      from.setDate(from.getDate() - 89);
      return { preset, from: startOfDay(from), to: endOfDay(now) };
    }
    case 'all': {
      // ~3 anos
      const from = new Date('2020-01-01T00:00:00Z');
      return { preset, from, to: endOfDay(now) };
    }
    default:
      return { preset: 'custom', from: startOfDay(now), to: endOfDay(now) };
  }
}

const presetLabels: { value: DateRangePreset; label: string }[] = [
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
  { value: 'all', label: 'Total' },
];

function toInputValue(d: Date): string {
  // YYYY-MM-DD
  return d.toISOString().split('T')[0];
}

function fromInputValue(s: string, endOfDayFlag: boolean): Date {
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date();
  date.setFullYear(y, (m ?? 1) - 1, d ?? 1);
  if (endOfDayFlag) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [showCustom, setShowCustom] = useState(value.preset === 'custom');

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-gray-500 mr-1">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">Período:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presetLabels.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => {
              setShowCustom(false);
              onChange(presetToRange(p.value));
            }}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              value.preset === p.value
                ? 'bg-[#667eea] text-white border-[#667eea]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustom((s) => !s)}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            value.preset === 'custom'
              ? 'bg-[#667eea] text-white border-[#667eea]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Customizado
        </button>
      </div>

      {showCustom && (
        <div className="flex items-center gap-2 ml-2">
          <input
            type="date"
            value={toInputValue(value.from)}
            onChange={(e) => {
              onChange({
                preset: 'custom',
                from: fromInputValue(e.target.value, false),
                to: value.to,
              });
            }}
            className="px-2 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#667eea]"
          />
          <span className="text-sm text-gray-500">até</span>
          <input
            type="date"
            value={toInputValue(value.to)}
            onChange={(e) => {
              onChange({
                preset: 'custom',
                from: value.from,
                to: fromInputValue(e.target.value, true),
              });
            }}
            className="px-2 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-[#667eea]"
          />
        </div>
      )}
    </div>
  );
}
