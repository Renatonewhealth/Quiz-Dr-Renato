'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Droplet,
  Flame,
  Minus,
  Plus,
  Timer,
  Utensils,
} from 'lucide-react';
import { semanaDoDia, TOTAL_DIAS } from '../_lib/protocolo';
import { receitaPorId } from '../_lib/receitas';
import {
  ajustarCopos,
  alternarTarefa,
  calcularJejum,
  formatarDuracao,
  getDiaDoProtocolo,
  getRegistro,
  getSequencia,
  hojeISO,
  type EstadoJejum,
} from '../_lib/storage';
import type { Momento, Tarefa } from '../_lib/types';

const LARANJA = '#ea580c';
const ML_POR_COPO = 250;

const ROTULO_MOMENTO: Record<Momento, string> = {
  jejum: 'Em jejum',
  manha: 'Depois de quebrar o jejum',
  tarde: 'Tarde',
  noite: 'Noite',
};

const ORDEM_MOMENTO: Momento[] = ['jejum', 'manha', 'tarde', 'noite'];

export default function TabHoje() {
  const [montado, setMontado] = useState(false);
  const [dia, setDia] = useState(1);
  const [feitas, setFeitas] = useState<string[]>([]);
  const [copos, setCopos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [jejum, setJejum] = useState<EstadoJejum | null>(null);
  const [aberta, setAberta] = useState<string | null>(null);

  const semana = semanaDoDia(dia);

  // Lê o estado só depois de montar, para não quebrar a hidratação.
  useEffect(() => {
    const d = getDiaDoProtocolo();
    const reg = getRegistro(hojeISO());
    setDia(d);
    setFeitas(reg.tarefas);
    setCopos(reg.copos);
    setSequencia(getSequencia());
    setMontado(true);
  }, []);

  // Relógio do jejum: recalcula a cada 30 segundos.
  useEffect(() => {
    if (!montado) return;
    const atualizar = () =>
      setJejum(calcularJejum(semana.jejumInicio, semana.jejumFim));
    atualizar();
    const id = setInterval(atualizar, 30_000);
    return () => clearInterval(id);
  }, [montado, semana.jejumInicio, semana.jejumFim]);

  const marcar = useCallback((tarefaId: string) => {
    const reg = alternarTarefa(hojeISO(), tarefaId);
    setFeitas(reg.tarefas);
    setSequencia(getSequencia());
  }, []);

  const mudarAgua = useCallback((delta: number) => {
    const reg = ajustarCopos(hojeISO(), delta);
    setCopos(reg.copos);
  }, []);

  if (!montado) {
    return (
      <div className="space-y-4 pt-5">
        <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  const totalTarefas = semana.tarefas.length;
  const totalFeitas = semana.tarefas.filter((t) => feitas.includes(t.id)).length;
  const metaCopos = Math.round((semana.aguaLitros * 1000) / ML_POR_COPO);
  const litrosBebidos = ((copos * ML_POR_COPO) / 1000).toFixed(1).replace('.', ',');

  return (
    <div className="space-y-5 pt-5">
      {/* Cabeçalho do dia */}
      <header>
        <p className="text-sm font-bold uppercase tracking-wide" style={{ color: LARANJA }}>
          Dia {dia} de {TOTAL_DIAS}
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-gray-900">
          {semana.nome}
        </h1>
        <p className="mt-1 text-[15px] text-gray-600">{semana.subtitulo}</p>
      </header>

      {/* Timer do jejum */}
      {jejum && (
        <section
          className="overflow-hidden rounded-2xl text-white shadow-lg"
          style={{
            background: jejum.jejuando
              ? 'linear-gradient(135deg, #ea580c, #c2410c)'
              : 'linear-gradient(135deg, #16a34a, #15803d)',
          }}
        >
          <div className="px-5 py-5">
            <div className="flex items-center gap-2">
              {jejum.jejuando ? (
                <Timer className="h-5 w-5" strokeWidth={2.5} />
              ) : (
                <Utensils className="h-5 w-5" strokeWidth={2.5} />
              )}
              <p className="text-sm font-bold uppercase tracking-wide">
                {jejum.jejuando ? 'Você está em jejum' : 'Janela de alimentação'}
              </p>
            </div>

            <p className="mt-3 text-4xl font-black leading-none">
              {formatarDuracao(jejum.faltamSegundos)}
            </p>
            <p className="mt-2 text-[15px] text-white/90">
              {jejum.jejuando
                ? `até quebrar o jejum, às ${jejum.proximoMarco}`
                : `até começar o jejum, às ${jejum.proximoMarco}`}
            </p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${jejum.progresso}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/80">
              Jejum de {semana.jejumHoras}h nesta semana, das{' '}
              {String(semana.jejumInicio).padStart(2, '0')}:00 às{' '}
              {String(semana.jejumFim).padStart(2, '0')}:00
            </p>
          </div>
        </section>
      )}

      {/* Água */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-blue-500" strokeWidth={2.5} />
            <h2 className="text-[17px] font-bold text-gray-900">Água de hoje</h2>
          </div>
          <p className="text-sm font-semibold text-gray-500">
            meta {semana.aguaLitros} L
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => mudarAgua(-1)}
            disabled={copos === 0}
            aria-label="Tirar um copo"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-30"
          >
            <Minus className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <div className="text-center">
            <p className="text-3xl font-black leading-none text-gray-900">
              {litrosBebidos} L
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {copos} de {metaCopos} copos
            </p>
          </div>

          <button
            type="button"
            onClick={() => mudarAgua(1)}
            aria-label="Adicionar um copo"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95"
            style={{ backgroundColor: '#3b82f6' }}
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (copos / metaCopos) * 100)}%` }}
          />
        </div>
      </section>

      {/* Rotina do dia */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[17px] font-bold text-gray-900">Rotina de hoje</h2>
          <p className="text-sm font-semibold text-gray-500">
            {totalFeitas}/{totalTarefas}
          </p>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(totalFeitas / totalTarefas) * 100}%`,
              backgroundColor: LARANJA,
            }}
          />
        </div>

        <div className="space-y-5">
          {ORDEM_MOMENTO.map((momento) => {
            const doMomento = semana.tarefas.filter((t) => t.momento === momento);
            if (doMomento.length === 0) return null;

            return (
              <div key={momento}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  {ROTULO_MOMENTO[momento]}
                </p>
                <div className="space-y-2">
                  {doMomento.map((tarefa) => (
                    <CardTarefa
                      key={tarefa.id}
                      tarefa={tarefa}
                      feita={feitas.includes(tarefa.id)}
                      aberta={aberta === tarefa.id}
                      onMarcar={() => marcar(tarefa.id)}
                      onAbrir={() =>
                        setAberta((a) => (a === tarefa.id ? null : tarefa.id))
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dia completo */}
      {totalFeitas === totalTarefas && (
        <div
          className="rounded-2xl p-5 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
        >
          <Flame className="mx-auto h-8 w-8" strokeWidth={2.5} />
          <p className="mt-2 text-lg font-bold">Dia completo!</p>
          <p className="mt-1 text-[15px] text-white/90">
            Você cumpriu a rotina inteira de hoje. É assim que o resultado
            aparece: um dia de cada vez.
          </p>
        </div>
      )}

      {/* Sequência */}
      {sequencia > 1 && (
        <p className="pb-2 text-center text-[15px] text-gray-600">
          <Flame className="mr-1 inline h-4 w-4" style={{ color: LARANJA }} />
          <strong>{sequencia} dias seguidos</strong> cuidando de você
        </p>
      )}
    </div>
  );
}

function CardTarefa({
  tarefa,
  feita,
  aberta,
  onMarcar,
  onAbrir,
}: {
  tarefa: Tarefa;
  feita: boolean;
  aberta: boolean;
  onMarcar: () => void;
  onAbrir: () => void;
}) {
  const receita = tarefa.receitaId ? receitaPorId(tarefa.receitaId) : undefined;

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        feita ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          onClick={onMarcar}
          aria-label={feita ? `Desmarcar ${tarefa.titulo}` : `Marcar ${tarefa.titulo}`}
          aria-pressed={feita}
          className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            feita ? 'border-green-600 bg-green-600' : 'border-gray-300 bg-white'
          }`}
        >
          {feita && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
        </button>

        <button
          type="button"
          onClick={onAbrir}
          aria-expanded={aberta}
          className="flex-1 text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-[16px] font-semibold leading-snug ${
                feita ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {tarefa.titulo}
            </p>
            <ChevronDown
              className={`mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                aberta ? 'rotate-180' : ''
              }`}
              strokeWidth={2.5}
            />
          </div>
          {tarefa.horario && (
            <p className="mt-0.5 text-sm text-gray-500">{tarefa.horario}</p>
          )}
        </button>
      </div>

      {aberta && (
        <div className="space-y-3 border-t border-gray-100 px-4 pb-4 pt-3">
          <p className="text-[15px] leading-relaxed text-gray-700">
            {tarefa.descricao}
          </p>

          {receita && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-bold text-gray-900">{receita.nome}</p>
              <ul className="mt-2 space-y-1">
                {receita.ingredientes.map((ing, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    • {ing}
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-1">
                {receita.preparo.map((p, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {i + 1}. {p}
                  </p>
                ))}
              </div>
              {receita.observacao && (
                <p className="mt-2 text-[13px] italic text-gray-500">
                  {receita.observacao}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
