// Types para Dashboard Admin

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export interface LeadWithResponses {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  total_score: number;
  risk_level: string;
  created_at: string;
  responses?: QuizResponseDetail[];
}

export interface QuizResponseDetail {
  question_id: number;
  question_text: string;
  selected_option: string;
  option_score: number;
}

export interface AnalyticsData {
  totalLeads: number;
  qualifiedLeads: number;
  nonQualifiedLeads: number;
  conversionRate: number;
  leadsPerDay: LeadPerDay[];
  dropoffByQuestion: DropoffData[];
  qualificationSplit: QualificationSplit;
}

export interface LeadPerDay {
  date: string;
  count: number;
}

export interface DropoffData {
  question_id: number;
  completed: number;
  percentage: number;
}

export interface QualificationSplit {
  qualified: number;
  nonQualified: number;
  qualifiedPercentage: number;
  nonQualifiedPercentage: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

export interface KPIData {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface LeadsTableProps {
  leads: LeadWithResponses[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
}

export interface QuizSession {
  id: string;
  session_id: string;
  started_at: string;
  last_question: number;
  completed: boolean;
  lead_id: string | null;
}

