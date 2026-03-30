'use client';

export default function Obrigado2Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto px-6">
        {/* Ícone de Sucesso */}
        <section className="pt-10 pb-4 flex justify-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </section>

        {/* Headline Principal */}
        <section className="pb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            🎉 Pedido Confirmado com Sucesso! 🎉
          </h1>
        </section>

        {/* Card do Presente */}
        <section className="pb-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {/* Header do Card */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 py-4 px-5">
              <h2 className="text-lg sm:text-xl font-black text-center text-white leading-tight">
                MAS NÃO É SÓ ISSO, TENHO UM PRESENTE (100% GRATUITO) PARA VOCÊ! 🎁
              </h2>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-5 sm:p-6">
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 text-center bg-yellow-50 py-3 px-4 rounded-lg border border-yellow-200">
                  Você acabou de liberar acesso gratuito à chamada ao vivo exclusiva com o Dr Renato!
                </p>

                <p>
                  Olha, eu preciso te contar algo importante sobre emagrecimento...
                </p>

                <p>
                  Muitas mulheres perdem 15, 20, 25 quilos com o Desparafit, e ficam INCRIVELMENTE felizes com a balança.
                </p>

                <p>
                  <strong className="text-gray-900">Mas aí vem a frustração:</strong>
                </p>

                <p>
                  A pele não acompanha a perda de gordura na mesma velocidade.
                </p>

                <p>
                  E você acaba com aquela pele solta na barriga... aqueles braços flácidos... aquela &quot;pochete&quot; que insiste em ficar mesmo depois do peso ir embora.
                </p>

                <p className="font-semibold text-[#b91c1c] bg-red-50 py-3 px-4 rounded-lg">
                  É HORRÍVEL. Você emagrece... mas não fica com o corpo firme que você sonhou.
                </p>

                <p>
                  <strong className="text-gray-900">Mas tem solução.</strong>
                </p>

                <p>
                  E eu vou te ensinar GRATUITAMENTE numa chamada ao vivo exclusiva!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O que você vai aprender */}
        <section className="pb-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
              NA CHAMADA AO VIVO VOCÊ VAI APRENDER:
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  5 truques caseiros 100% naturais para estimular a produção de colágeno e elastina enquanto você emagrece
                </p>
              </div>

              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  A &quot;Técnica da Toalha Fria&quot; que tonifica a pele em apenas 3 minutos por dia (parece simples, mas os resultados são impressionantes)
                </p>
              </div>

              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  O suco rejuvenescedor que acelera a renovação celular da pele, ingredientes que você já tem em casa
                </p>
              </div>

              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  Massagem de 5 movimentos para reativar a circulação e evitar a temida flacidez na barriga e nos braços
                </p>
              </div>

              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  Erros que 90% das mulheres cometem durante o emagrecimento e que destroem a elasticidade da pele (você provavelmente está cometendo pelo menos 2 deles)
                </p>
              </div>

              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                <p className="text-base text-gray-100">
                  Como &quot;treinar&quot; sua pele para se adaptar ao novo corpo, sem academia, sem equipamentos caros, sem cirurgias
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botão CTA */}
        <section className="py-6">
          <button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg py-5 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-150 animate-pulse"
            onClick={() => {
              console.log('CTA clicked');
            }}
          >
            QUERO ENTRAR NO GRUPO VIP E PARTICIPAR DA CHAMADA
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-6">
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
