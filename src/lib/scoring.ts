import { QuizAnswer, QuizResult } from '@/types/quiz';
import { quizQuestions } from './quiz-data';

/**
 * Calcula o resultado do quiz baseado nas respostas
 * 
 * @param answers Array de respostas do usuário
 * @returns QuizResult com score, porcentagem e categoria
 */
export function calcularResultado(answers: QuizAnswer[]): QuizResult {
  // Calcular score total
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  
  // Score máximo possível (5 pontos por pergunta)
  const maxScore = quizQuestions.length * 5;
  
  // Porcentagem
  const percentage = (totalScore / maxScore) * 100;

  // Definir categoria e mensagem baseado na porcentagem
  let resultCategory = '';
  let resultMessage = '';

  if (percentage >= 80) {
    resultCategory = 'Excelente';
    resultMessage = 'Parabéns! Seus hábitos de saúde estão muito bons. Continue assim e mantenha suas práticas saudáveis. Lembre-se de fazer check-ups regulares para manter tudo em dia.';
  } else if (percentage >= 60) {
    resultCategory = 'Bom';
    resultMessage = 'Você está no caminho certo! Seus hábitos são bons, mas ainda há espaço para pequenas melhorias. Com alguns ajustes na rotina, você pode alcançar resultados ainda melhores.';
  } else if (percentage >= 40) {
    resultCategory = 'Regular';
    resultMessage = 'Atenção! Alguns aspectos da sua saúde precisam de mais cuidado. Recomendamos consultar um profissional para orientações personalizadas e criar um plano de melhoria.';
  } else {
    resultCategory = 'Atenção Necessária';
    resultMessage = 'Seus hábitos indicam que mudanças são necessárias. É muito importante buscar orientação médica o quanto antes. Estamos aqui para ajudar você nessa jornada!';
  }

  return {
    totalScore,
    maxScore,
    percentage,
    resultCategory,
    resultMessage,
  };
}

/**
 * Retorna a cor associada ao resultado
 */
export function getResultColor(percentage: number): string {
  if (percentage >= 80) return 'success';
  if (percentage >= 60) return 'primary';
  if (percentage >= 40) return 'warning';
  return 'error';
}

/**
 * Retorna o emoji associado ao resultado
 */
export function getResultEmoji(percentage: number): string {
  if (percentage >= 80) return '🏆';
  if (percentage >= 60) return '⭐';
  if (percentage >= 40) return '👍';
  return '💪';
}
