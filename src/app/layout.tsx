/**
 * 📱 LAYOUT PRINCIPAL - MOBILE-FIRST
 * 
 * Este projeto é desenvolvido com abordagem MOBILE-FIRST:
 * - Viewport configurado para dispositivos móveis
 * - userScalable: false previne zoom acidental
 * - themeColor define a cor da barra de status no mobile
 * - Fonte Inter otimizada para leitura em telas pequenas
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quiz - Dr. Renato Silveira",
  description: "Descubra seu perfil de saúde com nosso quiz interativo. Responda algumas perguntas e receba um diagnóstico personalizado.",
  keywords: ["quiz", "saúde", "dr renato silveira", "diagnóstico", "médico"],
  authors: [{ name: "Dr. Renato Silveira" }],
  robots: "index, follow",
  // Configurações para compartilhamento em redes sociais
  openGraph: {
    title: "Quiz - Dr. Renato Silveira",
    description: "Descubra seu perfil de saúde com nosso quiz interativo.",
    type: "website",
    locale: "pt_BR",
  },
  // Configurações para iOS (adicionar à tela inicial)
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quiz Dr. Renato",
  },
  // Formato mobile-friendly
  formatDetection: {
    telephone: true,
    email: true,
  },
};

/**
 * 📱 VIEWPORT MOBILE-FIRST
 * 
 * Configurações essenciais para experiência mobile:
 * - width: device-width → adapta à largura do dispositivo
 * - initialScale: 1 → sem zoom inicial
 * - maximumScale: 1 → previne zoom em inputs
 * - userScalable: false → previne zoom por pinch (UX melhor em quiz)
 * - viewportFit: cover → suporta notch do iPhone
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f0f1a",
  viewportFit: "cover", // Suporte a iPhone com notch
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      {/* 
        📱 BODY MOBILE-FIRST:
        - min-h-screen: garante altura mínima em mobile
        - bg-[#0f0f1a]: dark mode para economia de bateria (OLED)
        - text-white: contraste otimizado para leitura
        - antialiased: suavização de fontes melhor no mobile
      */}
      <body className="antialiased min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
