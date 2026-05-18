'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function HairvitmaxPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Vturb Preloads */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a0a7e6207a4624290ed1cc0/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://api.vturb.com.br" />

      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% { transform: rotate(30deg) scale(1); }
          50% { transform: rotate(30deg) scale(1.08); }
        }
        .tarja-pulse {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .placeholder-pulse {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        .esconder {
          display: none;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">

        {/* Headline Principal */}
        <section className="px-4 pt-8 pb-3">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#be185d] leading-tight">
            Aprenda o <span className="text-[#ec4899]">&ldquo;Truque do Alecrim&rdquo;</span> que reverte a queda, devolve volume e restaura a saúde do cabelo da mulher acima dos 40, em poucas semanas.
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-3 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Assista ao vídeo abaixo pra entender como aproveitar a maior promoção de cuidados pra cabelo do{' '}
            <strong className="text-[#ec4899]">Mês das Mães</strong> do Dr. Renato e H9 Pharma.
          </p>
        </section>

        {/* VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-6a0a7e6207a4624290ed1cc0" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/6a0a7e6207a4624290ed1cc0/v4/player.js"
            strategy="afterInteractive"
          />
          {/* Script de delay - libera a imagem do checkout após 948 segundos do vídeo */}
          <Script id="vturb-delay" strategy="afterInteractive">
            {`
              var delaySeconds = 948;
              var player = document.querySelector("vturb-smartplayer");
              player.addEventListener("player:ready", function() {
                player.displayHiddenElements(delaySeconds, [".esconder"], {
                  persist: true
                });
              });
            `}
          </Script>
        </section>

        {/* Imagem do produto - escondida até delay */}
        <section className="esconder px-4 pt-6 pb-6">
          <a
            href="https://checkout.payt.com.br/2153440b490d20b849adb00e395cda04?split=12#"
            className="block w-[78%] sm:w-[60%] mx-auto relative"
          >
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/hairvitmax-kit.png"
                alt="2 Kits HairVit Max - 12x R$61,74"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Tarja diagonal */}
            <div className="tarja-pulse absolute top-2 -right-3 bg-[#ec4899] text-white text-[10px] font-bold py-1 px-4 shadow-lg whitespace-nowrap">
              MÊS DAS MÃES
            </div>
          </a>
        </section>

        {/* Garantia */}
        <section className="px-4 pb-10">
          <p className="text-xs text-gray-500 text-center">
            🛡️ Garantia de 60 dias. Não funcionou? Devolvemos seu dinheiro, basta seguir os termos e condições e entrar em contato conosco.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-[#831843] to-[#be185d] text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-pink-100 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-pink-200">|</span>
              <a href="/politica-de-privacidade" className="text-pink-100 hover:text-white transition-colors">Política de Privacidade</a>
              <span className="text-pink-200">|</span>
              <a href="#" className="text-pink-100 hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-sm text-pink-100">
              Dr. Renato Silveira Reis x H9 Pharma
            </p>
            <p className="text-xs text-pink-200">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
