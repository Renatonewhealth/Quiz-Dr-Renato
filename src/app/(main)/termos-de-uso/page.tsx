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

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-2">POLÍTICA DE GARANTIA E REEMBOLSO</h2>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">1. GARANTIA DE SATISFAÇÃO DE 60 DIAS</h3>
          <p>
            O Desparafit oferece garantia de satisfação de 60 (sessenta) dias corridos, contados a partir da data de entrega do produto confirmada pelo código de rastreio.
          </p>
          <p>
            Caso o cliente não esteja satisfeito com os resultados após utilizar o produto corretamente e seguir o protocolo conforme as instruções, poderá solicitar o reembolso integral do valor pago, desde que cumpra <strong>TODOS</strong> os requisitos estabelecidos nesta política.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">2. REQUISITOS OBRIGATÓRIOS PARA SOLICITAÇÃO DE REEMBOLSO</h3>
          <p>Para que a solicitação de reembolso seja aceita e processada, o cliente <strong>DEVE</strong>:</p>

          <h4 className="font-semibold text-gray-900 mt-4">2.1. Prazo Mínimo de Uso</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ter utilizado o produto por no mínimo 30 (trinta) dias corridos antes de solicitar o reembolso.</li>
            <li>A solicitação deve ser feita dentro do prazo de 60 (sessenta) dias a partir da data de entrega.</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-4">2.2. Contato Prévio com Suporte</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Entrar em contato com nossa equipe de atendimento ao cliente <strong>ANTES</strong> de iniciar o processo formal de reembolso.</li>
            <li>O suporte fornecerá o link para o formulário oficial de solicitação de reembolso.</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-4">2.3. Preenchimento Completo do Formulário de Reembolso</h4>
          <p>O cliente deverá preencher todas as etapas do formulário oficial, incluindo:</p>
          <p><strong>a) Dados do Pedido:</strong> Número do pedido, e-mail utilizado na compra, CPF do titular, código de rastreio e data de recebimento.</p>
          <p><strong>b) Comprovação de Recebimento:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Foto de todos os produtos recebidos no pedido</li>
            <li>Comprovante de entrega (print do rastreio mostrando entrega realizada)</li>
          </ul>
          <p><strong>c) Comprovação de Uso:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Foto das embalagens abertas demonstrando utilização do produto</li>
            <li>Selfie do cliente segurando o produto ao lado de dispositivo móvel exibindo a data atual</li>
          </ul>
          <p><strong>d) Questionário de Uso:</strong> Responder detalhadamente às perguntas sobre a forma de utilização do produto, incluindo frequência, dosagem, horários e hábitos durante o protocolo.</p>
          <p><strong>e) Declaração de Veracidade:</strong> Assinalar as declarações confirmando que todas as informações prestadas são verdadeiras e que o produto foi utilizado conforme as instruções por no mínimo 30 dias.</p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">3. ANÁLISE E PROCESSAMENTO</h3>
          <p>3.1. Após o envio completo do formulário com todos os documentos e informações obrigatórias, nossa equipe realizará a análise da solicitação em até 7 (sete) dias úteis.</p>
          <p>3.2. O cliente será notificado por e-mail sobre o resultado da análise.</p>
          <p>3.3. Caso aprovado, o reembolso será processado em até 10 (dez) dias úteis na mesma forma de pagamento utilizada na compra.</p>
          <p>3.4. Solicitações incompletas, com informações inconsistentes ou sem a devida comprovação de uso serão negadas.</p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">4. NÃO É NECESSÁRIA DEVOLUÇÃO DOS PRODUTOS</h3>
          <p>
            O cliente <strong>NÃO</strong> precisa devolver os produtos restantes para solicitar o reembolso. Basta cumprir todos os requisitos descritos no item 2.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">5. SOBRE OS PRODUTOS E EMBALAGENS</h3>
          <p>5.1. As imagens dos produtos exibidas no site e materiais promocionais são meramente ilustrativas.</p>
          <p>5.2. Devido a constantes melhorias na formulação e disponibilidade de embalagens, o cliente poderá receber produtos com embalagens visualmente diferentes das apresentadas no momento da compra.</p>
          <p>5.3. Garantimos que, independentemente da embalagem, a formulação e qualidade do produto serão equivalentes ou superiores ao anunciado.</p>
          <p>5.4. Variações de embalagem <strong>NÃO</strong> constituem motivo válido para solicitação de reembolso, desde que a formulação do produto seja mantida.</p>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">6. SITUAÇÕES QUE INVALIDAM A GARANTIA</h3>
          <p>A garantia <strong>NÃO</strong> será aplicável nos seguintes casos:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Solicitação fora do prazo de 60 dias após a entrega</li>
            <li>Uso do produto por menos de 30 dias</li>
            <li>Não preenchimento completo do formulário de reembolso</li>
            <li>Ausência de comprovação fotográfica obrigatória</li>
            <li>Informações falsas ou inconsistentes</li>
            <li>Não seguimento das instruções de uso do protocolo</li>
            <li>Produtos adquiridos de revendedores não autorizados</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8">7. DISPOSIÇÕES GERAIS</h3>
          <p>7.1. Ao realizar a compra, o cliente declara ter lido e concordado integralmente com esta Política de Garantia e Reembolso.</p>
          <p>7.2. A empresa se reserva o direito de atualizar esta política a qualquer momento, sendo válida a versão vigente no momento da compra.</p>
          <p>7.3. Casos omissos serão analisados individualmente pela equipe responsável.</p>
        </div>
      </div>
    </main>
  );
}
