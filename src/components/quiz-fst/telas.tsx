import Image from 'next/image';
import type { ReactNode } from 'react';

/**
 * Config das 4 telas do teste `/quiz-fst`.
 *
 * Cada tela define só o "herói" (tudo ACIMA do botão) + o texto do CTA.
 * O header, o botão e todo o bloco "abaixo do botão" (credenciais + foto
 * do Dr. Renato + footer) são iguais pras 4 e ficam no shell
 * (QuizFstLanding). A imagem em paisagem é exclusiva da Tela 4.
 *
 * As chaves t1..t4 batem com os ids das variantes do experimento
 * (`quiz-fst:t1`..`quiz-fst:t4`) e com o parâmetro `tela` enviado ao Meta.
 */

export const TELA_KEYS = ['t1', 't2', 't3', 't4'] as const;
export type TelaKey = (typeof TELA_KEYS)[number];

export interface TelaConfig {
  /** Texto do botão CTA. */
  ctaText: string;
  /** Imagem em paisagem no topo (só a Tela 4). */
  image?: { src: string; alt: string };
  /** Conteúdo acima do botão (pre-headline, headline, instrução...). */
  Hero: () => ReactNode;
}

/* ---------- Blocos auxiliares ---------- */

function PreHeadline({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs sm:text-sm text-[#dc2626] font-bold mb-4 sm:mb-5 uppercase tracking-[0.1em] animate-fadeInUp text-center">
      {children}
    </p>
  );
}

function Headline({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-gray-900 mb-4 sm:mb-5 leading-[1.2] sm:leading-[1.25] tracking-[-0.01em] animate-fadeInUp">
      {children}
    </h1>
  );
}

/** Linha de instrução logo acima do botão (telas 2/3/4). */
function Instruction({ children }: { children: ReactNode }) {
  return (
    <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-12 leading-[1.6] max-w-2xl mx-auto text-center animate-fadeInUp delay-100">
      {children}
    </p>
  );
}

/* ---------- Telas ---------- */

export const TELAS: Record<TelaKey, TelaConfig> = {
  // Tela 1 — controle (réplica da copy do root atual).
  t1: {
    ctaText: 'INICIAR AUTO-ANÁLISE GRATUITA',
    Hero: () => (
      <>
        <PreHeadline>Descoberta científica revela:</PreHeadline>
        <div className="text-left mb-8 sm:mb-10">
          <Headline>
            8 em Cada 10 Mulheres Acima de 35 Têm{' '}
            <span className="text-[#dc2626]">
              Alto Potencial de Parasitas e Vermes Intestinais
            </span>
            , E Isso Está IMPEDINDO o Emagrecimento Delas.
          </Headline>
          <div className="animate-fadeInUp">
            <p className="text-sm sm:text-base text-gray-600">
              Por{' '}
              <span className="font-semibold text-gray-800">
                Dr. Renato Silveira Reis
              </span>{' '}
              — São Paulo
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              06/01/2026 17h17 · Atualizado há 24 minutos
            </p>
          </div>
        </div>
        <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 sm:mb-12 leading-[1.6] max-w-2xl mx-auto animate-fadeInUp delay-100">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dc2626] block mb-5">
            Será que você é uma delas?
          </span>
          <p className="text-gray-700 leading-[1.75] text-left">
            Responda{' '}
            <strong className="font-semibold text-gray-900">
              6 perguntas rápidas
            </strong>{' '}
            e descubra agora se{' '}
            <strong className="font-semibold text-gray-900">
              parasitas invisíveis
            </strong>{' '}
            estão sabotando seu metabolismo e impedindo que você emagreça de
            verdade.
          </p>
        </div>
      </>
    ),
  },

  // Tela 2 — RS DF VSL1 QUIZ1 PT1
  t2: {
    ctaText: 'QUERO FAZER O TESTE AGORA',
    Hero: () => (
      <>
        <PreHeadline>ALERTA DE PARASITAS INTESTINAIS NO BRASIL</PreHeadline>
        <div className="text-left mb-8 sm:mb-10">
          <Headline>
            Tem Mais de 35 Anos e Está Com Dificuldades Pra Perder Peso?
            Existem Grandes Chances de Estar Com{' '}
            <span className="text-[#dc2626]">Vermes Intestinais</span>, Aponta
            Estudo
          </Headline>
        </div>
        <Instruction>
          Faça esse teste gratuito clicando no botão abaixo pra saber se esses
          parasitas estão sabotando seu emagrecimento 👇🏻
        </Instruction>
      </>
    ),
  },

  // Tela 3 — RS DF VSL1 QUIZ1 PT2
  t3: {
    ctaText: 'QUERO SABER SE ESTOU COM VERMES INTESTINAIS',
    Hero: () => (
      <>
        <PreHeadline>ESTUDOS REVELAM:</PreHeadline>
        <div className="text-left mb-8 sm:mb-10">
          <Headline>
            Esses São Os 6 Sinais de Alerta Que Podem Indicar Que o Seu
            Intestino Está{' '}
            <span className="text-[#dc2626]">LOTADO de Vermes Intestinais</span>{' '}
            Te IMPEDINDO de Emagrecer
          </Headline>
        </div>
        <Instruction>
          Faça esse teste gratuito para saber se você pode estar com esses
          parasitas que travam seu metabolismo 👇🏻
        </Instruction>
      </>
    ),
  },

  // Tela 4 — RS DF VSL1 QUIZ1 PT3 (imagem em paisagem no topo)
  t4: {
    ctaText: 'QUERO SABER SE ESTOU COM PARASITAS NO INTESTINO',
    image: {
      src: '/images/quiz-fst-tela4-regioes.png',
      alt: 'Três regiões do corpo com gordura localizada associadas a parasitas intestinais',
    },
    Hero: () => (
      <>
        <div className="text-left mb-6 sm:mb-8">
          <Headline>
            Se Você Está Com Gordura Localizada Em Alguma Dessas 3 Regiões do
            Corpo, Existem{' '}
            <span className="text-[#dc2626]">GRANDES CHANCES</span> De Estar Com
            Um Parasita Dentro Do Seu Intestino
          </Headline>
        </div>
        <Instruction>
          Esse teste gratuito indicado por grandes especialistas como o Dr.
          Renato Silveira mostra se você pode estar com vermes dentro do seu
          intestino. Clique no botão abaixo pra fazer 👇🏻
        </Instruction>
      </>
    ),
  },
};

/**
 * Imagem em paisagem no topo da tela (usada pela Tela 4). Fica aqui pra
 * manter o uso do next/image consistente com o resto do site.
 */
export function TelaHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8 animate-fadeInUp">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={628}
        className="w-full h-auto rounded-xl shadow-sm"
        priority
      />
    </div>
  );
}
