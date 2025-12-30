'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { quizQuestions } from '@/lib/quiz-data';
import { calcularResultado } from '@/lib/scoring';
import { QuizAnswer } from '@/types/quiz';
import { AnimatedBook } from '@/components/ui/animated-book';

export default function QuizPage() {
  const router = useRouter();
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Criar sessão ao montar o componente
  React.useEffect(() => {
    const createSession = async () => {
      try {
        await fetch('/api/quiz-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            action: 'start',
          }),
        });
      } catch (error) {
        console.error('Erro ao criar sessão:', error);
      }
    };
    createSession();
  }, [sessionId]);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleSelectOption = (optionId: string, score: number) => {
    setSelectedOption(optionId);
    
    // Atualizar resposta
    const newAnswer: QuizAnswer = {
      questionId: question.id,
      optionId,
      score,
    };
    
    const existingAnswerIndex = answers.findIndex(a => a.questionId === question.id);
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }

    // Auto-advance após 300ms
    setIsTransitioning(true);
    setTimeout(async () => {
      // Atualizar tracking da sessão
      try {
        await fetch('/api/quiz-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            action: 'update',
            question: currentQuestion + 1,
          }),
        });
      } catch (error) {
        console.error('Erro ao atualizar sessão:', error);
      }

      if (isLastQuestion) {
        // Calcular score total incluindo a resposta atual
        const updatedAnswers = existingAnswerIndex >= 0
          ? answers.map((a, i) => i === existingAnswerIndex ? newAnswer : a)
          : [...answers, newAnswer];
        
        const totalScore = updatedAnswers.reduce((sum, a) => sum + a.score, 0);
        
        // Se score >= 5, redirecionar para página de baixo risco (sem formulário)
        if (totalScore >= 5) {
          // Marcar sessão como completa
          try {
            await fetch('/api/quiz-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                session_id: sessionId,
                action: 'complete',
                question: currentQuestion + 1,
              }),
            });
          } catch (error) {
            console.error('Erro ao completar sessão:', error);
          }
          router.push('/resultado-baixo');
          return;
        }
        
        // Se score <= 4, mostrar tela de loading e depois formulário
        setShowLoading(true);
        
        // Animar barra de progresso
        let progress = 0;
        const interval = setInterval(() => {
          progress += 2;
          setLoadingProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowLoading(false);
              setShowLeadForm(true);
            }, 500);
          }
        }, 60); // 2% a cada 60ms = 3 segundos total
      } else {
        setCurrentQuestion(prev => prev + 1);
        // Verificar se já respondeu a próxima pergunta
        const nextAnswer = answers.find(a => a.questionId === quizQuestions[currentQuestion + 1]?.id);
        setSelectedOption(nextAnswer?.optionId || null);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (isLastQuestion) {
        setShowLeadForm(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
        // Verificar se já respondeu a próxima pergunta
        const nextAnswer = answers.find(a => a.questionId === quizQuestions[currentQuestion + 1]?.id);
        setSelectedOption(nextAnswer?.optionId || null);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = answers.find(a => a.questionId === quizQuestions[currentQuestion - 1]?.id);
      setSelectedOption(prevAnswer?.optionId || null);
      setIsTransitioning(false);
    }, 300);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.nome.trim() || formData.nome.length < 2) {
      errors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    if (!formData.telefone.trim() || !/^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.telefone)) {
      errors.telefone = 'Telefone inválido (ex: 11999999999)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const resultado = calcularResultado(answers);
      
      // Preparar dados das respostas com textos
      const answersWithText = answers.map(answer => {
        const question = quizQuestions.find(q => q.id === answer.questionId);
        const option = question?.options.find(o => o.id === answer.optionId);
        return {
          questionId: typeof answer.questionId === 'string' ? parseInt(answer.questionId.replace('q', '')) : answer.questionId,
          questionText: question?.question || '',
          selectedOption: option?.text || '',
          score: answer.score,
        };
      });
      
      // Salvar lead no Supabase (usando whatsapp como email se não fornecido)
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          whatsapp: formData.telefone,
          email: formData.email || `${formData.telefone.replace(/\D/g, '')}@whatsapp.lead`,
          totalScore: resultado.totalScore,
          riskLevel: resultado.resultCategory,
          answers: answersWithText,
        }),
      });
      
      if (!leadResponse.ok) {
        const errorData = await leadResponse.json();
        throw new Error(errorData.error || 'Erro ao salvar dados');
      }

      const leadData = await leadResponse.json();
      
      // Marcar sessão como completa com o lead_id
      try {
        await fetch('/api/quiz-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            action: 'complete',
            question: quizQuestions.length,
            lead_id: leadData.leadId,
          }),
        });
      } catch (error) {
        console.error('Erro ao completar sessão:', error);
      }
      
      // Armazenar resultado para página de resultado
      sessionStorage.setItem('quizResult', JSON.stringify(resultado));
      sessionStorage.setItem('userName', formData.nome);
      
      router.push('/resultado');
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tela de Loading
  if (showLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="container-quiz text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <AnimatedBook />
          </div>
          
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              <span className="text-[#667eea]">Analisando</span> Suas Respostas...
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-8 font-medium">
              ⏳ Aguarde, estamos quase lá!
            </p>
          
          {/* Barra de progresso */}
          <div className="max-w-md mx-auto">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-100 ease-linear"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {loadingProgress}%
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Formulário de Lead
  if (showLeadForm) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-quiz min-h-screen flex flex-col justify-center pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-fadeInUp px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Sua auto-análise está pronta, e você <span className="text-[#10b981]">PRECISA</span> ver isso agora.
            </h1>
            
            {/* Imagem do resultado */}
            <div className="w-full max-w-md mx-auto mb-4">
              <Image
                src="/images/resultado-lead.png"
                alt="Resultado da Análise"
                width={800}
                height={800}
                className="w-full h-auto rounded-2xl shadow-lg"
                priority
              />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
              Com base nas suas respostas, identificamos sinais que <strong className="font-bold text-gray-900">NÃO devem ser ignorados.</strong>
            </p>
            <p className="text-base sm:text-lg font-bold text-[#10b981]">
              Preencha os dados abaixo e clique no botão para destrancar seu resultado completo no WhatsApp:
            </p>
          </div>

          {/* Form */}
          <div>
            <div className="space-y-3 sm:space-y-4 animate-fadeInUp delay-100">
              <div>
                <label className="block text-sm sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome"
                  className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-all ${formErrors.nome ? 'border-red-500' : ''}`}
                />
                {formErrors.nome && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm sm:text-sm font-semibold text-gray-800 mb-1.5">
                  📱 WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-all ${formErrors.telefone ? 'border-red-500' : ''}`}
                />
                {formErrors.telefone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.telefone}</p>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 animate-fadeInUp delay-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-6 rounded-xl font-bold text-white text-base sm:text-lg
                  bg-gradient-to-r from-[#25D366] to-[#128C7E]
                  hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)]
                  hover:-translate-y-1
                  active:translate-y-0
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'RECEBER MINHA ANÁLISE GRATUITA VIA WHATSAPP'
                )}
              </button>

              <p className="text-gray-600 text-xs sm:text-sm text-center mt-4 font-medium flex items-center justify-center gap-2">
                🔒 <strong>100% Seguro</strong> - Seus dados não serão compartilhados
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Quiz Questions
  return (
    <main 
      className="min-h-screen bg-white"
      ref={(el) => {
        // #region agent log
        if (el) {
          const styles = window.getComputedStyle(el);
          fetch('http://127.0.0.1:7242/ingest/7e1d4de9-13bb-41f4-a5ac-5bdcfbe019c7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'quiz/page.tsx:325',message:'Main element computed styles - POST FIX',data:{padding:styles.padding,margin:styles.margin,overflow:styles.overflow,display:styles.display},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H4'})}).catch(()=>{});
        }
        // #endregion
      }}
    >
      <div 
        className="container-quiz min-h-screen flex flex-col pb-8"
        style={{ paddingTop: '4rem' }}
        ref={(el) => {
          // #region agent log
          if (el) {
            const styles = window.getComputedStyle(el);
            fetch('http://127.0.0.1:7242/ingest/7e1d4de9-13bb-41f4-a5ac-5bdcfbe019c7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'quiz/page.tsx:320',message:'Quiz container computed styles - POST FIX',data:{paddingTop:styles.paddingTop,display:styles.display,flexDirection:styles.flexDirection,justifyContent:styles.justifyContent,minHeight:styles.minHeight,classList:el.className,inlineStyle:el.style.paddingTop},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H1,H2,H3'})}).catch(()=>{});
          }
          // #endregion
        }}
      >
        {/* Progress Bar */}
        <div 
          className="mb-8 animate-fadeInUp"
          ref={(el) => {
            // #region agent log
            if (el) {
              const rect = el.getBoundingClientRect();
              fetch('http://127.0.0.1:7242/ingest/7e1d4de9-13bb-41f4-a5ac-5bdcfbe019c7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'quiz/page.tsx:332',message:'Progress bar position',data:{top:rect.top,left:rect.left,distanceFromTop:rect.top},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H3'})}).catch(()=>{});
            }
            // #endregion
          }}
        >
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={`flex flex-col transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-8 animate-fadeInUp delay-100">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 text-center leading-tight px-2">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6 animate-fadeInUp delay-200">
            {question.options.map((option, index) => {
              const letters = ['A', 'B', 'C', 'D', 'E'];
              const isSelected = selectedOption === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id, option.score)}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  className={`quiz-option animate-slideIn opacity-0 ${isSelected ? 'selected' : ''}`}
                >
                  {option.emoji && (
                    <span className="emoji-background">{option.emoji}</span>
                  )}
                  <span className="quiz-option-letter">
                    {letters[index]}
                  </span>
                  <span className="option-text flex-1 text-gray-900">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <div className="flex gap-3 animate-fadeInUp delay-300">
              <button
                onClick={handleBack}
                className="btn-icon-only"
                aria-label="Voltar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
