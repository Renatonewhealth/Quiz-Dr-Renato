'use client';

import { useState } from 'react';
import {
  CalendarCheck,
  GraduationCap,
  HelpCircle,
  ListChecks,
  UtensilsCrossed,
} from 'lucide-react';
import TabHoje from './_components/TabHoje';
import TabReceitas from './_components/TabReceitas';
import TabProtocolo from './_components/TabProtocolo';
import TabAulas from './_components/TabAulas';
import TabDuvidas from './_components/TabDuvidas';

const LARANJA = '#ea580c';

type TabId = 'hoje' | 'receitas' | 'protocolo' | 'aulas' | 'duvidas';

const TABS: { id: TabId; label: string; icon: typeof CalendarCheck }[] = [
  { id: 'hoje', label: 'Hoje', icon: CalendarCheck },
  { id: 'receitas', label: 'Receitas', icon: UtensilsCrossed },
  { id: 'protocolo', label: 'Protocolo', icon: ListChecks },
  { id: 'aulas', label: 'Aulas', icon: GraduationCap },
  { id: 'duvidas', label: 'Dúvidas', icon: HelpCircle },
];

export default function AppTermogenicoPage() {
  const [abaAtiva, setAbaAtiva] = useState<TabId>('hoje');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col bg-gray-50">
        {/* Header fixo */}
        <header
          className="fixed left-1/2 top-0 z-30 w-full max-w-2xl -translate-x-1/2 border-b border-gray-200 bg-white"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="px-5 py-3">
            <p className="text-lg font-extrabold leading-none tracking-tight">
              <span style={{ color: LARANJA }}>JEJUM</span>{' '}
              <span className="text-gray-500">TERMOGÊNICO</span>
            </p>
            <p className="mt-1 text-xs font-medium leading-none text-gray-400">
              Programa de 21 dias
            </p>
          </div>
        </header>

        {/* Conteúdo rolável */}
        <main
          className="flex-1 px-4"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top) + 4.75rem)',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 6rem)',
          }}
        >
          {abaAtiva === 'hoje' && <TabHoje />}
          {abaAtiva === 'receitas' && <TabReceitas />}
          {abaAtiva === 'protocolo' && <TabProtocolo />}
          {abaAtiva === 'aulas' && <TabAulas />}
          {abaAtiva === 'duvidas' && <TabDuvidas />}
        </main>

        {/* Bottom nav fixa */}
        <nav
          className="fixed bottom-0 left-1/2 z-30 w-full max-w-2xl -translate-x-1/2 border-t border-gray-200 bg-white"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
          aria-label="Navegação principal"
        >
          <ul className="flex items-stretch">
            {TABS.map((tab) => {
              const Icone = tab.icon;
              const ativa = abaAtiva === tab.id;
              return (
                <li key={tab.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setAbaAtiva(tab.id)}
                    aria-current={ativa ? 'page' : undefined}
                    className="flex min-h-[58px] w-full flex-col items-center justify-center gap-1 px-0.5 pb-1 pt-2 transition-colors"
                    style={{ color: ativa ? LARANJA : '#9ca3af' }}
                  >
                    <Icone className="h-5 w-5" strokeWidth={ativa ? 2.5 : 2} />
                    <span
                      className="text-[10px] leading-none"
                      style={{ fontWeight: ativa ? 700 : 500 }}
                    >
                      {tab.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
