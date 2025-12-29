export interface QuizOption {
  id: string;
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  score: number;
}

export interface QuizResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  resultCategory: string;
  resultMessage: string;
}

