'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Answers = Record<string, string | string[]>;

const TOTAL_STEPS = 8;

const steps = [
  {
    id: 'idade',
    type: 'single',
    question: 'Qual é a sua faixa de idade?',
    options: ['Menos de 25 anos', '25 a 34 anos', '35 a 44 anos', '45 a 54 anos', '55 anos ou mais'],
  },
  {
    id: 'estado_civil',
    type: 'single',
    question: 'Qual é o seu estado civil?',
    options: ['Solteira', 'Casada', 'União estável', 'Divorciada / Separada', 'Viúva'],
  },
  {
    id: 'filhos',
    type: 'single',
    question: 'Quantos filhos você tem?',
    options: ['Nenhum', '1 filho', '2 filhos', '3 filhos', '4 ou mais filhos'],
  },
  {
    id: 'outros_problemas',
    type: 'multi',
    question: 'Além de emagrecer, você tem outros problemas de saúde?',
    subtitle: 'Pode selecionar mais de um',
    options: ['Queda de cabelo', 'Irritabilidade', 'Menopausa / TPM', 'Acne / Espinhas', 'Cansaço excessivo', 'Inchaço', 'Intestino preso', 'Ansiedade', 'Insônia'],
  },
  {
    id: 'metodos_anteriores',
    type: 'multi',
    question: 'Você já tentou outros métodos para emagrecer antes?',
    subtitle: 'Pode selecionar mais de um',
    options: ['Dieta restritiva', 'Academia / Exercícios', 'Remédios para emagrecer', 'Mounjaro / Ozempic / Wegovy', 'Outros suplementos', 'Cirurgia bariátrica', 'Nunca tentei nada'],
  },
  {
    id: 'expectativa',
    type: 'text',
    question: 'O que você espera conquistar com o Desparafit nos próximos 60 dias?',
    placeholder: 'Escreva aqui sua expectativa...',
  },
  {
    id: 'motivo_compra',
    type: 'text',
    question: 'Qual foi o motivo que te fez comprar o Desparafit?',
    placeholder: 'Escreva aqui o que te motivou...',
  },
  {
    id: 'teve_objecao',
    type: 'objecao',
    question: 'Teve algum motivo que quase te fez NÃO comprar o Desparafit?',
    options: ['Não', 'Sim'],
  },
];

