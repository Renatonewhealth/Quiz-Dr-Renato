'use client';

/**
 * Aba "Diario de Pele".
 *
 * A usuaria tira uma foto do rosto, o app redimensiona no proprio aparelho
 * (lado maior 1080px, JPEG 0.8) e guarda no IndexedDB via _lib/fotos.
 * Nada sai do dispositivo. Alem da galeria, existe um comparador lado a lado
 * ("antes" x "depois") que mostra quantos dias separam as duas fotos.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Camera,
  CalendarDays,
  ImagePlus,
  Loader2,
  Lock,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';

import { listarFotos, removerFoto, salvarFoto } from '../_lib/fotos';
import type { FotoDiario } from '../_lib/types';

const MAX_LADO = 1080;
const QUALIDADE = 0.8;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatarDataCurta(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatarDataLonga(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

/** Diferenca em dias de calendario (sempre positiva). */
function diasEntre(isoA: string, isoB: string): number {
  const a = new Date(isoA);
  const b = new Date(isoB);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  const ma = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const mb = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.abs(Math.round((mb - ma) / 86_400_000));
}

function lerArquivo(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(String(leitor.result));
    leitor.onerror = () => reject(leitor.error ?? new Error('Não foi possível ler a imagem.'));
    leitor.readAsDataURL(file);
  });
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Não foi possível abrir a imagem.'));
    img.src = src;
  });
}

