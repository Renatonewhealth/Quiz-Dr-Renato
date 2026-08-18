'use client';

import Image from 'next/image';
import Script from 'next/script';
import OneKitUpsellLink from '@/components/OneKitUpsellLink';

/**
 * VSL de lead (vídeo único — LEAD 03, vencedor do A/B):
 *
 *   form-quiz (externo, do cliente) → /vsl-lead-test → checkout
 *
 * O quiz não vive mais neste repo: o cliente está subindo um form-quiz que
 * integra com esta página. Por isso a rota abre direto (não passa mais pelo
 * /detectordeinvasores).
 *
 * ABERTURA: tarja de saúde + alerta + headline principal — réplica da Tela 2,
 * vencedora do teste `/quiz-fst`. A oferta (kits 3/2/1, com modal de upsell
 * no 1 kit) e os checkouts da Payt são os mesmos da /resultado2.
 *
 * O A/B dos 4 vídeos (LEAD 02..05) e o carimbo de `utm_vsl_lead=leadN`
 * foram removidos: 100% do tráfego vê o LEAD 03 e a oferta é revelada
 * sempre aos 2380s (39:40).
 */

const VIDEO_ID = '6a5994a6822afd5dc0f4b534'; // LEAD 03
const PLAYER_JS = `https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/${VIDEO_ID}/v4/player.js`;
const M3U8 = 'https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/6a5991c4540ac3c658934862/main.m3u8';
const DELAY_SECONDS = 2380;

export default function VslLeadTestPage() {
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

      {/* Vturb Preloads */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href={PLAYER_JS} as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href={M3U8} as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
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
      {/* Tarja de saúde — header editorial estilo G1 (réplica da Tela 2).
          Estática de propósito: na Tela 2 ela é sticky, mas aqui o vídeo é a
          página inteira e uma tarja fixa comeria altura durante a VSL. */}
      <header className="w-full bg-[#dc2626] h-[56px] sm:h-[64px] flex items-center justify-between px-4 sm:px-6 shadow-md">
        <button
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">
            Menu
          </span>
        </button>

        <span className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase">
          SAÚDE
        </span>

        <button
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          aria-label="Buscar"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">
            Buscar
          </span>
        </button>
      </header>

      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* VSL Player - Vturb (LEAD 03). Sem headline/subheadline — a página
            abre direto no vídeo, logo abaixo da tarja SAÚDE. */}
        <section className="w-full pt-6 sm:pt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="vid-${VIDEO_ID}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`
            }}
          />
          <Script src={PLAYER_JS} strategy="afterInteractive" />
          {/* Delay: revela a oferta aos 2380s (39:40) do vídeo */}
          <Script id="vturb-delay" strategy="afterInteractive">
            {`
              var delaySeconds = ${DELAY_SECONDS};
              var player = document.querySelector("vturb-smartplayer");
              if (player) {
                player.addEventListener("player:ready", function() {
                  player.displayHiddenElements(delaySeconds, [".esconder"], { persist: true });
                });
              }
            `}
          </Script>
        </section>

        {/* 5. Oferta - kits 3/2/1, igual /resultado2 (escondida até o delay do vídeo) */}
        <section className="esconder px-4 py-8 space-y-4">
          {/* Imagem 1 - 3 Kits */}
          <a href="https://checkout.payt.com.br/f10ff63253de29940cf16f2417a650d1?split=12" className="block w-[78%] mx-auto relative">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/3-kits.png"
                alt="Kit com 3 unidades"
                fill
                className="object-cover"
              />
            </div>
            {/* Tarja diagonal */}
            <div className="tarja-pulse absolute top-2 -right-3 bg-green-500 text-white text-[10px] font-bold py-1 px-4 shadow-lg">
              MAIS ESCOLHIDO
            </div>
          </a>

          {/* Imagem 2 - 2 Kits */}
          <a href="https://checkout.payt.com.br/347c606174b1f521c75e256ebd788ebb?split=12" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/2-kits.png"
                alt="Kit com 2 unidades"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* Imagem 3 - 1 Kit (com upsell modal) */}
          <OneKitUpsellLink
            href="https://checkout.payt.com.br/d8a36e0ea596a3575c6d3430e3695422?split=12"
            promoHref="https://checkout.payt.com.br/347c606174b1f521c75e256ebd788ebb?split=12&coupon=PRESENTE#"
            className="block w-[78%] mx-auto"
          >
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/1-kit.png"
                alt="Kit com 1 unidade"
                fill
                className="object-cover"
              />
            </div>
          </OneKitUpsellLink>
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
