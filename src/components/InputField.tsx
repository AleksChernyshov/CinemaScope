import type { InputFieldProps } from '../types/auth.types';
import { useTranslation } from 'react-i18next';

// Reusable input field component with consistent styling
export function InputField({ 
  id, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder 
}: InputFieldProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-lg font-bebas-neue mb-2 text-text-secondary tracking-wider leading-none"
      >
        {t(label)}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full h-12 px-4 rounded-lg border-0 
                 text-text-primary bg-bg-primary text-xl tracking-wider
                 font-bebas-neue leading-none
                 shadow-sm ring-1 ring-inset ring-purple-500/30 
                 transition-all duration-200 outline-none
                 placeholder:text-text-secondary 
                 focus:ring-2 focus:ring-inset focus:ring-purple-500 
                 focus:shadow-[0_0_10px_rgba(147,51,234,0.3)]"
        placeholder={placeholder}
        required
      />
    </div>
  );
} 