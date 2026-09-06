'use client';

import Image from 'next/image';
import Script from 'next/script';

/**
 * VSL do Korean — vturb (LEAD 6a9c1f3a…) + kits 6/3/2 com checkout Payt + FAQ.
 *
 * Sem delay configurado por enquanto: kits ficam visíveis do load. Pra
 * revelar só aos N segundos do vídeo, adicionar `esconder` na section dos
 * kits + <Script> com `player:ready` chamando
 * player.displayHiddenElements(<delay>, ['.esconder'], {persist:true}).
 */
export default function KoreanPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Vturb preloads (velocidade) */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a9c1f3a1097df473488f3a7/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/6a9c1efbbd07ff5ac8bedac6/main.m3u8" as="fetch" />
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
        {/* ====================================================================
            1. VSL PLAYER - Vturb (LEAD 6a9c1f3a...)
        ==================================================================== */}
        <section className="w-full pt-6 sm:pt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-6a9c1f3a1097df473488f3a7" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a9c1f3a1097df473488f3a7/v4/player.js"
            strategy="afterInteractive"
          />
          {/* Delay: revela kits + FAQ aos 3208s (53:28) do video +
              auto-scroll suave pros kits quando aparecer (so na primeira
              vez, nao no reload persist) */}
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

                  var kits = document.getElementById('kits');
                  var wasHidden = kits && getComputedStyle(kits).display === 'none';

                  if (kits && wasHidden) {
                    var observer = new MutationObserver(function () {
                      if (getComputedStyle(kits).display !== 'none') {
                        observer.disconnect();
                        setTimeout(function () {
                          kits.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 400);
                      }
                    });
                    observer.observe(kits, { attributes: true, attributeFilter: ['class', 'style'] });
                  }

                  player.displayHiddenElements(3208, ['.esconder'], { persist: true });
                });
              })();
            `}
          </Script>
        </section>

        {/* ====================================================================
            2. KITS — 6 / 3 / 2 (imagens ja com botao "EU QUERO" embutido).
            Escondidos ate 3208s do video (script de delay acima).
        ==================================================================== */}
        <section id="kits" className="esconder px-4 py-8 space-y-4">
          {/* Kit 1 - 6 Kits (mais escolhido) */}
          <a href="https://checkout.payt.com.br/4124ea70640414fd58d7cf15b3bd65fc?split=12" className="block w-[70%] max-w-[340px] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-6-kits.png"
                alt="6 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          {/* Kit 2 - 3 Kits */}
          <a href="https://checkout.payt.com.br/4d68b4af57b565253f59317b45f1a628?split=12" className="block w-[70%] max-w-[340px] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-3-kits.png"
                alt="3 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          {/* Kit 3 - 2 Kits */}
          <a href="https://checkout.payt.com.br/6d70ea89a5c1f26e3e9d09ee960b8107?split=12" className="block w-[70%] max-w-[340px] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-2-kits.png"
                alt="2 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          <p className="text-xs text-gray-400 text-center pt-2 pb-4">
            Ao comprar você concorda com os{' '}
            <a href="/termos-de-uso" className="underline hover:text-gray-600">
              termos de uso
            </a>{' '}
            da H9 Pharma.
          </p>
        </section>

        {/* ====================================================================
            3. FAQ — escondido junto com os kits ate 3208s do video.
        ==================================================================== */}
        <section className="esconder px-4 pt-6 pb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-gray-900 mb-8 tracking-tight">
            FAQ
          </h2>

          <div className="space-y-3">
            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Em quanto tempo eu vou ver resultado?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Os primeiros sinais aparecem já nas primeiras semanas: rosto
                  desinchando de manhã, pele menos ressecada, brilho voltando.
                </p>
                <p>
                  Em 60 dias você já enxerga mudanças claras no espelho. A
                  transformação mais profunda, firmeza voltando e contorno se
                  levantando, é o colágeno sendo remontado, e isso acontece ao
                  longo de alguns meses.
                </p>
                <p>
                  Por isso eu recomendo o tratamento completo. E o app te
                  acompanha o tempo todo, pra você não ficar no escuro.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Posso usar o Korean Kit junto com meus remédios e meu skincare?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Pode. O pó é feito de ingredientes naturais e o Sérum
                  Antiaging encaixa na sua rotina normalmente, junto com o que
                  você já usa.
                </p>
                <p>
                  Se você toma alguma medicação controlada, está grávida ou
                  amamentando, vale avisar seu médico antes de começar. Não
                  porque vá te fazer mal, mas porque nesses casos é sempre o
                  cuidado certo.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  E se eu não mudar nada na minha rotina? Funciona mesmo só com o kit?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Funciona. O Korean Kit não depende de você virar sua vida do
                  avesso, porque age na raiz do problema, lá no intestino, e
                  não só na superfície.
                </p>
                <p>
                  Bons hábitos ajudam, claro, e é pra isso que você recebe os
                  dois protocolos de bônus. Mas o kit foi feito pra trabalhar
                  na causa, com ou sem rotina perfeita.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  É seguro? Tem efeito colateral?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed">
                <p>
                  É seguro e não tem efeitos colaterais. Os ingredientes são
                  naturais, e a fórmula é produzida pela H9 com certificação da
                  ANVISA e boas práticas de fabricação.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Como eu sei que vai funcionar no MEU caso?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Se sua pele perdeu o brilho, se você vê ela flácida, com
                  manchas e rugas aparecendo, e já gastou com creme e
                  procedimento sem nada segurar, as chances de a raiz estar no
                  eixo intestino-pele são altíssimas. Foi exatamente pra isso
                  que o Korean Kit foi feito.
                </p>
                <p>
                  E mesmo assim, se você seguir os dois passos direitinho e não
                  ver diferença, tem a garantia de 60 dias. É só mandar um
                  e-mail e a gente devolve 100%. O risco é todo meu.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Por quanto tempo eu vou precisar usar? Vou depender disso pra sempre?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Não vai depender. O Korean Kit não é remédio, é um tratamento
                  natural que reequilibra o intestino e reconstrói a pele de
                  dentro pra fora. Você faz o tratamento, resolve na raiz, e o
                  resultado se sustenta, principalmente se mantiver os bons
                  hábitos dos protocolos.
                </p>
                <p>
                  Muitas mulheres escolhem continuar depois, não por
                  necessidade, mas porque gostam de manter o intestino em dia,
                  a pele bonita e a disposição. Vira parte da rotina, como um
                  cuidado diário com elas mesmas.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  E a entrega? É seguro comprar pelo site?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Totalmente seguro. O pagamento é processado por uma das
                  maiores empresas de pagamento do país, com a mesma
                  criptografia de banco. Você pode pagar no Pix ou parcelar em
                  até 12x no cartão.
                </p>
                <p>
                  Assim que você confirma, a gente despacha e te manda o código
                  de rastreio. Pra boa parte do Brasil chega em poucos dias;
                  pra regiões mais distantes, um pouquinho mais. Você acompanha
                  cada passo, do nosso depósito até a sua porta.
                </p>
              </div>
            </details>
          </div>

        </section>
      </div>

      {/* ====================================================================
          4. FOOTER — institucional H9
      ==================================================================== */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-4 text-xs">
              <a
                href="/termos-de-uso"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/politica-de-privacidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
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
