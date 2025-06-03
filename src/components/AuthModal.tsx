import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, mode, onSwitchMode, onSuccess }: AuthModalProps) {
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl">
                <AuthForm mode={mode} onSuccess={onSuccess} />
                <p className="text-center mt-6 text-white font-bebas-neue text-lg tracking-wider">
                  {mode === 'login' ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
                  <button 
                    onClick={onSwitchMode}
                    className="text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    {mode === 'login' ? t('auth.registerLink') : t('auth.loginLink')}
                  </button>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 