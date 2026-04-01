'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, TrendingUp, RefreshCw } from 'lucide-react';
import KPICard from '@/components/admin/KPICard';
import LeadsTable from '@/components/admin/LeadsTable';
import ConversionFunnel from '@/components/admin/ConversionFunnel';
import DropoffChart from '@/components/admin/DropoffChart';
import { AnalyticsData, LeadWithResponses } from '@/types/admin';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [leads, setLeads] = useState<LeadWithResponses[]>([]);
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Erro ao buscar analytics:', error);
    }
  };

  const fetchLeads = async (page: number) => {
    try {
      const response = await fetch(`/api/admin/leads?page=${page}&limit=${pageSize}`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
        setTotalLeadsCount(data.totalCount);
      }
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAnalytics(), fetchLeads(currentPage)]);
      setIsLoading(false);
    };
    loadData();
  }, [currentPage]);

  const handleRefresh = () => {
    fetchAnalytics();
    fetchLeads(currentPage);
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Analytics
          </h1>
          <p className="text-gray-600">
            Visão geral dos leads e conversões do quiz
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          label="Total de Leads"
          value={analytics?.totalLeads || 0}
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
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {analytics?.funnelData && (
          <ConversionFunnel data={analytics.funnelData} />
        )}
        {analytics?.dropoffByQuestion && analytics.dropoffByQuestion.length > 0 && (
          <DropoffChart data={analytics.dropoffByQuestion} />
        )}
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



