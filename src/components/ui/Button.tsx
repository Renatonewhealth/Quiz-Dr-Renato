import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  icon?: ReactNode;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  loading = false,
  icon,
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = `
    w-full py-4 px-8 rounded-xl font-semibold 
    transition-all duration-300 
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white
      hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-transparent border-2 border-[rgba(102,126,234,0.5)] text-white
      hover:bg-[rgba(102,126,234,0.1)] hover:border-[rgba(102,126,234,0.8)]
    `
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Carregando...
        </>
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}
