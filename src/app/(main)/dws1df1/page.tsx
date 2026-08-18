'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Star, ShieldCheck, Truck } from 'lucide-react';

/**
 * Downsell final — "Quem comprou 1 kit".
 * Vem depois de /up1df1 (quando a pessoa recusa o upsell de 2 kits).
 * Oferece +1 kit de Desparafit por R$147 (>70% off) via Payt one-click.
 * Payt product: LXND5D-4ZW5KM.
 */
export default function Dws1df1Page() {
  const paytObj = 'LXND5D-4ZW5KM';
  const ctaLabel = 'Sim, quero incluir mais 1 kit por R$147';

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header - logo + progresso */}
      <header className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center gap-3">
          <div className="text-xl sm:text-2xl font-black text-[#14532d] tracking-tight">
            H9 <span className="text-gray-800 font-normal">PHARMA</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.12em] font-semibold">
            <span className="text-gray-400">Passo 1</span>
            <span className="text-gray-300">›</span>
            <span className="text-gray-400">Passo 2</span>
            <span className="text-gray-300">›</span>
            <span className="text-[#14532d] font-black">Passo 3</span>
          </div>
        </div>
      </header>

      {/* Hero - Oferta Desbloqueada */}
      <section className="bg-gradient-to-br from-[#14532d] to-[#0f3d21] text-white px-4 py-10 sm:py-14 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-[#c9a961] font-bold mb-3">
            🎉 Oferta Especial Desbloqueada!
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            Que tal continuar o seu tratamento com mais de{' '}
            <span className="text-[#c9a961]">70% de DESCONTO?</span>
          </h1>
        </div>
      </section>

      {/* Copy principal - Dr. Renato */}
      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-10 text-[17px] sm:text-lg leading-relaxed text-gray-800">
        <h2 className="text-xl sm:text-2xl font-black text-[#b91c1c] uppercase mb-4">
          ESPERA! Antes de você ir…
        </h2>
        <p className="mb-3">
          É o <strong>Dr. Renato</strong> novamente…
        </p>
        <p className="mb-3">
          E eu entendo. Levar os 2 kits de uma vez pode ter parecido muito agora.
        </p>
        <p className="mb-6">
          Então deixa eu fazer uma última coisa por você…
        </p>

        <div className="border-l-4 border-[#14532d] bg-[#14532d]/5 px-5 py-4 my-6 rounded-r-lg">
          <p className="text-gray-900">
            <strong>Seu pedido do Desparafit já está garantido.</strong>
            <br />
            Isso não muda. Ele já está sendo separado e vai chegar na sua casa normalmente.
          </p>
        </div>

        <p className="mb-6">
          Mas antes de você seguir, eu preciso te falar uma coisa rápida. E é uma coisa que eu falo pra todas as minhas pacientes.
        </p>

        <h3 className="text-xl sm:text-2xl font-black text-[#14532d] leading-tight mb-4">
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
        <p className="mb-3">E é aí que entra a continuidade do uso.</p>
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
          Você recusou os 2 kits. Tudo bem. <strong>Mas eu aconselho você pelo menos levar mais 1.</strong>
        </p>
        <p className="mb-3">Eu não vou insistir no pacote de 2 kits. Se não deu agora, não deu.</p>
        <p className="mb-6">
          Mas eu também não quero que você pare o protocolo no meio do caminho só porque o valor apertou.
        </p>
        <p className="mb-6">Então essa é a última coisa que eu posso fazer:</p>

        {/* Caixa de oferta */}
        <div className="border-2 border-[#14532d] rounded-2xl overflow-hidden bg-white shadow-xl my-8">
          <div className="bg-[#14532d] text-white text-center py-3 sm:py-4">
            <p className="text-xl sm:text-2xl font-black uppercase tracking-wide">+ 1 Kit de Desparafit</p>
          </div>
          <div className="px-6 py-6 text-center">
            <p className="text-sm text-gray-500 mb-1">
              De <span className="line-through">R$497</span> (preço normal no site) por
            </p>
            <p className="text-4xl sm:text-5xl font-black text-[#14532d] my-2 leading-none">R$147</p>
            <p className="text-base sm:text-lg text-gray-700 font-semibold">à vista</p>
            <p className="text-base sm:text-lg text-gray-700">
              ou 12x de <strong>R$14,90</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-sm sm:text-base text-gray-700">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#14532d]" strokeWidth={2.5} /> Frete grátis
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#14532d]" strokeWidth={2.5} /> Garantia de 60 dias
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
          Por que esse kit sai mais barato do que na oferta anterior?
        </h3>
        <p className="mb-3">Vou ser direto com você, porque eu não gosto de joguinhos.</p>
        <p className="mb-3">
          Na página anterior, eram 2 kits por R$347, o que dá R$173,50 cada um.
        </p>
        <p className="mb-3">
          Aqui, o kit único sai por <strong>R$147</strong>.
        </p>
        <p className="mb-3">
          Isso é <strong className="text-[#14532d]">mais de 70% de DESCONTO</strong>.
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
          Se você quiser incluir mais 1 kit de Desparafit no seu pedido, é só tocar no botão abaixo.
        </p>

        {/* CTA 1 - Payt one-click */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div style="text-align: center; margin: 24px 0;">
                <a href="#" payt_action="oneclick_buy" data-object="${paytObj}" style="display: block; margin: 0 auto; width: 100%; max-width: 460px; padding: 22px 24px; background: #16a34a; color: #ffffff; text-align: center; font-size: 20px; font-weight: 800; letter-spacing: 0.01em; border-radius: 12px; box-shadow: 0 6px 24px rgba(22,163,74,0.35); text-decoration: none; text-transform: uppercase; line-height: 1.25;">
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
          <div className="relative w-full max-w-[280px] sm:max-w-xs mx-auto aspect-square bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image
              src="/images/1-kit.png"
              alt="1 Kit de Desparafit"
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 280px, 320px"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 mb-6">
            Dois motivos pra garantir o seu kit agora:
          </h3>

          <div className="space-y-5">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#14532d] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-gray-900 mb-2">
                    Você paga menos por kit do que em qualquer outro lugar
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Um kit de Desparafit custa <strong>R$497</strong> no site da H9 Pharma. Aqui, agora, ele sai por{' '}
                    <strong className="text-[#14532d]">R$147</strong>. É o mesmo produto, a mesma fórmula, o mesmo protocolo. Você só está pagando menos porque está pegando ele aqui, junto com o seu pedido.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#14532d] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
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
                  <a href="#" payt_action="oneclick_buy" data-object="${paytObj}" style="display: block; margin: 0 auto; width: 100%; max-width: 460px; padding: 22px 24px; background: #16a34a; color: #ffffff; text-align: center; font-size: 20px; font-weight: 800; letter-spacing: 0.01em; border-radius: 12px; box-shadow: 0 6px 24px rgba(22,163,74,0.35); text-decoration: none; text-transform: uppercase; line-height: 1.25;">
                    👉 ${ctaLabel}
                  </a>
                </div>
              `
            }}
          />
        </div>
      </section>

      {/* Depoimentos (placeholders — aguardando fotos/copy do cliente) */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 mb-8">
            Veja o que nossas clientes estão dizendo
          </h3>
          <div className="space-y-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" aria-hidden />
                  <div>
                    <div className="flex gap-0.5 text-yellow-400">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      [Nome da cliente] · Cliente fiel do Desparafit
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">
                  [Depoimento em breve]
                </p>
              </div>
            ))}
          </div>
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
