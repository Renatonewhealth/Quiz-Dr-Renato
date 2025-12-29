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
  openGraph: {
    title: "Quiz - Dr. Renato Silveira",
    description: "Descubra seu perfil de saúde com nosso quiz interativo.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[#0f0f1a] text-white">
        {children}
      </body>
    </html>
  );
}
