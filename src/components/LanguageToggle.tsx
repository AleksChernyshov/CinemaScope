import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { SUPPORTED_LANGUAGES } from '../config/languages';
import { LanguageItem } from './LanguageItem';

// Styling constants
const STYLES = {
  button: "relative flex items-center justify-center rounded-full bg-bg-secondary/95 px-3 py-2 text-sm transition-all duration-200 hover:bg-purple-500/20 border-2 border-purple-500/50 hover:border-purple-500/70 shadow-[0_0_10px_rgba(147,51,234,0.4)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]",
  menu: {
    light: "bg-zinc-50/95",
    dark: "bg-neutral-900/95",
    base: "absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-xl backdrop-blur-md py-2 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.4)] ring-1 ring-purple-500/30 dark:ring-purple-500/50 focus:outline-none"
  }
};

// Animation constants
const TRANSITION_PROPS = {
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95"
};

// Language selector component with dropdown menu
export function LanguageToggle() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className={STYLES.button}>
        <span className="nav-text leading-none">{currentLanguage.name}</span>
      </Menu.Button>
      
      <Transition as={Fragment} {...TRANSITION_PROPS}>
        <Menu.Items className={`${STYLES.menu.base} ${
          theme === 'dark' ? STYLES.menu.dark : STYLES.menu.light
        }`}>
          {SUPPORTED_LANGUAGES.map((language) => (
            <LanguageItem
              key={language.code}
              language={language}
              active={language.code === i18n.language}
              onSelect={(code) => i18n.changeLanguage(code)}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 