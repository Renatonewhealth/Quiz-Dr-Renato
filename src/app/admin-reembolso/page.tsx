'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Solicitacao {
  protocolo: string
  criado_em: string
  email_cliente: string
  numero_pedido: string
  dias_uso: number
  status: 'pendente' | 'aprovado' | 'reprovado'
}

interface AdminUser {
  nome: string
  email: string
}

export default function AdminReembolsoDashboard() {
  const router = useRouter()
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState<Solicitacao[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AdminUser | null>(null)

  // Filters
  const [statusFilter, setStatusFilter] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState('todos')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 20

  const applyFilters = useCallback((data: Solicitacao[], status: string, search: string) => {
    let filtered = [...data]

    if (status !== 'todos') {
      filtered = filtered.filter((s) => s.status === status)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      filtered = filtered.filter(
        (s) =>
          s.protocolo.toLowerCase().includes(q) ||
          s.email_cliente.toLowerCase().includes(q) ||
          s.numero_pedido.toLowerCase().includes(q)
      )
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime())

    setFilteredSolicitacoes(filtered)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin-reembolso/solicitacoes')

        if (res.status === 401) {
          router.push('/admin-reembolso/login')
          return
        }

        const data = await res.json()
        setSolicitacoes(data.data || [])
        setUser(data.user || { nome: 'Admin', email: '' })
        applyFilters(data.data || [], 'todos', '')
      } catch {
        router.push('/admin-reembolso/login')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, applyFilters])

  function handleFilter() {
    setActiveStatus(statusFilter)
    setActiveSearch(searchQuery)
    applyFilters(solicitacoes, statusFilter, searchQuery)
  }

  function handleClear() {
    setStatusFilter('todos')
    setSearchQuery('')
    setActiveStatus('todos')
    setActiveSearch('')
    applyFilters(solicitacoes, 'todos', '')
  }

  async function handleLogout() {
    await fetch('/api/admin-reembolso/logout', { method: 'POST' })
    router.push('/admin-reembolso/login')
  }

  // Counts
  const counts = {
    pendentes: solicitacoes.filter((s) => s.status === 'pendente').length,
    aprovados: solicitacoes.filter((s) => s.status === 'aprovado').length,
    reprovados: solicitacoes.filter((s) => s.status === 'reprovado').length,
    total: solicitacoes.length,
  }

  // Pagination
  const totalPages = Math.ceil(filteredSolicitacoes.length / perPage)
  const paginatedData = filteredSolicitacoes.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  function statusBadge(status: string) {
    const styles: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      aprovado: 'bg-green-100 text-green-800',
      reprovado: 'bg-red-100 text-red-800',
    }
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      reprovado: 'Reprovado',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] || ''}`}>
        {labels[status] || status}
      </span>
    )
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2ec6a8] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Painel de Reembolsos</h1>
            <p className="text-sm text-white/80">Dr. Renato Silveira</p>
          </div>
          <div className="flex items-center gap-4">
            {user && <span className="text-sm hidden sm:inline">{user.nome}</span>}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-yellow-700 font-medium">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-800">{counts.pendentes}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-green-700 font-medium">Aprovados</p>
            <p className="text-3xl font-bold text-green-800">{counts.aprovados}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-red-700 font-medium">Reprovados</p>
            <p className="text-3xl font-bold text-red-800">{counts.reprovados}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-blue-700 font-medium">Total</p>
            <p className="text-3xl font-bold text-blue-800">{counts.total}</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-shrink-0">
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2ec6a8]"
              >
                <option value="todos">Todos</option>
                <option value="pendente">Pendentes</option>
                <option value="aprovado">Aprovados</option>
                <option value="reprovado">Reprovados</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Busca</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por protocolo, e-mail, CPF ou nº pedido"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2ec6a8] placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFilter()
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-[#2ec6a8] text-white text-sm font-medium rounded-lg hover:bg-[#27b098] transition-colors"
              >
                Filtrar
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
          {(activeStatus !== 'todos' || activeSearch) && (
            <div className="mt-3 text-xs text-gray-500">
              Mostrando {filteredSolicitacoes.length} resultado(s)
              {activeStatus !== 'todos' && <span> | Status: <strong>{activeStatus}</strong></span>}
              {activeSearch && <span> | Busca: <strong>&quot;{activeSearch}&quot;</strong></span>}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Protocolo</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">E-mail</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">N&ordm; Pedido</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Dias uso</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">A&ccedil;&otilde;es</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      Nenhuma solicita&ccedil;&atilde;o encontrada.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((s) => (
                    <tr key={s.protocolo} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-700">{s.protocolo}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {formatDate(s.criado_em)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{s.email_cliente}</td>
                      <td className="px-4 py-3 text-gray-600">{s.numero_pedido}</td>
                      <td className="px-4 py-3 text-gray-600">{s.dias_uso}</td>
                      <td className="px-4 py-3">{statusBadge(s.status)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin-reembolso/${s.protocolo}`}
                          className="text-[#2ec6a8] hover:text-[#27b098] font-medium text-xs"
                        >
                          Ver detalhes
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <span className="text-xs text-gray-500">
                P&aacute;gina {currentPage} de {totalPages} ({filteredSolicitacoes.length} itens)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Pr&oacute;ximo
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
