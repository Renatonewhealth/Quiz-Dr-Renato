'use client';

import { useEffect } from 'react';

/**
 * Escuta cliques em qualquer link/elemento que aponte para o checkout
 * da Payt e salva a URL no localStorage. Assim a página /backredirect
 * consegue mandar a pessoa de volta pro checkout EXATO que ela estava,
 * já que document.referrer não é confiável em navegação "voltar".
 */
export default function CheckoutTracker() {
  useEffect(() => {
    function isPaytCheckout(url: string): boolean {
      return /checkout\.payt\.com\.br\/[A-Za-z0-9]/.test(url);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Procura o <a> mais próximo
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (anchor && anchor.href && isPaytCheckout(anchor.href)) {
        try {
          localStorage.setItem('last_checkout_url', anchor.href);
        } catch {
          /* ignore */
        }
      }
    }

    // Capture phase pra pegar o clique antes de qualquer navegação
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
