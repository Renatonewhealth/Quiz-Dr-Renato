/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import StickyCTA from './StickyCTA';
import FaqItem from './FaqItem';

export const metadata: Metadata = {
  title: 'Desparafit · H9 Pharma',
  description:
    'Protocolo natural de 4 fases que ataca a causa oculta por trás do peso que não desce. Recomendado pelo Dr. Renato Silveira Reis.',
};

/* ---------- Placeholder helpers ---------- */
function Placeholder({
  label,
  className = '',
  aspect = 'aspect-square',
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center p-4 ${aspect} ${className}`}
    >
      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

function SelPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#14532d]/5 border border-[#14532d]/20 rounded-full flex items-center justify-center">
        <span className="text-[9px] text-[#14532d]/60 font-semibold text-center leading-tight px-1">
          SELO
        </span>
      </div>
      <p className="text-[13px] sm:text-sm text-gray-700 font-medium leading-tight max-w-[9rem]">
        {label}
      </p>
    </div>
  );
}

/* ---------- Ingredient card ---------- */
function Ingredient({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-14 h-14 flex-shrink-0 bg-[#14532d]/5 border border-[#14532d]/20 rounded-full flex items-center justify-center">
        <span className="text-[9px] text-[#14532d]/60 font-semibold">ÍCONE</span>
      </div>
      <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed flex-1">
        <strong className="text-gray-900">{name}:</strong> {text}
      </p>
    </div>
  );
}

/* ---------- Phase card ---------- */
function PhaseCard({
  n,
  title,
  period,
  usage,
  text,
  imgLabel,
}: {
  n: number;
  title: string;
  period: string;
  usage: string;
  text: string;
  imgLabel: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <div className="bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center justify-center p-4">
          <Placeholder label={imgLabel} className="w-full max-w-[160px] aspect-square" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-[#14532d] text-white text-sm font-bold flex items-center justify-center">
              {n}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-[#c9a961] font-semibold">
              {period}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-[15px] sm:text-base text-[#14532d] font-semibold mb-3">
            {usage}
          </p>
          <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bonus card ---------- */
function BonusCard({ title, value, text }: { title: string; value: string; text: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <Placeholder label="600 × 400" aspect="aspect-[3/2]" className="rounded-none rounded-t-2xl border-0 border-b border-gray-200" />
      <div className="p-5">
        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#c9a961] font-semibold mb-1">
          {value}
        </p>
        <h4 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{title}</h4>
        <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed">{text}</p>
      </div>
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
            O protocolo natural de 4 fases que ataca a causa oculta por trás do{' '}
            <span className="text-[#14532d]">peso que não desce</span>
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
              {/* Foto do kit */}
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

              {/* Info */}
              <div className="order-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="text-yellow-500 tracking-tight text-lg">★★★★★</span>
                  <span className="text-sm text-gray-600">
                    Mais de <strong>10.000 mulheres</strong> já são clientes
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Desparafit. O primeiro protocolo completo de{' '}
                  <span className="text-[#14532d]">
                    desparasitação e emagrecimento
                  </span>{' '}
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
            <SelPlaceholder label="Frete grátis para todo o Brasil" />
            <SelPlaceholder label="Garantia de 60 dias" />
            <SelPlaceholder label="Ingredientes aprovados pela ANVISA" />
            <SelPlaceholder label="Pagamento 100% seguro" />
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

      {/* ============ BLOCO 4: O PROTOCOLO ============ */}
      <section id="protocolo" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
              Por que 4 fases, e não uma cápsula única
            </h2>
            <p className="text-[18px] sm:text-lg text-gray-700 leading-relaxed">
              Os vermífugos comuns eliminam apenas os vermes adultos. Ovos e larvas
              sobrevivem, e o problema volta. O Desparafit trabalha com o eugenol do
              cravo-da-índia, o único ativo natural capaz de eliminar o parasita em todas
              as fases do ciclo, dentro de um protocolo que{' '}
              <strong className="text-[#14532d]">prepara, ataca, limpa e blinda</strong>.
            </p>
          </div>

          <div className="space-y-5">
            <PhaseCard
              n={1}
              period="Fase 1: Preparação · Dia 1"
              title="Elixir Desparafit"
              usage="30ml, uma única vez."
              text="Prepara o fígado para o tratamento e garante conforto nas fases seguintes."
              imgLabel="Elixir 400×400"
            />
            <PhaseCard
              n={2}
              period="Fase 2: Ataque · Dia 2 ao 12"
              title="Tônico Desparafit"
              usage="5ml após o almoço e após o jantar."
              text="A maior concentração de eugenol do mercado elimina ovos, larvas e adultos de uma só vez. Na primeira semana, a maioria das clientes relata a barriga desinchando e a fome se acalmando."
              imgLabel="Tônico 400×400"
            />
            <PhaseCard
              n={3}
              period="Fase 3: Limpeza · Dia 13 ao 30"
              title="Drops Desparafit"
              usage="20 gotas antes do jantar."
              text="Neutraliza as toxinas dos parasitas eliminados e repara a parede intestinal. Muitas mulheres eliminam entre 5 e 10 quilos nessa fase."
              imgLabel="Drops 400×400"
            />
            <PhaseCard
              n={4}
              period="Fase 4: Blindagem · Dia 31 ao 60"
              title="Chá Desparafit"
              usage="1 dosador em 100ml de água após o jantar."
              text="Fortalece a microbiota e cria uma barreira contra novos parasitas. É onde o resultado se consolida, sem efeito sanfona."
              imgLabel="Chá 400×400"
            />
          </div>

          <p className="mt-10 text-center text-[18px] sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Ao final dos 60 dias, a maioria das mulheres elimina{' '}
            <strong className="text-[#14532d]">entre 10 e 15 quilos</strong>, sem dieta
            restritiva e sem medicamento pesado.
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
              name="Cravo-da-índia"
              text="fonte de eugenol em alta concentração, importado e testado duas vezes por lote."
            />
            <Ingredient
              name="Semente de abóbora"
              text="auxilia na eliminação dos parasitas adultos."
            />
            <Ingredient name="Orégano" text="ação antimicrobiana na fase de ataque." />
            <Ingredient name="Cúrcuma" text="suporte ao fígado durante a limpeza." />
            <Ingredient name="Hortelã" text="acalma o intestino e suaviza o processo." />
          </div>

          {/* Aplicativo */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-[300px_1fr] gap-0">
              <div className="bg-gradient-to-b from-[#14532d]/5 to-white flex items-center justify-center p-6">
                <Placeholder label="Mockup 400 × 800" aspect="aspect-[1/2]" className="max-w-[220px]" />
              </div>
              <div className="p-6 sm:p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
                  Bônus incluso
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  Todo kit acompanha o Aplicativo Desparafit
                </h3>
                <p className="text-[17px] sm:text-base text-gray-700 leading-relaxed mb-4">
                  Protocolo guiado dia a dia, assistente Dr. Renato IA disponível 24
                  horas, receitas e cardápios prontos, Scanner de Calorias e a
                  Universidade do Bem-Estar com aulas em vídeo.
                </p>
                <p className="text-[16px] sm:text-base text-[#14532d] font-semibold">
                  Recursos que custariam mais de R$500 por mês, inclusos em qualquer kit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOCO 6: QUEM RECOMENDA ============ */}
      <section id="dr-renato" className="px-4 sm:px-6 py-14 sm:py-20 bg-[#14532d]/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,1fr)_1.4fr] gap-8 md:gap-12 items-center">
            <div>
              <Placeholder label="Foto Dr. Renato 600×800" aspect="aspect-[3/4]" className="max-w-sm mx-auto" />
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

      {/* ============ BLOCO 7: OFERTA ============ */}
      <section id="kits" className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
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

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {/* CARD 1 — 3 KITS (recomendado) */}
            <div className="md:col-span-3 lg:col-span-1 lg:order-1 order-1">
              <div className="relative bg-white border-2 border-[#14532d] rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-[#14532d] text-white text-center text-xs sm:text-sm font-bold py-2.5 tracking-wider uppercase">
                  Recomendado
                </div>
                <div className="p-6 sm:p-7">
                  <div className="text-center mb-5">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">
                      Protocolo 3 Kits
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      6 meses de tratamento
                    </p>
                  </div>

                  <Placeholder label="Imagem 3 Kits" className="mb-5 max-w-[240px] mx-auto" />

                  <div className="text-center mb-5">
                    <p className="text-sm text-gray-400 line-through mb-1">
                      De R$ 1.491
                    </p>
                    <p className="text-4xl sm:text-5xl font-black text-[#14532d] leading-none mb-2">
                      R$ 797
                    </p>
                    <p className="text-base text-gray-700 font-semibold">
                      ou 12x de R$ 79,34
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-[15px] sm:text-base text-gray-700">
                    {[
                      'Transformação completa e permanente',
                      'Aplicativo Desparafit incluso',
                      'Frete grátis',
                      'Bônus 1 e Bônus 2 inclusos',
                    ].map((f) => (
                      <li key={f} className="flex gap-2.5 items-start">
                        <span className="text-[#14532d] font-bold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#checkout-kit-3"
                    className="block w-full text-center bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold text-[15px] sm:text-base py-4 px-4 rounded-xl transition-colors"
                  >
                    GARANTIR PROTOCOLO DE 6 MESES
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 2 — 2 KITS */}
            <div className="lg:order-2 order-2">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="text-center mb-5">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">
                      Protocolo 2 Kits
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      4 meses de tratamento
                    </p>
                  </div>

                  <Placeholder label="Imagem 2 Kits" className="mb-5 max-w-[220px] mx-auto" />

                  <div className="text-center mb-5">
                    <p className="text-sm text-gray-400 line-through mb-1">De R$ 994</p>
                    <p className="text-4xl font-black text-gray-900 leading-none mb-2">
                      R$ 597
                    </p>
                    <p className="text-base text-gray-700 font-semibold">
                      ou 12x de R$ 59,43
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-[15px] sm:text-base text-gray-700 flex-1">
                    {[
                      'Aplicativo Desparafit incluso',
                      'Frete grátis',
                      'Bônus 1 e Bônus 2 inclusos',
                    ].map((f) => (
                      <li key={f} className="flex gap-2.5 items-start">
                        <span className="text-[#14532d] font-bold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#checkout-kit-2"
                    className="block w-full text-center bg-gray-900 hover:bg-black text-white font-bold text-[15px] sm:text-base py-4 px-4 rounded-xl transition-colors mt-auto"
                  >
                    GARANTIR PROTOCOLO DE 4 MESES
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 3 — 1 KIT */}
            <div className="lg:order-3 order-3">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="text-center mb-5">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">
                      Protocolo 1 Kit
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      60 dias de tratamento
                    </p>
                  </div>

                  <Placeholder label="Imagem 1 Kit" className="mb-5 max-w-[220px] mx-auto" />

                  <div className="text-center mb-5">
                    <p className="text-sm text-gray-400 line-through mb-1">De R$ 497</p>
                    <p className="text-4xl font-black text-gray-900 leading-none mb-2">
                      R$ 347
                    </p>
                    <p className="text-base text-gray-700 font-semibold">
                      ou 12x de R$ 34,55
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-[15px] sm:text-base text-gray-700 flex-1">
                    {['Aplicativo Desparafit incluso', 'Frete grátis'].map((f) => (
                      <li key={f} className="flex gap-2.5 items-start">
                        <span className="text-[#14532d] font-bold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#checkout-kit-1"
                    className="block w-full text-center bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-[15px] sm:text-base py-4 px-4 rounded-xl transition-colors mt-auto"
                  >
                    GARANTIR PROTOCOLO DE 60 DIAS
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Por que 6 meses */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-12 sm:mb-16">
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
            <div className="grid sm:grid-cols-2 gap-6">
              <BonusCard
                title="Treinamento Jejum Termogênico"
                value="Bônus 1 · valor de R$ 297"
                text="Treinamento em vídeo com o Dr. Renato sobre como usar o jejum de forma segura para acelerar a queima de gordura após a desparasitação."
              />
              <BonusCard
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
              <div className="mx-auto">
                <Placeholder label="Selo Garantia 300×300" aspect="aspect-square" className="max-w-[200px]" />
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
                  experimentar por nossa conta e risco. Se seguir o protocolo como indicado
                  no aplicativo e não sentir a barriga desinchando, a fome controlada e a
                  balança descendo, basta enviar um e-mail para{' '}
                  <strong className="text-[#14532d]">suporte@desparafit.com.br</strong> e
                  devolvemos 100% do valor. Sem perguntas e sem burocracia, para qualquer
                  quantidade de kits.
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
                  Sim. A fórmula é 100% natural e compatível com medicações convencionais.
                  Se você toma medicação controlada, recomendamos avisar seu médico, como
                  em qualquer protocolo.
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
                  aprovados pela ANVISA. Nos primeiros dias pode haver um leve desconforto
                  intestinal, sinal de que a eliminação está acontecendo. A hortelã da
                  fase de Limpeza suaviza o processo.
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
                CNPJ · 00.000.000/0000-00
                <br />
                Suporte:{' '}
                <a href="mailto:suporte@desparafit.com.br" className="underline">
                  suporte@desparafit.com.br
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-sm">
              <Link href="/politica-de-privacidade" className="text-gray-600 hover:text-gray-900 underline">
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
