'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  Droplet,
  FileText,
  Heart,
  Play,
  Target,
  Timer,
  X,
} from 'lucide-react';
import {
  ALIMENTOS_PERMITIDOS,
  JEJUM_24H,
  SELAGEM_EMOCIONAL,
  SEMANAS,
} from '../_lib/protocolo';
import {
  alternarAutocuidado,
  getAutocuidadosFeitos,
  getDiaDoProtocolo,
} from '../_lib/storage';
import type { Semana } from '../_lib/types';

const LARANJA = '#ea580c';

const PDFS: Record<number, string> = {
  1: '/protocolos/protocolo-semana-1.pdf',
  2: '/protocolos/protocolo-semana-2.pdf',
  3: '/protocolos/protocolo-semana-3.pdf',
};

export default function TabProtocolo() {
  const [montado, setMontado] = useState(false);
  const [semanaAtual, setSemanaAtual] = useState(1);
  const [aberta, setAberta] = useState(1);
  const [feitos, setFeitos] = useState<string[]>([]);

  useEffect(() => {
    const dia = getDiaDoProtocolo();
    const s = dia <= 7 ? 1 : dia <= 14 ? 2 : 3;
    setSemanaAtual(s);
    setAberta(s);
    setFeitos(getAutocuidadosFeitos());
    setMontado(true);
  }, []);

  function marcarAutocuidado(chave: string) {
    alternarAutocuidado(chave);
    setFeitos(getAutocuidadosFeitos());
  }

  return (
    <div className="pt-5">
      <header className="mb-5">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          O protocolo
        </h1>
        <p className="mt-1 text-[15px] text-gray-600">
          As 3 semanas do Jejum Termogênico, do começo ao fim.
        </p>
      </header>

      {/* PDFs originais */}
      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" style={{ color: LARANJA }} strokeWidth={2.5} />
          <h2 className="text-[17px] font-bold text-gray-900">Material em PDF</h2>
        </div>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-600">
          Os protocolos completos, do jeito que você recebeu. Dá para abrir no
          celular ou baixar para consultar offline.
        </p>
        <div className="space-y-2">
          {SEMANAS.map((s) => (
            <a
              key={s.id}
              href={PDFS[s.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-gray-900">
                  Semana {s.id} · {s.nome}
                </span>
                <span className="mt-0.5 block text-[13px] text-gray-500">
                  Protocolo completo em PDF
                </span>
              </span>
              <Download
                className="h-5 w-5 flex-shrink-0"
                style={{ color: LARANJA }}
                strokeWidth={2.5}
              />
            </a>
          ))}
        </div>
      </section>

      {/* As 3 semanas */}
      <div className="space-y-3">
        {SEMANAS.map((semana) => (
          <CardSemana
            key={semana.id}
            semana={semana}
            atual={montado && semana.id === semanaAtual}
            aberta={aberta === semana.id}
            feitos={feitos}
            onAbrir={() => setAberta((a) => (a === semana.id ? 0 : semana.id))}
            onMarcarAutocuidado={marcarAutocuidado}
          />
        ))}
      </div>
    </div>
  );
}

function CardSemana({
  semana,
  atual,
  aberta,
  feitos,
  onAbrir,
  onMarcarAutocuidado,
}: {
  semana: Semana;
  atual: boolean;
  aberta: boolean;
  feitos: string[];
  onAbrir: () => void;
  onMarcarAutocuidado: (chave: string) => void;
}) {
  return (
    <section
      className="overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: atual ? LARANJA : '#e5e7eb' }}
    >
      <button
        type="button"
        onClick={onAbrir}
        aria-expanded={aberta}
        className="flex w-full items-start justify-between gap-3 p-5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="min-w-0">
          {atual && (
            <span
              className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: LARANJA }}
            >
              Você está aqui
            </span>
          )}
          <span className="block text-[18px] font-bold leading-snug text-gray-900">
            {semana.nome}
          </span>
          <span className="mt-0.5 block text-sm text-gray-500">
            {semana.subtitulo}
          </span>
          <span className="mt-2 flex flex-wrap gap-3 text-[13px] text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" strokeWidth={2.5} /> jejum de{' '}
              {semana.jejumHoras}h
            </span>
            <span className="inline-flex items-center gap-1">
              <Droplet className="h-3.5 w-3.5" strokeWidth={2.5} />{' '}
              {semana.aguaLitros} L de água
            </span>
          </span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
            aberta ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>

      {aberta && (
        <div className="space-y-5 border-t border-gray-100 px-5 pb-5 pt-4">
          {/* O que acontece */}
          <div className="space-y-2">
            {semana.explicacao.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-gray-700">
                {p}
              </p>
            ))}
          </div>

          {/* Janela do jejum */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: `${LARANJA}10` }}
          >
            <p className="text-[15px] font-semibold text-gray-900">
              Jejum de {semana.jejumHoras} horas
            </p>
            <p className="mt-1 text-[15px] text-gray-700">
              Das {String(semana.jejumInicio).padStart(2, '0')}:00 às{' '}
              {String(semana.jejumFim).padStart(2, '0')}:00. A última refeição do dia
              é às {String(semana.jejumInicio).padStart(2, '0')}:00.
            </p>
            <p className="mt-2 text-[14px] text-gray-600">
              Se atrasar um pouco, tudo bem: é só compensar o mesmo tempo na hora de
              encerrar o jejum no dia seguinte.
            </p>
          </div>

          {/* Desafios */}
          <Bloco icone={Target} titulo="Desafios da semana">
            <ul className="space-y-1.5">
              {semana.desafios.map((d, i) => (
                <li key={i} className="text-[15px] leading-relaxed text-gray-700">
                  • {d}
                </li>
              ))}
            </ul>
          </Bloco>

          {/* Pode / Não pode */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-[15px] font-bold text-green-800">
                <Check className="h-4 w-4" strokeWidth={3} /> Pode
              </p>
              <ul className="space-y-1.5">
                {semana.pode.map((p, i) => (
                  <li key={i} className="text-[14px] leading-relaxed text-green-900">
                    • {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-[15px] font-bold text-red-800">
                <X className="h-4 w-4" strokeWidth={3} /> Não pode
              </p>
              <ul className="space-y-1.5">
                {semana.naoPode.map((p, i) => (
                  <li key={i} className="text-[14px] leading-relaxed text-red-900">
                    • {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cardápio */}
          <Bloco titulo="Cardápio do dia">
            <div className="space-y-3">
              {semana.cardapio.map((item, i) => (
                <div key={i}>
                  <p className="text-[15px] font-semibold text-gray-900">
                    {item.refeicao}
                    {item.horario && (
                      <span className="ml-2 text-[13px] font-normal text-gray-500">
                        {item.horario}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-gray-700">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>
          </Bloco>

          {/* Autocuidados */}
          <Bloco icone={Heart} titulo="Autocuidados da semana">
            <div className="space-y-2">
              {semana.autocuidados.map((auto, i) => {
                const chave = `${semana.id}-${i}`;
                const feito = feitos.includes(chave);
                return (
                  <button
                    key={chave}
                    type="button"
                    onClick={() => onMarcarAutocuidado(chave)}
                    aria-pressed={feito}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                      feito
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        feito ? 'border-green-600 bg-green-600' : 'border-gray-300'
                      }`}
                    >
                      {feito && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                    </span>
                    <span>
                      <span
                        className={`block text-[15px] font-semibold ${
                          feito ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}
                      >
                        {auto.titulo}
                      </span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-gray-600">
                        {auto.texto}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Bloco>

          {/* Extras da semana 3 */}
          {semana.id === 3 && (
            <>
              <Bloco icone={Play} titulo="Selagem Emocional">
                <p className="mb-3 text-[15px] leading-relaxed text-gray-700">
                  Vídeos curtos para assistir ao acordar, um por dia.
                </p>
                <div className="space-y-2">
                  {SELAGEM_EMOCIONAL.map((v) => (
                    <a
                      key={v.url}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-gray-900">
                          {v.titulo}
                        </span>
                        <span className="text-[13px] text-gray-500">
                          {v.dia} · {v.duracao}
                        </span>
                      </span>
                      <Play
                        className="h-4 w-4 flex-shrink-0"
                        style={{ color: LARANJA }}
                        strokeWidth={2.5}
                      />
                    </a>
                  ))}
                </div>
              </Bloco>

              <Bloco titulo={JEJUM_24H.titulo}>
                <ol className="space-y-2">
                  {JEJUM_24H.passos.map((p, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                        style={{ backgroundColor: LARANJA }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[15px] leading-relaxed text-gray-700">
                        {p}
                      </span>
                    </li>
                  ))}
                </ol>
              </Bloco>

              <Bloco titulo="Alimentos permitidos na cetose">
                <div className="space-y-2">
                  {ALIMENTOS_PERMITIDOS.map((g) => (
                    <div key={g.grupo}>
                      <p className="text-[15px] font-semibold text-gray-900">
                        {g.grupo}
                      </p>
                      <p className="text-[15px] leading-relaxed text-gray-700">
                        {g.itens}
                      </p>
                    </div>
                  ))}
                </div>
              </Bloco>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Bloco({
  icone: Icone,
  titulo,
  children,
}: {
  icone?: typeof Target;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-[16px] font-bold text-gray-900">
        {Icone && <Icone className="h-4 w-4" style={{ color: LARANJA }} strokeWidth={2.5} />}
        {titulo}
      </p>
      {children}
    </div>
  );
}
