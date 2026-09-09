'use client';

/**
 * Aba "Bonus" do app Korean Kit.
 *
 * Mostra o Protocolo Skin Care Perfeito (blocos manha/noite) e as tecnicas
 * de massagem facial em accordions nativos (<details>/<summary>).
 *
 * Sem props, sem estado: e conteudo estatico vindo de _lib/conteudo.ts.
 */

import {
  ChevronDown,
  Clock,
  Gift,
  Hand,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';

import { BONUS_SKINCARE, MASSAGEM_FACIAL } from '../_lib/conteudo';

const ROSA = '#c4448f';

/** Circulo rosa com o numero do passo. Mesmo padrao das paginas de downsell. */
function NumeroPasso({ n }: { n: number }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
      style={{ backgroundColor: ROSA }}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

/** Titulo de secao com icone rosa. */
function TituloSecao({
  icone: Icone,
  titulo,
  descricao,
}: {
  icone: typeof Sparkles;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <Icone className="h-6 w-6 shrink-0" style={{ color: ROSA }} aria-hidden="true" />
        <h2 className="text-xl font-bold text-gray-900">{titulo}</h2>
      </div>
      <p className="mt-1 text-base leading-relaxed text-gray-600">{descricao}</p>
    </div>
  );
}

export default function TabBonus() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-6">
      {/* Cabecalho */}
      <header
        className="rounded-2xl p-5 shadow-sm"
        style={{ backgroundColor: `${ROSA}10` }}
      >
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 shrink-0" style={{ color: ROSA }} aria-hidden="true" />
          <span
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: ROSA }}
          >
            Seu bônus
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
          Protocolo Skin Care Perfeito
        </h1>
        <p className="mt-2 text-base leading-relaxed text-gray-700">
          Este é o material que vem junto com o seu Korean Kit. São cuidados
          simples de manhã e de noite, mais massagens faciais para o contorno do
          rosto. Faça no seu ritmo: pode começar por um passo só.
        </p>
      </header>

      {/* Protocolo Skin Care Perfeito */}
      <section className="mt-8">
        <TituloSecao
          icone={Sparkles}
          titulo="A rotina, passo a passo"
          descricao="A ordem certa dos produtos, e o motivo de cada passo existir."
        />

        <div className="space-y-5">
          {BONUS_SKINCARE.map((bloco, indiceBloco) => {
            const IconeBloco = indiceBloco === 0 ? Sun : Moon;

            return (
              <article
                key={bloco.titulo}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div
                  className="flex items-start gap-3 border-b border-gray-100 p-5"
                  style={{ backgroundColor: `${ROSA}10` }}
                >
                  <IconeBloco
                    className="mt-0.5 h-6 w-6 shrink-0"
                    style={{ color: ROSA }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {bloco.titulo}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-gray-700">
                      {bloco.subtitulo}
                    </p>
                  </div>
                </div>

                <ol className="divide-y divide-gray-100">
                  {bloco.passos.map((passo, indicePasso) => (
                    <li key={passo.nome} className="flex gap-3 p-5">
                      <NumeroPasso n={indicePasso + 1} />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-bold leading-snug text-gray-900">
                          {passo.nome}
                        </h4>
                        <p className="mt-1.5 text-base leading-relaxed text-gray-700">
                          {passo.comoFazer}
                        </p>
                        <p className="mt-2 border-l-2 border-gray-200 pl-3 text-sm leading-relaxed text-gray-500">
                          <span className="font-semibold text-gray-600">
                            Por quê:{' '}
                          </span>
                          {passo.porque}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </section>

      {/* Massagem facial */}
      <section className="mt-10">
        <TituloSecao
          icone={Hand}
          titulo="Massagem facial para contorno"
          descricao="Toque em cada técnica para abrir o passo a passo. Faça sempre com o sérum ou o hidratante na pele, nunca a seco."
        />

        <div className="space-y-3">
          {MASSAGEM_FACIAL.map((tecnica) => (
            <details
              key={tecnica.nome}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug text-gray-900">
                    {tecnica.nome}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {tecnica.duracao}
                  </p>
                </div>
                <ChevronDown
                  className="h-6 w-6 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  style={{ color: ROSA }}
                  aria-hidden="true"
                />
              </summary>

              <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                <ol className="space-y-4">
                  {tecnica.comoFazer.map((passo, indice) => (
                    <li key={passo} className="flex gap-3">
                      <NumeroPasso n={indice + 1} />
                      <p className="flex-1 pt-1 text-base leading-relaxed text-gray-700">
                        {passo}
                      </p>
                    </li>
                  ))}
                </ol>

                <p
                  className="mt-5 rounded-xl p-4 text-base leading-relaxed text-gray-700"
                  style={{ backgroundColor: `${ROSA}10` }}
                >
                  <span className="font-bold text-gray-900">Benefício: </span>
                  {tecnica.beneficio}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Lembrete final */}
      <section className="mt-10">
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <Sparkles
              className="mt-0.5 h-6 w-6 shrink-0"
              style={{ color: ROSA }}
              aria-hidden="true"
            />
            <div>
              <h3 className="text-base font-bold text-gray-900">
                O bônus é um complemento, não uma troca
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-gray-700">
                O que sustenta o resultado continua sendo a rotina do seu kit:{' '}
                <span className="font-semibold text-gray-900">
                  o Regenera Skin de manhã
                </span>{' '}
                e{' '}
                <span className="font-semibold text-gray-900">
                  o Sérum Hialurônico à noite
                </span>
                , todos os dias. Se um dia der tempo só para isso, já está ótimo.
                O resto você encaixa quando puder.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
