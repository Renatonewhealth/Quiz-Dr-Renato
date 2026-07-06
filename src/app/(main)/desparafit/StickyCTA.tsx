'use client';

import { useEffect, useState } from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const causaSection = document.getElementById('causa');
    if (!causaSection) return;

    const handleScroll = () => {
      const rect = causaSection.getBoundingClientRect();
      // Aparece quando o bloco 3 (causa) começa a passar pelo topo da tela
      setVisible(rect.top < window.innerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background:
          'linear-gradient(to top, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
      }}
    >
      <a
        href="#kits"
        className="block w-full text-center bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg transition-colors tracking-wide"
      >
        QUERO MEU KIT
      </a>
    </div>
  );
}
