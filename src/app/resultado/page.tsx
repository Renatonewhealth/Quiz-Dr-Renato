'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, CheckCircle, MessageCircle, ArrowRight, Star, Sparkles } from 'lucide-react';
import { QuizResult } from '@/types/quiz';

export default function ResultadoPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar resultado do sessionStorage
    const storedResult = sessionStorage.getItem('quizResult');
    const storedName = sessionStorage.getItem('userName');
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedName) {
      setUserName(storedName);
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#a0a0b8]">Carregando resultado...</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
        <div className="text-center container-quiz">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(102,126,234,0.1)] flex items-center justify-center">
            <span className="text-2xl">🤔</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Nenhum resultado encontrado
          </h1>
          <p className="text-[#a0a0b8] mb-6">
            Parece que você ainda não completou o quiz
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Fazer o Quiz
          </button>
        </div>
      </main>
    );
  }

  const getResultIcon = () => {
    if (result.percentage >= 80) return '🏆';
    if (result.percentage >= 60) return '⭐';
    if (result.percentage >= 40) return '👍';
    return '💪';
  };

  const getResultColor = () => {
    if (result.percentage >= 80) return 'from-[#11998e] to-[#38ef7d]';
    if (result.percentage >= 60) return 'from-[#667eea] to-[#764ba2]';
    if (result.percentage >= 40) return 'from-[#f093fb] to-[#f5576c]';
    return 'from-[#ffc107] to-[#ff9800]';
  };

  return (
    <main className="min-h-screen bg-[#0f0f1a] bg-pattern">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#667eea] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#764ba2] opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container-result relative z-10 min-h-screen flex flex-col py-8">
        {/* Header com confetes */}
        <div className="text-center mb-6 animate-fadeInUp">
          <div className="flex justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#ffc107] animate-bounce" style={{ animationDelay: '0ms' }} />
            <Star className="w-6 h-6 text-[#667eea] animate-bounce" style={{ animationDelay: '100ms' }} />
            <Sparkles className="w-6 h-6 text-[#f093fb] animate-bounce" style={{ animationDelay: '200ms' }} />
          </div>
          <h2 className="text-[#a0a0b8] text-lg">
            {userName ? `Olá, ${userName}!` : 'Parabéns!'} Aqui está seu resultado:
          </h2>
        </div>

        {/* Result Card */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="result-card animate-fadeInScale delay-100">
            {/* Ícone de resultado */}
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${getResultColor()} flex items-center justify-center animate-glow`}>
              <span className="text-4xl">{getResultIcon()}</span>
            </div>

            {/* Categoria */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className={`bg-gradient-to-r ${getResultColor()} bg-clip-text text-transparent`}>
                {result.resultCategory}
              </span>
            </h1>

            {/* Score badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(102,126,234,0.1)] border border-[rgba(102,126,234,0.3)] mb-6">
              <Trophy className="w-4 h-4 text-[#667eea]" />
              <span className="text-white font-semibold">
                {result.totalScore} / {result.maxScore} pontos
              </span>
              <span className="text-[#a0a0b8]">
                ({Math.round(result.percentage)}%)
              </span>
            </div>

            {/* Mensagem */}
            <p className="text-[#a0a0b8] text-lg leading-relaxed max-w-md mx-auto mb-6">
              {result.resultMessage}
            </p>

            {/* WhatsApp confirmation */}
            <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[rgba(17,153,142,0.1)] border border-[rgba(56,239,125,0.2)]">
              <CheckCircle className="w-5 h-5 text-[#38ef7d]" />
              <span className="text-[#38ef7d] font-medium">
                Resultado enviado para seu WhatsApp!
              </span>
            </div>
          </div>

          {/* Progress visual */}
          <div className="mt-8 animate-fadeInUp delay-200">
            <div className="bg-[#16162a] rounded-xl p-4 border border-[rgba(102,126,234,0.1)]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#a0a0b8]">Seu desempenho</span>
                <span className="text-sm font-medium text-white">{Math.round(result.percentage)}%</span>
              </div>
              <div className="h-3 bg-[rgba(102,126,234,0.2)] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${getResultColor()} transition-all duration-1000`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 space-y-4 animate-fadeInUp delay-300">
            <button
              onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER_DR || '5511999999999'}`, '_blank')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Dr. Renato
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => router.push('/')}
              className="btn-secondary"
            >
              Fazer Quiz Novamente
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 animate-fadeInUp delay-400">
          <p className="text-[#6b6b80] text-sm">
            Obrigado por participar! 💜
          </p>
        </footer>
      </div>
    </main>
  );
}
