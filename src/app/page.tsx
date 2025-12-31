'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  // Data atual formatada
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header Editorial - Estilo Portal de Notícias */}
      <header className="sticky top-0 z-50 bg-[#667eea] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Esquerda - Seção */}
            <div className="flex items-center">
              <span className="text-sm sm:text-base font-bold tracking-widest uppercase">
                SAÚDE
              </span>
            </div>

            {/* Direita - Buscar */}
            <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium hidden sm:inline">BUSCAR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal - Layout Editorial */}
      <div className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Título Principal - Estilo Notícia */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-4 sm:mb-6 font-serif">
            8 em Cada 10 Mulheres Acima de 35 Têm Parasitas e Vermes Intestinais, E Isso Está IMPEDINDO o Emagrecimento Delas
          </h1>

          {/* Lead/Subtítulo */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8 font-normal">
            Será que você é uma delas? Responda 6 perguntas rápidas e descubra agora se parasitas invisíveis estão sabotando seu metabolismo.
          </p>

          {/* Byline - Autor e Data */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-500 mb-8 sm:mb-10 pb-6 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Por Dr. Renato Silveira Reis</span>
            <span className="hidden sm:inline">—</span>
            <span>Especialista em Nutriendocrinologia</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-gray-400">{currentDate} {currentTime}</span>
          </div>

          {/* Imagem do Dr. Renato */}
          <div className="mb-8 sm:mb-10">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/images/dr-renato.png"
                alt="Dr. Renato Silveira Reis - Especialista em nutriendocrinologia"
                width={1080}
                height={1380}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-3 italic">
              Dr. Renato Silveira Reis, especialista em nutriendocrinologia, medicina naturalista e farmacêutico — mais de 11 milhões de seguidores nas redes sociais.
            </p>
          </div>

          {/* Corpo do Artigo */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Uma descoberta científica recente está deixando especialistas em alerta: <strong>a maioria das mulheres acima de 35 anos pode estar abrigando parasitas intestinais</strong> sem saber — e isso pode ser o verdadeiro motivo pelo qual não conseguem emagrecer.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Esses invasores silenciosos se alimentam dos nutrientes do seu corpo, causam inflamação crônica, desregulam seus hormônios e <strong>travam completamente o seu metabolismo</strong>.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
              Desenvolvemos uma <strong>auto-análise gratuita</strong> que leva menos de 90 segundos para identificar se você apresenta os sinais típicos de infestação parasitária. O resultado pode mudar tudo o que você sabe sobre sua saúde.
            </p>
          </div>

          {/* CTA Box - Estilo Editorial */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-[#667eea] rounded-r-lg p-6 sm:p-8 mb-10">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              🔬 Faça sua Auto-Análise Gratuita
            </h2>
            <p className="text-gray-600 mb-6">
              Responda 6 perguntas rápidas e descubra sua probabilidade real de ter parasitas intestinais sabotando seu emagrecimento.
            </p>
            
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-8 py-4 bg-[#667eea] hover:bg-[#5a6fd6] text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              INICIAR AUTO-ANÁLISE GRATUITA
            </button>
          </div>

          {/* Tags / Categorias */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">Saúde Intestinal</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">Emagrecimento</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">Parasitas</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">Metabolismo</span>
          </div>

        </article>
      </div>

      {/* Footer Minimalista */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Dr. Renato Silveira Reis. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
