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
        className="w-full h-12 px-4 bg-bg-secondary/95 border border-purple-500/30 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                 transition-all duration-200 text-text-primary placeholder-text-secondary
                 shadow-[0_0_10px_rgba(147,51,234,0.1)] focus:shadow-[0_0_15px_rgba(147,51,234,0.2)]
                 font-bebas-neue text-xl tracking-wider leading-none flex items-center"
        placeholder={placeholder}
        required
      />
    </div>
  );
} 