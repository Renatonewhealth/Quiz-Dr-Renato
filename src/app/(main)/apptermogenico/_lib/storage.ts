import type { RegistroDia } from './types';
import { TOTAL_DIAS } from './protocolo';

/**
 * Estado do app no próprio aparelho (localStorage). Sem login, sem servidor.
 * Todas as funções são seguras em SSR: sem window, devolvem um default.
 */

const CHAVE = 'termogenico_app_v1';

interface Estado {
  dataInicio: string;
  registros: Record<string, RegistroDia>;
  /** Chaves dos autocuidados já feitos, no formato "semana-indice". */
  autocuidados: string[];
}

const VAZIO: Estado = { dataInicio: '', registros: {}, autocuidados: [] };

function temJanela(): boolean {
  return typeof window !== 'undefined';
}

/** Data de hoje em 'YYYY-MM-DD', no fuso local (não em UTC). */
export function hojeISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function ler(): Estado {
  if (!temJanela()) return VAZIO;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return VAZIO;
    const dados = JSON.parse(bruto) as Partial<Estado>;
    return {
      dataInicio: dados.dataInicio ?? '',
      registros: dados.registros ?? {},
      autocuidados: dados.autocuidados ?? [],
    };
  } catch {
    return VAZIO;
  }
}

function gravar(estado: Estado): void {
  if (!temJanela()) return;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {
    /* quota cheia ou modo privado: seguimos sem gravar */
  }
}

/** Data em que a pessoa começou o protocolo. Cria no primeiro acesso. */
export function getDataInicio(): string {
  const estado = ler();
  if (estado.dataInicio) return estado.dataInicio;
  const hoje = hojeISO();
  gravar({ ...estado, dataInicio: hoje });
  return hoje;
}

/** Dia do protocolo, de 1 a 21. Depois do 21 continua em 21. */
export function getDiaDoProtocolo(): number {
  if (!temJanela()) return 1;
  const inicio = getDataInicio();
  const [ai, mi, di] = inicio.split('-').map(Number);
  const [ah, mh, dh] = hojeISO().split('-').map(Number);
  const dInicio = new Date(ai, mi - 1, di);
  const dHoje = new Date(ah, mh - 1, dh);
  const passados = Math.floor((dHoje.getTime() - dInicio.getTime()) / 86400000);
  return Math.min(Math.max(passados + 1, 1), TOTAL_DIAS);
}

/** Recomeça o programa do zero. */
export function reiniciarPrograma(): void {
  if (!temJanela()) return;
  gravar({ dataInicio: hojeISO(), registros: {}, autocuidados: [] });
}

export function getRegistro(data: string): RegistroDia {
  const reg = ler().registros[data];
  return reg ?? { data, tarefas: [], copos: 0 };
}

/** Marca ou desmarca uma tarefa do dia. Devolve o registro atualizado. */
export function alternarTarefa(data: string, tarefaId: string): RegistroDia {
  const estado = ler();
  const atual = estado.registros[data] ?? { data, tarefas: [], copos: 0 };
  const feitas = new Set(atual.tarefas);
  if (feitas.has(tarefaId)) feitas.delete(tarefaId);
  else feitas.add(tarefaId);
  const novo: RegistroDia = { ...atual, tarefas: [...feitas] };
  gravar({ ...estado, registros: { ...estado.registros, [data]: novo } });
  return novo;
}

/** Soma (ou subtrai) copos de água do dia. Nunca fica negativo. */
export function ajustarCopos(data: string, delta: number): RegistroDia {
  const estado = ler();
  const atual = estado.registros[data] ?? { data, tarefas: [], copos: 0 };
  const novo: RegistroDia = { ...atual, copos: Math.max(0, atual.copos + delta) };
  gravar({ ...estado, registros: { ...estado.registros, [data]: novo } });
  return novo;
}

