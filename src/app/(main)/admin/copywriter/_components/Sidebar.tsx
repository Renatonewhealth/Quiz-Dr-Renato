'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Users, Menu, X } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin/copywriter',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Candidatos',
    href: '/admin/copywriter/candidatos',
    icon: Users,
    exact: false,
  },
];

type SidebarProps = {
  userEmail: string;
};

export default function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    try {
      setSigningOut(true);
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  }

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  }

  const content = (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] border-r border-[#1F1F1F]">
      <div className="px-6 py-6 border-b border-[#1F1F1F]">
        <p
          className="text-xl text-[#FAFAFA] leading-tight"
          style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
        >
          Copy · Dr. Renato
        </p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#666666] mt-1">
          Admin
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-[#1A1A1A] text-[#FAFAFA] border border-[#2A2A2A]'
                  : 'text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[#1F1F1F]">
        <div className="text-xs text-[#A3A3A3] mb-2 truncate" title={userEmail}>
          {userEmail || '—'}
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#2A2A2A] bg-[#121212] text-[#FAFAFA] text-xs hover:bg-[#1A1A1A] transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          {signingOut ? 'Saindo…' : 'Sair'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0A0A0A] border-b border-[#1F1F1F]">
        <p
          className="text-lg text-[#FAFAFA]"
          style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
        >
          Copy · Dr. Renato
        </p>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md text-[#A3A3A3] hover:text-[#FAFAFA]"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      {/* Spacer to push content down below the mobile bar */}
      <div className="md:hidden h-14" aria-hidden />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:sticky md:top-0 md:h-screen">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[260px] h-full">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#A3A3A3] hover:text-[#FAFAFA] z-10"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
