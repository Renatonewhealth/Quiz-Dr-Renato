/**
 * Diario de fotos (IndexedDB, client-side, async).
 *
 * Guardamos a imagem como dataUrl base64 dentro do proprio registro: e mais
 * simples de renderizar (<img src={foto.dataUrl} />) e evita gerenciar
 * objectURL / revoke na UI. Fotos ficam so no dispositivo, nunca sobem.
 *
 * Todas as funcoes sao seguras em SSR: sem `window`/IndexedDB elas resolvem
 * com um valor neutro em vez de rejeitar.
 */

import type { FotoDiario } from './types';

const DB_NOME = 'korean_diario';
const DB_VERSAO = 1;
const STORE = 'fotos';

/** Guard de SSR + navegadores sem IndexedDB (modo privado antigo do Safari). */
function temIndexedDB(): boolean {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
}

/** Gera um id unico simples (sem dependencia externa). */
function novoId(): string {
  const cripto = typeof crypto !== 'undefined' ? crypto : undefined;
  if (cripto && typeof cripto.randomUUID === 'function') {
    return cripto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Abre (e cria/migra, se preciso) o banco. */
function abrirDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NOME, DB_VERSAO);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        // Indice por data para listar em ordem cronologica sem varrer tudo.
        store.createIndex('dataISO', 'dataISO', { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Falha ao abrir o banco de fotos.'));
    req.onblocked = () => reject(new Error('Banco de fotos bloqueado por outra aba aberta.'));
  });
}

/** Executa uma operacao dentro de uma transacao e resolve quando ela commita. */
function comStore<T>(
  modo: IDBTransactionMode,
  operacao: (store: IDBObjectStore, resolver: (valor: T) => void) => void,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    abrirDB().then(
      (db) => {
        let resultado: T;
        let definido = false;

        const tx = db.transaction(STORE, modo);
        const store = tx.objectStore(STORE);

        tx.oncomplete = () => {
          db.close();
          // Se a operacao nunca resolveu, devolvemos undefined coagido:
          // so acontece em transacoes de escrita cujo retorno e void.
          resolve(definido ? resultado : (undefined as T));
        };
        tx.onerror = () => {
          db.close();
          reject(tx.error ?? new Error('Erro na transacao de fotos.'));
        };
        tx.onabort = () => {
          db.close();
          reject(tx.error ?? new Error('Transacao de fotos cancelada.'));
        };

        try {
          operacao(store, (valor: T) => {
            resultado = valor;
            definido = true;
          });
        } catch (erro) {
          tx.abort();
          reject(erro);
        }
      },
      (erro: unknown) => reject(erro),
    );
  });
}

/** Salva uma nova foto e devolve o registro criado. */
export async function salvarFoto(dataUrl: string, nota?: string): Promise<FotoDiario> {
  const foto: FotoDiario = {
    id: novoId(),
    dataISO: new Date().toISOString(),
    dataUrl,
    ...(nota && nota.trim() ? { nota: nota.trim() } : {}),
  };

  // Sem IndexedDB (SSR) devolvemos o objeto sem persistir, para nao quebrar a UI.
  if (!temIndexedDB()) return foto;

  await comStore<void>('readwrite', (store) => {
    store.put(foto);
  });

  return foto;
}

/** Lista todas as fotos, da mais recente para a mais antiga. */
export async function listarFotos(): Promise<FotoDiario[]> {
  if (!temIndexedDB()) return [];

  const fotos = await comStore<FotoDiario[]>('readonly', (store, resolver) => {
    const req = store.getAll();
    req.onsuccess = () => resolver((req.result as FotoDiario[]) ?? []);
  });

  // Ordena no cliente: dataISO e ISO completo, entao comparar string ja basta.
  return [...fotos].sort((a, b) => (a.dataISO < b.dataISO ? 1 : a.dataISO > b.dataISO ? -1 : 0));
}

/** Remove uma foto pelo id. */
export async function removerFoto(id: string): Promise<void> {
  if (!temIndexedDB()) return;

  await comStore<void>('readwrite', (store) => {
    store.delete(id);
  });
}
