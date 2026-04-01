'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultadoPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar nome do sessionStorage
    const storedName = sessionStorage.getItem('userName');
    
    if (storedName) {
      setUserName(storedName);
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container-quiz min-h-screen flex flex-col justify-center py-12 px-4">
        {/* WhatsApp Icon com animação */}
        <div className="text-center animate-fadeInUp">
          <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center animate-pulse shadow-2xl">
            <svg 
              className="w-16 h-16 sm:w-20 sm:h-20 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {userName ? (
              <>
                Pronto, <span className="text-[#25D366]">{userName}</span>!
              </>
            ) : (
              <>
                <span className="text-[#25D366]">Análise Enviada!</span>
              </>
            )}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
            Sua <strong className="text-gray-900">análise completa de risco parasitário</strong> foi enviada para seu <strong className="text-[#25D366]">WhatsApp</strong>!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 mb-8 max-w-xl mx-auto border border-green-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl sm:text-4xl animate-bounce">📱</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Verifique seu WhatsApp agora!
              </h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg">
              Você receberá em breve uma mensagem com sua análise personalizada e as próximas orientações do <strong>Dr. Renato</strong>.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5 mb-8 max-w-xl mx-auto border border-yellow-200">
            <p className="text-gray-700 text-sm sm:text-base">
              <strong className="text-yellow-800">⚠️ Importante:</strong> Se não receber em até 2 minutos, verifique se o número de WhatsApp informado está correto.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeInUp delay-200">
          <Link
            href="/"
            className="inline-block py-4 px-8 rounded-xl font-bold text-white text-base sm:text-lg
              bg-gradient-to-r from-[#667eea] to-[#764ba2]
              hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)]
              hover:-translate-y-1
              active:translate-y-0
              transition-all duration-300"
          >
            Voltar ao Início
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center pt-12 animate-fadeInUp delay-300">
          <p className="text-gray-500 text-sm">
            Obrigado por confiar no Dr. Renato Silveira Reis! 💜
          </p>
        </footer>
      </div>
    </main>
  );
}
