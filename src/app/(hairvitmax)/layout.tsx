import Script from "next/script";

export default function HairvitmaxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Utmify Pixel - Funil HairVitMax */}
      <Script id="utmify-pixel-hairvitmax" strategy="afterInteractive">
        {`
          window.pixelId = "6a0a0f5a31c6ebe5d18a2905";
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
