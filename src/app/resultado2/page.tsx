'use client';

import Image from 'next/image';

export default function Resultado2Page() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% { transform: rotate(30deg) scale(1); }
          50% { transform: rotate(30deg) scale(1.08); }
        }
        .tarja-pulse {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
      `}</style>
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto">
        {/* 1. Hero Image */}
        <section className="w-full pt-4 px-4 pb-1">
          <div className="relative w-full aspect-video">
            <Image
              src="/images/hero-resultado.png"
              alt="Resultado do Quiz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* 2. Headline Principal */}
        <section className="px-4 pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#b91c1c] leading-tight">
            RESULTADO: ALTAS CHANCES DE SÍNDROME PARASITÁRIA
          </h1>
        </section>

        {/* 3. Sub-headline */}
        <section className="px-4 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Assista o vídeo abaixo para descobrir como eliminar esses invasores do seu corpo de forma{' '}
            <strong className="text-gray-900">100% natural</strong> nos próximos{' '}
            <strong className="text-gray-900">60 dias</strong> e emagrecer até{' '}
            <strong className="text-gray-900">3kg por semana</strong>, antes que esse vídeo saia do ar.
          </p>
        </section>

        {/* 4. VSL Player - Vertical (9:16) */}
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

        {/* 5. Provas Sociais - 3 Imagens */}
        <section className="px-4 py-8 space-y-4">
          {/* Imagem 1 - 3 Kits */}
          <a href="https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de" className="block w-[78%] mx-auto relative">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/3-kits.png"
                alt="Kit com 3 unidades"
                fill
                className="object-cover"
              />
            </div>
            {/* Tarja diagonal */}
            <div className="tarja-pulse absolute top-2 -right-3 bg-green-500 text-white text-[10px] font-bold py-1 px-4 shadow-lg">
              MAIS ESCOLHIDO
            </div>
          </a>

          {/* Imagem 2 - 2 Kits */}
          <a href="https://checkout.payt.com.br/5f42cb789e6bdbac21808eef0ab77711" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/2-kits.png"
                alt="Kit com 2 unidades"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* Imagem 3 - 1 Kit */}
          <a href="https://checkout.payt.com.br/c11d395593428f094fcb4b279f1ef839" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/1-kit.png"
                alt="Kit com 1 unidade"
                fill
                className="object-cover"
              />
            </div>
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
