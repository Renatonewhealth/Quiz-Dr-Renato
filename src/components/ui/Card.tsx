import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`
        bg-[#16162a] rounded-2xl p-6
        border border-[rgba(102,126,234,0.1)]
        ${hover ? `
          transition-all duration-300
          hover:border-[rgba(102,126,234,0.3)]
          hover:-translate-y-0.5
          hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        ` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
