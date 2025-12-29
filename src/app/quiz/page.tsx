'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { quizQuestions } from '@/lib/quiz-data';
import { calcularResultado } from '@/lib/scoring';
import { QuizAnswer } from '@/types/quiz';

export default function QuizPage() {
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
            }, 200);
          }
        }, 40); // 2% a cada 40ms = 2 segundos total
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
      <main className="min-h-screen bg-white bg-pattern flex items-center justify-center">
        <div className="container-quiz text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center animate-pulse">
            <span className="text-4xl">🎯</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Estamos analisando suas respostas
          </h2>
          
          <p className="text-gray-600 mb-8">
            Não saia dessa página, estamos quase lá...
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
      <main className="min-h-screen bg-white bg-pattern">
        <div className="container-quiz min-h-screen flex flex-col py-8">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Seu Detector de Invasores Está Pronto!
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Com base nas suas respostas, calculamos sua probabilidade de infestação parasitária e identificamos os sinais de alerta no seu corpo. 
              Preencha os dados abaixo para receber sua análise completa pelo Whatsapp.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4 animate-fadeInUp delay-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp (com DDD)
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
                className="btn-primary flex items-center justify-center gap-2 text-lg py-5 font-bold"
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

              <p className="text-gray-500 text-sm text-center mt-4 flex items-center justify-center gap-2">
                🔒 Seus dados estão seguros e não serão compartilhados
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Quiz Questions
  return (
    <main className="min-h-screen bg-white bg-pattern">
      <div className="container-quiz min-h-screen flex flex-col py-8">
        {/* Progress Bar */}
        <div className="mb-6 animate-fadeInUp">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="text-sm text-[#667eea] font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-8 animate-fadeInUp delay-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 flex-1">
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
            <div className="mt-8 flex gap-3 animate-fadeInUp delay-300">
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
