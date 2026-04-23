'use client';

import Image from 'next/image';
import Script from 'next/script';
import OneKitUpsellLink from '@/components/OneKitUpsellLink';

export default function Resultado2Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Vturb Preloads */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69ea0c006ef5029c0c572da7/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/69bae64bab9c7e1e9b718a03/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://api.vturb.com.br" />

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

        {/* 4. VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-69ea0c006ef5029c0c572da7" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69ea0c006ef5029c0c572da7/v4/player.js"
            strategy="afterInteractive"
          />
          {/* Script de delay - libera os kits após 2310 segundos do vídeo */}
          <Script id="vturb-delay" strategy="afterInteractive">
            {`
              var delaySeconds = 2310;
              var player = document.querySelector("vturb-smartplayer");
              player.addEventListener("player:ready", function() {
                player.displayHiddenElements(delaySeconds, [".esconder"], {
                  persist: true
                });
              });
            `}
          </Script>
        </section>

        {/* 5. Provas Sociais - 3 Imagens (escondidas até o delay do vídeo) */}
        <section className="esconder px-4 py-8 space-y-4">
          {/* Imagem 1 - 3 Kits */}
          <a href="https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de?split=12" className="block w-[78%] mx-auto relative">
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
          <a href="https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12#" className="block w-[78%] mx-auto">
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
            href="https://checkout.payt.com.br/c11d395593428f094fcb4b279f1ef839?split=12"
            promoHref="https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12&coupon=PRESENTE#"
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
