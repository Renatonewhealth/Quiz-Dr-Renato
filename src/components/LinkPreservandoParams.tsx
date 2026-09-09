'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Link interno que carrega a query string atual para a próxima página.
 *
 * POR QUE ISSO EXISTE: o one-click da Payt depende do identificador do pedido,
 * que chega na URL da página de upsell (ex.: /koreanup1?_o=ABC123). O script
 * multiple-oneclickbuyscript lê esse parâmetro e o guarda em cookie — mas se a
 * pessoa recusa o upsell e vai para o downsell por um <a href="/koreandwns1">
 * sem parâmetro, a página seguinte carrega "limpa". Quando o cookie não pegou
 * (script bloqueado, timing, navegador restritivo), o botão do downsell falha
 * com "parametro _o inexistente na url" e a venda se perde em silêncio.
 *
 * Aqui a query string inteira é repassada, então o downsell recebe o mesmo
 * contexto do upsell e o one-click continua funcionando.
 *
 * Usa <a> normal (não next/link) de propósito: queremos navegação real, para o
 * script da Payt reinicializar do zero na página de destino.
 */
export default function LinkPreservandoParams({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const [destino, setDestino] = useState(href);

  useEffect(() => {
    try {
      const atual = window.location.search; // inclui o "?"
      if (!atual || atual.length < 2) return;
      const separador = href.includes('?') ? '&' : '?';
      setDestino(href + separador + atual.slice(1));
    } catch {
      /* mantém o href original */
    }
  }, [href]);

  return (
    <a href={destino} className={className}>
      {children}
    </a>
  );
}
