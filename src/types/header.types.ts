import type { ComponentProps } from 'react';
import type { Disclosure } from '@headlessui/react';

export interface MenuButtonProps {
  open: boolean;
}

export type MobileNavigationProps = {
  mobile?: boolean;
  as?: typeof Disclosure.Button;
} 