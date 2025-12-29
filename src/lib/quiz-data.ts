import { QuizQuestion } from '@/types/quiz';

// TODO: Adicionar perguntas reais do quiz médico
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Pergunta exemplo 1',
    options: [
      { id: 'q1-a', text: 'Opção A', score: 1 },
      { id: 'q1-b', text: 'Opção B', score: 3 },
      { id: 'q1-c', text: 'Opção C', score: 5 },
    ],
  },
  // Adicionar mais perguntas aqui
];

