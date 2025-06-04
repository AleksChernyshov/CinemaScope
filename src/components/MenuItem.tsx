import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import type { MenuItemProps } from '../types/menu.types';

// Styling constants
const STYLES = {
  base: "block w-full text-left px-4 py-2 transition-colors duration-200 nav-text",
  state: (active: boolean) => 
    active
      ? 'bg-purple-500/10 text-purple-500'
      : 'text-text-secondary hover:bg-purple-500/10 hover:text-purple-500'
};

export function MenuItem({ onClick, to, children }: MenuItemProps) {
  if (to) {
    return (
      <Menu.Item>
        {({ active }) => (
          <Link to={to} className={`${STYLES.base} ${STYLES.state(active)}`}>
            {children}
          </Link>
        )}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <button onClick={onClick} className={`${STYLES.base} ${STYLES.state(active)}`}>
          {children}
        </button>
      )}
    </Menu.Item>
  );
} 