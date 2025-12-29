import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} className={className} {...props} />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

