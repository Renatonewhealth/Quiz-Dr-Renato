import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#a0a0b8] mb-2">
            {label}
          </label>
        )}
        <input 
          ref={ref} 
          className={`
            w-full py-4 px-5 rounded-xl
            border-2 border-[rgba(102,126,234,0.2)]
            bg-[#1a1a2e] text-white
            placeholder:text-[#6b6b80]
            focus:outline-none focus:border-[#667eea]
            focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)]
            transition-all duration-200
            ${error ? 'border-[#f5576c]' : ''}
            ${className}
          `} 
          {...props} 
        />
        {error && (
          <p className="text-[#f5576c] text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
