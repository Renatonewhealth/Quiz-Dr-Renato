'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { RECEITAS } from '../_lib/receitas';
import type { Receita, SemanaId } from '../_lib/types';

const LARANJA = '#ea580c';

const NOME_CATEGORIA: Record<Receita['categoria'], string> = {
  shot: 'Shots',
  bebida: 'Bebidas e sucos',
  cha: 'Chás',
  tonico: 'Tônicos',
  doce: 'Doces low carb',
};

const ORDEM_CATEGORIA: Receita['categoria'][] = [
  'shot',
  'bebida',
  'cha',
  'tonico',
  'doce',
];

const FILTROS: { id: 'todas' | SemanaId; rotulo: string }[] = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 1, rotulo: 'Semana 1' },
  { id: 2, rotulo: 'Semana 2' },
  { id: 3, rotulo: 'Semana 3' },
];

function semAcento(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function TabReceitas() {
  const [filtro, setFiltro] = useState<'todas' | SemanaId>('todas');
  const [busca, setBusca] = useState('');
  const [aberta, setAberta] = useState<string | null>(null);

  const visiveis = useMemo(() => {
    const termo = semAcento(busca.trim());
    return RECEITAS.filter((r) => {
      const daSemana = filtro === 'todas' || r.semanas.includes(filtro);
      if (!daSemana) return false;
      if (termo.length < 2) return true;
      const alvo = semAcento(
        `${r.nome} ${r.quando} ${r.ingredientes.join(' ')} ${r.preparo.join(' ')}`,
      );
      return alvo.includes(termo);
    });
  }, [filtro, busca]);

  return (
    <div className="pt-5">
      <header className="mb-4">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">Receitas</h1>
        <p className="mt-1 text-[15px] text-gray-600">
          Os preparos do protocolo, com medida e modo de fazer.
        </p>
      </header>

      {/* Busca */}
      <div className="relative mb-4">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          strokeWidth={2}
        />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar receita ou ingrediente"
          aria-label="Buscar receita"
          className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-11 text-[16px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ea580c]"
        />
        {busca.length > 0 && (
          <button
            type="button"
            onClick={() => setBusca('')}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Filtro por semana */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {FILTROS.map((f) => {
          const ativo = filtro === f.id;
          return (
            <button
              key={String(f.id)}
              type="button"
              onClick={() => setFiltro(f.id)}
              className="flex-shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              style={
                ativo
                  ? { backgroundColor: LARANJA, borderColor: LARANJA, color: '#fff' }
                  : { borderColor: '#e5e7eb', color: '#6b7280', backgroundColor: '#fff' }
              }
            >
              {f.rotulo}
            </button>
          );
        })}
      </div>

      {visiveis.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-5 text-center text-[15px] text-gray-600">
          Nenhuma receita encontrada com esse termo.
        </p>
      ) : (
        <div className="space-y-6">
          {ORDEM_CATEGORIA.map((cat) => {
            const daCategoria = visiveis.filter((r) => r.categoria === cat);
            if (daCategoria.length === 0) return null;

            return (
              <section key={cat}>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  {NOME_CATEGORIA[cat]}
                </h2>
                <div className="space-y-2">
                  {daCategoria.map((receita) => (
                    <CardReceita
                      key={receita.id}
                      receita={receita}
                      aberta={aberta === receita.id}
                      onAbrir={() =>
                        setAberta((a) => (a === receita.id ? null : receita.id))
                      }
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CardReceita({
  receita,
  aberta,
  onAbrir,
}: {
  receita: Receita;
  aberta: boolean;
  onAbrir: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onAbrir}
        aria-expanded={aberta}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="min-w-0">
          <span className="block text-[16px] font-semibold leading-snug text-gray-900">
            {receita.nome}
          </span>
          <span className="mt-0.5 block text-sm text-gray-500">{receita.quando}</span>
          <span className="mt-1.5 flex flex-wrap gap-1">
            {receita.semanas.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{ backgroundColor: `${LARANJA}18`, color: LARANJA }}
              >
                Semana {s}
              </span>
            ))}
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
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Ingredientes
          </p>
          <ul className="mb-4 space-y-1">
            {receita.ingredientes.map((ing, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-gray-700">
                • {ing}
              </li>
            ))}
          </ul>

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Modo de fazer
          </p>
          <ol className="space-y-2">
            {receita.preparo.map((passo, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: LARANJA }}
                >
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-gray-700">
                  {passo}
                </span>
              </li>
            ))}
          </ol>

          {receita.observacao && (
            <p
              className="mt-4 rounded-lg p-3 text-[14px] leading-relaxed text-gray-700"
              style={{ backgroundColor: `${LARANJA}10` }}
            >
              {receita.observacao}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
