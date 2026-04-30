'use client';

import Image from 'next/image';

export default function DiaDasMaesPage() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .placeholder-pulse {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: rotate(30deg) scale(1); }
          50% { transform: rotate(30deg) scale(1.08); }
        }
        .tarja-pulse {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">

        {/* Headline Principal */}
        <section className="px-4 pt-8 pb-3">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#be185d] leading-tight">
            Aprenda o <span className="text-[#ec4899]">&ldquo;Truque Coreano&rdquo;</span> das famosas para rejuvenescer a pele em 4 semanas sem botox ou rotina complicada.
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-3 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Assista ao vídeo abaixo para entender como aproveitar a maior promoção de cuidados pra pele do{' '}
            <strong className="text-[#ec4899]">dia das mães</strong> do Dr. Renato e H9 Pharma.
          </p>
        </section>

        {/* VSL Placeholder */}
        <section className="px-4 pb-6">
          <div className="placeholder-pulse w-full max-w-[400px] mx-auto aspect-video rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-dashed border-pink-300 flex flex-col items-center justify-center text-center p-6">
            <svg className="w-12 h-12 text-pink-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-pink-600 uppercase tracking-wider">Placeholder VSL</p>
            <p className="text-xs text-pink-500 mt-1">Substituir pelo embed do vturb-smartplayer</p>
          </div>
        </section>

        {/* Imagem do produto */}
        <section className="px-4 pb-6">
          <a href="#" className="block w-[78%] sm:w-[60%] mx-auto relative">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/korean-nano-kit-v3.png"
                alt="2 Kits Korean Nano - 12x R$72,09"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Tarja diagonal "DIA DAS MÃES" */}
            <div className="tarja-pulse absolute top-2 -right-3 bg-[#ec4899] text-white text-[10px] font-bold py-1 px-4 shadow-lg whitespace-nowrap">
              DIA DAS MÃES
            </div>
          </a>
        </section>

        {/* Garantia */}
        <section className="px-4 pb-10">
          <p className="text-xs text-gray-500 text-center">
            🛡️ Garantia de 60 dias. Não funcionou? Devolvemos seu dinheiro, basta seguir os termos e condições e entrar em contato conosco.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-[#831843] to-[#be185d] text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-pink-100 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-pink-200">|</span>
              <a href="/politica-de-privacidade" className="text-pink-100 hover:text-white transition-colors">Política de Privacidade</a>
              <span className="text-pink-200">|</span>
              <a href="#" className="text-pink-100 hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-sm text-pink-100">
              Dr. Renato Silveira Reis x H9 Pharma
            </p>
            <p className="text-xs text-pink-200">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
