'use client';

/**
 * Aba "Hoje": a rotina guiada do Korean Kit.
 *
 * Sao so dois passos por dia (manha = tomar o po, noite = lavar o rosto e
 * aplicar o serum). A tela mostra, em ordem: saudacao + dia do protocolo,
 * o card de DESTAQUE do momento, os dois passos com checkbox grande,
 * o progresso do dia e o bloco de streak.
 *
 * Regra de hidratacao: nada de localStorage durante o render. O estado real
 * so entra depois do useEffect; antes disso a tela mostra um skeleton.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Flame,
  Lightbulb,
  Moon,
  PartyPopper,
  Sun,
  Trophy,
} from 'lucide-react';

import { PASSOS_ROTINA } from '../_lib/conteudo';
import {
  getDiaDoProtocolo,
  getRegistroDoDia,
  getStreak,
  getTotalDiasCompletos,
  hojeISO,
  marcarPasso,
} from '../_lib/storage';
import type { DiaRegistro, Periodo } from '../_lib/types';

/** Cor primaria do Korean Kit (rosa). Usada em estilos inline por ser fora da paleta Tailwind. */
const ROSA = '#c4448f';
const ROSA_ESCURO = '#a33575';
const ROSA_CLARO = '#c4448f10';

const PASSO_MANHA = PASSOS_ROTINA.find((p) => p.periodo === 'manha')!;
const PASSO_NOITE = PASSOS_ROTINA.find((p) => p.periodo === 'noite')!;

