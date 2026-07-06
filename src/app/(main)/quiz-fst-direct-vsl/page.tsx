import QuizFstVsl from '@/components/quiz-fst/QuizFstVsl';

/**
 * VSL da variante "sem tela" do teste. Mesmo vídeo 2 (a vencedora), mas com
 * src próprio (`quiz-fst-direct`) pra a venda ser atribuída a essa variante
 * na Payt/UTMify, separada da variante "com tela" (src `quiz-fst-2`).
 */
export default function QuizFstDirectVslPage() {
  return <QuizFstVsl page={2} srcOverride="quiz-fst-direct" />;
}
