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

  // Formulário de Lead
  if (showLeadForm) {
    return (
      <main className="min-h-screen bg-[#0f0f1a] bg-pattern">
        <div className="container-quiz min-h-screen flex flex-col py-8">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Parabéns! Você completou o quiz!
            </h1>
            <p className="text-[#a0a0b8]">
              Preencha seus dados para receber o resultado personalizado
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4 animate-fadeInUp delay-100">
              <div>
                <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome"
                  className={`input-field ${formErrors.nome ? 'error' : ''}`}
                />
                {formErrors.nome && (
                  <p className="text-[#f5576c] text-sm mt-1">{formErrors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
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
                  <p className="text-[#f5576c] text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className={`input-field ${formErrors.telefone ? 'error' : ''}`}
                />
                {formErrors.telefone && (
                  <p className="text-[#f5576c] text-sm mt-1">{formErrors.telefone}</p>
                )}
              </div>
            </div>

            <div className="mt-8 animate-fadeInUp delay-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Ver Meu Resultado'
                )}
              </button>

              <p className="text-[#6b6b80] text-sm text-center mt-4 flex items-center justify-center gap-2">
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
    <main className="min-h-screen bg-[#0f0f1a] bg-pattern">
      <div className="container-quiz min-h-screen flex flex-col py-8">
        {/* Progress Bar */}
        <div className="mb-6 animate-fadeInUp">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#a0a0b8]">
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
            <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
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
                  <span className="quiz-option-letter">
                    {letters[index]}
                  </span>
                  <span className="flex-1">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex gap-3 animate-fadeInUp delay-300">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="btn-secondary flex items-center justify-center gap-2 flex-1"
              >
                <ChevronLeft className="w-5 h-5" />
                Voltar
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`btn-primary flex items-center justify-center gap-2 ${currentQuestion === 0 ? 'w-full' : 'flex-1'}`}
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
