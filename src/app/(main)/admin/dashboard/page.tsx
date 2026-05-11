'use client';

import { useEffect, useState, useCallback } from 'react';
import { Users, UserCheck, UserX, TrendingUp, RefreshCw, Activity, Target } from 'lucide-react';
import KPICard from '@/components/admin/KPICard';
import LeadsTable from '@/components/admin/LeadsTable';
import ConversionFunnel from '@/components/admin/ConversionFunnel';
import DropoffChart from '@/components/admin/DropoffChart';
import DateRangePicker, {
  type DateRange,
  presetToRange,
} from '@/components/admin/DateRangePicker';
import { AnalyticsData, LeadWithResponses } from '@/types/admin';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [leads, setLeads] = useState<LeadWithResponses[]>([]);
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>(() => presetToRange('30d'));
  const pageSize = 10;

  const fetchAnalytics = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });
      const response = await fetch(`/api/admin/analytics?${params.toString()}`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Erro ao buscar analytics:', error);
    }
  }, [dateRange]);

  const fetchLeads = useCallback(
    async (page: number) => {
      try {
        const response = await fetch(`/api/admin/leads?page=${page}&limit=${pageSize}`, {
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          setLeads(data.leads);
          setTotalLeadsCount(data.totalCount);
        }
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAnalytics(), fetchLeads(currentPage)]);
      setIsLoading(false);
    };
    loadData();
  }, [currentPage, fetchAnalytics, fetchLeads]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchAnalytics(), fetchLeads(currentPage)]);
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#667eea] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const totalSessions = analytics?.totalSessions ?? 0;
  const totalLeads = analytics?.totalLeads ?? 0;
  const sessionToLeadRate = totalSessions > 0 ? Math.round((totalLeads / totalSessions) * 100) : 0;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
            <p className="text-gray-600">Visão geral do quiz, sessões e leads capturados</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Date range filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          label="Sessões no Quiz"
          value={totalSessions}
          icon={Activity}
          color="blue"
        />
        <KPICard
          label="Leads Capturados"
          value={totalLeads}
          icon={Users}
          color="purple"
        />
        <KPICard
          label="Qualificados"
          value={analytics?.qualifiedLeads || 0}
          icon={UserCheck}
          color="green"
        />
        <KPICard
          label="Sessão → Lead"
          value={`${sessionToLeadRate}%`}
          icon={Target}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {analytics?.funnelData && <ConversionFunnel data={analytics.funnelData} />}
        {analytics?.dropoffByQuestion && analytics.dropoffByQuestion.length > 0 && (
          <DropoffChart data={analytics.dropoffByQuestion} />
        )}
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          label="Baixo Risco"
          value={analytics?.nonQualifiedLeads || 0}
          icon={UserX}
          color="blue"
        />
        <KPICard
          label="Taxa de Qualificação"
          value={`${analytics?.qualificationSplit.qualifiedPercentage || 0}%`}
          icon={TrendingUp}
          color="orange"
        />
        <KPICard
          label="Conversão Quiz Completo"
          value={`${analytics?.funnelData?.[1]?.percentage || 0}%`}
          icon={Target}
          color="green"
        />
      </div>

      {/* Leads Table */}
      <LeadsTable
        leads={leads}
        totalCount={totalLeadsCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
