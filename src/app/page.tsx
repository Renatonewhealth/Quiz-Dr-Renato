'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#667eea] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#764ba2] opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Container principal - conteúdo */}
      <div className="relative z-10 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-0">
          
          {/* Hero Section */}
          <section className="text-center mb-12">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight px-4 animate-fadeInUp">
              Você Pode Ter Parasitas Roubando Seus Nutrientes Neste Exato Momento, e Nem Sabe.
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto px-4 animate-fadeInUp delay-100">
              Responda 6 perguntas rápidas e descubra qual a probabilidade REAL de invasores silenciosos estarem sabotando seu metabolismo, travando seu peso e drenando sua energia. Leva menos de 90 segundos.
            </p>

            {/* CTA Button */}
            <div className="max-w-md mx-auto px-4 mb-6 animate-fadeInUp delay-200">
              <button
                onClick={handleStartQuiz}
                className="w-full py-4 sm:py-5 px-6 sm:px-8 rounded-xl font-bold text-white text-base sm:text-lg md:text-xl
                  bg-gradient-to-r from-[#667eea] to-[#764ba2]
                  hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)]
                  hover:-translate-y-1
                  active:translate-y-0
                  transition-all duration-300
                  flex items-center justify-center gap-2"
              >
                INICIAR ANÁLISE
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Credenciais */}
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-0 px-4 leading-relaxed animate-fadeInUp delay-300">
              Desenvolvido por <span className="font-semibold">Dr Renato Silveira Reis</span>, especialista em nutriendocrinologia, medicina naturalista e farmacêutico.
            </p>
          </section>

        </div>
      </div>

      {/* Foto do Dr. Renato - COLADA NO FUNDO DA PÁGINA */}
      <div className="relative z-10 w-full -mt-4">
        <div className="w-full max-w-2xl mx-auto">
          <Image
            src="/images/dr-renato.png"
            alt="Dr. Renato Silveira Reis - Especialista em nutriendocrinologia"
            width={1080}
            height={1380}
            className="w-full h-auto object-contain"
            style={{ 
              display: 'block', 
              margin: 0, 
              padding: 0,
              maxHeight: '500px'
            }}
            priority
          />
        </div>
      </div>
    </main>
  );
}
