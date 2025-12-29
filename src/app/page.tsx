'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-[#0f0f1a] bg-pattern relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#667eea] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#764ba2] opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container-quiz relative z-10 flex flex-col min-h-screen py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-8 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(102,126,234,0.1)] border border-[rgba(102,126,234,0.3)] mb-6">
            <Sparkles className="w-4 h-4 text-[#667eea]" />
            <span className="text-sm text-[#a0a0b8]">Quiz Interativo</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight animate-fadeInUp">
            Descubra seu{' '}
            <span className="gradient-text">Perfil de Saúde</span>
          </h1>
          
          <p className="text-[#a0a0b8] text-lg md:text-xl mb-8 max-w-md mx-auto animate-fadeInUp delay-100">
            Responda algumas perguntas rápidas e receba um diagnóstico personalizado diretamente no seu WhatsApp.
          </p>

          {/* Benefícios */}
          <div className="grid gap-3 mb-8 animate-fadeInUp delay-200">
            <div className="flex items-center gap-3 text-left bg-[#16162a] rounded-xl p-4 border border-[rgba(102,126,234,0.1)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Apenas 2 minutos</p>
                <p className="text-sm text-[#6b6b80]">Quiz rápido e objetivo</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left bg-[#16162a] rounded-xl p-4 border border-[rgba(102,126,234,0.1)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#5b5ee1] flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Resultado personalizado</p>
                <p className="text-sm text-[#6b6b80]">Baseado nas suas respostas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left bg-[#16162a] rounded-xl p-4 border border-[rgba(102,126,234,0.1)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#11998e] to-[#38ef7d] flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">100% seguro</p>
                <p className="text-sm text-[#6b6b80]">Seus dados estão protegidos</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fadeInUp delay-300">
            <button
              onClick={handleStartQuiz}
              className="w-full py-4 px-8 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r from-[#667eea] to-[#764ba2]
                hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)]
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all duration-300
                flex items-center justify-center gap-2
                animate-pulse"
            >
              Começar Quiz Gratuito
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-[#6b6b80] text-sm mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Gratuito • Sem compromisso
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 animate-fadeInUp delay-400">
          <p className="text-[#6b6b80] text-sm">
            Quiz desenvolvido por{' '}
            <span className="text-[#667eea] font-medium">Dr. Renato Silveira</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
