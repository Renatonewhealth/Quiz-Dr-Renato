export type CopyApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'shortlist'
  | 'test-sent'
  | 'rejected'
  | 'hired';

export const STATUS_OPTIONS: { value: CopyApplicationStatus; label: string }[] = [
  { value: 'new', label: 'Novo' },
  { value: 'reviewing', label: 'Em análise' },
  { value: 'shortlist', label: 'Shortlist' },
  { value: 'test-sent', label: 'Teste enviado' },
  { value: 'rejected', label: 'Rejeitado' },
  { value: 'hired', label: 'Contratado' },
];

export const SENIORITY_OPTIONS: { value: string; label: string }[] = [
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno-novo', label: 'Pleno (novo)' },
  { value: 'pleno-senior', label: 'Pleno (sênior)' },
  { value: 'senior', label: 'Sênior' },
];

export const YEARS_OPTIONS: { value: string; label: string }[] = [
  { value: '<1', label: 'Menos de 1' },
  { value: '1-2', label: '1-2 anos' },
  { value: '3-5', label: '3-5 anos' },
  { value: '+5', label: '+5 anos' },
];

export type OpportunityPreference = 'fixed-moderate' | 'aggressive-only' | 'either' | null;

export const OPPORTUNITY_OPTIONS: { value: NonNullable<OpportunityPreference>; label: string }[] = [
  { value: 'fixed-moderate', label: 'Fixo + % moderada' },
  { value: 'aggressive-only', label: '% agressiva (sem fixo)' },
  { value: 'either', label: 'Tanto faz' },
];

export type CopyApplication = {
  id: string;
  created_at: string;
  updated_at: string | null;
  full_name: string;
  instagram: string;
  whatsapp: string;
  years_experience: string;
  seniority: string;
  operations_worked: string;
  niches: string;
  specialty: string;
  results_brought: string;
  books_read: string;
  top_copywriters: string;
  recommended_by: string | null;
  answer_unique_mechanism: string;
  answer_superstructure: string;
  answer_offer_block: string;
  portfolio_url: string;
  opportunity_preference: OpportunityPreference;
  free_space: string | null;
  status: CopyApplicationStatus;
  internal_rating: number | null;
  internal_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  completion_time_seconds: number | null;
};

export function statusBadgeClasses(status: CopyApplicationStatus): string {
  switch (status) {
    case 'new':
      return 'bg-[#E8E3D8]/10 text-[#E8E3D8] border border-[#E8E3D8]/30';
    case 'reviewing':
      return 'bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/30';
    case 'shortlist':
      return 'bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30';
    case 'test-sent':
      return 'bg-[#E8E3D8]/5 text-[#A3A3A3] border border-[#2A2A2A]';
    case 'rejected':
      return 'bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/30';
    case 'hired':
      return 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/50';
    default:
      return 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#2A2A2A]';
  }
}

export function statusLabel(status: CopyApplicationStatus): string {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
}

export function seniorityLabel(value: string): string {
  return SENIORITY_OPTIONS.find((s) => s.value === value)?.label ?? value;
}

export function opportunityLabel(value: OpportunityPreference): string {
  if (!value) return '—';
  return OPPORTUNITY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function formatCompletionTime(seconds: number | null): string {
  if (!seconds || seconds < 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}
