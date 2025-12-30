'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatedFolderButton } from '@/components/ui/animated-folder-button';

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight px-4 animate-fadeInUp">
              Você Pode Ter <span className="text-[#667eea]">Parasitas Dentro do Seu Corpo</span> Neste Exato Momento, e Nem Sabe.
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto px-4 animate-fadeInUp delay-100 font-semibold">
              Responda <strong className="font-bold text-gray-900">6 perguntas rápidas</strong> e descubra qual a <strong className="font-bold text-gray-900">probabilidade REAL</strong> de invasores silenciosos estarem sabotando seu metabolismo, travando seu peso e drenando sua energia. 
              <span className="block mt-3 text-base sm:text-lg text-[#667eea] font-bold">⏱️ Leva menos de 90 segundos.</span>
            </p>

            {/* CTA Button */}
            <div className="max-w-md mx-auto px-4 mb-8 animate-fadeInUp delay-200">
              <AnimatedFolderButton onClick={handleStartQuiz} text="INICIAR ANÁLISE GRATUITA" />
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
