'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { quizQuestions } from '@/lib/quiz-data';
import { calcularResultado } from '@/lib/scoring';
import { QuizAnswer } from '@/types/quiz';

export default function QuizPage() {
  // #region agent log
  React.useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/7e1d4de9-13bb-41f4-a5ac-5bdcfbe019c7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'quiz/page.tsx:10',message:'QuizPage component mounted',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
  }, []);
  // #endregion
  
  const router = useRouter();
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
    setTimeout(() => {
      if (isLastQuestion) {
        // Mostrar tela de loading antes do formulário
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
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
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
      
      // Salvar lead no Supabase
      const leadResponse = await fetch('/api/salvar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          score: resultado.totalScore,
          resultado: resultado.resultCategory,
          respostas: answers,
        }),
      });
      
      if (!leadResponse.ok) {
        throw new Error('Erro ao salvar dados');
      }
      
      // Enviar resultado via WhatsApp
      await fetch('/api/enviar-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telefone: formData.telefone,
          nome: formData.nome,
          resultado: `${resultado.resultCategory}\n\n${resultado.resultMessage}\n\nScore: ${resultado.totalScore}/${resultado.maxScore}`,
        }),
      });
      
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
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center animate-pulse">
            <span className="text-4xl">🎯</span>
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
        <div className="container-quiz min-h-screen flex flex-col justify-center pt-16 pb-8">
          {/* Header */}
          <div className="text-center mb-4 animate-fadeInUp px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🔍</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              <span className="text-[#667eea]">Seu Detector de Invasores</span> Está Pronto!
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto mb-4">
              Com base nas suas respostas, calculamos sua <strong className="font-semibold text-gray-900">probabilidade de infestação parasitária</strong> e identificamos os sinais de alerta no seu corpo. 
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              📱 Preencha os dados abaixo para receber sua análise completa pelo WhatsApp
            </p>
          </div>

          {/* Form */}
          <div>
            <div className="space-y-4 animate-fadeInUp delay-100">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome"
                  className={`input-field ${formErrors.nome ? 'error' : ''}`}
                />
                {formErrors.nome && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className={`input-field ${formErrors.email ? 'error' : ''}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  📱 WhatsApp (com DDD)
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className={`input-field ${formErrors.telefone ? 'error' : ''}`}
                />
                {formErrors.telefone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.telefone}</p>
                )}
              </div>
            </div>

            <div className="mt-8 animate-fadeInUp delay-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-5 px-6 rounded-xl font-bold text-white text-lg
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
