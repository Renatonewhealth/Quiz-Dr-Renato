/** Tipos compartilhados do app do Jejum Termogênico. */

/** As três semanas do protocolo de 21 dias. */
export type SemanaId = 1 | 2 | 3;

/** Momento do dia em que a tarefa acontece. */
export type Momento = 'jejum' | 'manha' | 'tarde' | 'noite';

/** Uma tarefa da rotina diária. */
export interface Tarefa {
  id: string;
  momento: Momento;
  titulo: string;
  descricao: string;
  /** Horário sugerido, quando faz sentido fixar um. */
  horario?: string;
  /** Id da receita em receitas.ts, quando a tarefa é um preparo. */
  receitaId?: string;
}

/** Registro do que foi cumprido em um dia. */
export interface RegistroDia {
  data: string;
  /** Ids das tarefas concluídas. */
  tarefas: string[];
  /** Copos de 250 ml bebidos. */
  copos: number;
}

/** Bloco de uma semana do protocolo. */
export interface Semana {
  id: SemanaId;
  nome: string;
  subtitulo: string;
  /** Explicação do que acontece no corpo nesta fase. */
  explicacao: string[];
  /** Horas de jejum. */
  jejumHoras: number;
  /** Hora de início do jejum (0-23). */
  jejumInicio: number;
  /** Hora em que o jejum termina (0-23). */
  jejumFim: number;
  /** Meta de água em litros. */
  aguaLitros: number;
  tarefas: Tarefa[];
  pode: string[];
  naoPode: string[];
  desafios: string[];
  cardapio: { refeicao: string; horario?: string; descricao: string }[];
  autocuidados: { titulo: string; texto: string }[];
}

/** Uma preparação do protocolo (shot, chá, tônico, suco, doce). */
export interface Receita {
  id: string;
  nome: string;
  categoria: 'shot' | 'bebida' | 'cha' | 'tonico' | 'doce';
  semanas: SemanaId[];
  quando: string;
  ingredientes: string[];
  preparo: string[];
  observacao?: string;
}
