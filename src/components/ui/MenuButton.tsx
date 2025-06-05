import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import type { MenuButtonProps } from '../../types/header.types';

// Mobile menu button component
export function MenuButton({ open }: MenuButtonProps) {
  return (
    <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-bg-secondary hover:text-text-accent">
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open menu</span>
      {open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
} 