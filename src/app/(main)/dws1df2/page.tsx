'use client';

import Script from 'next/script';
import Image from 'next/image';
import { ShieldCheck, Truck } from 'lucide-react';

/**
 * Downsell final — "Quem comprou 2 ou 3 kits".
 * Vem depois de /up1df2 (quando a pessoa recusa o upsell de 3 kits).
 * Oferece +2 kits de Desparafit por R$267 (>73% off) via Payt one-click.
 * Payt product: LQD9BD-RAKA8Y.
 *
 * One-click: como a navegação de /up1df2 → /dws1df2 é same-origin via <a href>,
 * os cookies do Payt (setados no checkout inicial) persistem intactos e o
 * botão "SIM, QUERO INCLUIR" cobra sem re-pedir cartão.
 */
export default function Dws1df2Page() {
  const paytObj = 'LQD9BD-RAKA8Y';
  const ctaLabel = 'Sim, quero incluir mais 2 kits por R$267';

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header - logo + progresso */}
      <header className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center gap-3">
          <div className="text-xl sm:text-2xl font-black text-[#2ec6a8] tracking-tight">
            H9 <span className="text-gray-800 font-normal">PHARMA</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.12em] font-semibold">
            <span className="text-gray-400">Passo 1</span>
            <span className="text-gray-300">›</span>
            <span className="text-gray-400">Passo 2</span>
            <span className="text-gray-300">›</span>
            <span className="text-[#2ec6a8] font-black">Passo 3</span>
          </div>
        </div>
      </header>

      {/* Hero - Oferta Desbloqueada */}
      <section className="bg-gradient-to-br from-[#2ec6a8] to-[#26a58c] text-white px-4 py-10 sm:py-14 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/90 font-bold mb-3">
            🎉 Oferta Especial Desbloqueada!
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            Que tal continuar o seu protocolo com mais de{' '}
            <span className="text-white bg-black/20 px-2 py-0.5 rounded">73% de DESCONTO?</span>
          </h1>
        </div>
      </section>

      {/* Copy principal - Dr. Renato */}
      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-10 text-[17px] sm:text-lg leading-relaxed text-gray-800">
        {/* Foto do Dr. Renato + headline ESPERA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src="/images/dr-renato-portrait.jpg"
              alt="Dr. Renato Silveira"
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#b91c1c] uppercase leading-tight">
              ESPERA! Antes de você ir…
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Uma última mensagem do <strong className="text-gray-700">Dr. Renato Silveira</strong>
            </p>
          </div>
        </div>

        <p className="mb-3">
          É o <strong>Dr. Renato</strong> novamente…
        </p>
        <p className="mb-3">
          Eu entendo. Levar mais 3 kits de uma vez pode ter parecido muito agora.
        </p>
        <p className="mb-3">Então deixa eu fazer uma última coisa por você…</p>
        <p className="mb-6">
          Não se preocupe, eu voltei só pra te dar uma boa notícia:
        </p>

        <div className="border-l-4 border-[#2ec6a8] bg-[#2ec6a8]/10 px-5 py-4 my-6 rounded-r-lg">
          <p className="text-gray-900">
            <strong>Seu pedido do Desparafit já está garantido.</strong>
            <br />
            Isso não muda. Ele já está sendo separado e vai chegar na sua casa normalmente.
          </p>
        </div>

        <p className="mb-6">
          Mas antes de você seguir, eu preciso te falar uma coisa rápida. E é uma coisa que eu falo pra todas as minhas pacientes.
        </p>

        <h3 className="text-xl sm:text-2xl font-black text-[#2ec6a8] leading-tight mb-4">
          Um kit começa o trabalho.<br />
          Mas é a continuidade que <em>tranca a porta</em>.
        </h3>
        <p className="mb-3">Deixa eu te explicar do jeito mais simples que eu consigo.</p>
        <p className="mb-3">
          O Desparafit vai fazer o trabalho dele: enfraquecer os parasitas, quebrar o ciclo dos ovos e destravar o seu metabolismo. Isso é o que ele faz, e faz muito bem.
        </p>
        <p className="mb-3">
          É como <strong>limpar uma casa que ficou abandonada por anos</strong>.
        </p>
        <p className="mb-3">
          Só que limpar a casa uma vez não é a mesma coisa que <strong>trancar a porta</strong>.
        </p>
        <p className="mb-3">E é aí que entra a continuidade do protocolo.</p>
        <p className="mb-3">
          Enquanto o primeiro kit elimina os parasitas que estão aí hoje, os kits seguintes cuidam do que os ovos deixam pra trás, e dão tempo pro seu intestino se reequilibrar de verdade.
        </p>
        <p className="mb-3">
          <strong>Um limpa o que está lá dentro. O outro impede que tudo volte.</strong>
        </p>
        <p className="mb-6">
          Os kits em sequência, sem intervalo, é o que eu recomendo pra quem quer o resultado completo, e não só um começo.
        </p>

        <p className="mb-3">
          Você recusou os 3 kits. Tudo bem. <strong>Mas eu aconselho você pelo menos levar mais 2.</strong>
        </p>
        <p className="mb-3">Eu não vou insistir no pacote de 3 kits. Se não deu agora, não deu.</p>
        <p className="mb-6">
          Mas eu também não quero que você pare o protocolo no meio do caminho só porque o valor apertou.
        </p>
        <p className="mb-6">Então essa é a última coisa que eu posso fazer:</p>

        {/* Caixa de oferta */}
        <div className="border-2 border-[#2ec6a8] rounded-2xl overflow-hidden bg-white shadow-xl my-8">
          <div className="bg-[#2ec6a8] text-white text-center py-3 sm:py-4">
            <p className="text-xl sm:text-2xl font-black uppercase tracking-wide">+ 2 Kits de Desparafit</p>
          </div>
          <div className="px-6 py-6 text-center">
            <p className="text-sm text-gray-500 mb-1">
              De <span className="line-through">R$994</span> (preço normal no site) por
            </p>
            <p className="text-4xl sm:text-5xl font-black text-[#2ec6a8] my-2 leading-none">R$267</p>
            <p className="text-base sm:text-lg text-gray-700 font-semibold">à vista</p>
            <p className="text-base sm:text-lg text-gray-700">
              ou 12x de <strong>R$26,90</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-sm sm:text-base text-gray-700">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2ec6a8]" strokeWidth={2.5} /> Frete grátis
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2ec6a8]" strokeWidth={2.5} /> Garantia de 60 dias
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
          Por que esses kits saem mais baratos do que na oferta anterior?
        </h3>
        <p className="mb-3">Vou ser direto com você, porque eu não gosto de joguinhos.</p>
        <p className="mb-3">
          Na página anterior, eram 3 kits por R$465, o que dá R$155 cada um.
        </p>
        <p className="mb-3">
          Aqui, os 2 kits saem por <strong>R$267</strong>.
        </p>
        <p className="mb-3">
          Isso é <strong className="text-[#2ec6a8]">mais de 73% de DESCONTO</strong>.
        </p>
        <p className="mb-3">
          E a diferença é simples: é menos produto do que o pacote completo, e é uma condição desta página.
        </p>
        <p className="mb-6">
          É só a última porta que eu consigo abrir pra você antes de fechar o seu pedido.
        </p>

        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">E se não funcionar pra você?</h3>
        <p className="mb-3">Você tem 60 dias. Os mesmos 60 dias do resto do seu pedido.</p>
        <p className="mb-3">
          Continua o protocolo direitinho, sem parar no meio do caminho, e acompanha.
        </p>
        <p className="mb-3">
          Se em 60 dias você não sentir diferença nenhuma, se o peso não descer, se a barriga não desinchar, você pede o reembolso e a gente devolve 100% do valor. Sem discussão, sem interrogatório.
        </p>
        <p className="mb-6">
          Eu prefiro devolver o seu dinheiro do que te empurrar uma coisa que não funcionou pra você.
        </p>

        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">Como fazer agora:</h3>
        <p className="mb-6">
          Se você quiser incluir mais 2 kits de Desparafit no seu pedido, é só tocar no botão abaixo.
        </p>

        {/* CTA 1 - Payt one-click */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div style="text-align: center; margin: 24px 0;">
                <a href="#" payt_action="oneclick_buy" data-object="${paytObj}" style="display: block; margin: 0 auto; width: 100%; max-width: 460px; padding: 22px 24px; background: #2ec6a8; color: #ffffff; text-align: center; font-size: 20px; font-weight: 800; letter-spacing: 0.01em; border-radius: 12px; box-shadow: 0 6px 24px rgba(46,198,168,0.4); text-decoration: none; text-transform: uppercase; line-height: 1.25;">
                  👉 ${ctaLabel}
                </a>
                <select payt_element='installment' style='display: none' data-object='${paytObj}'></select>
              </div>
            `
          }}
        />

        {/* Opt-out */}
        <p className="mb-3 mt-8">E se você preferir não levar agora, tudo bem também.</p>
        <p className="mb-3">
          É só tocar no link abaixo. Seu pedido continua garantido e vai chegar do mesmo jeito.
        </p>
        <a
          href="/obrigado2"
          className="block text-center text-sm sm:text-base text-gray-500 hover:text-gray-700 mt-2 mb-8 underline underline-offset-2 decoration-1 transition-colors"
        >
          Não, obrigada. Quero seguir só com o que já pedi.
        </a>

        <p>Seja qual for a sua escolha, eu te vejo do outro lado.</p>
        <p>Um abraço,</p>
        <p className="font-bold text-gray-900">Dr. Renato</p>
      </article>

      {/* Foto do produto + Dois Motivos */}
      <section className="bg-gray-50 py-10 sm:py-12 border-y border-gray-200">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <div className="relative w-full max-w-[320px] sm:max-w-sm mx-auto aspect-[3/4] mb-8">
            <Image
              src="/images/desparafit-downsell.png"
              alt="Kit Desparafit"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 320px, 384px"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 mb-6">
            Dois motivos pra garantir os seus kits agora:
          </h3>

          <div className="space-y-5">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ec6a8] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-gray-900 mb-2">
                    Você paga menos por kit do que em qualquer outro lugar
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Um kit de Desparafit custa <strong>R$497</strong> no site da H9 Pharma. Aqui, agora, os 2 saem por{' '}
                    <strong className="text-[#2ec6a8]">R$267</strong>. É o mesmo produto, a mesma fórmula, o mesmo protocolo. Você só está pagando menos porque está pegando ele aqui, junto com o seu pedido.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ec6a8] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-gray-900 mb-2">
                    Essa condição é EXCLUSIVA
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                    Não é pressão, é logística.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                    Seu pedido do Desparafit já está sendo separado…
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
                    Esses kits entram no mesmo envio, com o mesmo frete, e chegam junto.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Se você sair daqui e quiser depois, vai ter que fazer um pedido novo, pagar frete de novo, e pagar o preço do site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA 2 - Payt one-click (mesmo produto) */}
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <div style="text-align: center; margin: 32px 0 0;">
                  <a href="#" payt_action="oneclick_buy" data-object="${paytObj}" style="display: block; margin: 0 auto; width: 100%; max-width: 460px; padding: 22px 24px; background: #2ec6a8; color: #ffffff; text-align: center; font-size: 20px; font-weight: 800; letter-spacing: 0.01em; border-radius: 12px; box-shadow: 0 6px 24px rgba(46,198,168,0.4); text-decoration: none; text-transform: uppercase; line-height: 1.25;">
                    👉 ${ctaLabel}
                  </a>
                </div>
              `
            }}
          />
        </div>
      </section>

      {/* Script Payt one-click - uma vez por página */}
      <Script
        src="https://checkout.payt.com.br/multiple-oneclickbuyscript/RDEWEP.js"
        strategy="afterInteractive"
      />

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">
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
