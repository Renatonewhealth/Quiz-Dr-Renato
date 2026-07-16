'use client';

import Image from 'next/image';
import Script from 'next/script';

/**
 * VSL do teste de lead — destino pós-quiz de quem entra por /vsl-lead-test.
 *
 * Clone da /resultado4 (mesma estrutura, mesma oferta 6/3/2 kits, mesmos
 * checkouts, mesmo hero), trocando APENAS o player: no lugar do vídeo fixo
 * entra o A/B test do vturb, que sorteia 1 dos 4 vídeos (LEAD 02..05, 25%
 * cada) e mantém a escolha sticky no localStorage.
 *
 * O vídeo sorteado é carimbado como `utm_vsl_lead=lead2..lead5` na URL da
 * página e nos links de checkout, pra a venda ser atribuída ao vídeo que a
 * gerou. Convive com o ScreenParamTracker global (que carimba src/utm_screen):
 * os dois reconstroem o href a partir do atual, então um preserva o param do
 * outro, em qualquer ordem.
 *
 * DELAY (o pulo do gato): cada vídeo revela a oferta num tempo diferente, e o
 * A/B só resolve qual vídeo tocar no cliente — ou seja, não dá pra fixar o
 * tempo no HTML. O script do vturb, ao montar o player sorteado, reescreve o
 * id do elemento (`ab-<testId>` → `vid-<videoId>`); é daí que descobrimos, no
 * `player:ready`, qual vídeo caiu, pra aplicar o delay correspondente.
 */

const ACCOUNT = '637f9657-7454-4e03-ad13-ab875efdb78d';
const AB_TEST_ID = '6a58418af83b4a085f48e886';
const AB_PLAYER_JS = `https://scripts.converteai.net/${ACCOUNT}/ab-test/${AB_TEST_ID}/player.js`;

/**
 * Os 4 vídeos do A/B, por id do vturb. Os ids batem com os `children` do teste.
 * - `lead`: identifica o vídeo — vira o `utm_vsl_lead` (URL + checkout) e o
 *   parâmetro do evento do Meta.
 * - `delay`: segundo do vídeo em que a oferta é revelada.
 */
const VIDEOS: Record<string, { lead: string; delay: number }> = {
  '6a58036ac3616d0e16235cd5': { lead: 'lead2', delay: 2480 }, // LEAD 02 — 41:20
  '6a57ffdb17bed20d33140eb0': { lead: 'lead3', delay: 2380 }, // LEAD 03 — 39:40
  '6a57fe88b226c5769c89c9f6': { lead: 'lead4', delay: 2313 }, // LEAD 04 — 38:33
  '6a58054c1e088827f6082637': { lead: 'lead5', delay: 2317 }, // LEAD 05 — 38:37
};

/** Param que carrega o vídeo sorteado até o checkout. */
const UTM_PARAM = 'utm_vsl_lead';

/**
 * Se o vídeo sorteado não for reconhecido, usa o MAIOR delay: revelar tarde
 * demais custa alguns minutos de espera; revelar cedo demais entrega a oferta
 * antes da virada de chave do vídeo.
 */
const FALLBACK_DELAY = Math.max(...Object.values(VIDEOS).map((v) => v.delay));

