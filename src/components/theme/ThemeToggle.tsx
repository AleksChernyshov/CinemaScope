import { Switch } from '@headlessui/react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeKnob } from './ThemeKnob';

// Styling constants
const STYLES = {
  switch: `
    group relative inline-flex h-7 w-12 shrink-0 cursor-pointer 
    rounded-full border-2 border-purple-500/50 bg-purple-900/40 
    transition-all duration-200 ease-in-out 
    shadow-[0_0_10px_rgba(147,51,234,0.4)] 
    hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] 
    hover:border-purple-500/70
  `
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={STYLES.switch}
    >
      <span className="sr-only">Toggle theme</span>
      <ThemeKnob isDark={isDark} />
    </Switch>
  );
} 