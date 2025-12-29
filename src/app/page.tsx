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

      {/* Container principal - conteúdo */}
      <div className="relative z-10 sm:flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-0">
          
          {/* Hero Section */}
          <section className="text-center mb-4 sm:mb-8">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight px-4 animate-fadeInUp">
              Você Pode Ter <span className="text-[#667eea]">Parasitas Dentro do Seu Corpo</span> Neste Exato Momento, e Nem Sabe.
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto px-4 animate-fadeInUp delay-100">
              Responda <strong className="font-semibold text-gray-900">6 perguntas rápidas</strong> e descubra qual a <strong className="font-semibold text-gray-900">probabilidade REAL</strong> de invasores silenciosos estarem sabotando seu metabolismo, travando seu peso e drenando sua energia. 
              <span className="block mt-3 text-base sm:text-lg text-[#667eea] font-semibold">⏱️ Leva menos de 90 segundos.</span>
            </p>

            {/* CTA Button */}
            <div className="max-w-md mx-auto px-4 mb-8 animate-fadeInUp delay-200">
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
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-0 sm:mb-0 px-4 leading-relaxed animate-fadeInUp delay-300">
              Desenvolvido por <strong className="font-bold text-gray-900">Dr. Renato Silveira Reis</strong><br/>
              <span className="text-xs sm:text-sm md:text-base text-gray-600">Especialista em Nutriendocrinologia, Medicina Naturalista e Farmacêutico</span>
            </p>
          </section>

        </div>
      </div>

      {/* Foto do Dr. Renato - COLADA NO FUNDO DA PÁGINA */}
      <div className="relative z-10 w-full -mt-4 sm:-mt-4 md:mt-0">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
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
              maxHeight: '350px'
            }}
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-400">
              © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