/** Le o arquivo, reduz o lado maior para 1080px e devolve um JPEG em dataUrl. */
async function redimensionar(file: File): Promise<string> {
  const original = await lerArquivo(file);
  const img = await carregarImagem(original);

  const maior = Math.max(img.naturalWidth || 1, img.naturalHeight || 1);
  const escala = maior > MAX_LADO ? MAX_LADO / maior : 1;
  const largura = Math.max(1, Math.round((img.naturalWidth || 1) * escala));
  const altura = Math.max(1, Math.round((img.naturalHeight || 1) * escala));

  const canvas = document.createElement('canvas');
  canvas.width = largura;
  canvas.height = altura;

  const ctx = canvas.getContext('2d');
  if (!ctx) return original; // fallback: guarda o original mesmo

  // Fundo branco: JPEG nao tem transparencia.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, largura, altura);
  ctx.drawImage(img, 0, 0, largura, altura);

  return canvas.toDataURL('image/jpeg', QUALIDADE);
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

export default function TabDiario() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fotos, setFotos] = useState<FotoDiario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [removendoId, setRemovendoId] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Foto escolhida mas ainda nao salva (etapa de conferir + escrever a nota).
  const [pendente, setPendente] = useState<string | null>(null);
  const [nota, setNota] = useState('');

  // Comparador
  const [idAntes, setIdAntes] = useState<string | null>(null);
  const [idDepois, setIdDepois] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      const lista = await listarFotos();
      setFotos(lista);
    } catch {
      setErro('Não consegui abrir suas fotos salvas neste aparelho.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  // Pre-seleciona a mais antiga e a mais recente sempre que a lista muda.
  useEffect(() => {
    if (fotos.length < 2) {
      setIdAntes(null);
      setIdDepois(null);
      return;
    }
    const ids = new Set(fotos.map((f) => f.id));
    const maisAntiga = fotos[fotos.length - 1].id; // listarFotos vem do mais novo pro mais velho
    const maisRecente = fotos[0].id;
    setIdAntes((atual) => (atual && ids.has(atual) ? atual : maisAntiga));
    setIdDepois((atual) => (atual && ids.has(atual) ? atual : maisRecente));
  }, [fotos]);

  const fotoAntes = useMemo(
    () => fotos.find((f) => f.id === idAntes) ?? null,
    [fotos, idAntes],
  );
  const fotoDepois = useMemo(
    () => fotos.find((f) => f.id === idDepois) ?? null,
    [fotos, idDepois],
  );

  /* ---------------- acoes ---------------- */

  async function aoEscolherArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    // Libera o input pra permitir escolher a mesma foto de novo depois.
    evento.target.value = '';
    if (!arquivo) return;

    setErro(null);
    setProcessando(true);
    try {
      const dataUrl = await redimensionar(arquivo);
      setPendente(dataUrl);
      setNota('');
    } catch {
      setErro('Não consegui preparar essa imagem. Tente tirar a foto de novo.');
    } finally {
      setProcessando(false);
    }
  }

  async function confirmarSalvar() {
    if (!pendente) return;
    setErro(null);
    setSalvando(true);
    try {
      await salvarFoto(pendente, nota);
      setPendente(null);
      setNota('');
      await carregar();
    } catch {
      setErro('Não consegui salvar a foto neste aparelho. Tente de novo.');
    } finally {
      setSalvando(false);
    }
  }

  function descartarPendente() {
    setPendente(null);
    setNota('');
  }

  async function apagar(foto: FotoDiario) {
    const ok = window.confirm(
      `Remover a foto de ${formatarDataCurta(foto.dataISO)}? Isso não pode ser desfeito.`,
    );
    if (!ok) return;

    setErro(null);
    setRemovendoId(foto.id);
    try {
      await removerFoto(foto.id);
      await carregar();
    } catch {
      setErro('Não consegui remover essa foto. Tente de novo.');
    } finally {
      setRemovendoId(null);
    }
  }

  /* ---------------- render ---------------- */

  const temFotos = fotos.length > 0;
  const podeComparar = fotos.length >= 2;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6 text-base text-gray-900">
      {/* Cabecalho */}
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Diário de Pele</h1>
        <p className="mt-1 text-base leading-relaxed text-gray-700">
          Uma foto de vez em quando é a melhor forma de enxergar a sua evolução. A pele muda
          devagar &mdash; a foto lembra o que os olhos esquecem.
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm text-gray-500">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Suas fotos ficam guardadas só neste aparelho. Nada é enviado para a internet.</span>
        </p>
      </header>

      {/* Erro */}
      {erro && (
        <div
          role="alert"
          className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <span>{erro}</span>
          <button
            type="button"
            onClick={() => setErro(null)}
            aria-label="Fechar aviso"
            className="-m-2 shrink-0 rounded-lg p-2 text-red-700 hover:bg-red-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Input escondido: no celular abre a camera frontal */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={aoEscolherArquivo}
        className="hidden"
      />

      {/* Etapa de conferir a foto antes de salvar */}
      {pendente ? (
        <section className="mb-6 rounded-2xl border border-[#c4448f]/25 bg-[#c4448f10] p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Ficou boa?</h2>

          <div className="overflow-hidden rounded-xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pendente}
              alt="Prévia da foto que você acabou de tirar"
              className="mx-auto max-h-80 w-full object-contain"
            />
          </div>

          <label htmlFor="nota-foto" className="mt-4 block text-base font-medium text-gray-900">
            Quer anotar alguma coisa? (opcional)
          </label>
          <input
            id="nota-foto"
            type="text"
            value={nota}
            onChange={(e) => setNota(e.target.value.slice(0, 80))}
            maxLength={80}
            placeholder="Ex.: dia 15, pele menos oleosa"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#c4448f] focus:outline-none focus:ring-2 focus:ring-[#c4448f]/30"
          />

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={confirmarSalvar}
              disabled={salvando}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#c4448f] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#a33575] disabled:opacity-60"
            >
              {salvando ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Salvando...
                </>
              ) : (
                'Salvar no diário'
              )}
            </button>
            <button
              type="button"
              onClick={descartarPendente}
              disabled={salvando}
              className="min-h-[52px] rounded-xl border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60 sm:w-40"
            >
              Descartar
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processando}
          className="mb-6 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-2xl bg-[#c4448f] px-6 py-5 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#a33575] disabled:opacity-60"
        >
          {processando ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
              Preparando a foto...
            </>
          ) : (
            <>
              <Camera className="h-6 w-6" aria-hidden="true" />
              Tirar foto de hoje
            </>
          )}
        </button>
      )}

      {/* Carregando a galeria */}
      {carregando && (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-gray-50 py-10 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          <span className="text-base">Abrindo seu diário...</span>
        </div>
      )}

      {/* Estado vazio */}
      {!carregando && !temFotos && !pendente && (
        <section className="rounded-2xl border border-dashed border-[#c4448f]/40 bg-[#c4448f10] px-6 py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <ImagePlus className="h-8 w-8 text-[#c4448f]" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Sua primeira foto começa a história</h2>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-gray-700">
            Tire a foto de hoje e repita a cada 7 dias. Depois de algumas semanas você vai colocar
            as duas lado a lado e ver a diferença com os próprios olhos.
          </p>

          <ul className="mx-auto mt-5 max-w-md space-y-2 text-left text-base text-gray-700">
            <li className="flex items-start gap-2">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#c4448f]" aria-hidden="true" />
              <span>Sempre no <strong>mesmo lugar</strong> e com a <strong>mesma luz</strong> (a luz do dia perto da janela é a melhor).</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#c4448f]" aria-hidden="true" />
              <span>Rosto limpo, sem maquiagem e sem filtro.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#c4448f]" aria-hidden="true" />
              <span>Sempre na mesma posição, olhando de frente para a câmera.</span>
            </li>
          </ul>
        </section>
      )}

      {/* Comparador */}
      {!carregando && podeComparar && (
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <ArrowLeftRight className="h-5 w-5 text-[#c4448f]" aria-hidden="true" />
            Comparar antes e depois
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Escolha duas fotos para ver a evolução lado a lado.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* ANTES */}
            <div>
              <label
                htmlFor="select-antes"
                className="mb-1 block text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Antes
              </label>
              <select
                id="select-antes"
                value={idAntes ?? ''}
                onChange={(e) => setIdAntes(e.target.value)}
                className="mb-2 min-h-[44px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-[#c4448f] focus:outline-none focus:ring-2 focus:ring-[#c4448f]/30"
              >
                {fotos.map((f) => (
                  <option key={f.id} value={f.id}>
                    {formatarDataCurta(f.dataISO)}
                  </option>
                ))}
              </select>
              <div className="overflow-hidden rounded-xl bg-gray-50">
                {fotoAntes && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={fotoAntes.dataUrl}
                    alt={`Foto de ${formatarDataLonga(fotoAntes.dataISO)}`}
                    className="aspect-[3/4] w-full object-cover"
                  />
                )}
              </div>
              {fotoAntes?.nota && (
                <p className="mt-2 text-sm text-gray-600">{fotoAntes.nota}</p>
              )}
            </div>

            {/* DEPOIS */}
            <div>
              <label
                htmlFor="select-depois"
                className="mb-1 block text-sm font-semibold uppercase tracking-wide text-[#c4448f]"
              >
                Depois
              </label>
              <select
                id="select-depois"
                value={idDepois ?? ''}
                onChange={(e) => setIdDepois(e.target.value)}
                className="mb-2 min-h-[44px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-[#c4448f] focus:outline-none focus:ring-2 focus:ring-[#c4448f]/30"
              >
                {fotos.map((f) => (
                  <option key={f.id} value={f.id}>
                    {formatarDataCurta(f.dataISO)}
                  </option>
                ))}
              </select>
              <div className="overflow-hidden rounded-xl bg-gray-50">
                {fotoDepois && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={fotoDepois.dataUrl}
                    alt={`Foto de ${formatarDataLonga(fotoDepois.dataISO)}`}
                    className="aspect-[3/4] w-full object-cover"
                  />
                )}
              </div>
              {fotoDepois?.nota && (
                <p className="mt-2 text-sm text-gray-600">{fotoDepois.nota}</p>
              )}
            </div>
          </div>

          {fotoAntes && fotoDepois && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#c4448f10] px-4 py-3 text-center text-base font-medium text-gray-900">
              <CalendarDays className="h-5 w-5 shrink-0 text-[#c4448f]" aria-hidden="true" />
              {(() => {
                const dias = diasEntre(fotoAntes.dataISO, fotoDepois.dataISO);
                if (dias === 0) return <span>As duas fotos são do mesmo dia.</span>;
                if (dias === 1) return <span>1 dia entre uma foto e outra.</span>;
                return <span>{dias} dias entre uma foto e outra.</span>;
              })()}
            </div>
          )}
        </section>
      )}

      {/* Galeria */}
      {!carregando && temFotos && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Suas fotos{' '}
            <span className="font-normal text-gray-500">
              ({fotos.length}
              {fotos.length === 1 ? ' foto' : ' fotos'})
            </span>
          </h2>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {fotos.map((foto) => (
              <li
                key={foto.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.dataUrl}
                    alt={`Foto de ${formatarDataLonga(foto.dataISO)}`}
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => apagar(foto)}
                    disabled={removendoId === foto.id}
                    aria-label={`Remover foto de ${formatarDataCurta(foto.dataISO)}`}
                    className="absolute right-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-red-600 disabled:opacity-60"
                  >
                    {removendoId === foto.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">
                    {formatarDataCurta(foto.dataISO)}
                  </p>
                  {foto.nota && (
                    <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{foto.nota}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {fotos.length === 1 && (
            <p className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
              Tire mais uma foto daqui a alguns dias para liberar a comparação lado a lado.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
