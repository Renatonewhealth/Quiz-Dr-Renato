import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Função para verificar se as credenciais são válidas
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Cliente público (para uso no cliente - compatibilidade com código existente)
export const supabase: SupabaseClient | null = 
  isValidUrl(supabaseUrl) && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Cliente com service role key para operações do servidor
export const supabaseAdmin: SupabaseClient | null = 
  isValidUrl(supabaseUrl) && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

// Cliente para browser com suporte a SSR (para admin dashboard)
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Função helper para verificar se o Supabase está configurado
export const isSupabaseConfigured = (): boolean => {
  return supabaseAdmin !== null;
};
