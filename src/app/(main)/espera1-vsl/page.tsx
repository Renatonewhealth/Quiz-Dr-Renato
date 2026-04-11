'use client';

import Script from 'next/script';

export default function Espera1VslPage() {
  return (
    <main className="min-h-screen bg-white">
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
        @keyframes pulse-cta {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 242, 229, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(0, 242, 229, 0); }
        }
        .cta-pulse {
          animation: pulse-cta 2s ease-in-out infinite;
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
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#f59e0b] leading-tight">
            Parabéns! Você foi escolhida para ganhar um bônus exclusivo da H9 Pharma…
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-3 pb-4">
          <p className="text-base sm:text-lg font-bold text-center text-gray-800 leading-snug mb-2">
            SUPER PROMOÇÃO PARA ADQUIRIR NOSSO PROTOCOLO OZENKIT.
          </p>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Tome junto com o protocolo de desparasitação o nosso kit chamado Ozenkit, ele vai agir diretamente na queima de gordura enquanto o Desparafit expulsa os parasitas do seu corpo.
          </p>
        </section>

        {/* Bloco de Explicação */}
        <section className="px-4 pt-8 pb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <p className="text-center font-black text-gray-900 text-lg mb-4 leading-tight">
              O Desparafit <span className="text-[#dc2626]">REMOVE</span> o bloqueio.<br/>
              O Ozenkit <span className="text-[#2ec6a8]">ACELERA</span> a queima.<br/>
              <span className="text-[#f59e0b]">Juntos? Resultados até 3x mais rápidos.</span>
            </p>
            <p className="text-sm font-semibold text-gray-700 mb-3">São 23 ingredientes naturais que:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span> Acordam seu metabolismo com termogênicos</li>
              <li className="flex items-start gap-2"><span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span> Forçam o fígado a queimar gordura</li>
              <li className="flex items-start gap-2"><span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span> Aumentam a saciedade (você come menos sem sofrer)</li>
              <li className="flex items-start gap-2"><span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span> Bloqueiam formação de gordura nova</li>
              <li className="flex items-start gap-2"><span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span> Potencializam a absorção do próprio Desparafit em até 20x</li>
            </ul>
            <p className="text-sm text-gray-600 text-center mt-4 leading-relaxed">
              O melhor: você toma os dois juntos. <strong>Menos de 3 minutos por dia.</strong> Um expulsa os parasitas, o outro age diretamente na queima de gordura.
            </p>
          </div>
        </section>

        {/* Bloco de Oferta */}
        <section className="px-4 pt-4 pb-4">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-[#f59e0b] rounded-2xl p-5 text-center">
            <p className="text-lg font-black text-[#dc2626] mb-1">🔥 PROMOÇÃO EXCLUSIVA, SÓ NESSA PÁGINA 🔥</p>
            <p className="text-sm text-gray-500 line-through mb-1">De R$994 (2 kits)</p>
            <p className="text-sm text-gray-700 font-semibold mb-1">Por apenas:</p>
            <p className="text-3xl font-black text-gray-900">R$240 <span className="text-base font-normal text-gray-600">por kit</span></p>
            <p className="text-base text-gray-700 mb-3">ou <strong>12x de R$49,80</strong></p>
            <p className="text-sm text-gray-600 mb-4">
              São R$240 por kit, menos da metade do preço normal de R$500. Você está praticamente comprando um e levando o outro.
            </p>
            <div className="space-y-1.5 text-sm text-left max-w-xs mx-auto">
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> COMPRE 1 KIT E LEVE O OUTRO</p>
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> Frete grátis</p>
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> Enviado junto com seu Desparafit</p>
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> Garantia de 60 dias</p>
            </div>
          </div>
        </section>

        {/* Imagem do produto com one-click buy */}
        <section className="px-4 py-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center">
                  <a href="#" payt_action="oneclick_buy" data-object="L88OKL-4ZJ2MP" style="display: block; margin: 0 auto; width: 78%; max-width: 340px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.12);">
                    <img src="/images/ozenkit-promo.png" alt="2 Kits OzenKit (120 dias) - 12x R$49,80" style="width: 100%; display: block;" />
                  </a>
                  <select payt_element='installment' style='display: none' data-object='L88OKL-4ZJ2MP'></select>
                </div>
              `
            }}
          />
          <Script
            src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
            strategy="afterInteractive"
          />
        </section>

        {/* Urgência */}
        <section className="px-4 pb-4">
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
            <p className="text-sm text-red-700 font-medium">
              ⚠️ Você só verá esse preço <strong>AQUI</strong>, nessa página.<br/>
              Se sair e tentar comprar depois, o valor volta pra <strong>R$497 por kit</strong> no site.
            </p>
          </div>
        </section>

        {/* Botão secundário de recusar */}
        <section className="px-4 pb-6">
          <a href="/dwns1" className="block text-center text-sm text-gray-400 hover:text-gray-600 underline transition-colors">
            Não quero acelerar meus resultados. Continuar apenas com o Desparafit →
          </a>
        </section>

        {/* Garantia */}
        <section className="px-4 pb-10">
          <p className="text-xs text-gray-500 text-center">
            🛡️ Mesma garantia de 60 dias. Não funcionou? Devolvemos seu dinheiro, basta seguir os termos e condições e entrar em contato conosco.
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
