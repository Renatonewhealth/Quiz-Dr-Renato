'use client';

import Script from 'next/script';

/**
 * VSL do Jejum Termogênico.
 *
 * Sem headline: a página abre direto no vídeo.
 *
 * O delay do botão veio do próprio player do vturb: o config inline do
 * player.js traz "pitchTime: 2310", ou seja, a oferta é revelada aos
 * 2310s (38:30) de um vídeo de 47:31.
 *
 * O botão leva direto ao checkout da Payt (venda de front, não one-click).
 */
export default function JejumTermogenicoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Vturb preloads (velocidade) */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6aa86802b4c7be6a45f1c5aa/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/6aa867de26cf3bbdbaae3ea1/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <style jsx global>{`
        .esconder {
          display: none;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* VSL Player - Vturb */}
        <section className="w-full pt-6 sm:pt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-6aa86802b4c7be6a45f1c5aa" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6aa86802b4c7be6a45f1c5aa/v4/player.js"
            strategy="afterInteractive"
          />
          {/* Delay: revela o botão aos 2310s (38:30), o pitchTime do player */}
          <Script id="vturb-delay" strategy="afterInteractive">
            {`
              (function () {
                var alreadyInitialized = false;
                document.addEventListener('player:ready', function (event) {
                  if (alreadyInitialized) return;
                  var detail = event.detail || {};
                  var player = detail.player || document.querySelector('vturb-smartplayer');
                  if (!player || typeof player.displayHiddenElements !== 'function') return;
                  alreadyInitialized = true;

                  var alvo = document.getElementById('oferta');
                  var estavaOculto = alvo && getComputedStyle(alvo).display === 'none';

                  // Quando o botão aparecer, rola suavemente até ele. Só na
                  // primeira vez: se o vturb já revelou por persist (recarga da
                  // página depois do pitch), rolar seria um pulo sem motivo.
                  if (alvo && estavaOculto) {
                    var observer = new MutationObserver(function () {
                      if (getComputedStyle(alvo).display !== 'none') {
                        observer.disconnect();
                        setTimeout(function () {
                          alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 400);
                      }
                    });
                    observer.observe(alvo, { attributes: true, attributeFilter: ['class', 'style'] });
                  }

                  player.displayHiddenElements(2310, ['.esconder'], { persist: true });
                });
              })();
            `}
          </Script>
        </section>

        {/* Botão — escondido até o pitch */}
        <section id="oferta" className="esconder px-4 py-8">
          <a
            href="https://checkout.payt.com.br/caa983a409a5baabc26fa567def360f8?split=12"
            className="mx-auto block w-full max-w-[400px] rounded-xl bg-[#ea580c] px-6 py-5 text-center text-2xl font-black uppercase tracking-wide text-white shadow-[0_6px_24px_rgba(234,88,12,0.4)] transition-colors hover:bg-[#c2410c]"
          >
            EU QUERO
          </a>

          <p className="mt-5 text-center text-xs text-gray-400">
            Ao comprar você concorda com os{' '}
            <a href="/termos-de-uso" className="underline hover:text-gray-600">
              termos de uso
            </a>{' '}
            da H9 Pharma.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-6 text-white">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-3 text-center">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 transition-colors hover:text-white">
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 transition-colors hover:text-white">
                Política de Privacidade
              </a>
            </div>
            <p className="text-sm text-gray-400">Dr. Renato Silveira Reis x H9 Pharma</p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
