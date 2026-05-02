'use client';

import Script from 'next/script';

export default function DiaDasMaesUpPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Vturb Preloads */}
      <Script id="vturb-plt" strategy="beforeInteractive">
        {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
      </Script>
      <link rel="preload" href="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69f572cb43686154ab4bfc9d/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://api.vturb.com.br" />

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
        <section className="px-4 pt-6 pb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            ESPERA! Não saia desta página, seu pedido ainda está sendo processado...
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-3 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            A Campanha <strong className="text-gray-900">&ldquo;Dia das Mães&rdquo;</strong> da H9 Pharma ainda não acabou, assista o vídeo abaixo para finalizar todas as etapas da compra e aprender como{' '}
            <strong className="text-gray-900">acelerar MUITO</strong> seus resultados!
          </p>
        </section>

        {/* VSL Player - Vturb */}
        <section className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: '<vturb-smartplayer id="vid-69f572cb43686154ab4bfc9d" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>'
            }}
          />
          <Script
            src="https://scripts.converteai.net/637f9657-7454-4e03-ad13-ab875efdb78d/players/69f572cb43686154ab4bfc9d/v4/player.js"
            strategy="afterInteractive"
          />
          {/* Script de delay - libera a imagem do kit após 360 segundos do vídeo */}
          <Script id="vturb-delay" strategy="afterInteractive">
            {`
              var delaySeconds = 360;
              var player = document.querySelector("vturb-smartplayer");
              player.addEventListener("player:ready", function() {
                player.displayHiddenElements(delaySeconds, [".esconder"], {
                  persist: true
                });
              });
            `}
          </Script>
        </section>

        {/* Imagem do produto com one-click buy - escondida até delay */}
        <section className="esconder px-4 pt-6 pb-6">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center">
                  <a href="#" payt_action="oneclick_buy" data-object="453A8R-LY7JYA" style="display: block; margin: 0 auto; width: 78%; max-width: 380px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.12);">
                    <img src="/images/desparafit-dia-das-maes.png" alt="2 Kits Desparafit - 12x R$49,80" style="width: 100%; display: block;" />
                  </a>
                  <select payt_element='installment' style='display: none' data-object='453A8R-LY7JYA'></select>
                </div>
              `
            }}
          />
          <Script
            src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
            strategy="afterInteractive"
          />
        </section>

        {/* Garantia - escondida até delay */}
        <section className="esconder px-4 pb-10">
          <p className="text-xs text-gray-500 text-center">
            🛡️ Garantia de 60 dias. Não funcionou? Devolvemos seu dinheiro, basta seguir os termos e condições e entrar em contato conosco.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
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
