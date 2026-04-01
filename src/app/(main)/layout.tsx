import Script from "next/script";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Utmify Pixel - Páginas principais */}
      <Script id="utmify-pixel" strategy="afterInteractive">
        {`
          window.pixelId = "69badc4635d947be06ab5e3c";
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
