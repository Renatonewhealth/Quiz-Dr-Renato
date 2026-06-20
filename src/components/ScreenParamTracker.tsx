'use client';

import { useEffect } from 'react';

/**
 * Propaga a tela do teste `/quiz-fst` até o checkout da Payt como `utm_screen`,
 * pra que a VENDA seja atribuída à variação de primeira página na Payt/UTMify.
 *
 * Como funciona: a tela é decidida no `/quiz-fst` e gravada no cookie sticky
 * `tr_variant = quiz-fst:tN` (válido ~30 dias, path '/', então segue o
 * visitante pelo funil inteiro). Aqui lemos esse cookie e carimbamos
 * `utm_screen=tN` em todo link `checkout.payt.com.br` — no carregamento e no
 * clique (capture), cobrindo links que aparecem depois (ex.: botão da VSL).
 *
 * Só carimba visitantes do experimento `quiz-fst` (prefixo do cookie). Quem
 * vem de outra origem não tem o cookie e não é afetado.
 *
 * Limitação conhecida: botões de compra gerados pelo one-click script da Payt
 * (`multiple-oneclickbuyscript`) não são links <a>, então não recebem o
 * carimbo — cobre os links de checkout normais (oferta principal).
 */

const PARAM = 'utm_screen';
const EXPERIMENT_PREFIX = 'quiz-fst:';
const CHECKOUT_RE = /checkout\.payt\.com\.br/i;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(name + '='));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/** Resolve o valor da tela (t1..t4) pra esta sessão, ou null. */
function resolveScreen(): string | null {
  if (typeof window === 'undefined') return null;
  // 1) Já veio explícito na URL? respeita.
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
    if (fromUrl) return fromUrl;
  } catch {
    /* ignore */
  }
  // 2) Cookie sticky do experimento quiz-fst (`quiz-fst:tN`).
  const variant = readCookie('tr_variant');
  if (variant && variant.startsWith(EXPERIMENT_PREFIX)) {
    const screen = variant.slice(EXPERIMENT_PREFIX.length);
    if (screen) return screen;
  }
  return null;
}

/** Acrescenta utm_screen na URL do checkout, sem sobrescrever se já existir. */
function stampUrl(rawHref: string, screen: string): string {
  try {
    const url = new URL(rawHref);
    if (!url.searchParams.has(PARAM)) {
      url.searchParams.set(PARAM, screen);
    }
    return url.toString();
  } catch {
    return rawHref;
  }
}

export default function ScreenParamTracker() {
  useEffect(() => {
    const screen = resolveScreen();
    if (!screen) return;

    // Carimba os links de checkout já presentes na página.
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    anchors.forEach((a) => {
      if (a.href && CHECKOUT_RE.test(a.href)) {
        a.href = stampUrl(a.href, screen);
      }
    });

    // Carimba no clique (capture) — garante o href atualizado antes da
    // navegação e pega links inseridos dinamicamente.
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (anchor && anchor.href && CHECKOUT_RE.test(anchor.href)) {
        anchor.href = stampUrl(anchor.href, screen);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
