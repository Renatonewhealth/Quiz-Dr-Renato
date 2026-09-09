'use client';

/**
 * Aba "Dúvidas" — banco de perguntas e respostas prontas.
 *
 * Por enquanto responde a partir de _lib/faq.ts (94 perguntas revisadas).
 * A rota /api/korean-chat continua no projeto para quando o assistente de
 * IA for ligado; basta trocar este componente ou somar o chat como um
 * caminho alternativo à busca.
 */

import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Search,
  X,
} from 'lucide-react';
import {
  CATEGORIAS,
  FAQ,
  TOTAL_PERGUNTAS,
  buscarPerguntas,
  perguntasDaCategoria,
  type CategoriaId,
  type PerguntaFaq,
} from '../_lib/faq';

const ROSA = '#c4448f';
const WHATSAPP = 'https://wa.me/553535311001';
const EMAIL = 'suporteh9pharma@gmail.com';

/** Perguntas mostradas na tela inicial, antes de escolher categoria. */
const DESTAQUES = [
  'rotina-como-usar',
  'resultado-tempo',
  'rotina-esqueci-po',
  'seg-efeito-colateral',
  'sk-protetor',
  'ped-garantia',
];

function Acordeao({
  item,
  aberto,
  aoAlternar,
}: {
  item: PerguntaFaq;
  aberto: boolean;
  aoAlternar: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={aoAlternar}
        aria-expanded={aberto}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-[15px] font-semibold leading-snug text-gray-900">
          {item.pergunta}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
            aberto ? 'rotate-180' : ''
          }`}
          style={{ color: ROSA }}
          strokeWidth={2.5}
        />
      </button>

      {aberto && (
        <div className="space-y-3 border-t border-gray-100 px-4 pb-4 pt-3">
          {item.resposta.map((paragrafo, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-gray-700">
              {paragrafo}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TabAssistente() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<CategoriaId | null>(null);
  const [abertaId, setAbertaId] = useState<string | null>(null);

  const buscando = busca.trim().length >= 2;

  const resultados = useMemo(
    () => (buscando ? buscarPerguntas(busca) : []),
    [busca, buscando],
  );

  const destaques = useMemo(
    () =>
      DESTAQUES.map((id) => FAQ.find((p) => p.id === id)).filter(
        (p): p is PerguntaFaq => Boolean(p),
      ),
    [],
  );

  const daCategoria = useMemo(
    () => (categoria ? perguntasDaCategoria(categoria) : []),
    [categoria],
  );

  const categoriaAtual = CATEGORIAS.find((c) => c.id === categoria) ?? null;

  function alternar(id: string) {
    setAbertaId((atual) => (atual === id ? null : id));
  }

  function limparBusca() {
    setBusca('');
    setAbertaId(null);
  }

  function abrirCategoria(id: CategoriaId) {
    setCategoria(id);
    setAbertaId(null);
    setBusca('');
  }

  function voltar() {
    setCategoria(null);
    setAbertaId(null);
  }

  return (
    <div className="px-4 pb-6 pt-5">
      {/* Cabeçalho */}
      <header className="mb-5">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          Tire suas dúvidas
        </h1>
        <p className="mt-1 text-[15px] leading-relaxed text-gray-600">
          {TOTAL_PERGUNTAS} respostas sobre a sua pele, a rotina do Korean Kit e
          o seu pedido.
        </p>
      </header>

      {/* Busca */}
      <div className="relative mb-5">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          strokeWidth={2}
        />
        <input
          type="search"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setAbertaId(null);
          }}
          placeholder="Buscar (ex.: esqueci, gravidez, entrega)"
          aria-label="Buscar nas perguntas frequentes"
          className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-11 text-[16px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#c4448f]"
        />
        {busca.length > 0 && (
          <button
            type="button"
            onClick={limparBusca}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* ---------- RESULTADOS DA BUSCA ---------- */}
      {buscando && (
        <section>
          <p className="mb-3 text-sm text-gray-500">
            {resultados.length === 0
              ? 'Nenhuma pergunta encontrada'
              : `${resultados.length} ${
                  resultados.length === 1
                    ? 'pergunta encontrada'
                    : 'perguntas encontradas'
                }`}
          </p>

          {resultados.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <p className="text-[15px] leading-relaxed text-gray-700">
                Não achei nada com essa palavra. Tente escrever de outro jeito,
                ou fale direto com a nossa equipe.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold text-white"
                style={{ backgroundColor: ROSA }}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                Falar no WhatsApp
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {resultados.map((item) => (
                <Acordeao
                  key={item.id}
                  item={item}
                  aberto={abertaId === item.id}
                  aoAlternar={() => alternar(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ---------- PERGUNTAS DE UMA CATEGORIA ---------- */}
      {!buscando && categoriaAtual && (
        <section>
          <button
            type="button"
            onClick={voltar}
            className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-800"
          >
            <ChevronRight className="h-4 w-4 rotate-180" strokeWidth={2.5} />
            Todos os assuntos
          </button>

          <h2 className="text-lg font-bold text-gray-900">
            {categoriaAtual.nome}
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            {daCategoria.length}{' '}
            {daCategoria.length === 1 ? 'pergunta' : 'perguntas'}
          </p>

          <div className="space-y-3">
            {daCategoria.map((item) => (
              <Acordeao
                key={item.id}
                item={item}
                aberto={abertaId === item.id}
                aoAlternar={() => alternar(item.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- TELA INICIAL: CATEGORIAS + DESTAQUES ---------- */}
      {!buscando && !categoriaAtual && (
        <>
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
              As mais perguntadas
            </h2>
            <div className="space-y-3">
              {destaques.map((item) => (
                <Acordeao
                  key={item.id}
                  item={item}
                  aberto={abertaId === item.id}
                  aoAlternar={() => alternar(item.id)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
              Buscar por assunto
            </h2>
            <div className="space-y-2.5">
              {CATEGORIAS.map((cat) => {
                const quantas = perguntasDaCategoria(cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => abrirCategoria(cat.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-gray-900">
                        {cat.nome}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-gray-500">
                        {cat.descricao}
                      </span>
                    </span>
                    <span className="flex flex-shrink-0 items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[12px] font-bold"
                        style={{ backgroundColor: `${ROSA}18`, color: ROSA }}
                      >
                        {quantas}
                      </span>
                      <ChevronRight
                        className="h-5 w-5 text-gray-400"
                        strokeWidth={2.5}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Rodapé de suporte */}
      <footer className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">
          Não encontrou a sua dúvida?
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
          A nossa equipe responde de segunda a sexta e ajuda no que você
          precisar.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold text-white"
          style={{ backgroundColor: ROSA }}
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          Falar no WhatsApp
        </a>
        <p className="mt-3 text-[13px] text-gray-500">
          ou {EMAIL}
        </p>
      </footer>

      <p className="mt-5 text-center text-[12px] leading-relaxed text-gray-400">
        Orientação educativa. Não substitui uma consulta médica.
      </p>
    </div>
  );
}
