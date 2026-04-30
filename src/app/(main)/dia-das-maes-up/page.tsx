'use client';

export default function DiaDasMaesUpPage() {
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
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .placeholder-pulse {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">

        {/* Loading Bar */}
        <section className="px-4 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="loading-bar h-full rounded-full" style={{ width: '67%' }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">67% concluído</p>
        </section>

        {/* Headline Principal */}
        <section className="px-4 pt-6 pb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            ESPERA! Não saia desta página, seu pedido ainda está sendo processado...
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-3 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            A Campanha <strong className="text-gray-900">&ldquo;Dia das Mães&rdquo;</strong> da H9 Pharma ainda não acabou, assista o vídeo abaixo para finalizar todas as etapas da compra e aprender como{' '}
            <strong className="text-gray-900">acelerar MUITO</strong> seus resultados!
          </p>
        </section>

        {/* VSL Placeholder */}
        <section className="px-4 pb-6">
          <div className="placeholder-pulse w-full max-w-[400px] mx-auto aspect-video rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-[#2ec6a8] flex flex-col items-center justify-center text-center p-6">
            <svg className="w-12 h-12 text-[#2ec6a8] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-[#2ec6a8] uppercase tracking-wider">Placeholder VSL</p>
            <p className="text-xs text-teal-600 mt-1">Substituir pelo embed do vturb-smartplayer</p>
          </div>
        </section>

        {/* Imagem do produto - Placeholder */}
        <section className="px-4 pb-6">
          <div className="placeholder-pulse block w-[78%] sm:w-[60%] mx-auto aspect-[3/4] rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-[#2ec6a8] flex flex-col items-center justify-center text-center p-6">
            <svg className="w-14 h-14 text-[#2ec6a8] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-bold text-[#2ec6a8] uppercase tracking-wider">Placeholder Imagem do Produto</p>
            <p className="text-xs text-teal-600 mt-2">Substituir pela imagem com link one-click do checkout</p>
          </div>
        </section>

        {/* Garantia */}
        <section className="px-4 pb-10">
          <p className="text-xs text-gray-500 text-center">
            🛡️ Garantia de 60 dias. Não funcionou? Devolvemos seu dinheiro, basta seguir os termos e condições e entrar em contato conosco.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
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
