import UtmifyPixelGlobal from "@/components/UtmifyPixelGlobal";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Pixel padrão da Utmify. O componente se omite nas rotas que carregam
          o próprio pixel, para os dois não brigarem pela mesma global. */}
      <UtmifyPixelGlobal />
      {children}
    </>
  );
}
