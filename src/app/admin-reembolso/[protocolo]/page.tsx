'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

/* eslint-disable @next/next/no-img-element */

interface Solicitacao {
  id: number
  protocolo: string
  criado_em: string
  status: 'pendente' | 'aprovado' | 'reprovado'
  numero_pedido: string
  email_cliente: string
  cpf: string
  telefone: string
  codigo_rastreio: string
  data_recebimento: string
  foto_produtos: string | null
  foto_rastreio: string | null
  foto_embalagens: string | null
  foto_selfie: string | null
  dias_uso: number
  capsulas_dia: string | null
  horario: string | null
  tomava_com: string | null
  mudanca_alimentacao: string | null
  efeitos_sentidos: string[] | null
  motivo_insatisfacao: string | null
  aprovado_por: number | null
  aprovado_em: string | null
  observacoes_aprovacao: string | null
  reprovado_por: number | null
  reprovado_em: string | null
  motivo_reprovacao: string | null
}

interface LogEntry {
  acao: string
  criado_em: string
  detalhes: string | null
  usuario_id: number | null
}

export default function AdminReembolsoDetalhes() {
  const router = useRouter()
  const params = useParams()
  const protocolo = params.protocolo as string

  const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [observacoes, setObservacoes] = useState('')
  const [motivo, setMotivo] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  async function fetchData() {
    try {
      const res = await fetch(`/api/admin-reembolso/solicitacoes/${protocolo}`)
      if (res.status === 401) { router.push('/admin-reembolso/login'); return }
      if (res.status === 404) { setError('Solicitação não encontrada.'); setLoading(false); return }
      const data = await res.json()
      setSolicitacao(data.solicitacao)
      setLogs(data.logs || [])
    } catch {
      setError('Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [protocolo]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleApprove() {
    setActionLoading(true); setActionError('')
    try {
      const res = await fetch(`/api/admin-reembolso/solicitacoes/${protocolo}/approve`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ observacoes }),
      })
      if (!res.ok) { const d = await res.json(); setActionError(d.error || 'Erro'); return }
      setShowApproveModal(false); setObservacoes('')
      await fetchData()
    } catch { setActionError('Erro de conexão.') } finally { setActionLoading(false) }
  }

  async function handleReject() {
    if (!motivo.trim()) { setActionError('O motivo é obrigatório.'); return }
    setActionLoading(true); setActionError('')
    try {
      const res = await fetch(`/api/admin-reembolso/solicitacoes/${protocolo}/reject`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motivo }),
      })
      if (!res.ok) { const d = await res.json(); setActionError(d.error || 'Erro'); return }
      setShowRejectModal(false); setMotivo('')
      await fetchData()
    } catch { setActionError('Erro de conexão.') } finally { setActionLoading(false) }
  }

  async function handleRevert() {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin-reembolso/solicitacoes/${protocolo}/revert`, { method: 'POST' })
      if (!res.ok) { const d = await res.json(); setActionError(d.error || 'Erro'); return }
      await fetchData()
    } catch { setActionError('Erro de conexão.') } finally { setActionLoading(false) }
  }

  function statusBadge(status: string) {
    const styles: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      aprovado: 'bg-green-100 text-green-800 border-green-300',
      reprovado: 'bg-red-100 text-red-800 border-red-300',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status] || ''}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  function fmt(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch { return dateStr }
  }

  function fmtDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch { return dateStr }
  }

  function daysSince(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Carregando...</p></div>
  if (error || !solicitacao) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || 'Erro.'}</p>
        <Link href="/admin-reembolso" className="text-[#2ec6a8] hover:underline">Voltar</Link>
      </div>
    </div>
  )

  const s = solicitacao
  const fotos = [
    { label: 'Foto dos produtos', url: s.foto_produtos },
    { label: 'Comprovante de entrega', url: s.foto_rastreio },
    { label: 'Embalagens abertas', url: s.foto_embalagens },
    { label: 'Selfie com produto', url: s.foto_selfie },
  ].filter(f => f.url)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2ec6a8] text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/admin-reembolso" className="text-sm text-white/80 hover:text-white mb-2 inline-block">&larr; Voltar</Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Solicitação #{s.protocolo}</h1>
              <p className="text-sm text-white/80">{fmt(s.criado_em)}</p>
            </div>
            <div>{statusBadge(s.status)}</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {actionError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{actionError}</div>
        )}

        {/* Dados do Pedido */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Dados do Pedido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Nº Pedido" value={s.numero_pedido} />
            <Field label="E-mail" value={s.email_cliente} />
            <Field label="CPF" value={s.cpf} />
            <Field label="Telefone" value={s.telefone} />
            <Field label="Código Rastreio" value={s.codigo_rastreio} />
            <Field label="Data de Recebimento" value={fmtDate(s.data_recebimento)} />
            <Field label="Dias desde recebimento" value={`${daysSince(s.data_recebimento)} dias`} />
            <Field label="Dias de uso informados" value={`${s.dias_uso} dias`} />
          </div>
        </section>

        {/* Comprovantes */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Comprovantes</h2>
          {fotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fotos.map((f, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <a href={f.url!} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={f.url!} alt={f.label} className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
                  </a>
                  <div className="p-2 bg-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{f.label}</span>
                    <a href={f.url!} download target="_blank" rel="noopener noreferrer" className="text-xs text-[#2ec6a8] hover:text-[#27b098] font-medium">Download</a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nenhum comprovante enviado.</p>
          )}
        </section>

        {/* Questionário */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Questionário</h2>
          <div className="space-y-3">
            <Field label="Cápsulas por dia" value={s.capsulas_dia} />
            <Field label="Horário" value={s.horario} />
            <Field label="Tomava com" value={s.tomava_com} />
            <Field label="Mudança na alimentação" value={s.mudanca_alimentacao} />
            <Field label="Efeitos sentidos" value={s.efeitos_sentidos?.join(', ')} />
          </div>
          {s.motivo_insatisfacao && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs font-medium text-yellow-700 uppercase tracking-wide mb-1">Motivo da Insatisfação</p>
              <p className="text-gray-800 text-sm">{s.motivo_insatisfacao}</p>
            </div>
          )}
        </section>

        {/* Declarações */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Declarações</h2>
          <div className="space-y-2">
            <DeclItem label="Declarou uso mínimo de 30 dias" checked />
            <DeclItem label="Declarou informações verdadeiras" checked />
            <DeclItem label="Ciente de consequências por informações falsas" checked />
            <DeclItem label="Ciente do prazo de análise" checked />
          </div>
        </section>

        {/* Ações */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Ações</h2>

          {s.status === 'pendente' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { setActionError(''); setShowApproveModal(true) }} className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-lg transition-colors">
                ✅ APROVAR REEMBOLSO
              </button>
              <button onClick={() => { setActionError(''); setShowRejectModal(true) }} className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg transition-colors">
                ❌ REPROVAR REEMBOLSO
              </button>
            </div>
          )}

          {s.status === 'aprovado' && (
            <div>
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-1">
                <p className="text-sm text-green-700"><strong>Aprovado em:</strong> {s.aprovado_em ? fmt(s.aprovado_em) : '-'}</p>
                {s.observacoes_aprovacao && <p className="text-sm text-green-700"><strong>Observações:</strong> {s.observacoes_aprovacao}</p>}
              </div>
              <button onClick={handleRevert} disabled={actionLoading} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50">
                Reverter para Pendente
              </button>
            </div>
          )}

          {s.status === 'reprovado' && (
            <div>
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg space-y-1">
                <p className="text-sm text-red-700"><strong>Reprovado em:</strong> {s.reprovado_em ? fmt(s.reprovado_em) : '-'}</p>
                <p className="text-sm text-red-700"><strong>Motivo:</strong> {s.motivo_reprovacao}</p>
              </div>
              <button onClick={handleRevert} disabled={actionLoading} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50">
                Reverter para Pendente
              </button>
            </div>
          )}
        </section>

        {/* Histórico */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Histórico</h2>
          {logs.length > 0 ? (
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {logs.map((log, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#2ec6a8] border-2 border-white shadow" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 capitalize">{log.acao}</p>
                      <p className="text-xs text-gray-500">{fmt(log.criado_em)}</p>
                      {log.detalhes && <p className="text-xs text-gray-500 mt-1">{log.detalhes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nenhum registro.</p>
          )}
        </section>
      </main>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirmar Aprovação</h3>
            <p className="text-sm text-gray-600 mb-4">Aprovar reembolso <strong>#{s.protocolo}</strong>?</p>
            <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4" placeholder="Observações (opcional)..." />
            {actionError && <p className="text-red-600 text-sm mb-3">{actionError}</p>}
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowApproveModal(false); setActionError('') }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">Cancelar</button>
              <button onClick={handleApprove} disabled={actionLoading} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold disabled:opacity-50">
                {actionLoading ? 'Aprovando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirmar Reprovação</h3>
            <p className="text-sm text-gray-600 mb-4">Reprovar reembolso <strong>#{s.protocolo}</strong>?</p>
            <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={3} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4" placeholder="Motivo da reprovação (obrigatório)..." />
            {actionError && <p className="text-red-600 text-sm mb-3">{actionError}</p>}
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowRejectModal(false); setActionError('') }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">Cancelar</button>
              <button onClick={handleReject} disabled={actionLoading} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold disabled:opacity-50">
                {actionLoading ? 'Reprovando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-gray-800 font-medium">{value || '-'}</p>
    </div>
  )
}

function DeclItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${checked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
        {checked ? '✓' : '✗'}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  )
}
