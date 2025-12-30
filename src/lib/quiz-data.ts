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
  // Pergunta 1: Sexo
  {
    id: 'q1',
    question: 'Qual é o seu sexo?',
    options: [
      { id: 'q1-a', text: 'Masculino', score: 0, emoji: '👨' },
      { id: 'q1-b', text: 'Feminino', score: 0, emoji: '👩' },
    ],
  },
  // Pergunta 2: Idade
  {
    id: 'q2',
    question: 'Qual é a sua idade?',
    options: [
      { id: 'q2-a', text: 'Mais de 55 anos', score: 0, emoji: '👴' },
      { id: 'q2-b', text: 'Entre 46 e 55 anos', score: 0, emoji: '🧑' },
      { id: 'q2-c', text: 'Entre 31 e 45 anos', score: 0, emoji: '👨‍💼' },
      { id: 'q2-d', text: 'Entre 18 e 30 anos', score: 0, emoji: '👦' },
      { id: 'q2-e', text: 'Menos de 18 anos', score: 0, emoji: '🧒' },
    ],
  },
  // Pergunta 3: Perda de peso (antiga q1)
  {
    id: 'q3',
    question: 'Nos últimos 12 meses, o que melhor descreve sua experiência com o tema "perda de peso"?',
    options: [
      { id: 'q3-a', text: 'Consigo emagrecer, mas sempre volto a ganhar peso depois (efeito sanfona)', score: 0, emoji: '🔄' },
      { id: 'q3-b', text: 'Faço dieta e exercício, mas a balança quase não se move', score: 0, emoji: '⚖️' },
      { id: 'q3-c', text: 'Perdi peso no passado, mas agora parece impossível emagrecer', score: 0, emoji: '😓' },
      { id: 'q3-d', text: 'Nunca consigo seguir uma dieta por muito tempo (fome me vence)', score: 0, emoji: '🍽️' },
      { id: 'q3-e', text: 'Consigo emagrecer com facilidade e não tenho problema nenhum com dietas', score: 1, emoji: '✅' },
    ],
  },
  // Pergunta 4: Região abdominal (antiga q2)
  {
    id: 'q4',
    question: 'Como você descreveria sua região abdominal na MAIORIA dos dias?',
    options: [
      { id: 'q4-a', text: 'Barriga inchada/estufada, principalmente após comer', score: 0, emoji: '🎈' },
      { id: 'q4-b', text: 'Sensação de peso ou desconforto constante', score: 0, emoji: '😣' },
      { id: 'q4-c', text: 'Gases frequentes que causam vergonha', score: 0, emoji: '💨' },
      { id: 'q4-d', text: 'Barriga flácida que não endurece mesmo com exercício', score: 0, emoji: '😔' },
      { id: 'q4-e', text: 'Minha região abdominal é perfeita', score: 1, emoji: '💪' },
    ],
  },
  // Pergunta 5: Energia (antiga q3)
  {
    id: 'q5',
    question: 'Com que frequência você sente cansaço intenso ou falta de energia?',
    options: [
      { id: 'q5-a', text: 'Acordo cansada, mesmo depois de dormir 7-8 horas', score: 0, emoji: '😴' },
      { id: 'q5-b', text: 'Tenho "crashes" de energia durante o dia (principalmente à tarde)', score: 0, emoji: '📉' },
      { id: 'q5-c', text: 'Sinto que meu corpo está sempre pesado, sem disposição', score: 0, emoji: '😫' },
      { id: 'q5-d', text: 'Qualquer atividade física me deixa exausta rapidamente', score: 0, emoji: '🥱' },
      { id: 'q5-e', text: 'Tenho energia de sobra e raramente me sinto cansada', score: 1, emoji: '⚡' },
    ],
  },
  // Pergunta 6: Alimentação (antiga q4)
  {
    id: 'q6',
    question: 'Qual dessas situações você vive COM MAIS FREQUÊNCIA?',
    options: [
      { id: 'q6-a', text: 'Fome constante, mesmo depois de comer uma refeição completa', score: 0, emoji: '🍽️' },
      { id: 'q6-b', text: 'Vontades enormes de doces, pão ou carboidratos', score: 0, emoji: '🍰' },
      { id: 'q6-c', text: 'Como normal durante o dia, mas ataco a geladeira à noite', score: 0, emoji: '🌙' },
      { id: 'q6-d', text: 'Sinto que nunca fico satisfeita, sempre quero mais comida', score: 0, emoji: '🤤' },
      { id: 'q6-e', text: 'Me sinto satisfeita com minhas refeições e não tenho compulsões', score: 1, emoji: '✅' },
    ],
  },
  // Pergunta 7: Sono (antiga q5)
  {
    id: 'q7',
    question: 'Como você descreveria a qualidade do seu sono?',
    options: [
      { id: 'q7-a', text: 'Acordo várias vezes durante a madrugada (sono picado)', score: 0, emoji: '🌃' },
      { id: 'q7-b', text: 'Acordo cansada, como se tivesse dormido pouco', score: 0, emoji: '😪' },
      { id: 'q7-c', text: 'Tenho dificuldade para pegar no sono ou acordo muito cedo', score: 0, emoji: '⏰' },
      { id: 'q7-d', text: 'Durmo bem, mas tenho muita dificuldade para acordar pelas manhãs', score: 0, emoji: '😴' },
      { id: 'q7-e', text: 'Durmo muito bem e acordo descansada na maioria dos dias', score: 1, emoji: '✨' },
    ],
  },
  // Pergunta 8: Imunidade (antiga q6)
  {
    id: 'q8',
    question: 'Com que frequência você fica doente (gripes, resfriados, infecções)?',
    options: [
      { id: 'q8-a', text: 'Fico doente 3+ vezes por ano (meu corpo não reage bem)', score: 0, emoji: '🤧' },
      { id: 'q8-b', text: 'Fico doente 1-2 vezes por ano', score: 0, emoji: '🤒' },
      { id: 'q8-c', text: 'Raramente fico doente', score: 0, emoji: '💪' },
      { id: 'q8-d', text: 'Tenho imunidade forte, quase nunca adoeço', score: 1, emoji: '🛡️' },
    ],
  },
];

/**
 * Configurações do Quiz
 */
export const quizConfig = {
  title: 'Quiz de Saúde',
  description: 'Descubra como está sua saúde com este quiz rápido',
  minQuestions: 8,
  maxQuestions: 8,
  maxScorePerQuestion: 5,
};
