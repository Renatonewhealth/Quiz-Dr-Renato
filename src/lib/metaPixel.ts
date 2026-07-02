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
  params?: Record<string, unknown>,
  _attempt = 0
): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.fbq === 'function') {
      // Quando o fbq existe, o init já rodou (é síncrono no snippet), então
      // o trackCustom fica corretamente associado ao pixel.
      window.fbq('trackCustom', eventName, params);
      return;
    }
  } catch {
    /* no-op: nunca quebrar a página por causa de tracking */
  }
  // fbq ainda não carregou (Script afterInteractive em carregamento). Sem
  // isso, eventos disparados no mount (ex.: TelaView) se perdiam. Tenta de
  // novo por até ~5s.
  if (_attempt < 50) {
    setTimeout(() => metaTrackCustom(eventName, params, _attempt + 1), 100);
  }
}
