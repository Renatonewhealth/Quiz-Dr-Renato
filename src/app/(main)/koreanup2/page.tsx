'use client';

import Script from 'next/script';

/**
 * Upsell 2 do Korean — para quem comprou 6 kits.
 * VSL: vid-6aa0c335c07f91f1f252944c (duração real 5:30 / 330s).
 * Recusa → /koreandwns2 (downsell de +2 kits por R$337).
 *
 * TODO: trocar PAYT_OBJ pelo product id real do Payt (data-object).
 */
export default function KoreanUp2Page() {
  const PAYT_OBJ = 'PAYT-ID-PENDENTE';

  return (
    <main className="min-h-screen bg-white">
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6aa0c335c07f91f1f252944c/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/6aa0c3296ce493f207c250e7/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .loading-bar {
          background: linear-gradient(90deg, #c4448f 0%, #c4448f 40%, #dd6bab 50%, #c4448f 60%, #c4448f 100%);
          background-size: 200% 100%;
          animation: loading 2s linear infinite;
        }
        .esconder {
          display: none;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Loading Bar */}
        <section className="px-4 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="loading-bar h-full rounded-full" style={{ width: '67%' }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">67% concluído</p>
        </section>

        {/* Headline Principal */}
        <section className="px-4 pt-4 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#c4448f] leading-tight">
            ESPERA! Não saia desta página, seu pedido ainda está sendo processado…
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Para finalizar todas as etapas e confirmar seu pedido, assista o vídeo abaixo para entender como{' '}
            <strong className="text-gray-900">ACELERAR MUITO</strong> os seus resultados.
          </p>
        </section>

        {/* VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-6aa0c335c07f91f1f252944c" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6aa0c335c07f91f1f252944c/v4/player.js"
            strategy="afterInteractive"
          />
        </section>

        {/* CTA one-click + opt-out - escondidos até o delay */}
        <section className="px-4 py-8 esconder">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center">
                  <a href="#" payt_action="oneclick_buy" data-object="${PAYT_OBJ}" style="display: block; margin: 0 auto; width: 78%; max-width: 340px; padding: 20px 24px; background: #c4448f; color: #ffffff; text-align: center; font-size: 22px; font-weight: 800; letter-spacing: 0.02em; border-radius: 12px; box-shadow: 0 6px 20px rgba(196,68,143,0.35); text-decoration: none; text-transform: uppercase;">
                    EU QUERO APROVEITAR!
                  </a>
                  <select payt_element='installment' style='display: none' data-object='${PAYT_OBJ}'></select>
                </div>
              `
            }}
          />
          <Script
            src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
            strategy="afterInteractive"
          />
          <a
            href="/koreandwns2"
            className="block text-center text-xs sm:text-sm text-gray-400 hover:text-gray-600 mt-5 underline underline-offset-2 decoration-1 transition-colors"
          >
            NÃO QUERO! E sei que não terei essa oportunidade novamente
          </a>
        </section>

        {/* Script de delay - libera elementos após 250s (VSL tem 5:30) */}
        <Script id="vturb-delay" strategy="afterInteractive">
          {`
            var delaySeconds = 250;
            var player = document.querySelector("vturb-smartplayer");
            if (player) {
              player.addEventListener("player:ready", function() {
                player.displayHiddenElements(delaySeconds, [".esconder"], {
                  persist: true
                });
              });
            }
          `}
        </Script>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
            </div>
            <p className="text-sm text-gray-400">
              Dr. Renato Silveira Reis x H9 Pharma
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
