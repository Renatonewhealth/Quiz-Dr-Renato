'use client';

export default function Dwns1Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Headline Principal */}
        <section className="px-4 pt-8 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#b91c1c] leading-tight">
            Se eu fosse você não deixaria essa oportunidade passar, você está deixando de ter um resultado muito maior.
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-lg sm:text-xl text-gray-800 text-center font-semibold">
            Vou te dar uma última condição especial APENAS nessa página.
          </p>
        </section>

        {/* Corpo do texto */}
        <section className="px-4 pb-8">
          <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              Olha, eu sei, você acabou de garantir o seu protocolo do Desparafit (o que é maravilhoso!), e às vezes pagar R$480 logo em seguida em mais um protocolo pode não estar ao seu alcance…
            </p>

            <p className="font-semibold text-gray-900">
              Por isso eu quero te oferecer apenas 1 kit do Ozenkit por 12x de R$24,90 ou R$240 à vista!
            </p>

            <p>
              Assim você consegue aproveitar essa "janela perfeita" que seu organismo vai ficar enquanto desparasita para acelerar ainda mais os seus resultados.
            </p>

            <p>
              E caso você esteja "esperando para ver o resultado do Desparafit" para depois comprar o Ozenkit, <strong className="text-gray-900">eu não faria isso se fosse você.</strong>
            </p>

            <p>
              Primeiro porque usar o Ozenkit enquanto usa o Desparafit é a melhor maneira para potencializar os resultados.
            </p>

            <p>
              E segundo que como você viu, o valor do Ozenkit no site da H9 Pharma é de R$500…
            </p>

            <p>
              E agora você tem a chance de garantir o seu por <strong className="text-gray-900">apenas R$240.</strong>
            </p>

            <p className="font-semibold text-gray-900">
              É uma diferença gigante de preço.
            </p>

            <p>
              Por isso, se você não conseguiu garantir os 2 kits do Ozenkit, tudo bem.
            </p>

            <p>
              Mas aproveite a chance de você garantir pelo menos um por um valor extremamente descontado, clicando no botão abaixo:
            </p>

            <p className="text-sm text-gray-500 italic">
              (Eu estou apenas fazendo isso porque você acabou de se tornar cliente, e quanto mais rápido você tiver resultados, mais rápido você vai poder me dar seu testemunho e mais nosso projeto cresce!)
            </p>
          </div>
        </section>

        {/* Botão CTA */}
        <section className="px-4 pb-12">
          <button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-150 animate-pulse"
            onClick={() => {
              // Ação do CTA
              console.log('CTA clicked');
            }}
          >
            SIM, QUERO GARANTIR 1 KIT EXTRA POR R$240
          </button>
          <a href="#" className="block text-center text-base text-gray-500 hover:text-gray-700 mt-4 underline transition-colors">
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
