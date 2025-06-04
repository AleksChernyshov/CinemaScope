import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AuthModal } from './AuthModal';
import { UserAvatar } from './UserAvatar';

export function UserMenu() {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  const handleClose = () => setAuthMode(null);
  
  const handleSwitchMode = () => {
    setAuthMode(prevMode => prevMode === 'login' ? 'register' : 'login');
  };

  const handleAuthSuccess = () => {
    setAuthMode(null);
  };

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <Menu.Button className="relative flex rounded-full bg-bg-secondary/95 p-1.5 text-sm transition-all duration-200 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className="h-9 w-9 flex items-center justify-center">
            <UserAvatar size="sm" className="w-full h-full" avatarUrl={user?.avatar} />
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
          <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl backdrop-blur-md ${!isAuthenticated && 'py-2'} shadow-[0_5px_15px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.4)] ring-1 ring-purple-500/30 dark:ring-purple-500/50 focus:outline-none ${
            theme === 'dark' ? 'bg-neutral-900/95' : 'bg-zinc-50/95'
          }`}>
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 border-b border-purple-500/30 dark:border-purple-500/50">
                  {user?.username}
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 mt-2 transition-colors duration-200 nav-text ${
                        active
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                      }`}
                    >
                      {t('userMenu.profile')}
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/favorites"
                      className={`block px-4 py-2 transition-colors duration-200 nav-text ${
                        active
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                      }`}
                    >
                      {t('navigation.favorites')}
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 mb-2 transition-colors duration-200 nav-text ${
                        active
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                      }`}
                    >
                      {t('auth.logout')}
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setAuthMode('login')}
                      className={`block w-full text-left px-4 py-2 transition-colors duration-200 nav-text ${
                        active
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                      }`}
                    >
                      {t('auth.login')}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setAuthMode('register')}
                      className={`block w-full text-left px-4 py-2 transition-colors duration-200 nav-text ${
                        active
                          ? 'bg-purple-500/10 text-purple-500'
                          : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
                      }`}
                    >
                      {t('auth.register')}
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      <AuthModal
        isOpen={authMode !== null}
        onClose={handleClose}
        mode={authMode || 'login'}
        onSwitchMode={handleSwitchMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
} 