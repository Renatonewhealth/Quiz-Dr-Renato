'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function PageGoogle() {
  const router = useRouter();

  const handleGenderSelect = (gender: 'q1-a' | 'q1-b') => {
    sessionStorage.setItem('quiz_source', 'google');
    sessionStorage.setItem('quiz_prefill_q1', gender);
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
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-14 pb-8">

          <section className="mb-6 sm:mb-10">

            <p className="text-xs sm:text-sm text-[#dc2626] font-bold mb-4 sm:mb-5 uppercase tracking-[0.1em] animate-fadeInUp text-center">
              Descoberta científica revela:
            </p>

            <div className="text-left mb-8 sm:mb-10">
              <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-gray-900 mb-4 sm:mb-5 leading-[1.2] sm:leading-[1.25] tracking-[-0.01em] animate-fadeInUp">
                Por que tantas mulheres acima dos 35 <span className="text-[#dc2626]">não conseguem emagrecer</span> mesmo fazendo tudo certo?
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
              <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-[1.6] max-w-2xl mx-auto animate-fadeInUp delay-100">
                <p className="text-gray-700 leading-[1.75] text-left mb-4">
                  Pode ter a ver com algo que poucos médicos investigam: <strong className="font-semibold text-gray-900">parasitas intestinais</strong>.
                </p>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#dc2626] block mb-3">Será que você é uma delas?</span>
                <p className="text-gray-700 leading-[1.75] text-left">
                  Faça a análise gratuita respondendo <strong className="font-semibold text-gray-900">6 perguntas rápidas</strong> abaixo e descubra!
                </p>
              </div>

              {/* Pergunta 1: Sexo — 2 cards grandes */}
              <div className="max-w-xl mx-auto mb-10 animate-fadeInUp delay-200">
                <p className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center">
                  Para começar, qual é o seu sexo?
                </p>
                <div className="grid grid-cols-2 gap-4 px-2">
                  {/* Card Masculino */}
                  <button
                    type="button"
                    onClick={() => handleGenderSelect('q1-a')}
                    className="group relative aspect-square rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:border-[#dc2626] hover:shadow-lg active:scale-95 transition-all duration-200 overflow-hidden"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[10rem] opacity-25 group-hover:opacity-40 transition-opacity select-none pointer-events-none">
                      👨
                    </span>
                    <span className="relative z-10 flex items-center justify-center h-full text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-wide">
                      Masculino
                    </span>
                  </button>

                  {/* Card Feminino */}
                  <button
                    type="button"
                    onClick={() => handleGenderSelect('q1-b')}
                    className="group relative aspect-square rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-pink-50 to-pink-100 hover:border-[#dc2626] hover:shadow-lg active:scale-95 transition-all duration-200 overflow-hidden"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[10rem] opacity-25 group-hover:opacity-40 transition-opacity select-none pointer-events-none">
                      👩
                    </span>
                    <span className="relative z-10 flex items-center justify-center h-full text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-wide">
                      Feminino
                    </span>
                  </button>
                </div>
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