/** Dias seguidos com pelo menos uma tarefa concluída, terminando hoje ou ontem. */
export function getSequencia(): number {
  if (!temJanela()) return 0;
  const { registros } = ler();
  const cursor = new Date();
  // Se hoje ainda está zerado, a sequência pode terminar ontem.
  const hojeTemAlgo = (registros[hojeISO()]?.tarefas.length ?? 0) > 0;
  if (!hojeTemAlgo) cursor.setDate(cursor.getDate() - 1);

  let total = 0;
  for (let i = 0; i < 400; i++) {
    const mes = String(cursor.getMonth() + 1).padStart(2, '0');
    const dia = String(cursor.getDate()).padStart(2, '0');
    const chave = `${cursor.getFullYear()}-${mes}-${dia}`;
    if ((registros[chave]?.tarefas.length ?? 0) > 0) {
      total++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return total;
}

/** Quantos dias já tiveram ao menos uma tarefa concluída. */
export function getDiasComProgresso(): number {
  if (!temJanela()) return 0;
  return Object.values(ler().registros).filter((r) => r.tarefas.length > 0).length;
}

/* ------------------------- autocuidados ------------------------- */

export function getAutocuidadosFeitos(): string[] {
  return ler().autocuidados;
}

export function alternarAutocuidado(chave: string): boolean {
  const estado = ler();
  const feitos = new Set(estado.autocuidados);
  const agora = !feitos.has(chave);
  if (agora) feitos.add(chave);
  else feitos.delete(chave);
  gravar({ ...estado, autocuidados: [...feitos] });
  return agora;
}

/* --------------------------- jejum ------------------------------ */

export interface EstadoJejum {
  /** true = dentro da janela de jejum. */
  jejuando: boolean;
  /** Segundos que faltam para o próximo marco. */
  faltamSegundos: number;
  /** Percentual já cumprido da janela atual (0-100). */
  progresso: number;
  /** Hora em que o marco acontece, formatada. */
  proximoMarco: string;
}

/**
 * Calcula em que ponto do jejum a pessoa está agora.
 *
 * A janela do protocolo vira a meia-noite (ex.: 19h de um dia às 8h do
 * seguinte), então o cálculo usa minutos desde a meia-noite e trata esse
 * caso explicitamente.
 */
export function calcularJejum(
  inicioHora: number,
  fimHora: number,
  agora: Date = new Date(),
): EstadoJejum {
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const minutoInicio = inicioHora * 60;
  const minutoFim = fimHora * 60;

  const cruzaMeiaNoite = minutoInicio > minutoFim;
  const jejuando = cruzaMeiaNoite
    ? minutosAgora >= minutoInicio || minutosAgora < minutoFim
    : minutosAgora >= minutoInicio && minutosAgora < minutoFim;

  const duracaoJejum = cruzaMeiaNoite
    ? 24 * 60 - minutoInicio + minutoFim
    : minutoFim - minutoInicio;

  let decorrido: number;
  let faltam: number;

  if (jejuando) {
    decorrido =
      minutosAgora >= minutoInicio
        ? minutosAgora - minutoInicio
        : 24 * 60 - minutoInicio + minutosAgora;
    faltam = duracaoJejum - decorrido;
  } else {
    // Fora do jejum: conta quanto falta para a próxima janela começar.
    faltam =
      minutosAgora < minutoInicio
        ? minutoInicio - minutosAgora
        : 24 * 60 - minutosAgora + minutoInicio;
    const janelaComida = 24 * 60 - duracaoJejum;
    decorrido = janelaComida - faltam;
  }

  const base = jejuando ? duracaoJejum : 24 * 60 - duracaoJejum;
  const progresso = base > 0 ? Math.min(100, Math.max(0, (decorrido / base) * 100)) : 0;
  const marcoHora = jejuando ? fimHora : inicioHora;

  return {
    jejuando,
    faltamSegundos: Math.max(0, faltam * 60 - agora.getSeconds()),
    progresso,
    proximoMarco: `${String(marcoHora).padStart(2, '0')}:00`,
  };
}

/** Formata segundos como "3h 42min" ou "12min". */
export function formatarDuracao(segundos: number): string {
  const totalMin = Math.max(0, Math.ceil(segundos / 60));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}min`;
  return `${h}h ${String(m).padStart(2, '0')}min`;
}
