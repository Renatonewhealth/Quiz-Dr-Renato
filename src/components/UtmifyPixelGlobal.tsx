'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

/**
 * Pixel padrão da Utmify das páginas do grupo (main).
 *
 * POR QUE ISSO NÃO É SÓ UM <Script> NO LAYOUT: algumas páginas carregam o
 * próprio pixel da Utmify, com um pixelId específico daquele produto. Como o
 * script da Utmify se configura por uma global (window.pixelId), ter os dois
 * na mesma página cria uma corrida: o segundo a rodar sobrescreve o pixelId do
 * primeiro, e as duas instâncias acabam reportando para o mesmo id — o que
 * inviabiliza a atribuição dos dois lados.
 *
 * Então a regra é simples: nas rotas abaixo, o pixel genérico não entra.
 */

const PIXEL_PADRAO = '69badc4635d947be06ab5e3c';

/** Rotas que declaram o próprio pixel da Utmify dentro da página. */
const ROTAS_COM_PIXEL_PROPRIO = new Set(['/korean', '/jejumtermogenico']);

export default function UtmifyPixelGlobal() {
  const pathname = usePathname();

  if (pathname && ROTAS_COM_PIXEL_PROPRIO.has(pathname)) return null;

  return (
    <Script id="utmify-pixel" strategy="afterInteractive">
      {`
        window.pixelId = "${PIXEL_PADRAO}";
        var a = document.createElement("script");
        a.setAttribute("async", "");
        a.setAttribute("defer", "");
        a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
        document.head.appendChild(a);
      `}
    </Script>
  );
}
