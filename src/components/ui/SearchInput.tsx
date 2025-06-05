import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { SearchInputProps } from '../../types/search.types';

// Styling constants
const STYLES = {
  container: "relative",
  icon: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary",
  input: `w-full pl-10 pr-4 py-3 bg-bg-secondary border border-bg-secondary/50 
          dark:bg-bg-primary dark:border-purple-500/20
          rounded-full text-text-primary placeholder:text-text-secondary 
          outline-none focus:ring-2 focus:border-purple-500/50
          focus:ring-purple-500/20 transition-all shadow-sm`
};

// Search input component with icon
export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className={STYLES.container}>
      <MagnifyingGlassIcon className={STYLES.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={STYLES.input}
      />
    </div>
  );
} 