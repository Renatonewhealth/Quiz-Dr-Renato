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
    question: 'Nos últimos 12 meses, o que melhor descreve sua experiência com o tema "perda de peso"?',
    options: [
      { id: 'q1-a', text: 'Consigo emagrecer, mas sempre volto a ganhar peso depois (efeito sanfona)', score: 0, emoji: '🔄' },
      { id: 'q1-b', text: 'Faço dieta e exercício, mas a balança quase não se move', score: 0, emoji: '⚖️' },
      { id: 'q1-c', text: 'Perdi peso no passado, mas agora parece impossível emagrecer', score: 0, emoji: '😓' },
      { id: 'q1-d', text: 'Nunca consigo seguir uma dieta por muito tempo (fome me vence)', score: 0, emoji: '🍽️' },
      { id: 'q1-e', text: 'Consigo emagrecer com facilidade e não tenho problema nenhum com dietas', score: 1, emoji: '✅' },
    ],
  },
  {
    id: 'q2',
    question: 'Como você descreveria sua região abdominal na MAIORIA dos dias?',
    options: [
      { id: 'q2-a', text: 'Barriga inchada/estufada, principalmente após comer', score: 0, emoji: '🎈' },
      { id: 'q2-b', text: 'Sensação de peso ou desconforto constante', score: 0, emoji: '😣' },
      { id: 'q2-c', text: 'Gases frequentes que causam vergonha', score: 0, emoji: '💨' },
      { id: 'q2-d', text: 'Barriga flácida que não endurece mesmo com exercício', score: 0, emoji: '😔' },
      { id: 'q2-e', text: 'Minha região abdominal é perfeita', score: 1, emoji: '💪' },
    ],
  },
  {
    id: 'q3',
    question: 'Com que frequência você sente cansaço intenso ou falta de energia?',
    options: [
      { id: 'q3-a', text: 'Acordo cansada, mesmo depois de dormir 7-8 horas', score: 0, emoji: '😴' },
      { id: 'q3-b', text: 'Tenho "crashes" de energia durante o dia (principalmente à tarde)', score: 0, emoji: '📉' },
      { id: 'q3-c', text: 'Sinto que meu corpo está sempre pesado, sem disposição', score: 0, emoji: '😫' },
      { id: 'q3-d', text: 'Qualquer atividade física me deixa exausta rapidamente', score: 0, emoji: '🥱' },
      { id: 'q3-e', text: 'Tenho energia de sobra e raramente me sinto cansada', score: 1, emoji: '⚡' },
    ],
  },
  {
    id: 'q4',
    question: 'Qual dessas situações você vive COM MAIS FREQUÊNCIA?',
    options: [
      { id: 'q4-a', text: 'Fome constante, mesmo depois de comer uma refeição completa', score: 0, emoji: '🍽️' },
      { id: 'q4-b', text: 'Vontades enormes de doces, pão ou carboidratos', score: 0, emoji: '🍰' },
      { id: 'q4-c', text: 'Como normal durante o dia, mas ataco a geladeira à noite', score: 0, emoji: '🌙' },
      { id: 'q4-d', text: 'Sinto que nunca fico satisfeita, sempre quero mais comida', score: 0, emoji: '🤤' },
      { id: 'q4-e', text: 'Me sinto satisfeita com minhas refeições e não tenho compulsões', score: 1, emoji: '✅' },
    ],
  },
  {
    id: 'q5',
    question: 'Como você descreveria a qualidade do seu sono?',
    options: [
      { id: 'q5-a', text: 'Acordo várias vezes durante a madrugada (sono picado)', score: 0, emoji: '🌃' },
      { id: 'q5-b', text: 'Acordo cansada, como se tivesse dormido pouco', score: 0, emoji: '😪' },
      { id: 'q5-c', text: 'Tenho dificuldade para pegar no sono ou acordo muito cedo', score: 0, emoji: '⏰' },
      { id: 'q5-d', text: 'Durmo bem, mas tenho muita dificuldade para acordar pelas manhãs', score: 0, emoji: '😴' },
      { id: 'q5-e', text: 'Durmo muito bem e acordo descansada na maioria dos dias', score: 1, emoji: '✨' },
    ],
  },
  {
    id: 'q6',
    question: 'Com que frequência você fica doente (gripes, resfriados, infecções)?',
    options: [
      { id: 'q6-a', text: 'Fico doente 3+ vezes por ano (meu corpo não reage bem)', score: 0, emoji: '🤧' },
      { id: 'q6-b', text: 'Fico doente 1-2 vezes por ano', score: 0, emoji: '🤒' },
      { id: 'q6-c', text: 'Raramente fico doente', score: 0, emoji: '💪' },
      { id: 'q6-d', text: 'Tenho imunidade forte, quase nunca adoeço', score: 1, emoji: '🛡️' },
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
