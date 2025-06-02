import { Switch } from '@headlessui/react';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      className="group relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-purple-500/50 bg-purple-900/40 transition-all duration-200 ease-in-out shadow-[0_0_10px_rgba(147,51,234,0.4)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:border-purple-500/70"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`pointer-events-none relative inline-block size-6 transform rounded-full bg-purple-500/50 shadow-lg ring-0 transition-all duration-200 ease-in-out group-hover:bg-purple-500/70 ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src={moonIcon}
            alt="Dark mode"
            className={`absolute size-4 transition-opacity duration-200 ${
              theme === 'dark' 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
          />
          <img
            src={sunIcon}
            alt="Light mode"
            className={`absolute size-4 transition-opacity duration-200 ${
              theme === 'dark' 
                ? 'opacity-0' 
                : 'opacity-100'
            }`}
          />
        </span>
      </span>
    </Switch>
  );
} 