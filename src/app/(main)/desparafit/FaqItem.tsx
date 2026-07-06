'use client';

import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-[17px] sm:text-base font-semibold text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-[#14532d] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <div className="text-[17px] sm:text-base text-gray-700 leading-relaxed">{answer}</div>
        </div>
      )}
    </div>
  );
}
