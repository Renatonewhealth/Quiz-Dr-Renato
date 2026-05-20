'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import {
  TestTube,
  ChevronLeft,
  Plus,
  Trash2,
  Edit3,
  Eye,
  RefreshCw,
  Power,
} from 'lucide-react';

// ---------- Types ----------
interface Variant {
  id: string;
  path: string;
  weight?: number;
}

interface RawExperiment {
  id: string;
  slug: string;
  entry: string;
  enabled: boolean;
  variants: Variant[];
  cookie_max_age_seconds: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface VariantDraft {
  id: string;
  path: string;
  weight: string; // string in form, parsed on submit
}

interface FormState {
  slug: string;
  entry: string;
  description: string;
  enabled: boolean;
  cookie_max_age_seconds: string;
  variants: VariantDraft[];
}

const EMPTY_FORM: FormState = {
  slug: '',
  entry: '/quiz',
  description: '',
  enabled: false,
  cookie_max_age_seconds: '',
  variants: [
    { id: 'A', path: '', weight: '1' },
    { id: 'B', path: '', weight: '1' },
  ],
};

// ---------- Helpers ----------
function validateForm(form: FormState, mode: 'create' | 'edit'): string | null {
  if (mode === 'create') {
    if (!form.slug.trim()) return 'Slug é obrigatório';
    if (!/^[a-z0-9-_]+$/i.test(form.slug.trim())) {
      return 'Slug deve conter apenas letras, números, hífens ou underscores';
    }
  }
  const entry = form.entry.trim();
  if (!entry) return 'Entry path é obrigatório';
  if (!entry.startsWith('/')) return 'Entry path deve começar com "/"';

  if (form.variants.length < 2) return 'É necessário ao menos 2 variantes';

  const ids = new Set<string>();
  for (const [i, v] of form.variants.entries()) {
    if (!v.id.trim()) return `Variante #${i + 1}: id é obrigatório`;
    if (ids.has(v.id.trim())) return `Variante #${i + 1}: id "${v.id}" duplicado`;
    ids.add(v.id.trim());
    if (!v.path.trim()) return `Variante #${i + 1}: path é obrigatório`;
    if (!v.path.trim().startsWith('/')) {
      return `Variante #${i + 1}: path deve começar com "/"`;
    }
    if (v.path.trim() === entry) {
      return `Variante #${i + 1}: path não pode ser igual ao entry`;
    }
    const w = Number(v.weight);
    if (!Number.isFinite(w) || w <= 0) {
      return `Variante #${i + 1}: weight deve ser número > 0`;
    }
  }

  if (form.cookie_max_age_seconds.trim()) {
    const n = Number(form.cookie_max_age_seconds);
    if (!Number.isFinite(n) || n <= 0) {
      return 'cookie_max_age_seconds deve ser número > 0';
    }
  }

  return null;
}

function formToPayload(form: FormState, mode: 'create' | 'edit') {
  const variants = form.variants.map((v) => ({
    id: v.id.trim(),
    path: v.path.trim(),
    weight: Number(v.weight) || 1,
  }));
  const base: Record<string, unknown> = {
    entry: form.entry.trim(),
    description: form.description.trim() || null,
    enabled: form.enabled,
    variants,
  };
  if (form.cookie_max_age_seconds.trim()) {
    base.cookie_max_age_seconds = Number(form.cookie_max_age_seconds);
  }
  if (mode === 'create') {
    base.slug = form.slug.trim();
  }
  return base;
}

function experimentToForm(exp: RawExperiment): FormState {
  return {
    slug: exp.slug,
    entry: exp.entry,
    description: exp.description ?? '',
    enabled: exp.enabled,
    cookie_max_age_seconds: String(exp.cookie_max_age_seconds ?? ''),
    variants:
      exp.variants && exp.variants.length > 0
        ? exp.variants.map((v) => ({
            id: v.id,
            path: v.path,
            weight: String(v.weight ?? 1),
          }))
        : [
            { id: 'A', path: '', weight: '1' },
            { id: 'B', path: '', weight: '1' },
          ],
  };
}

// ---------- Toggle ----------
function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
        checked ? 'bg-[#667eea]' : 'bg-gray-300'
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

// ---------- Modal ----------
function ExperimentModal({
  open,
  mode,
  initialForm,
  onClose,
  onSaved,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  initialForm: FormState;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setError(null);
    }
  }, [open, initialForm]);

  if (!open) return null;

  const updateVariant = (idx: number, patch: Partial<VariantDraft>) => {
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, i) => (i === idx ? { ...v, ...patch } : v)),
    }));
  };
  const removeVariant = (idx: number) => {
    setForm((f) => ({ ...f, variants: f.variants.filter((_, i) => i !== idx) }));
  };
  const addVariant = () => {
    setForm((f) => ({
      ...f,
      variants: [...f.variants, { id: '', path: '', weight: '1' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = validateForm(form, mode);
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = formToPayload(form, mode);
      const url =
        mode === 'create'
          ? '/api/admin/experiments'
          : `/api/admin/experiments/${encodeURIComponent(initialForm.slug)}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const msg = json.error || `Erro ${res.status}`;
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success(
        mode === 'create' ? 'Experimento criado!' : 'Experimento atualizado!',
      );
      onSaved();
      onClose();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao salvar';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Novo experimento' : 'Editar experimento'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'create'
              ? 'Configure um split A/B entre uma URL de entrada e variantes.'
              : 'Atualize a configuração do experimento. O slug não pode ser alterado.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              disabled={mode === 'edit'}
              placeholder="landing-test-2026-05"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#667eea] disabled:bg-gray-100 disabled:text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-safe, ex: landing-test-2026-05
            </p>
          </div>

          {/* Entry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entry path <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.entry}
              onChange={(e) => setForm((f) => ({ ...f, entry: e.target.value }))}
              placeholder="/quiz"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-[#667eea]"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL que dispara o split. NÃO pode existir como página real (rota livre).
              Sugestões: <code className="px-1 py-0.5 bg-gray-100 rounded">/quiz</code>,{' '}
              <code className="px-1 py-0.5 bg-gray-100 rounded">/start</code>,{' '}
              <code className="px-1 py-0.5 bg-gray-100 rounded">/go</code>
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={2}
              placeholder="Opcional: hipótese, contexto, métrica primária..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#667eea]"
            />
          </div>

          {/* Enabled */}
          <div className="flex items-center gap-3">
            <input
              id="exp-enabled"
              type="checkbox"
              checked={form.enabled}
              onChange={(e) =>
                setForm((f) => ({ ...f, enabled: e.target.checked }))
              }
              className="w-4 h-4 accent-[#667eea]"
            />
            <label htmlFor="exp-enabled" className="text-sm text-gray-700 font-medium">
              Habilitar imediatamente
            </label>
          </div>

          {/* Cookie max age (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cookie max age (segundos)
            </label>
            <input
              type="number"
              value={form.cookie_max_age_seconds}
              onChange={(e) =>
                setForm((f) => ({ ...f, cookie_max_age_seconds: e.target.value }))
              }
              placeholder="Padrão do sistema"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#667eea]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Por quanto tempo a variante atribuída persiste no navegador.
            </p>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Variantes <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addVariant}
                className="text-sm text-[#667eea] hover:text-[#5568d3] font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Adicionar variante
              </button>
            </div>
            <div className="space-y-2">
              {form.variants.map((v, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-2 items-start bg-gray-50 border border-gray-200 rounded-lg p-2"
                >
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={v.id}
                      onChange={(e) => updateVariant(i, { id: e.target.value })}
                      placeholder="A"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:border-[#667eea]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">id</p>
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={v.path}
                      onChange={(e) => updateVariant(i, { path: e.target.value })}
                      placeholder="/page-google"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:border-[#667eea]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">path</p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={v.weight}
                      min={1}
                      onChange={(e) => updateVariant(i, { weight: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#667eea]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">weight</p>
                  </div>
                  <div className="col-span-2 flex justify-end items-start pt-1">
                    {form.variants.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50"
                        aria-label="Remover variante"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-white bg-[#667eea] rounded-lg hover:bg-[#5568d3] disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && <RefreshCw className="w-4 h-4 animate-spin" />}
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Page wrapper (Suspense boundary p/ useSearchParams) ----------
export default function AdminExperimentsListPageWrapper() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Suspense fallback={null}>
        <AdminExperimentsListPage />
      </Suspense>
    </>
  );
}

function AdminExperimentsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [experiments, setExperiments] = useState<RawExperiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<RawExperiment | null>(null);

  const fetchExperiments = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/experiments', { cache: 'no-store' });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || `Erro ${res.status}`);
        return;
      }
      const json = (await res.json()) as { experiments: RawExperiment[] };
      setExperiments(json.experiments ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao buscar experimentos');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchExperiments().finally(() => setLoading(false));
  }, [fetchExperiments]);

  // Support ?edit=<slug> from results page
  useEffect(() => {
    const editSlug = searchParams.get('edit');
    if (editSlug && experiments.length > 0) {
      const target = experiments.find((e) => e.slug === editSlug);
      if (target) {
        setEditTarget(target);
        setModalMode('edit');
      }
      // strip the param
      router.replace('/admin/experiments');
    }
  }, [searchParams, experiments, router]);

  const handleToggle = async (exp: RawExperiment, next: boolean) => {
    setTogglingSlug(exp.slug);
    try {
      const res = await fetch(
        `/api/admin/experiments/${encodeURIComponent(exp.slug)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: next }),
        },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        toast.error(json.error || `Erro ${res.status}`);
        return;
      }
      toast.success(next ? 'Experimento ativado' : 'Experimento pausado');
      await fetchExperiments();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao alternar');
    } finally {
      setTogglingSlug(null);
    }
  };

  const handleDelete = async (exp: RawExperiment) => {
    if (
      !confirm(
        `Deletar o experimento "${exp.slug}"? Essa ação não pode ser desfeita.`,
      )
    ) {
      return;
    }
    try {
      const res = await fetch(
        `/api/admin/experiments/${encodeURIComponent(exp.slug)}`,
        { method: 'DELETE' },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        toast.error(json.error || `Erro ${res.status}`);
        return;
      }
      toast.success('Experimento deletado');
      await fetchExperiments();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao deletar');
    }
  };

  const initialForm = useMemo<FormState>(() => {
    if (modalMode === 'edit' && editTarget) {
      return experimentToForm(editTarget);
    }
    return EMPTY_FORM;
  }, [modalMode, editTarget]);

  if (loading && experiments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#667eea] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando experimentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Experimentos A/B</h1>
            <p className="text-gray-600 mt-1">
              Splitar tráfego entre variantes e comparar performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar ao dashboard
            </Link>
            <button
              onClick={() => {
                setEditTarget(null);
                setModalMode('create');
              }}
              className="px-4 py-2 bg-[#667eea] text-white rounded-lg hover:bg-[#5568d3] transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Novo experimento
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Empty state */}
      {experiments.length === 0 && !loading && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2 font-medium">
            Nenhum experimento ainda.
          </p>
          <p className="text-sm text-gray-500">
            Clique em &quot;Novo experimento&quot; pra criar o primeiro.
          </p>
        </div>
      )}

      {/* List */}
      {experiments.length > 0 && (
        <div className="space-y-3">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              {/* Top row */}
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{exp.slug}</h3>
                  <code className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-700">
                    {exp.entry}
                  </code>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    {exp.variants.length} variantes
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      exp.enabled
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {exp.enabled ? 'Ativo' : 'Pausado'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Power className="w-3.5 h-3.5" />
                    {togglingSlug === exp.slug ? 'Atualizando…' : ''}
                  </span>
                  <Toggle
                    checked={exp.enabled}
                    disabled={togglingSlug === exp.slug}
                    onChange={(next) => handleToggle(exp, next)}
                  />
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-sm text-gray-600 mb-3">{exp.description}</p>
              )}

              {/* Variants chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.variants.map((v) => (
                  <div
                    key={v.id}
                    className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-mono text-gray-700"
                  >
                    <span className="font-bold text-[#667eea]">{v.id}</span>
                    <span className="text-gray-400 mx-1">→</span>
                    <span>{v.path}</span>
                    {typeof v.weight === 'number' && (
                      <span className="text-gray-400 ml-1">
                        (w:{v.weight})
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Criado em{' '}
                  {new Date(exp.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {' · '}
                  Atualizado em{' '}
                  {new Date(exp.updated_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/experiments/${encodeURIComponent(exp.slug)}`}
                    className="text-sm text-[#667eea] hover:text-[#5568d3] font-medium flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Ver resultados
                  </Link>
                  <button
                    onClick={() => {
                      setEditTarget(exp);
                      setModalMode('edit');
                    }}
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(exp)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ExperimentModal
        open={modalMode !== null}
        mode={modalMode ?? 'create'}
        initialForm={initialForm}
        onClose={() => {
          setModalMode(null);
          setEditTarget(null);
        }}
        onSaved={fetchExperiments}
      />
    </div>
  );
}
