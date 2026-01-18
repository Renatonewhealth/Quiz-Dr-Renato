'use client';

export default function Dwns1_1Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Headline Principal */}
        <section className="px-4 pt-8 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#b91c1c] leading-tight">
            Calma! Você está abrindo mão de completar sua transformação.
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-lg sm:text-xl text-gray-800 text-center font-semibold">
            Vou te fazer uma última proposta, só nessa página, pra você não se arrepender depois.
          </p>
        </section>

        {/* Corpo do texto */}
        <section className="px-4 pb-8">
          <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              Olha, eu entendo perfeitamente.
            </p>

            <p>
              Você acabou de garantir 1 kit do Desparafit (o que já é maravilhoso!), e investir mais R$397 em 2 kits extras pode estar fora do seu orçamento agora...
            </p>

            <p className="font-semibold text-gray-900">
              Por isso eu quero te oferecer apenas 1 kit extra por 12x de R$25,90 ou R$247 à vista!
            </p>

            <p>
              Assim você consegue fazer 120 dias em vez de apenas 60, cobrindo 2 ciclos de vida parasitário e eliminando também a segunda geração que nasce dos ovos dormentes.
            </p>

            <p>
              E caso você esteja "esperando para ver o resultado do primeiro kit" pra depois comprar mais...
            </p>

            <p>
              <strong className="text-gray-900">Eu não faria isso se fosse você.</strong>
            </p>

            <p>
              Primeiro porque você pode não encontrar estoque quando precisar. Ficamos sem estoque constantemente e cada lote leva 3-4 meses pra produzir.
            </p>

            <p>
              E segundo que o valor do Desparafit no site é de R$347 por kit...
            </p>

            <p>
              E apenas nessa página você consegue garantir o seu por <strong className="text-gray-900">apenas R$247</strong>
            </p>

            <p className="font-semibold text-gray-900">
              É uma diferença de R$100
            </p>

            <p>
              Por isso, se você não conseguiu garantir os 3 kits completos, tudo bem.
            </p>

            <p>
              Mas aproveite a chance de garantir pelo menos MAIS 1 kit por um valor extremamente descontado, clicando no botão abaixo:
            </p>

            <p className="text-sm text-gray-500 italic">
              (Eu estou apenas fazendo isso porque você acabou de se tornar cliente, e quanto mais dias você conseguir fazer o protocolo, menor o risco de reinfestação. Prefiro que você faça 120 dias do que apenas 60!)
            </p>
          </div>
        </section>

        {/* Botão CTA */}
        <section className="px-4 pb-12">
          <a
            href="https://checkout.payt.com.br/93ed47503f85a84ab5e6f02830439114"
            className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-150 animate-pulse text-center"
          >
            SIM, QUERO GARANTIR 1 KIT EXTRA POR R$247
          </a>
          <a href="/espera1-2" className="block text-center text-base text-gray-500 hover:text-gray-700 mt-4 underline transition-colors">
            Não quero aproveitar essa oferta especial, e sei que nunca mais vou ter a chance de acessar ela novamente
          </a>
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
