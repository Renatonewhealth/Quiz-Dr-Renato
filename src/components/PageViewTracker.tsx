'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track, setupUnloadFlush } from '@/lib/tracker';

/**
 * Dispara um page_view por mudança de pathname. Roda no layout raiz,
 * cobrindo todas as páginas (com ou sem route group).
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const initRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      setupUnloadFlush();
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    track('page_view', { page_slug: pathname });
  }, [pathname]);

  return null;
}
