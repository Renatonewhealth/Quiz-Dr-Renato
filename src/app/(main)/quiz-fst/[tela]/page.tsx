import { notFound } from 'next/navigation';
import QuizFstLanding from '@/components/quiz-fst/QuizFstLanding';
import { TELA_KEYS, type TelaKey } from '@/components/quiz-fst/telas';

/**
 * Alvo dos rewrites do middleware: `/quiz-fst` → `/quiz-fst/tN`.
 * (Também acessível direto pra QA, ex.: /quiz-fst/t2.)
 */
export function generateStaticParams() {
  return TELA_KEYS.map((tela) => ({ tela }));
}

export default async function QuizFstTelaPage({
  params,
}: {
  params: Promise<{ tela: string }>;
}) {
  const { tela } = await params;
  if (!TELA_KEYS.includes(tela as TelaKey)) notFound();
  return <QuizFstLanding tela={tela as TelaKey} />;
}
