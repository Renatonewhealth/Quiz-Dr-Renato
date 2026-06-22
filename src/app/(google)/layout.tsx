import Script from "next/script";

export default function GoogleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Google Pixel - Utmify Google */}
      <Script id="google-pixel" strategy="afterInteractive">
        {`
          window.googlePixelId = "6a39b857fc3cc9df2d50b34d";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel-google.js");
          document.head.appendChild(a);
        `}
      </Script>
      {children}
    </>
  );
}
