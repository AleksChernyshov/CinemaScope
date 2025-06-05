import type { ThemeKnobProps } from '../../types/theme.types';
import { ThemeIcons } from './ThemeIcons';

// Styling constants
const STYLES = {
  knob: (isDark: boolean) => `
    pointer-events-none relative inline-block size-6 
    transform rounded-full bg-purple-500/50 shadow-lg ring-0 
    transition-all duration-200 ease-in-out 
    group-hover:bg-purple-500/70
    ${isDark ? 'translate-x-5' : 'translate-x-0'}
  `
};

// Component for the sliding knob in theme toggle
export function ThemeKnob({ isDark }: ThemeKnobProps) {
  return (
    <span className={STYLES.knob(isDark)}>
      <ThemeIcons theme={isDark ? 'dark' : 'light'} isDark={isDark} />
    </span>
  );
} 