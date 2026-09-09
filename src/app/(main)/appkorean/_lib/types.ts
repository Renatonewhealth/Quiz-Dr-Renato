/**
 * Tipos compartilhados do app Korean Kit.
 * Este arquivo nao tem dependencias e pode ser importado tanto no servidor
 * quanto no cliente.
 */

/** Os dois momentos da rotina: manha (po Regenera Skin) e noite (serum). */
export type Periodo = 'manha' | 'noite';

/** Registro de um unico dia do protocolo. `data` sempre em 'YYYY-MM-DD' local. */
export interface DiaRegistro {
  data: string;
  manha: boolean;
  noite: boolean;
}

/** Foto do diario de evolucao, guardada no IndexedDB como dataUrl base64. */
export interface FotoDiario {
  id: string;
  dataISO: string;
  dataUrl: string;
  nota?: string;
}

/** Mensagem do chat com a assistente. */
export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}
