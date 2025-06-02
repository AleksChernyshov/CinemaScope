import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative flex items-center rounded-full bg-bg-secondary/95 px-3 pt-2 pb-1.5 text-sm transition-all duration-200 hover:bg-purple-500/20 border-2 border-purple-500/50 hover:border-purple-500/70 shadow-[0_0_10px_rgba(147,51,234,0.4)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]">
        <span className="nav-text">{currentLanguage.name}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-xl backdrop-blur-md py-2 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.4)] ring-1 ring-purple-500/30 dark:ring-purple-500/50 focus:outline-none ${
          theme === 'dark' ? 'bg-neutral-900/95' : 'bg-zinc-50/95'
        }`}>
          {languages.map((language) => (
            <Menu.Item key={language.code}>
              {({ active }) => (
                <button
                  onClick={() => i18n.changeLanguage(language.code)}
                  className={`block w-full px-4 pt-2 pb-1.5 text-left transition-colors duration-200 nav-text ${
                    active
                      ? 'bg-purple-500/10 text-purple-500'
                      : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                  }`}
                >
                  {language.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 