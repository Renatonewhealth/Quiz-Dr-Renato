'use client';

import Link from 'next/link';

const protocolos = [
  {
    titulo: 'Protocolo Jejum Detox Turbo',
    descricao: 'Acelere os seus resultados com este protocolo de jejum e detox.',
    emoji: '⚡',
    arquivo: '/protocolo-jejum-detox-turbo.pdf',
    nome: 'Protocolo Jejum Detox Turbo - H9 Pharma.pdf',
  },
  {
    titulo: 'Renovação Hepática',
    descricao: 'O protocolo completo de renovação e saúde do fígado da H9 Pharma.',
    emoji: '🌿',
    arquivo: '/renovacao-hepatica.pdf',
    nome: 'Renovação Hepática - H9 Pharma.pdf',
  },
];

export default function ProtocolosOzenkitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Voltar */}
        <Link href="/protocolos" className="text-gray-400 hover:text-white text-sm mb-8 flex items-center gap-1 transition-colors">
          ← Voltar
        </Link>

        <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-2">Ozenkit</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
          Seus Protocolos Digitais
        </h1>
        <p className="text-gray-400 text-sm mb-8">Clique para baixar cada protocolo gratuitamente.</p>

        <div className="space-y-4">
          {protocolos.map((p) => (
            <a
              key={p.arquivo}
              href={p.arquivo}
              download={p.nome}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#f59e0b] rounded-2xl p-5 transition-all duration-200 active:scale-[0.98] group"
            >
              <div className="text-3xl flex-shrink-0">{p.emoji}</div>
              <div className="flex-1 text-left">
                <p className="font-bold text-white group-hover:text-yellow-400 transition-colors">{p.titulo}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.descricao}</p>
              </div>
              <div className="flex-shrink-0 bg-[#f59e0b] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                ⬇ BAIXAR
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
