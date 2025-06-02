import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { name: 'userMenu.profile', href: '#' },
  { name: 'userMenu.settings', href: '#' },
  { name: 'userMenu.signOut', href: '#' },
];

export function UserMenu() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="relative flex rounded-full bg-bg-secondary/95 p-1.5 text-sm transition-all duration-200 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <div className="h-9 w-9 rounded-full flex items-center justify-center text-purple-500">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
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
        <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl backdrop-blur-md py-2 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.4)] ring-1 ring-purple-500/30 dark:ring-purple-500/50 focus:outline-none ${
          theme === 'dark' ? 'bg-neutral-900/95' : 'bg-zinc-50/95'
        }`}>
          {menuItems.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={`block px-4 py-2 transition-colors duration-200 nav-text ${
                    active
                      ? 'bg-purple-500/10 text-purple-500'
                      : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                  }`}
                >
                  {t(item.name)}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 