import type { Language } from '../config/languages';

export interface LanguageItemProps {
  language: Language;
  active: boolean;
  onSelect: (code: string) => void;
} 