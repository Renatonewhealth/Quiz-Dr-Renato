import VslLeadTestLanding from '@/components/vsl-lead-test/VslLeadTestLanding';

/**
 * Entrada do teste de VSL (4 vídeos de lead, split pelo próprio vturb).
 *
 * Serve a Tela 2 — vencedora do teste `/quiz-fst` (100% do tráfego desde
 * 2026-07-12) — fixa, sem passar pelo split do middleware: o vídeo pós-quiz é
 * a única variável deste teste.
 *
 * Origem própria (`quiz_source = vsl-lead-test`) pra o quiz rotear pra
 * /vsl-lead-test-vsl (ver `destForSource` em /detectordeinvasores) e pra este
 * tráfego não se misturar com o `quiz-fst:t2` → /resultado4, que segue intacto.
 */
export default function VslLeadTestPage() {
  return <VslLeadTestLanding />;
}
