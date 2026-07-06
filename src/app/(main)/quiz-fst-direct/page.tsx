'use client';

import { useState } from 'react';
import Script from 'next/script';
import QuizPage from '../detectordeinvasores/page';

/**
 * Variante "SEM primeira tela" do teste /quiz-fst: abre DIRETO no quiz.
 * O middleware reescreve `/quiz-fst` → `/quiz-fst-direct` pra ~metade do
 * tráfego (cookie tr_variant = quiz-fst:direct).
 *
 * - Define `quiz_source = quiz-fst:direct` via useState init (roda no render,
 *   ANTES do quiz montar) — assim o funil é taggeado como `quiz-fst:direct`
 *   no dashboard e o quiz roteia pra VSL 2 (mesma da tela vencedora).
 * - Inclui o Pixel da Meta (o quiz não tem): PageView + QuizView — pra a
 *   Meta medir/otimizar esta variante igual à com tela.
 */
export default function QuizFstDirectPage() {
  // Roda uma vez no render do pai, antes do QuizPage (filho) montar.
  useState(() => {
    try {
      sessionStorage.setItem('quiz_source', 'quiz-fst:direct');
    } catch {
      /* ignore */
    }
    return null;
  });

  return (
    <>
      {/* Meta Pixel Code */}
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
          fbq('trackCustom', 'QuizView', {variante: 'semtela', experimento: 'quiz-fst'});
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

      <QuizPage />
    </>
  );
}
