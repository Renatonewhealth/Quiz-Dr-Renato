'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Papa from 'papaparse';
import { toast } from 'sonner';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  Search,
  Star,
  X,
} from 'lucide-react';
import {
  CopyApplication,
  CopyApplicationStatus,
  SENIORITY_OPTIONS,
  STATUS_OPTIONS,
  YEARS_OPTIONS,
  seniorityLabel,
  statusBadgeClasses,
  statusLabel,
} from './types';

type Props = {
  initialData: CopyApplication[];
};

type SortKey = 'recent' | 'oldest' | 'rating';

const PAGE_SIZE = 25;

export default function CandidatesTable({ initialData }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<CopyApplication[]>(initialData);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [seniorityFilter, setSeniorityFilter] = useState<string[]>([]);
  const [yearsFilter, setYearsFilter] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, seniorityFilter, yearsFilter, search, sort]);

  const filtered = useMemo(() => {
    let out = rows.slice();
    if (statusFilter.length > 0) {
      out = out.filter((a) => statusFilter.includes(a.status));
    }
    if (seniorityFilter.length > 0) {
      out = out.filter((a) => seniorityFilter.includes(a.seniority));
    }
    if (yearsFilter.length > 0) {
      out = out.filter((a) => yearsFilter.includes(a.years_experience));
    }
    if (search) {
      out = out.filter((a) => {
        const name = (a.full_name ?? '').toLowerCase();
        const insta = (a.instagram ?? '').toLowerCase();
        return name.includes(search) || insta.includes(search);
      });
    }
    switch (sort) {
      case 'recent':
        out.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'oldest':
        out.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case 'rating':
        out.sort((a, b) => (b.internal_rating ?? 0) - (a.internal_rating ?? 0));
        break;
    }
    return out;
  }, [rows, statusFilter, seniorityFilter, yearsFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageRows = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const filtersActive =
    statusFilter.length > 0 ||
    seniorityFilter.length > 0 ||
    yearsFilter.length > 0 ||
    search.length > 0;

  function clearFilters() {
    setStatusFilter([]);
    setSeniorityFilter([]);
    setYearsFilter([]);
    setSearchInput('');
    setSearch('');
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function selectAllOnPage(checked: boolean) {
    setSelected((prev) => {
      const n = new Set(prev);
      for (const r of pageRows) {
        if (checked) n.add(r.id);
        else n.delete(r.id);
      }
      return n;
    });
  }

  const allOnPageSelected =
    pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  async function updateRow(
    id: string,
    patch: Partial<Pick<CopyApplication, 'status' | 'internal_rating' | 'internal_notes'>>
  ) {
    // optimistic
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    try {
      const res = await fetch(`/api/copy-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      if (json?.data) {
        setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...json.data } : r)));
      }
      toast.success('Atualizado.');
    } catch {
      setRows(prev);
      toast.error('Erro ao atualizar.');
    }
  }

  async function bulkChangeStatus(newStatus: CopyApplicationStatus) {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const prev = rows;
    setRows((rs) => rs.map((r) => (ids.includes(r.id) ? { ...r, status: newStatus } : r)));
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/copy-applications/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
          })
        )
      );
      toast.success(`${ids.length} atualizados.`);
      setSelected(new Set());
    } catch {
      setRows(prev);
      toast.error('Erro no bulk update.');
    }
  }

  function exportCsv() {
    const csvRows = filtered.map((a) => ({
      id: a.id,
      created_at: a.created_at,
      updated_at: a.updated_at,
      full_name: a.full_name,
      instagram: a.instagram,
      whatsapp: a.whatsapp,
      years_experience: a.years_experience,
      seniority: a.seniority,
      operations_worked: a.operations_worked,
      niches: a.niches,
      specialty: a.specialty,
      results_brought: a.results_brought,
      books_read: a.books_read,
      top_copywriters: a.top_copywriters,
      answer_unique_mechanism: a.answer_unique_mechanism,
      answer_superstructure: a.answer_superstructure,
      answer_offer_block: a.answer_offer_block,
      portfolio_url: a.portfolio_url,
      free_space: a.free_space,
      status: a.status,
      internal_rating: a.internal_rating,
      internal_notes: a.internal_notes,
      reviewed_by: a.reviewed_by,
      reviewed_at: a.reviewed_at,
      completion_time_seconds: a.completion_time_seconds,
    }));
    const csv = Papa.unparse(csvRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const date = format(new Date(), 'yyyy-MM-dd');
    link.download = `copywriter-applications-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exportado.');
  }

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          <MultiSelect
            label="Status"
            options={STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            values={statusFilter}
            onChange={setStatusFilter}
          />
          <MultiSelect
            label="Senioridade"
            options={SENIORITY_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            values={seniorityFilter}
            onChange={setSeniorityFilter}
          />
          <MultiSelect
            label="Anos exp."
            options={YEARS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            values={yearsFilter}
            onChange={setYearsFilter}
          />

          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por nome ou instagram…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-sm text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none focus:border-[#E8E3D8]/40"
            />
          </div>

          <SortDropdown value={sort} onChange={setSort} />

          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs px-3 py-2 text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
            >
              Limpar filtros
            </button>
          )}

          <button
            type="button"
            onClick={exportCsv}
            className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E8E3D8] text-[#0A0A0A] text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#121212] border border-[#1F1F1F] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[960px]">
            <thead className="bg-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] text-[#A3A3A3]">
              <tr>
                <th className="px-4 py-3 text-left font-normal w-10">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={(e) => selectAllOnPage(e.target.checked)}
                    className="accent-[#E8E3D8]"
                  />
                </th>
                <th className="px-4 py-3 text-left font-normal">Nome</th>
                <th className="px-4 py-3 text-left font-normal">Instagram</th>
                <th className="px-4 py-3 text-left font-normal">Senioridade</th>
                <th className="px-4 py-3 text-left font-normal">Anos exp.</th>
                <th className="px-4 py-3 text-left font-normal">Rating</th>
                <th className="px-4 py-3 text-left font-normal">Status</th>
                <th className="px-4 py-3 text-left font-normal">Data</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-sm text-[#666666] border-t border-[#1F1F1F]"
                  >
                    {filtersActive
                      ? 'Nenhum candidato corresponde aos filtros.'
                      : 'Nenhuma aplicação ainda.'}
                  </td>
                </tr>
              ) : (
                pageRows.map((app) => {
                  const isSel = selected.has(app.id);
                  return (
                    <tr
                      key={app.id}
                      className={`border-t border-[#1F1F1F] transition-colors cursor-pointer ${
                        isSel ? 'bg-[#1A1A1A]' : 'hover:bg-[#1A1A1A]'
                      }`}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('[data-no-row-click]')) return;
                        router.push(`/admin/copywriter/candidatos/${app.id}`);
                      }}
                    >
                      <td className="px-4 py-3" data-no-row-click>
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleSelect(app.id)}
                          className="accent-[#E8E3D8]"
                        />
                      </td>
                      <td className="px-4 py-3 text-[#FAFAFA] font-medium">
                        {app.full_name}
                      </td>
                      <td className="px-4 py-3" data-no-row-click>
                        <a
                          href={`https://instagram.com/${(app.instagram ?? '').replace(/^@/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          @{(app.instagram ?? '').replace(/^@/, '')}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 rounded-md text-xs bg-[#1A1A1A] border border-[#2A2A2A] text-[#A3A3A3]">
                          {seniorityLabel(app.seniority)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#A3A3A3]">{app.years_experience}</td>
                      <td className="px-4 py-3" data-no-row-click>
                        <InlineStars
                          value={app.internal_rating ?? 0}
                          onChange={(v) => updateRow(app.id, { internal_rating: v })}
                        />
                      </td>
                      <td className="px-4 py-3" data-no-row-click>
                        <StatusDropdown
                          value={app.status}
                          onChange={(v) => updateRow(app.id, { status: v })}
                        />
                      </td>
                      <td className="px-4 py-3 text-[#A3A3A3] text-xs whitespace-nowrap">
                        {format(new Date(app.created_at), 'dd/MM/yyyy')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#1F1F1F] text-xs text-[#A3A3A3]">
            <span>
              Mostrando {(pageSafe - 1) * PAGE_SIZE + 1}–
              {Math.min(pageSafe * PAGE_SIZE, filtered.length)} de {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={pageSafe <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-md border border-[#2A2A2A] bg-[#0A0A0A] text-[#A3A3A3] hover:text-[#FAFAFA] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2">
                {pageSafe} / {totalPages}
              </span>
              <button
                type="button"
                disabled={pageSafe >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-md border border-[#2A2A2A] bg-[#0A0A0A] text-[#A3A3A3] hover:text-[#FAFAFA] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#121212] border border-[#2A2A2A] rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
          <span className="text-sm text-[#FAFAFA]">
            {selected.size} selecionado{selected.size === 1 ? '' : 's'}
          </span>
          <BulkStatusDropdown onChange={(v) => bulkChangeStatus(v)} />
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-xs text-[#A3A3A3] hover:text-[#FAFAFA] px-2"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

/* -------- Sub-components -------- */

function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [onClose]);
  return ref;
}

function MultiSelect({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  function toggle(v: string) {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else onChange([...values, v]);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-sm text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
      >
        <span>{label}</span>
        {values.length > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] rounded-full bg-[#E8E3D8] text-[#0A0A0A]">
            {values.length}
          </span>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-[#A3A3A3]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 min-w-[200px] bg-[#121212] border border-[#2A2A2A] rounded-lg py-1 shadow-xl">
          {options.map((o) => {
            const selected = values.includes(o.value);
            return (
              <label
                key={o.value}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#FAFAFA] hover:bg-[#1A1A1A] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggle(o.value)}
                  className="accent-[#E8E3D8]"
                />
                {o.label}
              </label>
            );
          })}
          {values.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-2 text-xs text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] border-t border-[#1F1F1F] flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Limpar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const items: { value: SortKey; label: string }[] = [
    { value: 'recent', label: 'Mais recente' },
    { value: 'oldest', label: 'Mais antigo' },
    { value: 'rating', label: 'Rating (maior)' },
  ];
  const current = items.find((i) => i.value === value);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-sm text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
      >
        <span className="text-[#A3A3A3]">Ordenar:</span>
        <span>{current?.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#A3A3A3]" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-30 min-w-[180px] bg-[#121212] border border-[#2A2A2A] rounded-lg py-1 shadow-xl">
          {items.map((i) => (
            <button
              key={i.value}
              type="button"
              onClick={() => {
                onChange(i.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#1A1A1A] ${
                i.value === value ? 'text-[#E8E3D8]' : 'text-[#FAFAFA]'
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InlineStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= value;
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(i === value ? 0 : i);
            }}
            className="p-0.5"
            aria-label={`${i} estrela${i > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                active ? 'fill-[#E8E3D8] text-[#E8E3D8]' : 'text-[#2A2A2A]'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: CopyApplicationStatus;
  onChange: (v: CopyApplicationStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${statusBadgeClasses(
          value
        )}`}
      >
        {statusLabel(value)}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 min-w-[160px] bg-[#121212] border border-[#2A2A2A] rounded-lg py-1 shadow-xl">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(s.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#1A1A1A] ${
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

function BulkStatusDropdown({
  onChange,
}: {
  onChange: (v: CopyApplicationStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E8E3D8] text-[#0A0A0A] text-xs font-medium hover:opacity-90"
      >
        Mudar status
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute bottom-full mb-1 right-0 z-40 min-w-[160px] bg-[#121212] border border-[#2A2A2A] rounded-lg py-1 shadow-xl">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-[#FAFAFA] hover:bg-[#1A1A1A]"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
