import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Dr. Renato Silveira',
};

export default function PoliticaDePrivacidade() {
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
          Política de Privacidade
        </h1>

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
          <p>
            <strong>Última atualização:</strong> Março de 2026
          </p>

          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações fornecidas por você ao utilizar o Quiz do Dr. Renato Silveira Reis.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">1. Dados Coletados</h2>
          <p>Ao utilizar nosso quiz e preencher o formulário de contato, podemos coletar:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome completo</li>
            <li>Número de WhatsApp</li>
            <li>Endereço de e-mail (opcional)</li>
            <li>Respostas fornecidas no quiz</li>
            <li>Dados de navegação (endereço IP, navegador, dispositivo)</li>
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">2. Finalidade do Uso dos Dados</h2>
          <p>Os dados coletados são utilizados para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enviar o resultado do quiz via WhatsApp</li>
            <li>Entrar em contato com informações relevantes sobre saúde</li>
            <li>Melhorar a experiência do usuário no site</li>
            <li>Análises internas e estatísticas de uso</li>
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">3. Cookies e Tecnologias de Rastreamento</h2>
          <p>Utilizamos as seguintes tecnologias de rastreamento:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Meta Pixel (Facebook):</strong> Para medir a efetividade de anúncios e criar públicos personalizados.</li>
            <li><strong>Utmify:</strong> Para rastreamento de campanhas e atribuição de conversões.</li>
            <li><strong>Cookies essenciais:</strong> Para o funcionamento básico do site.</li>
          </ul>
          <p>Você pode desativar cookies nas configurações do seu navegador, embora isso possa afetar a funcionalidade do site.</p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos seus dados pessoais. Seus dados podem ser compartilhados com plataformas de envio de mensagens (WhatsApp Business API) exclusivamente para entrega dos resultados do quiz e comunicações autorizadas.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">5. Seus Direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar a correção de dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">6. Segurança dos Dados</h2>
          <p>
            Adotamos medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acessos não autorizados, perda ou destruição.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">7. Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail: <strong>contato@drrenatosilveira.com.br</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
