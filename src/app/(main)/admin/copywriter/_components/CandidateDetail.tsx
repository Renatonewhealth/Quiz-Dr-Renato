'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import {
  CopyApplication,
  CopyApplicationStatus,
  STATUS_OPTIONS,
  formatCompletionTime,
  seniorityLabel,
  statusBadgeClasses,
  statusLabel,
} from './types';

const serifStyle = { fontFamily: 'var(--font-instrument-serif), Georgia, serif' };

type Props = {
  application: CopyApplication;
  reviewerEmail: string | null;
};

export default function CandidateDetail({ application, reviewerEmail }: Props) {
  const [app, setApp] = useState<CopyApplication>(application);
  const [notesDraft, setNotesDraft] = useState<string>(application.internal_notes ?? '');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    setApp(application);
    setNotesDraft(application.internal_notes ?? '');
  }, [application]);

  async function patchRow(
    patch: Partial<Pick<CopyApplication, 'status' | 'internal_rating' | 'internal_notes'>>,
    successMsg = 'Atualizado.'
  ) {
    const prev = app;
    setApp((a) => ({ ...a, ...patch }));
    try {
      const res = await fetch(`/api/copy-applications/${app.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      if (json?.data) setApp((a) => ({ ...a, ...json.data }));
      toast.success(successMsg);
    } catch {
      setApp(prev);
      toast.error('Erro ao salvar.');
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    await patchRow({ internal_notes: notesDraft }, 'Notas salvas.');
    setSavingNotes(false);
  }

  const waDigits = (app.whatsapp ?? '').replace(/\D/g, '');
  const igHandle = (app.instagram ?? '').replace(/^@/, '');

  const notesDirty = (app.internal_notes ?? '') !== notesDraft;

  return (
    <div className="max-w-[1400px] mx-auto">
      <Link
        href="/admin/copywriter/candidatos"
        className="inline-block text-sm text-[#A3A3A3] hover:text-[#FAFAFA] mb-4"
      >
        ← Candidatos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h1
              className="text-4xl text-[#FAFAFA] leading-tight"
              style={serifStyle}
            >
              {app.full_name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#A3A3A3] mt-3">
              {igHandle && (
                <a
                  href={`https://instagram.com/${igHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#FAFAFA] transition-colors"
                >
                  @{igHandle}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {waDigits && (
                <a
                  href={`https://wa.me/${waDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#FAFAFA] transition-colors"
                >
                  WhatsApp
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <span className="inline-block px-2 py-1 rounded-md text-xs bg-[#1A1A1A] border border-[#2A2A2A] text-[#A3A3A3]">
                {seniorityLabel(app.seniority)}
              </span>
              <span>{format(new Date(app.created_at), 'dd/MM/yyyy HH:mm')}</span>
              <span>⏱ {formatCompletionTime(app.completion_time_seconds)}</span>
            </div>
          </div>

          {/* 1 - Perfil profissional */}
          <Section title="Perfil profissional">
            <Field label="Anos de experiência" value={app.years_experience} />
            <Field label="Operações trabalhadas" value={app.operations_worked} />
            <Field label="Nichos" value={app.niches} />
            <Field label="Especialidade" value={app.specialty} />
          </Section>

          {/* 2 - Resultados e referências */}
          <Section title="Resultados e referências">
            <Field label="Resultados trazidos" value={app.results_brought} />
            <Field label="Livros lidos" value={app.books_read} />
            <Field label="Top 3 copywriters" value={app.top_copywriters} />
          </Section>

          {/* 3 - Respostas técnicas (highlighted) */}
          <Section
            title="Respostas técnicas"
            className="border-[#E8E3D8]/20"
          >
            <Field
              label="Mecanismo único"
              value={app.answer_unique_mechanism}
              multiline
            />
            <Field
              label="Superestrutura"
              value={app.answer_superstructure}
              multiline
            />
            <Field
              label="Bloco de oferta"
              value={app.answer_offer_block}
              multiline
            />
          </Section>

          {/* 4 - Portfolio */}
          <Section title="Portfólio">
            {app.portfolio_url ? (
              <a
                href={app.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xl text-[#FAFAFA] underline decoration-[#E8E3D8]/40 hover:decoration-[#E8E3D8] break-all"
                style={serifStyle}
              >
                {app.portfolio_url}
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            ) : (
              <p className="text-sm text-[#666666]">Sem portfólio.</p>
            )}
          </Section>

          {/* 5 - Espaço livre */}
          {app.free_space && app.free_space.trim() !== '' && (
            <Section title="Espaço livre">
              <p className="text-sm text-[#FAFAFA] whitespace-pre-wrap leading-relaxed">
                {app.free_space}
              </p>
            </Section>
          )}
        </div>

        {/* RIGHT */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-6 bg-[#121212] border border-[#1F1F1F] rounded-xl p-6 space-y-6">
            {/* Status */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3] mb-2">
                Status
              </p>
              <StatusSelector
                value={app.status}
                onChange={(v) => patchRow({ status: v })}
              />
            </div>

            {/* Rating */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3] mb-2">
                Rating interno
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => {
                  const active = i <= (app.internal_rating ?? 0);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        patchRow({
                          internal_rating: i === app.internal_rating ? 0 : i,
                        })
                      }
                      className="p-1"
                      aria-label={`${i} estrela${i > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          active
                            ? 'fill-[#E8E3D8] text-[#E8E3D8]'
                            : 'text-[#2A2A2A]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notas */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3] mb-2">
                Notas internas
              </p>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Anote observações internas…"
                className="w-full min-h-[120px] px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-sm text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none focus:border-[#E8E3D8]/40 resize-y"
              />
              {notesDirty && (
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-[#E8E3D8] text-[#0A0A0A] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {savingNotes ? 'Salvando…' : 'Salvar notas'}
                </button>
              )}
            </div>

            {/* Reviewed by */}
            <div className="pt-4 border-t border-[#1F1F1F]">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3] mb-2">
                Revisão
              </p>
              {app.reviewed_by && app.reviewed_at ? (
                <p className="text-xs text-[#A3A3A3]">
                  Revisado por{' '}
                  <span className="text-[#FAFAFA]">
                    {reviewerEmail ?? app.reviewed_by.slice(0, 8)}
                  </span>{' '}
                  em {format(new Date(app.reviewed_at), 'dd/MM/yyyy HH:mm')}
                </p>
              ) : (
                <p className="text-xs text-[#666666]">Ainda não revisado.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#121212] border border-[#1F1F1F] rounded-xl p-6 ${
        className ?? ''
      }`}
    >
      <h2
        className="text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3] mb-4"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string | null;
  multiline?: boolean;
}) {
  if (!value) {
    return (
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">
          {label}
        </p>
        <p className="text-sm text-[#666666] mt-1">—</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">
        {label}
      </p>
      <p
        className={`text-sm text-[#FAFAFA] mt-1 ${
          multiline ? 'whitespace-pre-wrap leading-relaxed' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusSelector({
  value,
  onChange,
}: {
  value: CopyApplicationStatus;
  onChange: (v: CopyApplicationStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm ${statusBadgeClasses(
          value
        )}`}
      >
        {statusLabel(value)}
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-[#121212] border border-[#2A2A2A] rounded-lg py-1 shadow-xl">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#1A1A1A] ${
                s.value === value ? 'text-[#E8E3D8]' : 'text-[#FAFAFA]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
