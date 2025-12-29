import { QuizAnswer, QuizResult } from '@/types/quiz';

export function calcularResultado(answers: QuizAnswer[]): QuizResult {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const maxScore = answers.length * 5; // Assumindo score máximo de 5 por pergunta
  const percentage = (totalScore / maxScore) * 100;

  // Definir categorias de resultado baseadas no score
  let resultCategory = '';
  let resultMessage = '';

  if (percentage >= 80) {
    resultCategory = 'Excelente';
    resultMessage = 'Seu resultado indica que você está no caminho certo!';
  } else if (percentage >= 60) {
    resultCategory = 'Bom';
    resultMessage = 'Você está bem, mas há espaço para melhorias.';
  } else if (percentage >= 40) {
    resultCategory = 'Regular';
    resultMessage = 'É importante buscar orientação profissional.';
  } else {
    resultCategory = 'Atenção Necessária';
    resultMessage = 'Recomendamos fortemente uma consulta médica.';
  }

  return {
    totalScore,
    maxScore,
    percentage,
    resultCategory,
    resultMessage,
  };
}

