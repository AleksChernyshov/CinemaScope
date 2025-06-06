import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthModal } from '../auth/AuthModal';
import { UserAvatar } from './UserAvatar';
import { AuthenticatedMenu } from './AuthenticatedMenu';
import { UnauthenticatedMenu } from './UnauthenticatedMenu';
import type { AuthMode } from '../../types/menu.types';

// Styling constants
const STYLES = {
  button: "relative flex rounded-full bg-bg-secondary/95 p-1.5 text-sm transition-all duration-200 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]",
  avatarContainer: "h-9 w-9 flex items-center justify-center",
  menuItems: (theme: 'dark' | 'light', isAuthenticated: boolean) => `
    absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl backdrop-blur-md
    shadow-[0_5px_15px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.4)] 
    ring-1 ring-purple-500/30 dark:ring-purple-500/50 focus:outline-none
    ${theme === 'dark' ? 'bg-neutral-900/95' : 'bg-white/95'}
  `
};

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  const handleClose = () => setAuthMode(null);
  const handleSwitchMode = () => {
    setAuthMode(prevMode => prevMode === 'login' ? 'register' : 'login');
  };
  const handleAuthSuccess = () => setAuthMode(null);

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <Menu.Button className={STYLES.button}>
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className={STYLES.avatarContainer}>
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
          <Menu.Items className={STYLES.menuItems(theme, isAuthenticated)}>
            {isAuthenticated ? (
              <AuthenticatedMenu 
                username={user?.username} 
                onLogout={logout}
              />
            ) : (
              <UnauthenticatedMenu
                onLogin={() => setAuthMode('login')}
                onRegister={() => setAuthMode('register')}
              />
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