'use client';

import Script from 'next/script';

export default function Espera1_1Page() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .loading-bar {
          background: linear-gradient(90deg, #2ec6a8 0%, #2ec6a8 40%, #5dd9c0 50%, #2ec6a8 60%, #2ec6a8 100%);
          background-size: 200% 100%;
          animation: loading 2s linear infinite;
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
            ESPERA! Seu pedido ainda está sendo processado…
          </h1>
          <p className="text-xl sm:text-2xl font-black text-center text-gray-900 mt-2 leading-tight">
            Quer garantir o protocolo COMPLETO de 6 meses?
          </p>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-4 pb-4">
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Você garantiu 1 kit (60 dias). Mas o ciclo de vida dos parasitas é de <strong>90 dias</strong>.
          </p>
          <p className="text-base text-gray-700 text-center leading-relaxed mt-2">
            Com apenas 1 kit, os ovos dormentes podem eclodir <strong>DEPOIS</strong> que você terminar o protocolo.
          </p>
        </section>

        {/* Bloco de Explicação */}
        <section className="px-4 pt-2 pb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <p className="text-center font-black text-gray-900 text-lg mb-4">Por que 6 meses?</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span>
                <span><strong>1º ciclo (60 dias):</strong> Elimina os parasitas adultos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span>
                <span><strong>2º ciclo (120 dias):</strong> Elimina os ovos que eclodiram</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2ec6a8] font-bold flex-shrink-0">✅</span>
                <span><strong>3º ciclo (180 dias):</strong> Garante limpeza total + blinda contra reinfestação</span>
              </li>
            </ul>
            <p className="text-sm font-black text-center text-gray-900 mt-4">
              É assim que se elimina parasitas DE VERDADE.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2 leading-relaxed">
              Quem faz só 60 dias arrisca ver os parasitas — e o peso — voltarem em 4–6 meses.
            </p>
          </div>
        </section>

        {/* Bloco de Oferta */}
        <section className="px-4 pt-2 pb-4">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-[#2ec6a8] rounded-2xl p-5 text-center">
            <p className="text-base font-black text-[#dc2626] mb-3 leading-snug">
              🔥 OFERTA ÚNICA, SÓ NESSA PÁGINA PARA VOCÊ GARANTIR O TEMPO IDEAL DE PROTOCOLO 🔥
            </p>
            <p className="text-sm text-gray-700 font-semibold mb-1">+2 kits extras para completar o protocolo de 6 meses</p>
            <p className="text-sm text-gray-500 line-through mb-1">De R$597</p>
            <p className="text-sm text-gray-700 font-semibold mb-1">Por apenas:</p>
            <p className="text-3xl font-black text-gray-900">12x de R$41</p>
            <p className="text-base text-gray-700 mb-1">ou <strong>R$397 à vista</strong></p>
            <p className="text-sm text-gray-600 mb-4">São R$198 por kit, menos da metade do preço normal.</p>
            <div className="space-y-1.5 text-sm text-left max-w-xs mx-auto">
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> METADE DO PREÇO NORMAL</p>
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> Frete grátis</p>
              <p className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> Enviado junto com seu primeiro kit</p>
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
                  <a href="#" payt_action="oneclick_buy" data-object="RA5DYR-4M2NGA" style="display: block; margin: 0 auto; width: 78%; max-width: 340px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.12);">
                    <img src="/images/desparafit-promo.png" alt="2 Kits Desparafit (6 meses) - 12x R$41" style="width: 100%; display: block;" />
                  </a>
                  <select payt_element='installment' style='display: none' data-object='RA5DYR-4M2NGA'></select>
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
              ⚠️ Esse preço só existe <strong>AQUI</strong>, nessa página.<br/>
              Se você sair e tentar comprar depois, vai pagar <strong>R$347 por kit</strong> no site, se tiver estoque.
            </p>
          </div>
        </section>

        {/* Botão secundário de recusar */}
        <section className="px-4 pb-6">
          <a href="/dwns1-1" className="block text-center text-sm text-gray-400 hover:text-gray-600 underline transition-colors">
            Vou arriscar com apenas 1 kit por enquanto →
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
