'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedFolderButton } from '@/components/ui/animated-folder-button';

export default function PageGoogle() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/detectordeinvasores');
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">

      {/* Header */}
      <header className="w-full bg-[#dc2626] h-[56px] sm:h-[64px] flex items-center justify-center px-4 sm:px-6 sticky top-0 z-50 shadow-md">
        <span className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase">
          DR RENATO
        </span>
      </header>

      {/* Container principal */}
      <div className="relative z-10 sm:flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-14 pb-0">

          <section className="mb-6 sm:mb-10">

            <p className="text-xs sm:text-sm text-[#dc2626] font-bold mb-4 sm:mb-5 uppercase tracking-[0.1em] animate-fadeInUp text-center">
              Descoberta científica revela:
            </p>

            <div className="text-left mb-8 sm:mb-10">
              <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-gray-900 mb-4 sm:mb-5 leading-[1.2] sm:leading-[1.25] tracking-[-0.01em] animate-fadeInUp">
                8 em Cada 10 Mulheres Acima de 35 Têm <span className="text-[#dc2626]">Alto Potencial de Parasitas e Vermes Intestinais</span>, E Isso Está IMPEDINDO o Emagrecimento Delas.
              </h1>

              <div className="animate-fadeInUp">
                <p className="text-sm sm:text-base text-gray-600">
                  Por <span className="font-semibold text-gray-800">Dr. Renato Silveira Reis</span> — São Paulo
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  06/01/2026 17h17 · Atualizado há 24 minutos
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 sm:mb-12 leading-[1.6] max-w-2xl mx-auto animate-fadeInUp delay-100">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dc2626] block mb-5">Será que você é uma delas?</span>
                <p className="text-gray-700 leading-[1.75] text-left">
                  Responda <strong className="font-semibold text-gray-900">6 perguntas rápidas</strong> e descubra agora se <strong className="font-semibold text-gray-900">parasitas invisíveis</strong> estão sabotando seu metabolismo e impedindo que você emagreça de verdade.
                </p>
              </div>

              <div className="max-w-md mx-auto px-4 mb-10 sm:mb-12 animate-fadeInUp delay-200">
                <AnimatedFolderButton onClick={handleStartQuiz} text="INICIAR AUTO-ANÁLISE GRATUITA" />
              </div>

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

      {/* Foto do Dr. Renato */}
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
              <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors underline">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors underline">
                Termos de Uso
              </Link>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Este site não é afiliado ao Facebook™️ ou à Meta Platforms, Inc. Facebook™️ é uma marca registrada da Meta Platforms, Inc. Os resultados podem variar de acordo com fatores individuais. As informações apresentadas têm caráter educacional e não constituem promessa ou garantia de resultados.
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
