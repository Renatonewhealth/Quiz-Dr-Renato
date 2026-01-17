import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Criar client Supabase para Server Components (App Router)
 * Usa cookies para manter sessão do usuário
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignorar erro em Server Components (read-only)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ignorar erro em Server Components (read-only)
          }
        },
      },
    }
  );
}

/**
 * Verificar se usuário está autenticado
 * Retorna os dados do usuário ou null
 */
export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  // Verificar se é admin
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (!adminData) {
    return null;
  }
  
  return {
    ...user,
    full_name: adminData.full_name,
  };
}

/**
 * Verificar se request tem usuário autenticado
 * Usado em API routes
 */
export async function verifyAuth() {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return {
      authenticated: false,
      user: null,
      error: 'Não autenticado',
    };
  }
  
  return {
    authenticated: true,
    user,
    error: null,
  };
}

/**
 * Fazer logout
 */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}