/** "Bom dia" / "Boa tarde" / "Boa noite" pela hora local. */
function saudacaoPor(hora: number): string {
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

/**
 * Qual passo merece o card de destaque agora.
 * Antes das 12h: manha. Depois das 18h: noite.
 * Entre 12h e 18h: o que ainda estiver pendente (manha tem prioridade).
 * Se os dois ja estiverem feitos, nao ha destaque (some o card).
 */
function periodoEmDestaque(hora: number, registro: DiaRegistro): Periodo | null {
  if (!registro.manha && !registro.noite) {
    if (hora < 12) return 'manha';
    if (hora < 18) return 'manha';
    return 'noite';
  }
  if (!registro.manha) return 'manha';
  if (!registro.noite) return 'noite';
  return null;
}

interface CardPassoProps {
  periodo: Periodo;
  titulo: string;
  descricao: string;
  dicas: string[];
  horarioSugerido: string;
  feito: boolean;
  aberto: boolean;
  onAlternarFeito: () => void;
  onAlternarAberto: () => void;
}

/** Card de um passo, com checkbox grande e dicas que expandem no clique. */
function CardPasso({
  periodo,
  titulo,
  descricao,
  dicas,
  horarioSugerido,
  feito,
  aberto,
  onAlternarFeito,
  onAlternarAberto,
}: CardPassoProps) {
  const Icone = periodo === 'manha' ? Sun : Moon;
  const rotulo = periodo === 'manha' ? 'Manhã' : 'Noite';
  const idDicas = `dicas-${periodo}`;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-colors ${
        feito ? 'border-green-200 bg-green-50/40' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox grande: area de toque bem maior que 44px. */}
        <button
          type="button"
          onClick={onAlternarFeito}
          aria-pressed={feito}
          aria-label={
            feito
              ? `Desmarcar passo da ${rotulo.toLowerCase()}: ${titulo}`
              : `Marcar como feito o passo da ${rotulo.toLowerCase()}: ${titulo}`
          }
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all active:scale-95 ${
            feito
              ? 'border-green-600 bg-green-600 text-white'
              : 'border-gray-300 bg-white text-transparent hover:border-gray-400'
          }`}
        >
          <Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
        </button>

        {/* Corpo do card: clicar aqui abre/fecha as dicas. */}
        <button
          type="button"
          onClick={onAlternarAberto}
          aria-expanded={aberto}
          aria-controls={idDicas}
          className="min-w-0 flex-1 text-left"
        >
          <span className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-gray-500">
            <Icone className="h-4 w-4" aria-hidden="true" />
            {rotulo}
          </span>
          <span
            className={`mt-1 block text-lg font-bold leading-snug ${
              feito ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
          >
            {titulo}
          </span>
          <span
            className={`mt-1 block text-base leading-relaxed ${
              feito ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {descricao}
          </span>
          <span className="mt-2 flex items-center gap-1 text-sm font-medium" style={{ color: ROSA }}>
            {aberto ? 'Esconder as dicas' : 'Ver as dicas'}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${aberto ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      {aberto && (
        <div id={idDicas} className="border-t border-gray-100 px-4 pb-4 pt-3">
          <p className="text-sm font-semibold text-gray-500">
            Melhor horário: {horarioSugerido}
          </p>
          <ul className="mt-3 space-y-3">
            {dicas.map((dica) => (
              <li key={dica} className="flex gap-2.5">
                <Lightbulb
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: ROSA }}
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-gray-700">{dica}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Placeholder enquanto o componente ainda nao leu o localStorage. */
function Skeleton() {
  return (
    <div className="space-y-4 p-4" aria-hidden="true">
      <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
      <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
    </div>
  );
}

export default function TabRotina() {
  const [montado, setMontado] = useState(false);
  const [hora, setHora] = useState(0);
  const [dia, setDia] = useState(1);
  const [registro, setRegistro] = useState<DiaRegistro>({
    data: '',
    manha: false,
    noite: false,
  });
  const [streak, setStreak] = useState(0);
  const [diasCompletos, setDiasCompletos] = useState(0);
  const [expandido, setExpandido] = useState<Periodo | null>(null);

  // Toda a leitura de estado acontece aqui, nunca no render.
  // O localStorage e o relogio sao sistemas EXTERNOS que so existem no
  // navegador: ler no render quebraria a hidratacao (o servidor nao tem
  // window). Este e o caso legitimo de sincronizar estado externo no mount,
  // que a regra abaixo nao consegue distinguir de um efeito em cascata.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const data = hojeISO();
    setHora(new Date().getHours());
    setDia(getDiaDoProtocolo());
    setRegistro(getRegistroDoDia(data));
    setStreak(getStreak());
    setDiasCompletos(getTotalDiasCompletos());
    setMontado(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const alternarPasso = useCallback((periodo: Periodo, feito: boolean) => {
    const data = hojeISO();
    const atualizado = marcarPasso(data, periodo, feito);
    setRegistro(atualizado);
    // Streak e total mudam junto com a marcacao: releia os dois.
    setStreak(getStreak());
    setDiasCompletos(getTotalDiasCompletos());
  }, []);

  if (!montado) return <Skeleton />;

  const feitos = (registro.manha ? 1 : 0) + (registro.noite ? 1 : 0);
  const tudoFeito = feitos === 2;
  const destaque = periodoEmDestaque(hora, registro);
  const passoDestaque = destaque === 'manha' ? PASSO_MANHA : destaque === 'noite' ? PASSO_NOITE : null;

  return (
    <div className="space-y-5 p-4 pb-8">
      {/* 1. Saudacao + dia do protocolo */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">{saudacaoPor(hora)}!</h1>
        <p className="mt-1 text-base text-gray-500">
          Você está no <span className="font-semibold text-gray-700">dia {dia}</span> do seu
          protocolo Korean Kit.
        </p>
      </header>

      {/* 2. Destaque do momento */}
      {passoDestaque && destaque && (
        <section
          className="rounded-2xl border-2 p-5 shadow-sm"
          style={{ borderColor: ROSA, backgroundColor: ROSA_CLARO }}
          aria-label="Passo de agora"
        >
          <p
            className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide"
            style={{ color: ROSA }}
          >
            {destaque === 'manha' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
            Agora é a hora
          </p>
          <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900">
            {passoDestaque.titulo}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-gray-700">{passoDestaque.descricao}</p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            {passoDestaque.horarioSugerido}
          </p>

          <button
            type="button"
            onClick={() => alternarPasso(destaque, true)}
            className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl px-5 text-lg font-bold text-white shadow-sm transition-colors active:scale-[0.99]"
            style={{ backgroundColor: ROSA }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ROSA_ESCURO;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ROSA;
            }}
          >
            <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
            Já fiz esse passo
          </button>
        </section>
      )}

      {/* 6. Parabens quando os dois passos estao feitos */}
      {tudoFeito && (
        <section
          className="flex items-start gap-3 rounded-2xl border-2 border-green-200 bg-green-50 p-5"
          role="status"
        >
          <PartyPopper className="mt-0.5 h-7 w-7 shrink-0 text-green-600" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-green-900">Dia completo, parabéns!</h2>
            <p className="mt-1 text-base leading-relaxed text-green-800">
              Você cuidou da sua pele por dentro e por fora hoje. É essa constância, dia após dia,
              que faz o resultado aparecer. Até amanhã!
            </p>
          </div>
        </section>
      )}

      {/* 4. Progresso do dia */}
      <section aria-label="Progresso de hoje">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-gray-900">Sua rotina de hoje</h2>
          <span className="text-base font-semibold text-gray-500">{feitos}/2 passos</span>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={feitos}
          aria-label={`${feitos} de 2 passos concluídos hoje`}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(feitos / 2) * 100}%`,
              backgroundColor: tudoFeito ? '#16a34a' : ROSA,
            }}
          />
        </div>
      </section>

      {/* 3. Os dois passos do dia */}
      <div className="space-y-3">
        <CardPasso
          periodo="manha"
          titulo={PASSO_MANHA.titulo}
          descricao={PASSO_MANHA.descricao}
          dicas={PASSO_MANHA.dicas}
          horarioSugerido={PASSO_MANHA.horarioSugerido}
          feito={registro.manha}
          aberto={expandido === 'manha'}
          onAlternarFeito={() => alternarPasso('manha', !registro.manha)}
          onAlternarAberto={() => setExpandido((a) => (a === 'manha' ? null : 'manha'))}
        />
        <CardPasso
          periodo="noite"
          titulo={PASSO_NOITE.titulo}
          descricao={PASSO_NOITE.descricao}
          dicas={PASSO_NOITE.dicas}
          horarioSugerido={PASSO_NOITE.horarioSugerido}
          feito={registro.noite}
          aberto={expandido === 'noite'}
          onAlternarFeito={() => alternarPasso('noite', !registro.noite)}
          onAlternarAberto={() => setExpandido((a) => (a === 'noite' ? null : 'noite'))}
        />
      </div>

      {/* 5. Streak e dias completos */}
      <section className="grid grid-cols-2 gap-3" aria-label="Sua constância">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Flame className="mx-auto h-7 w-7" style={{ color: ROSA }} aria-hidden="true" />
          <p className="mt-1 text-3xl font-bold text-gray-900">{streak}</p>
          <p className="mt-0.5 text-sm font-medium text-gray-500">
            {streak === 1 ? 'dia seguido' : 'dias seguidos'}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Trophy className="mx-auto h-7 w-7" style={{ color: ROSA }} aria-hidden="true" />
          <p className="mt-1 text-3xl font-bold text-gray-900">{diasCompletos}</p>
          <p className="mt-0.5 text-sm font-medium text-gray-500">
            {diasCompletos === 1 ? 'dia completo' : 'dias completos'}
          </p>
        </div>
      </section>
    </div>
  );
}
