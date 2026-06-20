'use client';

import Image from 'next/image';
import Script from 'next/script';
import OneKitUpsellLink from '@/components/OneKitUpsellLink';

/**
 * VSL das páginas do teste /quiz-fst-N. É um clone da /resultado2 (mesma
 * estrutura, mesma oferta de 3 kits, mesmos links de checkout da Payt),
 * mudando APENAS o vídeo vturb por página.
 *
 * - O vídeo de cada página é o player vturb informado pelo cliente.
 * - A oferta (`.esconder`) é revelada no mesmo delay que a /resultado2 usa
 *   hoje, via `displayHiddenElements` no evento `player:ready`.
 * - Os links de checkout já saem carimbados com `src=quiz-fst-N`, pra a
 *   venda ser atribuída à página de origem na Payt/UTMify.
 */

const ACCOUNT = '637f9657-7454-4e03-ad13-ab875efdb78d';

// Player vturb por página (códigos enviados pelo cliente).
const VIDEO_BY_PAGE: Record<number, string> = {
  1: '6a3713711601bcc536d852d2',
  2: '6a371386a2ef6a8922e9f931',
  3: '6a371391d33a58bff6e7a39a',
  4: '6a37139ea7c0b52c357daba4',
};

// Preload do stream — igual pros 4 (mesmo dos códigos enviados).
const PRELOAD_M3U8 = `https://cdn.converteai.net/${ACCOUNT}/69bae64bab9c7e1e9b718a03/main.m3u8`;

// Mesmo tempo de revelação da oferta que a /resultado2 usa hoje (segundos).
const OFFER_REVEAL_SECONDS = 2315;

// Links de checkout da Payt (iguais aos da /resultado2).
const CHECKOUT_3KITS = 'https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de?split=12';
const CHECKOUT_2KITS = 'https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12';
const CHECKOUT_1KIT = 'https://checkout.payt.com.br/c11d395593428f094fcb4b279f1ef839?split=12';
const CHECKOUT_2KITS_PROMO = 'https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12&coupon=PRESENTE';

/** Acrescenta src na URL do checkout sem sobrescrever se já existir. */
function withSrc(rawHref: string, src: string): string {
  try {
    const url = new URL(rawHref);
    if (!url.searchParams.has('src')) url.searchParams.set('src', src);
    return url.toString();
  } catch {
    return rawHref;
  }
}

export default function QuizFstVsl({ page }: { page: 1 | 2 | 3 | 4 }) {
  const videoId = VIDEO_BY_PAGE[page];
  const src = `quiz-fst-${page}`;
  const playerJs = `https://scripts.converteai.net/${ACCOUNT}/players/${videoId}/v4/player.js`;

  return (
    <main className="min-h-screen bg-white">
      {/* Vturb Preloads */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href={playerJs} as="script" />
      <link
        rel="preload"
        href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        as="script"
      />
      <link rel="preload" href={PRELOAD_M3U8} as="fetch" />
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

      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* 1. Hero Image */}
        <section className="w-full pt-4 px-4 pb-1">
          <div className="relative w-full aspect-video">
            <Image
              src="/images/hero-resultado-abril2026.png"
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

        {/* 4. VSL Player - Vturb (vídeo específico da página) */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="vid-${videoId}" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>`,
            }}
          />
          <Script src={playerJs} strategy="afterInteractive" />
          {/* Revela a oferta no mesmo delay da /resultado2 */}
          <Script id="vturb-reveal" strategy="afterInteractive">
            {`
              (function(){
                var done = false;
                document.addEventListener('player:ready', function(event){
                  if (done) return;
                  var detail = event.detail || {};
                  var player = detail.player || document.querySelector('vturb-smartplayer');
                  if (!player || typeof player.displayHiddenElements !== 'function') return;
                  done = true;
                  player.displayHiddenElements(${OFFER_REVEAL_SECONDS}, ['.esconder'], { persist: true });
                });
              })();
            `}
          </Script>
        </section>

        {/* 5. Oferta - 3 Kits (escondida até o delay do vídeo) */}
        <section className="esconder px-4 py-8 space-y-4">
          {/* Imagem 1 - 3 Kits */}
          <a href={withSrc(CHECKOUT_3KITS, src)} className="block w-[78%] mx-auto relative">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image src="/images/3-kits.png" alt="Kit com 3 unidades" fill className="object-cover" />
            </div>
            <div className="tarja-pulse absolute top-2 -right-3 bg-green-500 text-white text-[10px] font-bold py-1 px-4 shadow-lg">
              MAIS ESCOLHIDO
            </div>
          </a>

          {/* Imagem 2 - 2 Kits */}
          <a href={withSrc(CHECKOUT_2KITS, src)} className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image src="/images/2-kits.png" alt="Kit com 2 unidades" fill className="object-cover" />
            </div>
          </a>

          {/* Imagem 3 - 1 Kit (com upsell modal) */}
          <OneKitUpsellLink
            href={withSrc(CHECKOUT_1KIT, src)}
            promoHref={withSrc(CHECKOUT_2KITS_PROMO, src)}
            className="block w-[78%] mx-auto"
          >
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image src="/images/1-kit.png" alt="Kit com 1 unidade" fill className="object-cover" />
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
