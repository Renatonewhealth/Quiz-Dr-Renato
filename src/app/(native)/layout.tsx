import Script from "next/script";

export default function NativeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Taboola Pixel */}
      <Script id="taboola-pixel" strategy="afterInteractive">
        {`
          window._tfa = window._tfa || [];
          window._tfa.push({notify: 'event', name: 'page_view', id: 1895117});
          !function (t, f, a, x) {
            if (!document.getElementById(x)) {
              t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
            }
          }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/unip/1895117/tfa.js',
          'tb_tfa_script');
        `}
      </Script>
      {/* Utmify Taboola Pixel */}
      <Script id="utmify-taboola-pixel" strategy="afterInteractive">
        {`
          window.taboolaPixelId = "6a3d87128cb002620c4f1417";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel-taboola.js");
          document.head.appendChild(a);
        `}
      </Script>
      {children}
    </>
  );
}
