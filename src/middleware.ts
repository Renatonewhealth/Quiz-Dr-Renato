import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import {
  findExperimentForEntry,
  pickVariant,
  findVariantById,
  experimentCookieName,
} from '@/lib/experiments';

const DEFAULT_EXPERIMENT_TTL_SECONDS = 30 * 24 * 60 * 60;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================
  // 1) A/B TEST: rewrite via cookie sticky
  //    Suporta qualquer entry configurado no admin /admin/experiments
  // ============================================
  const experiment = await findExperimentForEntry(pathname);
  if (experiment) {
    const cookieName = experimentCookieName(experiment.slug);
    const existingVariantId = request.cookies.get(cookieName)?.value;

    let variant = existingVariantId
      ? findVariantById(experiment, existingVariantId)
      : null;

    if (!variant) {
      variant = pickVariant(experiment);
    }

    const url = request.nextUrl.clone();
    url.pathname = variant.path;
    const res = NextResponse.rewrite(url);

    const maxAge =
      experiment.cookieMaxAgeSeconds ?? DEFAULT_EXPERIMENT_TTL_SECONDS;

    res.cookies.set(cookieName, variant.id, {
      maxAge,
      path: '/',
      sameSite: 'lax',
    });
    res.cookies.set('tr_variant', `${experiment.slug}:${variant.id}`, {
      maxAge,
      path: '/',
      sameSite: 'lax',
    });

    return res;
  }

  // ============================================
  // 2) ADMIN: auth guard (Supabase Auth)
  // ============================================
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !user
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (user && pathname.startsWith('/admin')) {
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!adminData && !pathname.startsWith('/admin/login')) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  // Matcher amplo: roda em qualquer rota EXCETO _next, api/track (tracking
  // não deve passar pelo middleware), api/, images, favicon, etc.
  // Isso permite que qualquer entry path configurado no admin funcione
  // sem precisar redeploy.
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon.ico|images/|fonts/|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf|map)$).*)',
  ],
};
