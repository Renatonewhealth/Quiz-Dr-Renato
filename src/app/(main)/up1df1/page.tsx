'use client';

import Script from 'next/script';

export default function Up1df1Page() {
  return (
    <main className="min-h-screen bg-white">
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a831d133d35c6f447f76ce5/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/6a831d0ae207630621c71d6d/main.m3u8" as="fetch" />
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
          background: linear-gradient(90deg, #2ec6a8 0%, #2ec6a8 40%, #5dd9c0 50%, #2ec6a8 60%, #2ec6a8 100%);
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
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            ESPERA! Não saia desta página, seu pedido ainda está sendo processado…
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Para finalizar todas as etapas e confirmar seu pedido, assista o vídeo abaixo para entender como{' '}
            <strong className="text-gray-900">ACELERAR MUITO</strong> os seus resultados com o nosso protocolo.
          </p>
        </section>

        {/* VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-6a831d133d35c6f447f76ce5" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a831d133d35c6f447f76ce5/v4/player.js"
            strategy="afterInteractive"
          />
        </section>

        {/* Imagem do produto com one-click buy - escondida até delay */}
        <section className="px-4 py-8 esconder">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center">
                  <a href="#" payt_action="oneclick_buy" data-object="RVDMPJ-RAKA8Y" style="display: block; margin: 0 auto; width: 78%; max-width: 340px; padding: 20px 24px; background: #16a34a; color: #ffffff; text-align: center; font-size: 22px; font-weight: 800; letter-spacing: 0.02em; border-radius: 12px; box-shadow: 0 6px 20px rgba(22,163,74,0.35); text-decoration: none; text-transform: uppercase;">
                    EU QUERO APROVEITAR!
                  </a>
                  <select payt_element='installment' style='display: none' data-object='RVDMPJ-RAKA8Y'></select>
                </div>
              `
            }}
          />
          <Script
            src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
            strategy="afterInteractive"
          />
          <a href="/dws1df1" className="block text-center text-xs sm:text-sm text-gray-400 hover:text-gray-600 mt-5 underline underline-offset-2 decoration-1 transition-colors">
            Não quero aproveitar essa oportunidade e sei que ela nunca mais voltará.
          </a>
        </section>

        {/* Script de delay - libera elementos após 250s */}
        <Script id="vturb-delay" strategy="afterInteractive">
          {`
            var delaySeconds = 250;
            var player = document.querySelector("vturb-smartplayer");
            player.addEventListener("player:ready", function() {
              player.displayHiddenElements(delaySeconds, [".esconder"], {
                persist: true
              });
            });
          `}
        </Script>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
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
