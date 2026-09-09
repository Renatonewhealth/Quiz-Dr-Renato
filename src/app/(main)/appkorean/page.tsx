'use client';

import { useState } from 'react';
import { CalendarCheck, Camera, Gift, HelpCircle } from 'lucide-react';

import TabRotina from './_components/TabRotina';
import TabDiario from './_components/TabDiario';
import TabAssistente from './_components/TabAssistente';
import TabBonus from './_components/TabBonus';

type TabId = 'hoje' | 'diario' | 'assistente' | 'bonus';

const ROSA = '#c4448f';

const TABS: { id: TabId; label: string; icon: typeof CalendarCheck }[] = [
  { id: 'hoje', label: 'Hoje', icon: CalendarCheck },
  { id: 'diario', label: 'Diário', icon: Camera },
  { id: 'assistente', label: 'Dúvidas', icon: HelpCircle },
  { id: 'bonus', label: 'Bônus', icon: Gift },
];

export default function AppKoreanPage() {
  const [abaAtiva, setAbaAtiva] = useState<TabId>('hoje');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col bg-gray-50">
        {/* Header fixo */}
        <header
          className="fixed top-0 left-1/2 z-30 w-full max-w-2xl -translate-x-1/2 border-b border-gray-200 bg-white"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="px-5 py-3">
            <p className="text-lg leading-none font-extrabold tracking-tight">
              <span style={{ color: ROSA }}>H9</span>{' '}
              <span className="text-gray-500">PHARMA</span>
            </p>
            <p className="mt-1 text-xs leading-none font-medium text-gray-400">
              Korean App
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
          {abaAtiva === 'hoje' && <TabRotina />}
          {abaAtiva === 'diario' && <TabDiario />}
          {abaAtiva === 'assistente' && <TabAssistente />}
          {abaAtiva === 'bonus' && <TabBonus />}
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
                    className="flex min-h-[60px] w-full flex-col items-center justify-center gap-1 px-1 pt-2 pb-1 transition-colors"
                    style={{ color: ativa ? ROSA : '#9ca3af' }}
                  >
                    <Icone
                      size={26}
                      strokeWidth={ativa ? 2.4 : 2}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[13px] leading-none ${ativa ? 'font-semibold' : 'font-medium'}`}
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