export default function VslLeadTestVslPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Meta Pixel + view da página (dispara de dentro do script, sem depender
          do timing do React — igual às demais páginas de resultado). */}
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
          fbq('trackCustom', 'VslLeadTestView', {experimento: 'vsl-lead-test'});
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

      {/* Vturb Preloads — sem preload do m3u8: o vídeo só é sorteado no cliente. */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href={AB_PLAYER_JS} as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://m3u8.vturb.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <style jsx global>{`
        @keyframes pulse-scale {
          0%, 100% { transform: rotate(30deg) scale(1); }
          50% { transform: rotate(30deg) scale(1.08); }
        }
        .tarja-pulse {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
        .esconder {
          display: none;
        }
      `}</style>
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* 1. Hero Image */}
        <section className="w-full pt-4 px-4 pb-1">
          <div className="relative w-full aspect-video">
            <Image
              src="/images/hero-resultado-julho2026.png"
              alt="Resultado do Quiz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* 2. Headline Principal */}
        <section className="px-4 pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#b91c1c] leading-tight">
            RESULTADO: ALTAS CHANCES DE SÍNDROME PARASITÁRIA
          </h1>
        </section>

        {/* 3. Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Assista o vídeo abaixo para descobrir como eliminar esses invasores do seu corpo de forma{' '}
            <strong className="text-gray-900">100% natural</strong> nos próximos{' '}
            <strong className="text-gray-900">60 dias</strong> e emagrecer até{' '}
            <strong className="text-gray-900">3kg por semana</strong>, antes que esse vídeo saia do ar.
          </p>
        </section>

        {/* 4. VSL Player - Vturb A/B test (sorteia LEAD 02..05) */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="ab-${AB_TEST_ID}" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>`
            }}
          />
          <Script src={AB_PLAYER_JS} strategy="afterInteractive" />
          {/* Resolve o vídeo sorteado → delay da oferta + utm_vsl_lead (URL e checkout) */}
          <Script id="vturb-video" strategy="afterInteractive">
            {`
              (function(){
                var VIDEOS = ${JSON.stringify(VIDEOS)};
                var CHECKOUT_SELECTOR = 'a[href*="checkout.payt.com.br"]';
                var lead = null;
                var alreadyInitialized = false;

                function stampLink(a) {
                  if (!lead || !a || !a.href) return;
                  try {
                    var url = new URL(a.href);
                    url.searchParams.set('${UTM_PARAM}', lead);
                    a.href = url.toString();
                  } catch (e) { /* ignore */ }
                }

                // Re-carimba no clique (capture, antes da navegação) — cobre link
                // re-renderizado ou inserido depois do carimbo inicial.
                document.addEventListener('click', function(event) {
                  var target = event.target;
                  var link = target && target.closest ? target.closest(CHECKOUT_SELECTOR) : null;
                  if (link) stampLink(link);
                }, true);

                document.addEventListener('player:ready', function(event) {
                  if (alreadyInitialized) return;
                  var detail = event.detail || {};
                  var player = detail.player
                    || document.querySelector('vturb-smartplayer[id^="vid-"]')
                    || document.querySelector('vturb-smartplayer');
                  if (!player || typeof player.displayHiddenElements !== 'function') return;
                  alreadyInitialized = true;
                  // O A/B renomeia o elemento pra vid-<videoId> ao montar o sorteado.
                  var videoId = String(player.id || '').replace(/^vid-/, '');
                  var video = VIDEOS[videoId];
                  if (!video) {
                    console.warn('[vsl-lead-test] video fora do mapa:', videoId, '- delay de seguranca', ${FALLBACK_DELAY});
                  }
                  player.displayHiddenElements(video ? video.delay : ${FALLBACK_DELAY}, ['.esconder'], { persist: true });
                  // Vídeo desconhecido: sem carimbo, pra não atribuir a venda ao lead errado.
                  if (!video) return;
                  lead = video.lead;
                  // URL da própria página (validação a olho na barra de endereço).
                  try {
                    var pageUrl = new URL(window.location.href);
                    pageUrl.searchParams.set('${UTM_PARAM}', lead);
                    window.history.replaceState(null, '', pageUrl.toString());
                  } catch (e) { /* ignore */ }
                  // Checkouts já na página (ficam no DOM desde o load, mesmo escondidos).
                  var links = document.querySelectorAll(CHECKOUT_SELECTOR);
                  for (var i = 0; i < links.length; i++) stampLink(links[i]);
                  if (typeof window.fbq === 'function') {
                    window.fbq('trackCustom', 'VslLeadTestVideo', { video: lead, experimento: 'vsl-lead-test' });
                  }
                });
              })();
            `}
          </Script>
        </section>

        {/* 5. Provas Sociais - 3 Imagens (escondidas até o delay do vídeo) */}
        <section className="esconder px-4 py-8 space-y-4">
          {/* Imagem 1 - 6 Kits */}
          <a href="https://checkout.payt.com.br/ac08e08784826ab14a9615a73789c357?split=12" className="block w-[78%] mx-auto relative">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/6-kits-v2.png"
                alt="Kit com 6 unidades"
                fill
                className="object-cover"
              />
            </div>
            {/* Tarja diagonal */}
            <div className="tarja-pulse absolute top-2 -right-3 bg-green-500 text-white text-[10px] font-bold py-1 px-4 shadow-lg">
              MAIS ESCOLHIDO
            </div>
          </a>

          {/* Imagem 2 - 3 Kits */}
          <a href="https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de?split=12" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/3-kits-v2.png"
                alt="Kit com 3 unidades"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* Imagem 3 - 2 Kits */}
          <a href="https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12#" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/2-kits-v2.png"
                alt="Kit com 2 unidades"
                fill
                className="object-cover"
              />
            </div>
          </a>
          {/* Disclaimer termos */}
          <p className="text-xs text-gray-400 text-center pt-2 pb-4">
            Ao comprar qualquer um dos kits Desparafit você concorda com os{' '}
            <a href="/termos-de-uso" className="underline hover:text-gray-600">termos de uso</a> da H9 Pharma.
          </p>
        </section>
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
