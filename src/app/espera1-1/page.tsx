'use client';

export default function Espera1_1Page() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .loading-bar {
          background: linear-gradient(90deg, #2ec6a8 0%, #2ec6a8 40%, #5dd9c0 50%, #2ec6a8 60%, #2ec6a8 100%);
          background-size: 200% 100%;
          animation: loading 2s linear infinite;
        }
      `}</style>

      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* Loading Bar */}
        <section className="px-4 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="loading-bar h-full rounded-full" style={{ width: '67%' }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">67% concluído</p>
        </section>

        {/* Headline Principal */}
        <section className="px-4 pt-4 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            ESPERA! Seu pedido ainda está sendo processado…
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Para finalizar todas as etapas e confirmar seu pedido, assista o vídeo abaixo para descobrir algumas informações{' '}
            <strong className="text-gray-900">CRÍTICAS</strong> sobre o nosso protocolo.
          </p>
        </section>

        {/* VSL Player - Vertical (9:16) */}
        <section className="w-full bg-black">
          <div className="relative w-full" style={{ aspectRatio: '9/16', minHeight: '75vh' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center text-gray-400">
                <div className="relative">
                  {/* Play Button */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30 hover:bg-white/20 transition-colors cursor-pointer">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-white/70">VSL Player</p>
                <p className="text-xs text-white/50 mt-1">Formato Vertical 9:16</p>
                <p className="text-xs text-white/40 mt-0.5">Toque para reproduzir</p>
              </div>
            </div>
          </div>
        </section>

        {/* Botão CTA */}
        <section className="px-4 py-8">
          <button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-150 animate-pulse"
            onClick={() => {
              console.log('CTA clicked');
            }}
          >
            QUERO OS 2 KITS EXTRAS
          </button>
          <a href="#" className="block text-center text-base text-gray-500 hover:text-gray-700 mt-4 underline transition-colors">
            Não quero o tratamento completo, quero apenas 1 kit
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-sm text-gray-400">
              Dr. Renato Silveira Reis x H9 Pharma
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
