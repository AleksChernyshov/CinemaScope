import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { AuthModalProps } from '../types/auth.types';
import { AuthForm } from './AuthForm';
import { AuthSwitch } from './AuthSwitch';

// Animation constants
const FADE_ANIMATION = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0"
};

const SCALE_ANIMATION = {
  ...FADE_ANIMATION,
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95"
};

// Main modal component for authentication
export function AuthModal({ isOpen, onClose, mode, onSwitchMode, onSuccess }: AuthModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop with blur effect */}
        <Transition.Child
          as={Fragment}
          {...FADE_ANIMATION}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
        </Transition.Child>

        {/* Modal content container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              {...SCALE_ANIMATION}
            >
              <Dialog.Panel className="w-full max-w-2xl">
                <AuthForm mode={mode} onSuccess={onSuccess} />
                <AuthSwitch mode={mode} onSwitchMode={onSwitchMode} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 