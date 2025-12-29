export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ZApiResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface SupabaseLeadResponse {
  id: string;
  created_at: string;
}

