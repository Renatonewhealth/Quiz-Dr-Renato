'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { AnimatedFolderButton } from '@/components/ui/animated-folder-button';
import { track } from '@/lib/tracker';
import { metaTrackCustom } from '@/lib/metaPixel';
import { TELAS, TelaHeroImage, type TelaKey } from './telas';

const EXPERIMENTO = 'quiz-fst';
const QUIZ_TARGET = '/detectordeinvasores';

/**
 * Shell compartilhado pelas 4 telas do teste `/quiz-fst`.
 *
 * Header, botão e bloco "abaixo do botão" são idênticos pras 4 (réplica do
 * root atual). O que muda por tela vem de TELAS[tela] (herói + texto do CTA
 * + imagem opcional).
 *
 * Tracking:
 * - View: `page_view` é gravado automaticamente pelo PageViewTracker global
 *   (taggeado `quiz-fst:tN` via cookie `tr_variant`). Aqui só disparamos o
 *   evento custom `LpView` pro Meta (dedupe por sessão).
 * - Clique: `cta_click` no banco + `LpClick` no Meta, antes de navegar.
 */
export default function QuizFstLanding({ tela }: { tela: TelaKey }) {
  const router = useRouter();
  const { ctaText, image, Hero } = TELAS[tela];

  const handleCta = () => {
    const variant = `${EXPERIMENTO}:${tela}`;
    // Origem do funil = a própria tela do experimento (quiz-fst:tN), pra TODO
    // o funil ficar no mesmo identificador no dashboard /admin/experiments.
    // O quiz roteia esse formato pra /quiz-fst-N-vsl (mesmo vídeo das standalone).
    try {
      sessionStorage.setItem('quiz_source', variant);
    } catch {
      /* ignore */
    }
    // Banco (immediate: garante envio antes da navegação).
    track('cta_click', {
      variant,
      page_slug: `/${EXPERIMENTO}`,
      metadata: { tela, experimento: EXPERIMENTO, cta: ctaText },
      immediate: true,
    });
    // Meta Ads.
    metaTrackCustom('LpClick', { tela, experimento: EXPERIMENTO });
    // Origem também na URL (?qs=) — robusto se a sessionStorage falhar.
    router.push(`${QUIZ_TARGET}?qs=${encodeURIComponent(variant)}`);
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
          fbq('init', '779808241546807');
          fbq('track', 'PageView');
          fbq('trackCustom', 'LpView', {tela: '${tela}', experimento: '${EXPERIMENTO}'});
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=779808241546807&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Header Editorial - Estilo G1 */}
      <header className="w-full bg-[#dc2626] h-[56px] sm:h-[64px] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 shadow-md">
        <button
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">
            Menu
          </span>
        </button>

        <span className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase">
          SAÚDE
        </span>

        <button
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          aria-label="Buscar"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-wide">
            Buscar
          </span>
        </button>
      </header>

      {/* Container principal */}
      <div className="relative z-10 sm:flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-14 pb-0">
          <section className="mb-6 sm:mb-10">
            {/* Imagem em paisagem (Tela 4) */}
            {image && <TelaHeroImage src={image.src} alt={image.alt} />}

            {/* Herói específico da tela (tudo acima do botão) */}
            <Hero />

            {/* Botão + credenciais (igual pras 4 telas) */}
            <div className="text-center">
              <div className="max-w-md mx-auto px-4 mb-10 sm:mb-12 animate-fadeInUp delay-200">
                <AnimatedFolderButton onClick={handleCta} text={ctaText} />
              </div>

              <div className="max-w-lg mx-auto animate-fadeInUp delay-300">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Desenvolvido por{' '}
                  <strong className="font-semibold text-gray-900">
                    Dr. Renato Silveira Reis
                  </strong>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Especialista em Nutriendocrinologia, Medicina Naturalista e
                  Farmacêutico
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
            style={{ display: 'block', margin: 0, padding: 0 }}
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link
                href="/politica-de-privacidade"
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/termos-de-uso"
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                Termos de Uso
              </Link>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Este site não é afiliado ao Facebook™️ ou à Meta Platforms, Inc.
              Facebook™️ é uma marca registrada da Meta Platforms, Inc. Os
              resultados podem variar de acordo com fatores individuais. As
              informações apresentadas têm caráter educacional e não constituem
              promessa ou garantia de resultados.
            </p>

            <p className="text-sm sm:text-base text-gray-400">
              © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
