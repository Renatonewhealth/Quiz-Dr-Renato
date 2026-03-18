import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso - Dr. Renato Silveira',
};

export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-[#dc2626] h-[56px] sm:h-[64px] flex items-center justify-center px-4 sm:px-6 sticky top-0 z-50 shadow-md">
        <span className="text-white text-xl sm:text-2xl font-black tracking-wide uppercase">
          SAÚDE
        </span>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <Link href="/" className="text-[#dc2626] text-sm font-medium hover:underline mb-6 inline-block">
          ← Voltar à página inicial
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Termos de Uso
        </h1>

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
          <p>
            <strong>Última atualização:</strong> Março de 2026
          </p>

          <p>
            Ao acessar e utilizar este site, você concorda com os termos e condições descritos abaixo. Caso não concorde, solicitamos que não utilize o site.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">1. Natureza do Conteúdo</h2>
          <p>
            O conteúdo apresentado neste site, incluindo o quiz e seus resultados, possui caráter exclusivamente educacional e informativo. As informações não substituem consultas médicas, diagnósticos ou tratamentos profissionais. Consulte sempre um profissional de saúde qualificado para orientações específicas sobre sua condição.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">2. Uso do Quiz</h2>
          <p>
            O quiz é uma ferramenta de auto-avaliação com finalidade educativa. Os resultados são baseados nas respostas fornecidas pelo usuário e não constituem diagnóstico médico. Nenhum resultado deve ser interpretado como confirmação de qualquer condição de saúde.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo deste site, incluindo textos, imagens, logotipos, design e código, é protegido por direitos autorais e pertence ao Dr. Renato Silveira Reis ou seus licenciadores. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">4. Limitação de Responsabilidade</h2>
          <p>
            Não nos responsabilizamos por decisões tomadas com base nas informações fornecidas pelo quiz ou pelo site. Os resultados podem variar de acordo com fatores individuais. O uso das informações é de inteira responsabilidade do usuário.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">5. Links para Terceiros</h2>
          <p>
            Este site pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas de sites externos.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">6. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, sem aviso prévio. O uso continuado do site após alterações constitui aceitação dos novos termos.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">7. Contato</h2>
          <p>
            Para dúvidas sobre estes termos, entre em contato pelo e-mail: <strong>contato@drrenatosilveira.com.br</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
