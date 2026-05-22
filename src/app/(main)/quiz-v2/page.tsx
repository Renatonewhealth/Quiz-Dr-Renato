'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { quizQuestions } from '@/lib/quiz-data';
import { calcularResultado } from '@/lib/scoring';
import { QuizAnswer } from '@/types/quiz';
import { track } from '@/lib/tracker';

const VARIANT = 'v2';

export default function QuizV2Page() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const startedRef = useRef(false);

  // Marca o quiz_source como 'v2' (sobrescreve qualquer source anterior
  // tipo 'google'/'native' que tenha sido salvo na sessão). Também tagueia
  // todos os eventos via track() com variant='v2'.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    try {
      sessionStorage.setItem('quiz_source', VARIANT);
      track('quiz_start', {
        variant: VARIANT,
        metadata: { layout: 'inline-marketing-first' },
      });
    } catch {
      /* ignore */
    }
  }, []);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleSelectOption = (optionId: string, score: number) => {
    if (isTransitioning) return;
    setSelectedOption(optionId);

    const newAnswer: QuizAnswer = {
      questionId: question.id,
      optionId,
      score,
    };

    const existingIdx = answers.findIndex((a) => a.questionId === question.id);
    if (existingIdx >= 0) {
      const next = [...answers];
      next[existingIdx] = newAnswer;
      setAnswers(next);
    } else {
      setAnswers([...answers, newAnswer]);
    }

    // Tracking: pergunta respondida
    try {
      track('quiz_question_answered', {
        question_id: currentQuestion + 1,
        variant: VARIANT,
        metadata: {
          question_key: question.id,
          option_id: optionId,
          score,
        },
      });
    } catch {
      /* ignore */
    }

    setIsTransitioning(true);
    setTimeout(async () => {
      if (isLastQuestion) {
        const updated =
          existingIdx >= 0
            ? answers.map((a, i) => (i === existingIdx ? newAnswer : a))
            : [...answers, newAnswer];

        const totalScore = updated.reduce((sum, a) => sum + a.score, 0);

        // Baixo risco → /resultado-baixo direto
        if (totalScore >= 5) {
          try {
            track('quiz_completed', {
              variant: VARIANT,
              metadata: {
                total_score: totalScore,
                outcome: 'low_risk',
                destination: '/resultado-baixo',
              },
              immediate: true,
            });
          } catch {
            /* ignore */
          }
          await new Promise((r) => setTimeout(r, 250));
          router.push('/resultado-baixo');
          return;
        }

        // Alto risco → loading 3s → /resultado2
        try {
          track('quiz_completed', {
            variant: VARIANT,
            metadata: {
              total_score: totalScore,
              outcome: 'high_risk_vsl',
              destination: '/resultado2',
            },
            immediate: true,
          });
        } catch {
          /* ignore */
        }

        setShowLoading(true);
        let p = 0;
        const interval = setInterval(() => {
          p += 2;
          setLoadingProgress(p);
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              router.push('/resultado2');
            }, 500);
          }
        }, 60);
        return;
      }

      setCurrentQuestion((prev) => prev + 1);
      const nextAnswer = answers.find(
        (a) => a.questionId === quizQuestions[currentQuestion + 1]?.id
      );
      setSelectedOption(nextAnswer?.optionId || null);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 150);
  };

  // ----------------- Loading screen -----------------
  if (showLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto w-14 h-14 mb-6 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-gray-900 animate-spin" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Analisando suas respostas...
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Calculando seu perfil de risco. Isso leva poucos segundos.
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gray-900 h-full rounded-full transition-[width] duration-100 ease-linear"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-3 tabular-nums">{loadingProgress}%</p>
        </div>
      </main>
    );
  }

  // ----------------- Quiz screen -----------------
  return (
    <main className="min-h-screen bg-white">
      {/* Progress bar fixa no topo */}
      <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 pt-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gray-900 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-6 pb-12">
        {/* Conteúdo da primeira pergunta inclui marketing copy */}
        {isFirstQuestion ? (
          <>
            {/* Headline (original do funil) */}
            <section className="pt-5 pb-3 text-center">
              <h1 className="text-[1.5rem] sm:text-3xl font-bold text-gray-900 leading-[1.22] tracking-tight">
                8 em Cada 10 Mulheres Acima de 35 anos Têm Alto Potencial de{' '}
                <span className="bg-yellow-300 px-1.5 py-0.5">
                  Vermes e Parasitas Intestinais
                </span>
                , E Isso Está{' '}
                <span className="bg-yellow-300 px-1.5 py-0.5">IMPEDINDO</span> o
                Emagrecimento Delas.
              </h1>
            </section>

            {/* Subhead */}
            <section className="pb-4 text-center">
              <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                Será que você é uma delas?{' '}
                <em className="underline decoration-gray-400 underline-offset-2">
                  Faça o auto-teste e descubra agora
                </em>
              </p>
            </section>

            {/* Imagem hero - clique rola pra Q1 */}
            <section className="pb-5 -mx-5 sm:mx-0">
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById('quiz-cta')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-label="Ir para o quiz"
                className="block w-full max-w-3xl mx-auto cursor-pointer"
              >
                <div className="relative w-full aspect-[16/9] sm:aspect-[5/3]">
                  <Image
                    src="/images/quiz-v2-hero-v4.png"
                    alt="Dr. Renato Silveira"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </button>
            </section>

            {/* Call pra responder */}
            <p
              id="quiz-cta"
              className="text-center text-[0.7rem] sm:text-sm text-gray-500 font-medium tracking-wider uppercase pb-2 scroll-mt-4"
            >
              ↓ Responda o quiz e veja seu resultado ↓
            </p>

            {/* Pergunta 1 título (override do texto pra esta versão) */}
            <h2 className="text-center text-lg sm:text-2xl font-bold text-gray-900 pb-4">
              Escolha para começar, você é:
            </h2>

            {/* Opções da Q1 em estilo de cards grandes */}
            <div
              className={`grid gap-3 mb-8 ${
                question.options.length === 2
                  ? 'grid-cols-2'
                  : question.options.length <= 4
                    ? 'grid-cols-1'
                    : 'grid-cols-1'
              }`}
            >
              {question.options.map((opt) => {
                const isSel = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id, opt.score)}
                    disabled={isTransitioning}
                    className={`group relative flex items-center gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-150 text-left ${
                      isSel
                        ? 'bg-gray-900 text-white shadow-lg scale-[0.99]'
                        : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99]'
                    } ${isTransitioning ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSel
                          ? 'bg-white border-white'
                          : 'border-white/40 group-hover:border-white/70'
                      }`}
                    >
                      {isSel && <Check className="w-4 h-4 text-gray-900" strokeWidth={3} />}
                    </span>
                    <span className="font-bold text-base sm:text-lg uppercase tracking-wide">
                      {opt.text.toLowerCase() === 'masculino'
                        ? 'Homem'
                        : opt.text.toLowerCase() === 'feminino'
                          ? 'Mulher'
                          : opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bullets de benefícios */}
            <ul className="space-y-2.5 text-center text-[0.95rem] sm:text-base text-gray-800 mb-6">
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✅</span>
                <strong>100% gratuito e em até 60 segundos</strong>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✅</span>
                <strong>Resultado personalizado pro seu perfil</strong>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-green-500">✅</span>
                <strong>Desenvolvido pelo Dr. Renato Silveira</strong>
              </li>
            </ul>

            {/* Social proof */}
            <p className="text-center text-sm text-gray-500">
              ⚡ Mais de <strong className="text-gray-900">51.827 pessoas</strong> fizeram
              essa auto-análise.
            </p>
          </>
        ) : (
          // ----------------- Perguntas 2+ -----------------
          <>
            <section className="pt-20 sm:pt-24 pb-6">
              <p className="text-center text-xs sm:text-sm text-gray-400 font-medium tracking-wider uppercase mb-3">
                Pergunta {currentQuestion + 1} de {totalQuestions}
              </p>
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {question.question}
              </h2>
            </section>

            <div className="space-y-3">
              {question.options.map((opt) => {
                const isSel = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id, opt.score)}
                    disabled={isTransitioning}
                    className={`w-full flex items-center gap-4 rounded-2xl border-2 p-4 sm:p-5 transition-all duration-150 text-left ${
                      isSel
                        ? 'border-gray-900 bg-gray-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99]'
                    } ${isTransitioning ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSel
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSel && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </span>
                    <span className="font-medium text-gray-900 text-base sm:text-lg">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-8 mt-12">
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
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
