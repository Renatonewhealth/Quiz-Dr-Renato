/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Truck,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Flower2,
  Sprout,
  Leaf,
  Flame,
  Award,
  Smartphone,
} from 'lucide-react';
import StickyCTA from './StickyCTA';
import FaqItem from './FaqItem';

export const metadata: Metadata = {
  title: 'Desparafit · H9 Pharma',
  description:
    'Protocolo natural de 4 fases que ataca a causa oculta por trás do peso que não desce. Recomendado pelo Dr. Renato Silveira Reis.',
};

/* ---------- Small helpers ---------- */
function Seal({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#14532d]/8 border border-[#14532d]/20 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#14532d]" strokeWidth={2} />
      </div>
      <p className="text-[13px] sm:text-sm text-gray-700 font-medium leading-tight max-w-[9rem]">
        {label}
      </p>
    </div>
  );
}

function Ingredient({
  icon: Icon,
  color,
  name,
  text,
}: {
  icon: React.ElementType;
  color: string;
  name: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-6 h-6" style={{ color }} strokeWidth={2} />
      </div>
      <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed flex-1">
        <strong className="text-gray-900">{name}:</strong> {text}
      </p>
    </div>
  );
}

/* ---------- Modo de uso card ---------- */
function UsageCard({
  emoji,
  product,
  size,
  dosage,
  timing,
}: {
  emoji: string;
  product: string;
  size: string;
  dosage: string;
  timing: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-3xl sm:text-4xl flex-shrink-0 leading-none">{emoji}</div>
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              {product}
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-0.5">{size}</p>
          </div>
          <p className="text-[16px] sm:text-base text-gray-800 leading-relaxed mb-2">
            {dosage}
          </p>
          <p className="text-[14px] sm:text-sm text-[#14532d] italic leading-relaxed">
            {timing}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bonus card ---------- */
function BonusCard({
  icon: Icon,
  title,
  value,
  text,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7">
      <div className="w-12 h-12 rounded-full bg-[#c9a961]/15 border border-[#c9a961]/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#c9a961]" strokeWidth={2} />
      </div>
      <p className="text-xs sm:text-sm uppercase tracking-wider text-[#c9a961] font-semibold mb-2">
        {value}
      </p>
      <h4 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{title}</h4>
      <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

/* ============================================================
    PAGE
   ============================================================ */
export default function DesparafitPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Top bar */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-[#14532d] tracking-tight text-lg">
            H9 <span className="text-gray-900 font-normal">PHARMA</span>
          </span>
          <a
            href="#kits"
            className="hidden sm:inline-flex items-center bg-[#14532d] hover:bg-[#0f3d21] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            QUERO MEU KIT
          </a>
        </div>
      </header>

      {/* ============ BLOCO 1: HEADLINE ============ */}
      <section id="hero-headline" className="px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-4">
            H9 PHARMA
          </p>
          <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
            <span className="text-[#14532d]">DESPARAFIT</span> — O protocolo natural de 4
            fases que ataca a causa oculta por trás do peso que não desce
          </h1>
          <p className="text-[18px] sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Recomendado pelo Dr. Renato Silveira Reis, farmacêutico e especialista em
            medicina natural seguido por mais de 14 milhões de pessoas, o Desparafit
            elimina os parasitas que sabotam o emagrecimento, desintoxica o organismo e
            blinda o corpo contra a reinfestação em um ciclo de 60 dias.
          </p>
        </div>
      </section>

      {/* ============ BLOCO 2: HERO ECOM ============ */}
      <section id="hero-produto" className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 p-6 sm:p-10 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-1">
                <div className="relative w-full max-w-md mx-auto aspect-square">
                  <Image
                    src="/images/desparafit-kit-hero.png"
                    alt="Desparafit Kit Completo — 4 fases"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="order-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="text-yellow-500 tracking-tight text-lg">★★★★★</span>
                  <span className="text-sm text-gray-600">
                    Mais de <strong>10.000 mulheres</strong> já são clientes
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Desparafit. O primeiro protocolo completo de{' '}
                  <span className="text-[#14532d]">desparasitação e emagrecimento</span>{' '}
                  do Brasil.
                </h2>
                <p className="text-[17px] sm:text-base text-gray-600 leading-relaxed mb-6">
                  Disponível em protocolos de 1, 2 e 3 kits.
                </p>
                <a
                  href="#kits"
                  className="inline-block w-full sm:w-auto bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-colors shadow-sm"
                >
                  QUERO MEU KIT
                </a>
              </div>
            </div>
          </div>

          {/* Faixa de selos */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <Seal icon={Truck} label="Frete grátis para todo o Brasil" />
            <Seal icon={ShieldCheck} label="Garantia de 60 dias" />
            <Seal icon={BadgeCheck} label="Ingredientes aprovados pela ANVISA" />
            <Seal icon={Lock} label="Pagamento 100% seguro" />
          </div>
        </div>
      </section>

      {/* ============ BLOCO 3: A CAUSA ============ */}
      <section id="causa" className="px-4 sm:px-6 py-14 sm:py-20 bg-gray-50">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Por que dieta e exercício não resolveram
          </h2>
          <div className="space-y-5 text-[18px] sm:text-lg text-gray-700 leading-relaxed">
            <p>
              Se você já tentou dietas, exercícios, chás e até medicamentos, e o peso não
              sai ou volta pior, existe uma explicação que não tem nada a ver com
              disciplina.
            </p>
            <p>
              Uma parcela enorme da população adulta convive com parasitas intestinais sem
              saber, sem nenhum sintoma clássico. Apenas efeitos silenciosos que se
              confundem com metabolismo lento: fome constante, barriga inchada, cansaço
              que não passa e um peso que não desce.
            </p>
            <p>A infestação sabota o emagrecimento em quatro frentes:</p>
          </div>

          <ul className="mt-8 space-y-5">
            {[
              {
                t: 'Fígado sobrecarregado.',
                d: 'Ocupado filtrando toxinas, ele deixa de queimar gordura com eficiência.',
              },
              {
                t: 'Fome que não passa.',
                d: 'Os parasitas consomem seus nutrientes primeiro e interferem no GLP-1, o hormônio da saciedade.',
              },
              {
                t: 'Inchaço e retenção.',
                d: 'As toxinas liberadas no intestino fazem o corpo reter líquido e armazenar gordura como defesa.',
              },
              {
                t: 'Reinfestação.',
                d: 'Ovos e larvas sobrevivem aos tratamentos comuns, e em poucas semanas o ciclo recomeça.',
              },
            ].map((item) => (
              <li key={item.t} className="flex gap-4 items-start">
                <span className="mt-1 w-6 h-6 flex-shrink-0 rounded-full bg-[#14532d] text-white text-xs font-bold flex items-center justify-center">
                  ✓
                </span>
                <p className="text-[18px] sm:text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">{item.t}</strong> {item.d}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[19px] sm:text-xl font-semibold text-gray-900 leading-snug border-l-4 border-[#c9a961] pl-5">
            Dieta e exercício atacam a consequência. O Desparafit ataca a causa.
          </p>
        </div>
      </section>

      {/* ============ BLOCO 4: MODO DE USO (era "protocolo") ============ */}
      <section id="protocolo" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
              Por que 4 fases, e não uma cápsula única
            </h2>
            <p className="text-[18px] sm:text-lg text-gray-700 leading-relaxed">
              Os vermífugos comuns eliminam apenas os vermes adultos. Ovos e larvas
              sobrevivem, e o problema volta. O Desparafit trabalha com o eugenol do
              cravo-da-índia, o único ativo natural capaz de eliminar o parasita em todas
              as fases do ciclo.
            </p>
          </div>

          {/* Modo de Uso do Desparafit */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-2">
                Modo de uso do Desparafit
              </p>
              <p className="text-[18px] sm:text-lg font-bold text-gray-900">
                Começar todos juntos:
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <UsageCard
                emoji="🟢"
                product="Desparafit sachê"
                size="(3 unidades)"
                dosage="Diluir, misturar e consumir 5g (1 sachê) em 100ml de água 1 vez ao dia por 3 dias."
                timing="Consumir, preferencialmente, de manhã, em jejum."
              />
              <UsageCard
                emoji="💧"
                product="Desparafit gotas"
                size="(30ml)"
                dosage="Ingerir 1ml (12 gotas) ao dia por 30 dias."
                timing="Consumir, preferencialmente, todas as manhãs."
              />
              <UsageCard
                emoji="🍵"
                product="Desparafit blend de chás"
                size="(180g)"
                dosage="Diluir, misturar e consumir 3g (1 dosador) em 100ml de água 1 vez ao dia por 60 dias."
                timing="Consumir a qualquer horário do dia."
              />
            </div>
          </div>

          <p className="mt-10 text-center text-[18px] sm:text-lg text-gray-700 leading-relaxed">
            Ao final dos 60 dias, várias mulheres eliminaram{' '}
            <strong className="text-[#14532d]">entre 10 e 15 quilos</strong>, seguindo o
            protocolo físico mais as nossas recomendações.
          </p>
        </div>
      </section>

      {/* ============ BLOCO 5: COMPOSIÇÃO + APLICATIVO ============ */}
      <section id="composicao" className="px-4 sm:px-6 py-14 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3 tracking-tight text-center">
            Ingredientes naturais, testados em laboratório independente
          </h2>
          <p className="text-[15px] text-gray-500 text-center mb-10">
            Sem químicos agressivos, sem estimulantes, compatível com medicações
            convencionais.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-16">
            <Ingredient
              icon={Flower2}
              color="#8b6b3d"
              name="Cravo-da-índia"
              text="fonte de eugenol em alta concentração, importado e testado duas vezes por lote."
            />
            <Ingredient
              icon={Sprout}
              color="#4a7c2e"
              name="Semente de abóbora"
              text="auxilia na eliminação dos parasitas adultos."
            />
            <Ingredient
              icon={Leaf}
              color="#3f6e4c"
              name="Orégano"
              text="ação antimicrobiana na fase de ataque."
            />
            <Ingredient
              icon={Flame}
              color="#c9722d"
              name="Cúrcuma"
              text="suporte ao fígado durante a limpeza."
            />
            <Ingredient
              icon={Leaf}
              color="#3a9b60"
              name="Hortelã"
              text="acalma o intestino e suaviza o processo."
            />
          </div>

          {/* Aplicativo */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 sm:p-10">
              <div className="w-16 h-16 rounded-2xl bg-[#14532d]/8 border border-[#14532d]/20 flex items-center justify-center mb-5">
                <Smartphone className="w-8 h-8 text-[#14532d]" strokeWidth={1.75} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
                Bônus incluso
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
                Todo kit acompanha o Aplicativo Desparafit
              </h3>
              <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed mb-4">
                Protocolo guiado dia a dia, assistente Dr. Renato IA disponível 24 horas,
                receitas e cardápios prontos, Scanner de Calorias e a Universidade do
                Bem-Estar com aulas em vídeo.
              </p>
              <p className="text-[16px] sm:text-base text-[#14532d] font-semibold">
                Recursos que custariam mais de R$500 por mês, inclusos em qualquer kit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOCO 6: QUEM RECOMENDA ============ */}
      <section id="dr-renato" className="px-4 sm:px-6 py-14 sm:py-20 bg-[#14532d]/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,1fr)_1.4fr] gap-8 md:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                <Image
                  src="/images/dr-renato-portrait.jpg"
                  alt="Dr. Renato Silveira Reis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 320px"
                />
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
                Quem recomenda
              </p>
              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
                Recomendado pelo Dr. Renato Silveira Reis
              </h2>
              <div className="space-y-4 text-[18px] sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  Farmacêutico e especialista em nutriendocrinologia e medicina natural,
                  o Dr. Renato é acompanhado por{' '}
                  <strong className="text-gray-900">
                    mais de 14 milhões de pessoas
                  </strong>{' '}
                  nas redes sociais e já foi destaque na Record TV e nos maiores podcasts
                  de saúde do país.
                </p>
                <p>
                  Depois de anos estudando a relação entre parasitas intestinais e a
                  dificuldade de emagrecer, ele recomenda o Desparafit como o único
                  protocolo do Brasil que trata a infestação em todas as fases do ciclo,
                  da eliminação à blindagem contra a reinfestação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOCO 7: OFERTA — 3 IMAGENS EMPILHADAS ============ */}
      <section id="kits" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
              Campanha Expulsando Parasitas
            </p>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              Escolha o seu protocolo
            </h2>
            <p className="text-[17px] sm:text-base text-gray-600 leading-relaxed">
              O Desparafit não é vendido em farmácias. A H9 Pharma entrega direto para
              você, sem intermediários.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {/* 3 KITS (primeiro) */}
            <a
              href="https://checkout.payt.com.br/838cd666164b001315f48795964cb7fe?split=12"
              className="block relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <Image
                src="/images/desparafit-3-kits.png"
                alt="3 Kits Desparafit — 180 dias"
                width={1500}
                height={2000}
                className="w-full h-auto"
                priority
              />
            </a>

            {/* 2 KITS */}
            <a
              href="https://checkout.payt.com.br/f4a58c21d66c3ab9a542ad7d7e686bb8?split=12"
              className="block relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <Image
                src="/images/desparafit-2-kits.png"
                alt="2 Kits Desparafit — 120 dias"
                width={1500}
                height={2000}
                className="w-full h-auto"
              />
            </a>

            {/* 1 KIT */}
            <a
              href="https://checkout.payt.com.br/691492f0b5365a80de601b8243ca5ebb?split=12"
              className="block relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <Image
                src="/images/desparafit-1-kit.png"
                alt="1 Kit Desparafit — 60 dias"
                width={1500}
                height={2000}
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Por que 6 meses */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-12 sm:mt-14 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 leading-tight">
              Por que a maioria escolhe o protocolo de 6 meses
            </h3>
            <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed">
              O kit de 60 dias elimina os parasitas e o peso começa a descer. Mas é a
              partir do terceiro mês que o corpo se regenera de verdade: pele mais firme,
              metabolismo estável e peso mantido sem efeito sanfona. Mais da metade das
              clientes garante a transformação completa de uma vez, sem depender de
              reposição de estoque no meio do tratamento.
            </p>
          </div>

          {/* Bônus */}
          <div>
            <div className="text-center mb-8">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-2">
                Exclusivo protocolo 2 e 3 kits
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Bônus para quem garante 2 kits ou mais
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <BonusCard
                icon={Flame}
                title="Treinamento Jejum Termogênico"
                value="Bônus 1 · valor de R$ 297"
                text="Treinamento em vídeo com o Dr. Renato sobre como usar o jejum de forma segura para acelerar a queima de gordura após a desparasitação."
              />
              <BonusCard
                icon={Award}
                title="Clube das Receitas + Comunidade VIP"
                value="Bônus 2 · valor de R$ 497"
                text="Acesso vitalício ao acervo do Dr. Renato com centenas de receitas e protocolos naturais, mais a comunidade privada no WhatsApp com cupons e sorteios exclusivos."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOCO 8: GARANTIA ============ */}
      <section id="garantia" className="px-4 sm:px-6 py-14 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-[#c9a961]/40 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-10 items-center">
              <div className="flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#c9a961]/10 border-2 border-[#c9a961]/40 flex flex-col items-center justify-center text-center p-4">
                  <ShieldCheck
                    className="w-14 h-14 sm:w-16 sm:h-16 text-[#c9a961] mb-2"
                    strokeWidth={1.5}
                  />
                  <p className="text-xs uppercase tracking-wider text-[#c9a961] font-bold leading-tight">
                    Garantia
                    <br />
                    60 dias
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
                  Garantia 60 dias
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Transformação ou seu dinheiro de volta
                </h2>
                <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed">
                  Você tem 60 dias completos, o ciclo inteiro do protocolo, para
                  experimentar por nossa conta e risco. Se seguir o protocolo como
                  indicado no aplicativo e não sentir a barriga desinchando, a fome
                  controlada e a balança descendo, basta enviar um e-mail para{' '}
                  <strong className="text-[#14532d]">
                    suporte@desparafit.com.br
                  </strong>{' '}
                  e devolvemos 100% do valor. Sem perguntas e sem burocracia, para
                  qualquer quantidade de kits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOCO 9: FAQ ============ */}
      <section id="faq" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-8 tracking-tight text-center">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            <FaqItem
              defaultOpen
              question="Quanto tempo até os primeiros resultados?"
              answer={
                <p>
                  A maioria das clientes sente diferença na primeira semana: barriga
                  desinchando, energia voltando, fome se acalmando. Os resultados
                  completos aparecem entre 30 e 60 dias, com acompanhamento diário pelo
                  aplicativo.
                </p>
              }
            />
            <FaqItem
              question="Posso tomar junto com meus remédios?"
              answer={
                <p>
                  Sim. A fórmula é 100% natural e compatível com medicações
                  convencionais. Se você toma medicação controlada, recomendamos avisar
                  seu médico, como em qualquer protocolo.
                </p>
              }
            />
            <FaqItem
              question="Preciso fazer dieta restritiva?"
              answer={
                <p>
                  Não. O protocolo remove a causa da fome descontrolada. Quando os
                  parasitas são eliminados, você come menos porque seu corpo pede menos.
                  O aplicativo oferece receitas para quem quiser potencializar, mas não é
                  obrigatório.
                </p>
              }
            />
            <FaqItem
              question="É seguro? Tem efeitos colaterais?"
              answer={
                <p>
                  Os ingredientes são naturais, testados em laboratório independente e
                  aprovados pela ANVISA. Nos primeiros dias pode haver um leve
                  desconforto intestinal, sinal de que a eliminação está acontecendo. A
                  hortelã da fase de Limpeza suaviza o processo.
                </p>
              }
            />
            <FaqItem
              question="Vou depender disso para sempre?"
              answer={
                <p>
                  Não. É um protocolo de limpeza e blindagem, não um remédio contínuo.
                  Você completa o ciclo e o corpo volta a funcionar sozinho. Ciclos de
                  manutenção são opcionais.
                </p>
              }
            />
            <FaqItem
              question="Quanto custa o frete? Demora para chegar?"
              answer={
                <p>
                  Frete grátis para todo o Brasil, com entrega média de 7 a 10 dias úteis
                  e código de rastreamento por e-mail.
                </p>
              }
            />
            <FaqItem
              question="É seguro comprar pelo site?"
              answer={
                <p>
                  Sim. O pagamento é processado pela PayT, com criptografia de nível
                  bancário, em até 12x no cartão ou Pix. E a garantia de 60 dias cobre
                  qualquer situação.
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* ============ BLOCO 10: FECHAMENTO ============ */}
      <section id="fechamento" className="px-4 sm:px-6 py-14 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-[680px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-3xl md:text-4xl font-black leading-tight mb-8 tracking-tight">
            Tudo que você recebe hoje
          </h2>
          <ul className="text-left space-y-4 mb-10">
            {[
              'O protocolo completo de 4 fases, o único do Brasil que elimina os parasitas do ovo ao adulto.',
              'O Aplicativo Desparafit com protocolo guiado, Dr. Renato IA, receitas, Scanner de Calorias e Universidade do Bem-Estar.',
              'Frete grátis para qualquer lugar do Brasil.',
              'Nos protocolos de 2 kits ou mais, o Treinamento Jejum Termogênico e o Clube das Receitas com a Comunidade VIP.',
              '60 dias de garantia incondicional. Ou você se transforma, ou você não paga.',
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="mt-1 text-[#c9a961] font-bold flex-shrink-0">✓</span>
                <span className="text-[18px] sm:text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#kits"
            className="inline-block w-full sm:w-auto bg-[#c9a961] hover:bg-[#b8935a] text-gray-900 font-black text-base sm:text-lg px-10 py-5 rounded-xl transition-colors tracking-wide"
          >
            QUERO GARANTIR MEU KIT AGORA
          </a>
        </div>
      </section>

      {/* ============ BLOCO 11: DISPONIBILIDADE ============ */}
      <section id="estoque" className="px-4 sm:px-6 py-10 sm:py-14 bg-[#c9a961]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[17px] sm:text-base text-gray-800 leading-relaxed mb-6">
            A produção de cada lote do Desparafit leva de 4 a 6 meses entre seleção de
            ingredientes, testes e liberação. Por isso o estoque é limitado, e o
            protocolo de 6 meses costuma esgotar primeiro. Se o botão do kit escolhido
            indicar indisponibilidade, a reposição pode levar meses.
          </p>
          <a
            href="#kits"
            className="inline-block bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
          >
            VERIFICAR DISPONIBILIDADE
          </a>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-white border-t border-gray-100 py-10 sm:py-12 pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8 mb-8 text-center sm:text-left">
            <div>
              <p className="text-lg font-bold text-[#14532d] mb-2">
                H9 <span className="text-gray-900 font-normal">PHARMA</span>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                CNPJ · 53.495.893/0002-30
                <br />
                Suporte:{' '}
                <a href="mailto:suporte@desparafit.com.br" className="underline">
                  suporte@desparafit.com.br
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-sm">
              <Link
                href="/politica-de-privacidade"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="text-gray-600 hover:text-gray-900 underline">
                Termos de Uso
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto text-center border-t border-gray-100 pt-6">
            <strong>Disclaimer:</strong> Este produto não substitui o acompanhamento
            médico. Os resultados podem variar de pessoa para pessoa. Consulte seu médico
            em caso de dúvidas sobre condições de saúde específicas.
          </p>
        </div>
      </footer>

      {/* Sticky CTA mobile */}
      <StickyCTA />
    </main>
  );
}
