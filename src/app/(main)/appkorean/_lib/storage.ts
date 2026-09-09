/**
 * Persistencia local do app Korean Kit (localStorage, client-side).
 *
 * Tudo fica no dispositivo da usuaria, sob a chave 'korean_app_v1'.
 * TODA funcao deste arquivo e segura em SSR: se `window` nao existe,
 * devolvemos um default sensato em vez de lancar erro (o Next renderiza
 * estes componentes no servidor antes de hidratar no navegador).
 */

import type { DiaRegistro, Periodo } from './types';

const STORAGE_KEY = 'korean_app_v1';

/** Formato bruto que vai pro localStorage. */
interface AppState {
  dataInicio: string;
  registros: Record<string, DiaRegistro>;
}

/** Guard de SSR: true so quando estamos rodando no navegador com localStorage. */
function temStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Converte um Date para 'YYYY-MM-DD' usando o fuso LOCAL.
 * Nao usamos toISOString(): ele converte pra UTC e, no Brasil (UTC-3),
 * qualquer horario depois das 21h viraria o dia seguinte.
 */
function formatarData(d: Date): string {
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/** Cria um Date local (meio-dia) a partir de 'YYYY-MM-DD'. */
function parsearData(data: string): Date {
  const [ano, mes, dia] = data.split('-').map((n) => parseInt(n, 10));
  // Meio-dia evita que horario de verao / DST empurre a data pra tras ou pra frente.
  return new Date(ano, mes - 1, dia, 12, 0, 0, 0);
}

/** Soma (ou subtrai, com valor negativo) dias a uma data 'YYYY-MM-DD'. */
function somarDias(data: string, dias: number): string {
  const d = parsearData(data);
  d.setDate(d.getDate() + dias);
  return formatarData(d);
}

/** Registro vazio para um dia ainda nao marcado. */
function registroVazio(data: string): DiaRegistro {
  return { data, manha: false, noite: false };
}

/** Le e valida o estado do localStorage. Nunca lanca: em caso de erro, reseta. */
function lerEstado(): AppState {
  const vazio: AppState = { dataInicio: hojeISO(), registros: {} };
  if (!temStorage()) return vazio;

  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) return vazio;

    const parsed = JSON.parse(bruto) as Partial<AppState> | null;
    if (!parsed || typeof parsed !== 'object') return vazio;

    const registros: Record<string, DiaRegistro> = {};
    const cru = parsed.registros;
    if (cru && typeof cru === 'object') {
      for (const [data, valor] of Object.entries(cru)) {
        if (!valor || typeof valor !== 'object') continue;
        const v = valor as Partial<DiaRegistro>;
        registros[data] = {
          data,
          manha: v.manha === true,
          noite: v.noite === true,
        };
      }
    }

    return {
      dataInicio:
        typeof parsed.dataInicio === 'string' && parsed.dataInicio.length === 10
          ? parsed.dataInicio
          : hojeISO(),
      registros,
    };
  } catch {
    // JSON corrompido ou storage bloqueado: comeca limpo em vez de quebrar a tela.
    return vazio;
  }
}

/** Grava o estado. Silencioso em SSR ou se o storage estiver cheio/bloqueado. */
function salvarEstado(estado: AppState): void {
  if (!temStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {
    // Modo anonimo do Safari ou cota estourada: seguimos sem persistir.
  }
}

/** Data de hoje no fuso local, em 'YYYY-MM-DD'. */
export function hojeISO(): string {
  return formatarData(new Date());
}

/** Todos os dias ja marcados, indexados por 'YYYY-MM-DD'. */
export function getRegistros(): Record<string, DiaRegistro> {
  return lerEstado().registros;
}

/** Registro de um dia especifico (devolve um vazio se ainda nao existir). */
export function getRegistroDoDia(data: string): DiaRegistro {
  const registros = lerEstado().registros;
  return registros[data] ?? registroVazio(data);
}

/** Marca ou desmarca um passo do dia e devolve o registro atualizado. */
export function marcarPasso(data: string, periodo: Periodo, feito: boolean): DiaRegistro {
  const estado = lerEstado();
  const atual = estado.registros[data] ?? registroVazio(data);
  // Chave explicita em vez de computed key: mantem o tipo DiaRegistro estrito.
  const atualizado: DiaRegistro =
    periodo === 'manha'
      ? { ...atual, data, manha: feito }
      : { ...atual, data, noite: feito };

  estado.registros[data] = atualizado;
  // Garante que a data de inicio exista desde a primeira marcacao.
  if (!estado.dataInicio) estado.dataInicio = hojeISO();
  salvarEstado(estado);

  return atualizado;
}

/**
 * Sequencia de dias consecutivos com pelo menos um passo feito.
 *
 * Regra: a contagem termina em HOJE. Se hoje ainda nao tem nenhuma marcacao,
 * o dia de hoje nao quebra a sequencia (a usuaria ainda pode marcar mais tarde),
 * entao comecamos a contar a partir de ONTEM. Se ontem tambem estiver vazio,
 * a sequencia e 0.
 */
export function getStreak(): number {
  const registros = lerEstado().registros;

  const temAlgumPasso = (data: string): boolean => {
    const r = registros[data];
    return !!r && (r.manha || r.noite);
  };

  const hoje = hojeISO();
  let cursor = hoje;

  if (!temAlgumPasso(hoje)) {
    cursor = somarDias(hoje, -1);
    if (!temAlgumPasso(cursor)) return 0;
  }

  let streak = 0;
  while (temAlgumPasso(cursor)) {
    streak += 1;
    cursor = somarDias(cursor, -1);
  }

  return streak;
}

/** Quantos dias tiveram manha E noite marcadas (nao precisam ser consecutivos). */
export function getTotalDiasCompletos(): number {
  const registros = lerEstado().registros;
  return Object.values(registros).filter((r) => r.manha && r.noite).length;
}

/** Data do primeiro acesso. Criada e persistida na primeira vez que for lida. */
export function getDataInicio(): string {
  if (!temStorage()) return hojeISO();

  const estado = lerEstado();
  const bruto = window.localStorage.getItem(STORAGE_KEY);

  // Primeiro acesso de verdade: ainda nao existe nada gravado.
  if (!bruto) {
    salvarEstado(estado);
  }

  return estado.dataInicio;
}

/** Em que dia do protocolo a usuaria esta (1-based: o primeiro dia e o dia 1). */
export function getDiaDoProtocolo(): number {
  const inicio = parsearData(getDataInicio());
  const hoje = parsearData(hojeISO());

  const MS_POR_DIA = 24 * 60 * 60 * 1000;
  // Ambas as datas estao ancoradas ao meio-dia local, entao o arredondamento
  // absorve qualquer diferenca de horario de verao.
  const diff = Math.round((hoje.getTime() - inicio.getTime()) / MS_POR_DIA);

  return Math.max(1, diff + 1);
}
