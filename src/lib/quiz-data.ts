import { QuizQuestion } from '@/types/quiz';

/**
 * PERGUNTAS DO QUIZ
 * 
 * Cada pergunta tem:
 * - id: identificador único
 * - question: texto da pergunta
 * - options: array de opções com id, text e score (1-5)
 * 
 * TODO: Substituir essas perguntas de exemplo pelas perguntas
 * reais definidas pelo Dr. Renato Silveira
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Com que frequência você pratica atividades físicas?',
    options: [
      { id: 'q1-a', text: 'Todos os dias ou quase todos', score: 5 },
      { id: 'q1-b', text: '3 a 4 vezes por semana', score: 4 },
      { id: 'q1-c', text: '1 a 2 vezes por semana', score: 3 },
      { id: 'q1-d', text: 'Raramente ou nunca', score: 1 },
    ],
  },
  {
    id: 'q2',
    question: 'Como você classifica sua qualidade de sono?',
    options: [
      { id: 'q2-a', text: 'Excelente, durmo bem todas as noites', score: 5 },
      { id: 'q2-b', text: 'Boa, na maioria das noites durmo bem', score: 4 },
      { id: 'q2-c', text: 'Regular, às vezes tenho dificuldade', score: 2 },
      { id: 'q2-d', text: 'Ruim, tenho muita dificuldade para dormir', score: 1 },
    ],
  },
  {
    id: 'q3',
    question: 'Com que frequência você sente estresse ou ansiedade?',
    options: [
      { id: 'q3-a', text: 'Raramente, lido bem com pressão', score: 5 },
      { id: 'q3-b', text: 'Às vezes, em situações específicas', score: 4 },
      { id: 'q3-c', text: 'Frequentemente, quase toda semana', score: 2 },
      { id: 'q3-d', text: 'Diariamente, afeta minha rotina', score: 1 },
    ],
  },
  {
    id: 'q4',
    question: 'Como é sua alimentação no dia a dia?',
    options: [
      { id: 'q4-a', text: 'Balanceada, como frutas, verduras e proteínas', score: 5 },
      { id: 'q4-b', text: 'Boa, mas às vezes como besteiras', score: 3 },
      { id: 'q4-c', text: 'Regular, poderia ser mais saudável', score: 2 },
      { id: 'q4-d', text: 'Ruim, como muito fast food e industrializados', score: 1 },
    ],
  },
  {
    id: 'q5',
    question: 'Quantos litros de água você bebe por dia?',
    options: [
      { id: 'q5-a', text: 'Mais de 2 litros', score: 5 },
      { id: 'q5-b', text: 'Entre 1,5 e 2 litros', score: 4 },
      { id: 'q5-c', text: 'Entre 1 e 1,5 litros', score: 2 },
      { id: 'q5-d', text: 'Menos de 1 litro', score: 1 },
    ],
  },
  {
    id: 'q6',
    question: 'Quando foi sua última consulta médica de rotina (check-up)?',
    options: [
      { id: 'q6-a', text: 'Nos últimos 6 meses', score: 5 },
      { id: 'q6-b', text: 'No último ano', score: 4 },
      { id: 'q6-c', text: 'Entre 1 e 2 anos atrás', score: 2 },
      { id: 'q6-d', text: 'Mais de 2 anos ou nunca fiz', score: 1 },
    ],
  },
];

/**
 * Configurações do Quiz
 */
export const quizConfig = {
  title: 'Quiz de Saúde',
  description: 'Descubra como está sua saúde com este quiz rápido',
  minQuestions: 5,
  maxQuestions: 15,
  maxScorePerQuestion: 5,
};
