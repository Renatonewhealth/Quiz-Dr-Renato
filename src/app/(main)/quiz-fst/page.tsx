import QuizFstLanding from '@/components/quiz-fst/QuizFstLanding';

/**
 * Entry do experimento. Com o experimento ATIVO, o middleware reescreve
 * `/quiz-fst` → `/quiz-fst/tN` e esta página não chega a renderizar.
 * Se o experimento estiver desativado, serve a Tela 1 (controle) como
 * fallback pra URL nunca quebrar.
 */
export default function QuizFstEntryPage() {
  return <QuizFstLanding tela="t1" />;
}
