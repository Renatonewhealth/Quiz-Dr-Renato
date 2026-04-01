'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResultadoBaixoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-quiz min-h-screen flex flex-col justify-center py-12 px-4">
        {/* Header */}
        <div className="text-center animate-fadeInUp">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center">
            <span className="text-5xl sm:text-6xl">🎉</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
            <span className="text-[#10b981]">Ótimas Notícias!</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Você Tem Baixas Chances de Ter Parasitas Intestinais
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto text-center animate-fadeInUp delay-100">
          <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
            Com base nas suas respostas, seus hábitos e sintomas indicam que você provavelmente 
            <strong className="text-[#10b981]"> não possui infestação parasitária</strong>. 
            Seu corpo parece estar funcionando bem!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ✅ O que isso significa:
            </h3>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-1">•</span>
                <span>Seu metabolismo está funcionando de forma saudável</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-1">•</span>
                <span>Seus níveis de energia estão adequados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-1">•</span>
                <span>Seu sistema digestivo parece estar equilibrado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-1">•</span>
                <span>Sua imunidade está protegendo seu corpo</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              💡 Dica do Dr. Renato:
            </h3>
            <p className="text-gray-700">
              Continue mantendo seus bons hábitos! Uma alimentação equilibrada, sono de qualidade 
              e exercícios regulares são fundamentais para manter os parasitas longe.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fadeInUp delay-200">
          <Link
            href="/"
            className="inline-block py-4 px-8 rounded-xl font-bold text-white text-lg
              bg-gradient-to-r from-[#667eea] to-[#764ba2]
              hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)]
              hover:-translate-y-1
              active:translate-y-0
              transition-all duration-300"
          >
            Voltar ao Início
          </Link>
        </div>

        {/* Footer com Dr. Renato */}
        <div className="mt-12 text-center animate-fadeInUp delay-300">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#667eea]">
              <Image
                src="/images/dr-renato.png"
                alt="Dr. Renato Silveira Reis"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Dr. Renato Silveira Reis</p>
              <p className="text-sm text-gray-600">Especialista em Nutriendocrinologia</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