export default function QuestionarioPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [textValue, setTextValue] = useState('');
  const [objecaoText, setObjecaoText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const step = steps[currentStep];
  const progress = Math.round(((currentStep) / TOTAL_STEPS) * 100);

  const currentAnswer = answers[step?.id];

  const canAdvance = () => {
    if (!step) return false;
    if (step.type === 'single') return !!currentAnswer;
    if (step.type === 'multi') return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    if (step.type === 'text') return textValue.trim().length >= 5;
    if (step.type === 'objecao') return !!currentAnswer;
    return false;
  };

  const handleSingleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [step.id]: option }));
  };

  const handleMultiSelect = (option: string) => {
    const prev = (answers[step.id] as string[]) || [];
    const exists = prev.includes(option);
    const updated = exists ? prev.filter(o => o !== option) : [...prev, option];
    setAnswers(prev => ({ ...prev, [step.id]: updated }));
  };

  const handleNext = () => {
    // Save text values before advancing
    if (step.type === 'text') {
      setAnswers(prev => ({ ...prev, [step.id]: textValue }));
      setTextValue('');
    }
    if (step.type === 'objecao') {
      // textValue for objecao is saved separately
    }

    if (currentStep < TOTAL_STEPS - 1) {
      // Pre-fill text if going back to a text step
      const nextStep = steps[currentStep + 1];
      if (nextStep?.type === 'text') {
        setTextValue((answers[nextStep.id] as string) || '');
      }
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setStarted(false);
      return;
    }
    const prevStep = steps[currentStep - 1];
    if (prevStep?.type === 'text') {
      setTextValue((answers[prevStep.id] as string) || '');
    } else {
      setTextValue('');
    }
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        idade: answers['idade'] as string,
        estado_civil: answers['estado_civil'] as string,
        filhos: answers['filhos'] as string,
        outros_problemas: (answers['outros_problemas'] as string[]) || [],
        metodos_anteriores: (answers['metodos_anteriores'] as string[]) || [],
        expectativa: (answers['expectativa'] as string) || '',
        motivo_compra: (answers['motivo_compra'] as string) || '',
        teve_objecao: (answers['teve_objecao'] as string) || 'Não',
        qual_objecao: answers['teve_objecao'] === 'Sim' ? objecaoText : undefined,
      };

      await fetch('/api/questionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error('Erro ao enviar:', e);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  // Tela final
  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center px-4 py-10">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Obrigada pelas suas respostas! 🎉
          </h1>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Como prometido, aqui está o seu presente exclusivo do Dr. Renato — <strong className="text-gray-800">Guia Pele Saudável</strong>, 100% gratuito!
          </p>

          {/* Botão de download */}
          <a
            href="/pele-saudavel.pdf"
            download="Guia Pele Saudável - Dr. Renato.pdf"
            className="inline-block bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg mb-8"
          >
            ⬇️ BAIXAR O GUIA AGORA
          </a>

          {/* PDF embutido */}
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
              <span className="text-red-400 text-lg">📄</span>
              <span className="text-white text-sm font-medium">Guia Pele Saudável — Dr. Renato Silveira</span>
            </div>
            <iframe
              src="/pele-saudavel.pdf"
              className="w-full"
              style={{ height: '80vh', minHeight: '500px' }}
              title="Guia Pele Saudável"
            />
          </div>
        </div>
      </main>
    );
  }

  // Tela de entrada
  if (!started) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
            Responda esse formulário abaixo para nós melhorarmos cada vez mais sua experiência com a H9 Pharma
          </h1>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Temos um <strong className="text-green-600">presente gratuito</strong> pra você ao final desse formulário. É rapidinho, não leva nem 2 minutos! 🎁
          </p>
          <button
            onClick={() => setStarted(true)}
            className="w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all duration-150"
          >
            RESPONDER AGORA
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Barra de progresso */}
      <div className="w-full bg-gray-100 h-2">
        <div
          className="h-2 bg-gradient-to-r from-[#dc2626] to-[#f87171] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-xs text-gray-400 pt-2">{progress}% concluído</p>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4 py-8">
        {/* Pergunta */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#dc2626] uppercase tracking-wide mb-2">
            Pergunta {currentStep + 1} de {TOTAL_STEPS}
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
            {step.question}
          </h2>
          {'subtitle' in step && step.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>
          )}
        </div>

        {/* Opções - Single */}
        {step.type === 'single' && (
          <div className="space-y-3">
            {step.options?.map(option => (
              <button
                key={option}
                onClick={() => handleSingleSelect(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-base transition-all duration-150 active:scale-[0.98] ${
                  currentAnswer === option
                    ? 'border-[#dc2626] bg-red-50 text-[#dc2626]'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Opções - Multi */}
        {step.type === 'multi' && (
          <div className="space-y-3">
            {step.options?.map(option => {
              const selected = ((answers[step.id] as string[]) || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleMultiSelect(option)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-base transition-all duration-150 active:scale-[0.98] flex items-center gap-3 ${
                    selected
                      ? 'border-[#dc2626] bg-red-50 text-[#dc2626]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center ${
                    selected ? 'bg-[#dc2626] border-[#dc2626]' : 'border-gray-300'
                  }`}>
                    {selected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Texto livre */}
        {step.type === 'text' && (
          <textarea
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
            placeholder={'placeholder' in step ? step.placeholder : ''}
            rows={5}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:outline-none focus:border-[#dc2626] resize-none"
          />
        )}

        {/* Objeção (Sim/Não + condicional) */}
        {step.type === 'objecao' && (
          <div className="space-y-3">
            {step.options?.map(option => (
              <button
                key={option}
                onClick={() => handleSingleSelect(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-base transition-all duration-150 active:scale-[0.98] ${
                  currentAnswer === option
                    ? 'border-[#dc2626] bg-red-50 text-[#dc2626]'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
            {currentAnswer === 'Sim' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Qual foi o motivo?</p>
                <textarea
                  value={objecaoText}
                  onChange={e => setObjecaoText(e.target.value)}
                  placeholder="Escreva aqui o que quase te impediu..."
                  rows={4}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:outline-none focus:border-[#dc2626] resize-none"
                />
              </div>
            )}
          </div>
        )}

        {/* Navegação */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleNext}
            disabled={!canAdvance() || isSubmitting}
            className={`w-full font-bold text-lg py-4 px-6 rounded-xl shadow transition-all duration-150 active:scale-[0.98] ${
              canAdvance() && !isSubmitting
                ? 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Enviando...' : currentStep === TOTAL_STEPS - 1 ? 'FINALIZAR E PEGAR MEU PRESENTE 🎁' : 'PRÓXIMA PERGUNTA →'}
          </button>
          <button
            onClick={handleBack}
            className="w-full text-gray-500 text-sm py-2 hover:text-gray-700 transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </main>
  );
}
