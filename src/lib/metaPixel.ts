/**
 * Helper fino pra disparar eventos personalizados no Meta Pixel (fbq).
 *
 * O Pixel base é inicializado no componente da landing (QuizFstLanding),
 * que injeta o snippet padrão do fbq. Aqui só disparamos `trackCustom`
 * com guards: se rodar no servidor ou se o fbq ainda não carregou
 * (adblock, script atrasado), vira no-op silencioso — tracking nunca
 * pode quebrar a página.
 */

type Fbq = (
  command: 'trackCustom' | 'track' | 'init',
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function metaTrackCustom(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, params);
    }
  } catch {
    /* no-op: nunca quebrar a página por causa de tracking */
  }
}
