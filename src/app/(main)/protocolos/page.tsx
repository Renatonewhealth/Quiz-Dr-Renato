'use client';

import { useRouter } from 'next/navigation';

export default function ProtocolosPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Logo / Marca */}
        <p className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">H9 Pharma</p>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
          BAIXE OS PROTOCOLOS DIGITAIS DO SEU KIT
        </h1>

        {/* Sub-headline */}
        <p className="text-base text-gray-300 mb-10">
          Qual kit você comprou?
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Desparafit */}
          <button
            onClick={() => router.push('/protocolos/desparafit')}
            className="group bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-[#dc2626] rounded-2xl p-8 text-center transition-all duration-200 active:scale-[0.97]"
          >
            <div className="text-4xl mb-4">💊</div>
            <p className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
              DESPARAFIT
            </p>
            <p className="text-xs text-gray-400 mt-2">Ver meus protocolos →</p>
          </button>

          {/* Ozenkit */}
          <button
            onClick={() => router.push('/protocolos/ozenkit')}
            className="group bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-[#f59e0b] rounded-2xl p-8 text-center transition-all duration-200 active:scale-[0.97]"
          >
            <div className="text-4xl mb-4">🌿</div>
            <p className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
              OZENKIT
            </p>
            <p className="text-xs text-gray-400 mt-2">Ver meus protocolos →</p>
          </button>
        </div>
      </div>
    </main>
  );
}
