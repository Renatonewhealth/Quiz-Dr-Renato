'use client';

import Script from 'next/script';

/**
 * Pixel da Meta + evento de VIEW por página de resultado (teste de kit/preço).
 * Dispara de DENTRO do script (garantido, sem depender do React/timing), com
 * um nome de evento distinto por página, pra contar as views direto no
 * Gerenciador de Eventos:
 *   /resultado2 → Resultado2View
 *   /resultado3 → Resultado3View
 *   /resultado4 → Resultado4View
 */
const EVENT_BY_ID: Record<string, string> = {
  resultado2: 'Resultado2View',
  resultado3: 'Resultado3View',
  resultado4: 'Resultado4View',
};

export default function ResultadoMetaPixel({
  id,
}: {
  id: 'resultado2' | 'resultado3' | 'resultado4';
}) {
  const event = EVENT_BY_ID[id];
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '779808241546807');
          fbq('track', 'PageView');
          fbq('trackCustom', '${event}', {preco: '${id}', experimento: 'preco'});
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=779808241546807&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
