import Script from "next/script";

export default function DiaDasMaesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Utmify Pixel - Campanha Dia das Mães */}
      <Script id="utmify-pixel-dia-das-maes" strategy="afterInteractive">
        {`
          window.pixelId = "69f4e73a5e7607ea96e07db2";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
      </Script>
      {children}
    </>
  );
}
