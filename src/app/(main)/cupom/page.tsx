'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CupomPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Logo H9 Pharma */}
        <section className="px-4 pt-8 pb-2 flex justify-center">
          <Image
            src="/images/logo-h9.png"
            alt="H9 Pharma"
            width={160}
            height={60}
            className="object-contain"
          />
        </section>

        {/* Headline */}
        <section className="px-4 pt-4 pb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            Parabéns, você ganhou um desconto de 5% para finalizar sua compra do Desparafit! 🎉
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-2 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Escolha qual kit você quer, o cupom já vai estar aplicado.
          </p>
        </section>

        {/* 3 Kits */}
        <section className="px-4 py-4 space-y-4">
          <a href="https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de?split=12&coupon=PRESENTE" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/3-kits-cupom.png"
                alt="3 Kits Desparafit - 12x R$78,31 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* 2 Kits */}
          <a href="https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12&coupon=PRESENTE#" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/2-kits-cupom.png"
                alt="2 Kits Desparafit - 12x R$58,66 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* 1 Kit */}
          <a href="https://checkout.payt.com.br/c11d395593428f094fcb4b279f1ef839?split=12&coupon=PRESENTE#" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/1-kit-cupom.png"
                alt="1 Kit Desparafit - 12x R$34 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>
        </section>

        {/* O que é o Desparafit */}
        <section className="px-4 pt-8 pb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">O que é o Desparafit?</h2>
            <p className="text-sm text-gray-700 leading-relaxed text-center mb-4">
              O Desparafit é um protocolo de desparasitação da H9 Pharma que atua em duas frentes:
            </p>
            <div className="space-y-2 max-w-md mx-auto">
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <span className="flex-shrink-0">👉</span>
                <span>Na <strong>reorganização intestinal</strong> (desparasitação)</span>
              </p>
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <span className="flex-shrink-0">👉</span>
                <span>Na <strong>reestruturação do organismo</strong> (detox intestinal)</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4 leading-relaxed">
              Possibilitando o emagrecimento mais rápido além de diversos outros benefícios à saúde.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pt-4 pb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-3">
            <FaqItem
              question="Quanto tempo até eu ver os primeiros resultados?"
              answer="Isso varia de pessoa pra pessoa. Mas a maioria das mulheres começa a sentir diferença já na primeira semana — a barriga desinchando, a energia voltando, aquela fome descontrolada começando a se acalmar. Na segunda semana, a balança já começa a descer. Os resultados completos acontecem entre 30 e 60 dias. E o aplicativo te acompanha dia a dia, mostra seu progresso e te mantém motivada durante todo o processo."
            />
            <FaqItem
              question="Posso tomar o Desparafit junto com meus remédios?"
              answer="Sim, pode. O Desparafit é 100% natural. Não tem droga, não tem químico agressivo, nada que interfira com medicações convencionais. Muitas das nossas clientes estão em tratamento para diabetes, hipertensão, colesterol alto e continuam tomando seus remédios normalmente. Se você toma medicação controlada, é sempre bom avisar seu médico — não porque o Desparafit vá fazer mal, mas porque conforme seu corpo melhora, seu médico pode até ajustar suas dosagens."
            />
            <FaqItem
              question="Preciso fazer dieta restritiva? Vou ter que passar fome?"
              answer="Não. O Desparafit trabalha removendo a CAUSA da fome descontrolada — os parasitas que estão bloqueando seu GLP-1 e roubando seus nutrientes. Quando você elimina eles, a fome se acalma naturalmente. Você come menos porque seu corpo pede menos, não porque está se forçando. O aplicativo tem receitas, cardápios e dicas de alimentação, mas não é obrigatório. Você pode comer comida de verdade, ter uma vida normal e mesmo assim ver a balança descer."
            />
            <FaqItem
              question="É seguro? Tem efeitos colaterais?"
              answer="Totalmente seguro. Todos os ingredientes são naturais, testados, aprovados pela ANVISA e usados há séculos na medicina tradicional — cravo, abóbora, orégano, cúrcuma, hortelã. Nos primeiros dias, algumas pessoas sentem um leve desconforto intestinal, gases ou cólica leve. Isso NÃO é efeito colateral — é sinal de que está funcionando. Os parasitas estão sendo eliminados e seu intestino está se limpando. A hortelã da terceira fase acalma tudo e deixa o processo suave."
            />
            <FaqItem
              question="Como eu sei que vai funcionar no MEU caso?"
              answer="Se você tem excesso de peso que não sai de jeito nenhum, sente fome o tempo todo, barriga sempre inchada, e já tentou dieta, exercício e remédio sem resultado — as chances de ter parasitas sabotando seu corpo são altíssimas. O Desparafit foi feito exatamente pra isso. E se mesmo assim você não ver resultado após seguir o protocolo direitinho por 60 dias, você tem a garantia 'Transformação ou Seu Dinheiro de Volta'. É só mandar um e-mail e a gente devolve 100%. Todo o risco é nosso."
            />
            <FaqItem
              question="Meu intestino é sensível. Vou passar mal?"
              answer="Na verdade, é o contrário. Muitas mulheres com intestino sensível sentem uma melhora enorme, porque o problema não era o intestino em si — era a infestação parasitária irritando a parede intestinal. Quando você elimina os parasitas e reconstrói a mucosa (que é o que a terceira e quarta fase fazem), seu intestino finalmente funciona direito: regular, sem cólica, sem inchaço. Nos primeiros dias pode ter algum desconforto leve, mas a hortelã está lá justamente pra acalmar tudo."
            />
            <FaqItem
              question="Por quanto tempo preciso tomar? Vou depender disso pro resto da vida?"
              answer="Não. O Desparafit é um protocolo de limpeza e blindagem. Você faz o ciclo mínimo de 60 dias, ou idealmente 6 meses para resultados maiores e permanentes, e seu corpo volta ao normal. Não é um remédio que você toma pra sempre. Você elimina os parasitas, desintoxica, reconstrói o intestino e blinda contra reinfestação. Depois, seu metabolismo volta a queimar gordura, sua saciedade funciona e seu peso se estabiliza. A maioria das mulheres faz o tratamento uma vez e mantém os resultados."
            />
            <FaqItem
              question="Quanto custa o frete? Demora muito pra chegar?"
              answer="O frete é GRÁTIS pra qualquer lugar do Brasil. A entrega normalmente chega em 7 a 10 dias úteis, dependendo da sua região — às vezes até antes. E você acompanha tudo pelo código de rastreamento que mandamos no seu e-mail assim que despachar. Sem surpresas, sem demora."
            />
            <FaqItem
              question="É seguro comprar pelo site? Meus dados estão protegidos?"
              answer="Sim, totalmente seguro. O pagamento é processado pela PayT, uma das maiores e mais confiáveis plataformas de pagamento do Brasil. Eles usam a mesma criptografia de banco. Seus dados não ficam armazenados em lugar nenhum. Você pode pagar com cartão (parcelado em até 12x) ou Pix. E a garantia cobre qualquer problema — se não ficar satisfeita, é só pedir reembolso. Sem burocracia."
            />
            <FaqItem
              question="E se eu esquecer de tomar algum dia? Estraga tudo?"
              answer="Não estraga. O ideal é seguir direitinho, tomar todos os dias nas fases corretas. Mas se você pular um dia, não vai zerar seu progresso. O protocolo foi desenhado pra ser resiliente. O que importa é a consistência ao longo do tempo, não a perfeição absoluta. E o aplicativo te ajuda nisso — ele te lembra quando tomar, te mantém no ritmo e te orienta se tiver alguma dúvida. É como ter um profissional do seu lado, 24/7."
            />
          </div>
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-800 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-[#2ec6a8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
