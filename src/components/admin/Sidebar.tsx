'use client';

import { useRouter } from 'next/navigation';
import { BarChart3, Users, LogOut, Home } from 'lucide-react';

interface SidebarProps {
  userEmail?: string;
}

export default function Sidebar({ userEmail }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#667eea] to-[#764ba2] min-h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold text-white mb-1">
          Admin Dashboard
        </h1>
        <p className="text-white/70 text-sm">
          Quiz Dr. Renato
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <a
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Ver Quiz</span>
        </a>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/20">
        {userEmail && (
          <div className="mb-3 px-4 py-2 bg-white/10 rounded-lg">
            <p className="text-xs text-white/70 mb-1">Logado como</p>
            <p className="text-sm text-white font-medium truncate">
              {userEmail}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}



