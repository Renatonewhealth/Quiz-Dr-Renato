'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { AnimatedFolderButton } from '@/components/ui/animated-folder-button';

export default function LandingPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/detectordeinvasores');
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">

      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1426395781843685');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1426395781843685&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Header Editorial - Estilo G1 */}
      <header className="w-full bg-[#dc2626] h-[56px] sm:h-[64px] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 shadow-md">
        {/* Menu Hamburger - Esquerda */}
        <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors" aria-label="Menu">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">Menu</span>
        </button>

        {/* SAÚDE - Centro */}
        <span className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase">
          SAÚDE
        </span>

        {/* Busca - Direita */}
        <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors" aria-label="Buscar">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">Buscar</span>
        </button>
      </header>

      {/* Container principal - conteúdo */}
      <div className="relative z-10 sm:flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-14 pb-0">
          
          {/* Hero Section - Estilo Editorial G1 */}
          <section className="mb-6 sm:mb-10">
            
            {/* Pre-Headline - Editorial Tag (Centralizada) */}
            <p className="text-xs sm:text-sm text-[#dc2626] font-bold mb-4 sm:mb-5 uppercase tracking-[0.1em] animate-fadeInUp text-center">
              Descoberta científica revela:
            </p>

            {/* Bloco Editorial - Alinhado à Esquerda */}
            <div className="text-left mb-8 sm:mb-10">
              
              {/* Headline - Estilo Jornalístico G1 (menor e à esquerda) */}
              <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-gray-900 mb-4 sm:mb-5 leading-[1.2] sm:leading-[1.25] tracking-[-0.01em] animate-fadeInUp">
                8 em Cada 10 Mulheres Acima de 35 Têm <span className="text-[#dc2626]">Alto Potencial de Parasitas e Vermes Intestinais</span>, E Isso Está IMPEDINDO o Emagrecimento Delas.
              </h1>

              {/* Metadados Editoriais - Byline e Data (ABAIXO do título) */}
              <div className="animate-fadeInUp">
                <p className="text-sm sm:text-base text-gray-600">
                  Por <span className="font-semibold text-gray-800">Dr. Renato Silveira Reis</span> — São Paulo
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  06/01/2026 17h17 · Atualizado há 24 minutos
                </p>
              </div>
            </div>
            
            {/* Sub-Headline e CTA - Centralizado */}
            <div className="text-center">
              <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 sm:mb-12 leading-[1.6] max-w-2xl mx-auto animate-fadeInUp delay-100">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dc2626] block mb-5">Será que você é uma delas?</span>
                <p className="text-gray-700 leading-[1.75] text-left">
                  Responda <strong className="font-semibold text-gray-900">6 perguntas rápidas</strong> e descubra agora se <strong className="font-semibold text-gray-900">parasitas invisíveis</strong> estão sabotando seu metabolismo e impedindo que você emagreça de verdade.
                </p>
              </div>

              {/* CTA Button */}
              <div className="max-w-md mx-auto px-4 mb-10 sm:mb-12 animate-fadeInUp delay-200">
                <AnimatedFolderButton onClick={handleStartQuiz} text="INICIAR AUTO-ANÁLISE GRATUITA" />
              </div>

              {/* Credenciais - Estilo Editorial Limpo */}
              <div className="max-w-lg mx-auto animate-fadeInUp delay-300">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Desenvolvido por <strong className="font-semibold text-gray-900">Dr. Renato Silveira Reis</strong>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Especialista em Nutriendocrinologia, Medicina Naturalista e Farmacêutico
                </p>
                <p className="text-xs sm:text-sm text-[#dc2626] font-medium mt-2.5">
                  📱 Mais de 11 milhões de seguidores nas redes sociais
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Foto do Dr. Renato - COLADA NO FUNDO DA PÁGINA */}
      <div className="relative z-10 w-full -mt-4 sm:-mt-4 md:mt-0">
        <div className="w-full max-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <Image
            src="/images/dr-renato.png"
            alt="Dr. Renato Silveira Reis - Especialista em nutriendocrinologia"
            width={1080}
            height={1380}
            className="w-full h-auto object-contain"
            style={{ 
              display: 'block', 
              margin: 0, 
              padding: 0
            }}
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            {/* Links de Políticas */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors underline">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors underline">
                Termos de Uso
              </Link>
            </div>

            {/* Disclaimer Facebook/Meta */}
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Este site não é afiliado ao Facebook™️ ou à Meta Platforms, Inc. Facebook™️ é uma marca registrada da Meta Platforms, Inc. Os resultados podem variar de acordo com fatores individuais. As informações apresentadas têm caráter educacional e não constituem promessa ou garantia de resultados.
            </p>

            {/* Copyright */}
            <p className="text-sm sm:text-base text-gray-400">
              © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
