'use client';

import Image from 'next/image';

/**
 * VSL do Korean — VSL placeholder + kits reais (6/3/2) + FAQ.
 *
 * A fazer quando o embed do vturb chegar:
 *   - Trocar o bloco "PLACEHOLDER VSL" pelos preloads do vturb +
 *     <vturb-smartplayer> + <Script src=".../player.js">.
 *   - (Opcional) revelar os kits só depois do pitch: adicionar `esconder`
 *     na section dos kits + script `player:ready` chamando
 *     player.displayHiddenElements(<delay>, ['.esconder'], {persist:true}).
 *
 * A fazer quando os checkouts do Payt chegarem:
 *   - Trocar o `href="#"` de cada kit pelo link do Payt do respectivo SKU.
 */
export default function KoreanPage() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        .esconder {
          display: none;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* ====================================================================
            1. VSL PLAYER — placeholder
        ==================================================================== */}
        <section className="w-full pt-6 sm:pt-8 px-4">
          <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-1">
                [ Placeholder VSL ]
              </p>
              <p className="text-gray-500 text-xs">
                Colar aqui o embed do vturb
                <br />
                (portrait 9:16, max 400px)
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. KITS — 6 / 3 / 2 (imagens ja com botao "EU QUERO" embutido)
            TROCAR href="#" pelo checkout do Payt de cada SKU.
        ==================================================================== */}
        <section className="px-4 py-8 space-y-4">
          {/* Kit 1 - 6 Kits (mais escolhido) */}
          <a href="#" className="block w-[78%] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-6-kits.png"
                alt="6 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          {/* Kit 2 - 3 Kits */}
          <a href="#" className="block w-[78%] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-3-kits.png"
                alt="3 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          {/* Kit 3 - 2 Kits */}
          <a href="#" className="block w-[78%] mx-auto">
            <div
              className="relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/korean-2-kits.png"
                alt="2 Kits Korean"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 500px"
              />
            </div>
          </a>

          <p className="text-xs text-gray-400 text-center pt-2 pb-4">
            Ao comprar você concorda com os{' '}
            <a href="/termos-de-uso" className="underline hover:text-gray-600">
              termos de uso
            </a>{' '}
            da H9 Pharma.
          </p>
        </section>

        {/* ====================================================================
            3. FAQ
        ==================================================================== */}
        <section className="px-4 pt-6 pb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-3">
            Antes de encerrarmos…
          </h2>
          <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed text-center max-w-lg mx-auto mb-8">
            Eu sei que ainda pode ter ficado alguma dúvida na sua cabeça, e é
            completamente normal. Deixa eu responder as principais agora,
            rapidinho, pra você ter certeza antes de decidir.
          </p>

          <div className="space-y-3">
            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Em quanto tempo eu vou ver resultado?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Os primeiros sinais aparecem já nas primeiras semanas: rosto
                  desinchando de manhã, pele menos ressecada, brilho voltando.
                </p>
                <p>
                  Em 60 dias você já enxerga mudanças claras no espelho. A
                  transformação mais profunda, firmeza voltando e contorno se
                  levantando, é o colágeno sendo remontado, e isso acontece ao
                  longo de alguns meses.
                </p>
                <p>
                  Por isso eu recomendo o tratamento completo. E o app te
                  acompanha o tempo todo, pra você não ficar no escuro.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Posso usar o Korean Kit junto com meus remédios e meu skincare?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Pode. O pó é feito de ingredientes naturais e o Sérum
                  Antiaging encaixa na sua rotina normalmente, junto com o que
                  você já usa.
                </p>
                <p>
                  Se você toma alguma medicação controlada, está grávida ou
                  amamentando, vale avisar seu médico antes de começar. Não
                  porque vá te fazer mal, mas porque nesses casos é sempre o
                  cuidado certo.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  E se eu não mudar nada na minha rotina? Funciona mesmo só com o kit?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Funciona. O Korean Kit não depende de você virar sua vida do
                  avesso, porque age na raiz do problema, lá no intestino, e
                  não só na superfície.
                </p>
                <p>
                  Bons hábitos ajudam, claro, e é pra isso que você recebe os
                  dois protocolos de bônus. Mas o kit foi feito pra trabalhar
                  na causa, com ou sem rotina perfeita.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  É seguro? Tem efeito colateral?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed">
                <p>
                  É seguro e não tem efeitos colaterais. Os ingredientes são
                  naturais, e a fórmula é produzida pela H9 com certificação da
                  ANVISA e boas práticas de fabricação.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Como eu sei que vai funcionar no MEU caso?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Se sua pele perdeu o brilho, se você vê ela flácida, com
                  manchas e rugas aparecendo, e já gastou com creme e
                  procedimento sem nada segurar, as chances de a raiz estar no
                  eixo intestino-pele são altíssimas. Foi exatamente pra isso
                  que o Korean Kit foi feito.
                </p>
                <p>
                  E mesmo assim, se você seguir os dois passos direitinho e não
                  ver diferença, tem a garantia de 60 dias. É só mandar um
                  e-mail e a gente devolve 100%. O risco é todo meu.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  Por quanto tempo eu vou precisar usar? Vou depender disso pra sempre?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Não vai depender. O Korean Kit não é remédio, é um tratamento
                  natural que reequilibra o intestino e reconstrói a pele de
                  dentro pra fora. Você faz o tratamento, resolve na raiz, e o
                  resultado se sustenta, principalmente se mantiver os bons
                  hábitos dos protocolos.
                </p>
                <p>
                  Muitas mulheres escolhem continuar depois, não por
                  necessidade, mas porque gostam de manter o intestino em dia,
                  a pele bonita e a disposição. Vira parte da rotina, como um
                  cuidado diário com elas mesmas.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[15px] sm:text-base font-semibold text-gray-900">
                  E a entrega? É seguro comprar pelo site?
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#c4448f] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed space-y-2">
                <p>
                  Totalmente seguro. O pagamento é processado por uma das
                  maiores empresas de pagamento do país, com a mesma
                  criptografia de banco. Você pode pagar no Pix ou parcelar em
                  até 12x no cartão.
                </p>
                <p>
                  Assim que você confirma, a gente despacha e te manda o código
                  de rastreio. Pra boa parte do Brasil chega em poucos dias;
                  pra regiões mais distantes, um pouquinho mais. Você acompanha
                  cada passo, do nosso depósito até a sua porta.
                </p>
              </div>
            </details>
          </div>

          {/* Fechamento pós-FAQ */}
          <div className="mt-10 text-[15px] sm:text-base text-gray-700 leading-relaxed space-y-3 max-w-lg mx-auto">
            <p>
              Se ficou qualquer outra dúvida, é só mandar pro nosso suporte
              depois de garantir o seu kit que a gente responde rápido.
            </p>
            <p>
              Agora você já sabe tudo: como funciona, por que funciona, e que
              você não corre risco nenhum. Escolha o seu kit lá em cima e
              garanta antes que o estoque acabe.
            </p>
            <p>
              Muito obrigado por ter assistido até aqui. Depois que você ver
              sua pele mais firme e brilhante, não esqueça de me marcar no
              Instagram com o seu resultado. Não tem nada que me dê mais
              alegria do que ver a transformação de vocês.
            </p>
            <p className="font-semibold text-gray-900">
              Um grande abraço, e até a próxima!
            </p>
          </div>
        </section>
      </div>

      {/* ====================================================================
          4. FOOTER — institucional H9
      ==================================================================== */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-4 text-xs">
              <a
                href="/termos-de-uso"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/politica-de-privacidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
            <p className="text-sm text-gray-400">Dr. Renato Silveira Reis x H9 Pharma</p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
