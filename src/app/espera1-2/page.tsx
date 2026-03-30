'use client';

import Script from 'next/script';
import Head from 'next/head';

export default function Espera1_2Page() {
  return (
    <>
      <Head>
        <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69bf7770137969468e7b8d94/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/69bf7732423ef7939ca93d60/main.m3u8" as="fetch" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
      </Head>
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .loading-bar {
          background: linear-gradient(90deg, #f59e0b 0%, #f59e0b 40%, #fbbf24 50%, #f59e0b 60%, #f59e0b 100%);
          background-size: 200% 100%;
          animation: loading 2s linear infinite;
        }
        .esconder {
          display: none;
        }
      `}</style>

      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* Loading Bar */}
        <section className="px-4 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="loading-bar h-full rounded-full" style={{ width: '87%' }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">87% concluído</p>
        </section>

        {/* Headline Principal */}
        <section className="px-4 pt-4 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#f59e0b] leading-tight">
            Parabéns! Você foi escolhida para ganhar um bônus exclusivo da H9 Pharma…
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-2">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Estamos no meio do nosso "Festival de Emagrecimento" e eu quero te dar a oportunidade de{' '}
            <strong className="text-gray-900">ACELERAR MUITO</strong> os seus resultados com um bônus especial para novos clientes!
          </p>
        </section>

        {/* Texto menor */}
        <section className="px-4 pb-6">
          <p className="text-sm text-gray-500 text-center">
            Assista o vídeo abaixo para entender.
          </p>
        </section>

        {/* VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="vid-69bf7770137969468e7b8d94" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69bf7770137969468e7b8d94/v4/player.js"
            strategy="afterInteractive"
          />
        </section>

        {/* Botão CTA One-Click Buy - escondido até delay */}
        <section className="px-4 py-8 esconder">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center">
                  <a href="#" payt_action="oneclick_buy" data-object="4MMQ24-4ZJ2MP" style="background: rgb(255, 195, 0); color: rgb(255, 255, 255); padding: 9px; text-decoration: none; font-size: 16px; font-family: sans-serif; border-radius: 9px; display: block; margin: 10px auto; width: max-content;"> QUERO ACELERAR MEU RESULTADO COM OZENKIT </a>
                  <select payt_element='installment' style='display: none' data-object='4MMQ24-4ZJ2MP'></select>
                </div>
              `
            }}
          />
          <Script
            src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
            strategy="afterInteractive"
          />
          <a href="/dwns1" className="block text-center text-base text-gray-500 hover:text-gray-700 mt-4 underline transition-colors">
            Não quero aproveitar essa oferta especial, e sei que nunca mais vou ter a chance de acessar ela novamente
          </a>
        </section>

        {/* Script de delay - libera elementos após 431s */}
        <Script id="vturb-delay" strategy="afterInteractive">
          {`
            var delaySeconds = 431;
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
    </>
  );
}
