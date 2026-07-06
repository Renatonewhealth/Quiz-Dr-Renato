import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Truck, ShieldCheck, Leaf, MapPin, Gift, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Protocolos H9 Pharma · Catálogo Oficial',
  description:
    'Página oficial de protocolos H9 Pharma recomendados pelo Dr. Renato Silveira Reis. Produtos com ingredientes naturais, frete grátis e garantia.',
};

/* ---------- Selo ---------- */
function Seal({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#14532d]/8 border border-[#14532d]/20 rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#14532d]" strokeWidth={2} />
      </div>
      <p className="text-[12px] sm:text-[13px] text-gray-700 font-medium leading-tight max-w-[8rem]">
        {label}
      </p>
    </div>
  );
}

/* ---------- Product card ---------- */
interface ProductCardProps {
  id: string;
  tag: string;
  name: string;
  tagline: string;
  imageSrc: string;
  copy: React.ReactNode;
  price: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** destaque especial no bloco de preço (Hairvit "compre 1 leve 2") */
  highlight?: React.ReactNode;
}

function ProductCard({
  id,
  tag,
  name,
  tagline,
  imageSrc,
  copy,
  price,
  ctaLabel,
  ctaHref,
  highlight,
}: ProductCardProps) {
  return (
    <section
      id={id}
      className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm"
    >
      <div className="grid md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
        {/* Foto */}
        <div className="bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="relative w-full max-w-xs aspect-square">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 400px"
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-bold mb-3">
            {tag}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] mb-2 tracking-tight">
            {name}
          </h2>
          <p className="text-[17px] sm:text-lg text-[#14532d] font-semibold leading-snug mb-5">
            {tagline}
          </p>

          <div className="space-y-4 text-[17px] sm:text-base text-gray-700 leading-relaxed mb-6">
            {copy}
          </div>

          {/* Preço */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
            {highlight && (
              <div className="mb-3 inline-flex items-center gap-2 bg-[#14532d] text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full">
                <Gift className="w-4 h-4" strokeWidth={2.5} />
                {highlight}
              </div>
            )}
            {price}
          </div>

          <a
            href={ctaHref}
            className="block w-full text-center bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold text-[15px] sm:text-base py-4 px-6 rounded-xl transition-colors tracking-wide"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
    PAGE
   ============================================================ */
export default function ProdutosH9Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Top bar */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-[#14532d] tracking-tight text-lg">
            H9 <span className="text-gray-900 font-normal">PHARMA</span>
          </span>
          <span className="hidden sm:inline text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
            Catálogo Oficial
          </span>
        </div>
      </header>

      {/* ============ BLOCO 1: DISCLAIMER ============ */}
      <section
        id="disclaimer"
        className="px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10 bg-[#14532d]/5"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#14532d]/20 mb-5 shadow-sm">
            <span className="font-bold text-[#14532d] tracking-tight text-xl">H9</span>
          </div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
            Catálogo Oficial · H9 Pharma
          </p>
          <h1 className="text-[26px] sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
            Bem-vinda à página oficial de protocolos da H9 Pharma
          </h1>
          <p className="text-[17px] sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
            Esta é uma página oficial de vendas dos protocolos H9 Pharma recomendados
            pelo <strong>Dr. Renato Silveira Reis</strong>. Todos os produtos abaixo são
            formulados com ativos naturais, produzidos com controle de qualidade em
            laboratório e enviados com frete grátis para todo o Brasil.
          </p>
          <p className="text-[17px] sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
            A compra pelos botões desta página garante produto original, pagamento
            seguro e acesso à garantia. A H9 Pharma não vende por marketplaces, farmácias
            ou perfis de terceiros.
          </p>
          <p className="text-[17px] sm:text-lg text-gray-900 font-semibold leading-relaxed">
            Escolha abaixo o protocolo ideal para o seu momento.
          </p>
        </div>
      </section>

      {/* Faixa de selos (topo) */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <Seal icon={Truck} label="Frete Grátis" />
          <Seal icon={Lock} label="Compra Segura" />
          <Seal icon={Leaf} label="Ingredientes Naturais" />
          <Seal icon={MapPin} label="Envio para Todo o Brasil" />
        </div>
      </section>

      {/* ============ BLOCOS 2 – 4: PRODUTOS ============ */}
      <div className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {/* ---------- OZENKIT ---------- */}
          <ProductCard
            id="ozenkit"
            tag="Emagrecimento"
            name="OZENKIT"
            tagline="Protocolo H9 de Renovação Hepática + Detox Metabólico"
            imageSrc="/images/produto-ozenkit.webp"
            copy={
              <>
                <p>
                  Um detox pontual não resolve um metabolismo sobrecarregado. Por isso o
                  Ozenkit não é uma ação isolada: é um sistema que une duas estratégias
                  normalmente conduzidas em separado, a{' '}
                  <strong className="text-gray-900">renovação hepática</strong> e o{' '}
                  <strong className="text-gray-900">detox metabólico</strong>, organizadas
                  em um método progressivo de 3 etapas.
                </p>
                <p>
                  Primeiro, a redução da sobrecarga e o suporte ao fígado. Depois, a
                  otimização intestinal e metabólica. Por fim, a continuidade do processo
                  com hábitos estruturados de alimentação, hidratação, sono e rotina, com
                  o kit físico como ferramenta de execução de cada etapa.
                </p>
                <p>
                  É o protocolo indicado para quem convive com cansaço frequente, inchaço
                  persistente, metabolismo travado e aquela sensação de corpo
                  sobrecarregado que nenhuma dieta resolve.
                </p>
                <p className="text-[15px] italic text-gray-500">
                  Em um acompanhamento individual, a estrutura completa dessas duas
                  estratégias ultrapassaria facilmente R$2.000.
                </p>
              </>
            }
            price={
              <>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Protocolo completo com 2 kits
                </p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 leading-none mb-1">
                  R$ 480
                </p>
                <p className="text-base text-gray-700 font-medium">
                  ou 12x de <strong>R$ 40,00</strong> · Frete grátis
                </p>
              </>
            }
            ctaLabel="QUERO O PROTOCOLO OZENKIT"
            ctaHref="https://checkout.payt.com.br/59afaddcacd79edbb0609f0432244bfd?split=12"
          />

          {/* ---------- LIBIDUMAX ---------- */}
          <ProductCard
            id="libidumax"
            tag="Energia e Vitalidade"
            name="LIBIDUMAX"
            tagline="Fórmula natural para energia, disposição e desejo"
            imageSrc="/images/produto-libidumax.webp"
            copy={
              <>
                <p>
                  O cansaço do dia a dia cobra um preço silencioso: a energia cai, a
                  disposição some e a libido vai junto. O Libidumax foi formulado para
                  agir nas três frentes ao mesmo tempo.
                </p>
                <p>
                  A fórmula combina{' '}
                  <strong className="text-gray-900">9 ativos naturais</strong> com
                  respaldo em estudos, entre eles Maca Peruana, Ginseng Panax, Feno Grego
                  e Inositol, que auxiliam na circulação sanguínea, no equilíbrio
                  hormonal e na redução da fadiga física e mental. O resultado é{' '}
                  <strong className="text-gray-900">
                    mais energia durante o dia e mais desejo quando importa
                  </strong>
                  .
                </p>
                <p className="text-[15px] italic text-gray-500">
                  Uso adulto, para homens e mulheres. Gestantes, lactantes e pessoas em
                  uso de medicação contínua devem consultar um profissional de saúde
                  antes do consumo.
                </p>
              </>
            }
            price={
              <>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Protocolo com 1 kit
                </p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 leading-none mb-1">
                  R$ 347
                </p>
                <p className="text-base text-gray-700 font-medium">
                  ou 12x de <strong>R$ 28,92</strong> · Frete grátis
                </p>
              </>
            }
            ctaLabel="QUERO O LIBIDUMAX"
            ctaHref="https://checkout.payt.com.br/bb741c5c19be4a55e8f4ed0b264835d3?split=12"
          />

          {/* ---------- HAIRVIT MAX ---------- */}
          <ProductCard
            id="hairvitmax"
            tag="Saúde Capilar"
            name="HAIRVIT MAX"
            tagline="Suplemento capilar contra a queda e a favor do crescimento"
            imageSrc="/images/produto-hairvitmax.webp"
            copy={
              <>
                <p>
                  A queda de cabelo raramente é um problema do fio. É um problema da
                  raiz: folículos obstruídos, couro cabeludo mal oxigenado e fios que
                  nascem finos e quebradiços. O Hairvit Max age nessa origem.
                </p>
                <p>
                  A fórmula com{' '}
                  <strong className="text-gray-900">
                    ativos antioxidantes e fortalecedores
                  </strong>{' '}
                  auxilia na limpeza dos folículos, na circulação do couro cabeludo e na
                  reposição de queratina, para reduzir a queda e estimular fios mais
                  espessos, resistentes e hidratados desde o nascimento.
                </p>
                <p>
                  E hoje a condição é especial:{' '}
                  <strong className="text-[#14532d]">
                    comprando 1 kit, você leva 2
                  </strong>
                  . O segundo kit sai de graça, garantindo o tratamento contínuo que os
                  resultados capilares exigem.
                </p>
              </>
            }
            highlight={<>COMPRE 1, LEVE 2</>}
            price={
              <>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Você leva 2 kits pagando apenas 1
                </p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 leading-none mb-1">
                  R$ 597
                </p>
                <p className="text-base text-gray-700 font-medium">
                  ou 12x de <strong>R$ 49,75</strong> · Frete grátis
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Valor referente a 1 kit. O segundo kit sai grátis.
                </p>
              </>
            }
            ctaLabel="QUERO O HAIRVIT MAX"
            ctaHref="https://checkout.payt.com.br/70e02d9f4e6666e38e3639a622c4bef9?split=12"
          />
        </div>
      </div>

      {/* ============ BLOCO 5: GARANTIA E SUPORTE ============ */}
      <section id="garantia" className="px-4 sm:px-6 py-14 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a961]/15 border border-[#c9a961]/30 mb-5">
            <ShieldCheck className="w-8 h-8 text-[#c9a961]" strokeWidth={1.5} />
          </div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a961] font-semibold mb-3">
            Garantia e Suporte
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
            30 dias de garantia incondicional
          </h2>
          <p className="text-[17px] sm:text-lg text-gray-700 leading-relaxed">
            Todos os protocolos H9 Pharma são cobertos por garantia incondicional de 30
            dias. Você tem 30 dias completos para usar o produto e, se não ficar
            satisfeita com o resultado, basta enviar um e-mail ao nosso suporte e
            devolvemos 100% do valor, sem perguntas e sem burocracia.
          </p>
          <p className="text-[17px] sm:text-lg text-gray-700 leading-relaxed mt-4">
            O pagamento é processado pela <strong>PayT</strong>, com criptografia de
            nível bancário, em até 12x no cartão ou Pix.
          </p>
        </div>
      </section>

      {/* Faixa de selos (rodapé) */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <Seal icon={Truck} label="Frete Grátis" />
          <Seal icon={Lock} label="Compra Segura" />
          <Seal icon={Leaf} label="Ingredientes Naturais" />
          <Seal icon={MapPin} label="Envio para Todo o Brasil" />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-white border-t border-gray-100 py-10 sm:py-12">
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
                <a href="mailto:suporte@h9pharma.com.br" className="underline">
                  suporte@h9pharma.com.br
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
              <Link
                href="/termos-de-uso"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Termos de Uso
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto text-center border-t border-gray-100 pt-6">
            <strong>Disclaimer:</strong> Estes produtos não substituem o acompanhamento
            médico. Os resultados podem variar de pessoa para pessoa. Consulte seu médico
            em caso de dúvidas sobre condições de saúde específicas.
          </p>
        </div>
      </footer>
    </main>
  );
}
