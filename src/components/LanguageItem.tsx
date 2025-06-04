import { Menu } from '@headlessui/react';
import { classNames } from '../utils/classNames';
import type { LanguageItemProps } from '../types/language.types';

// Styling constants
const ITEM_STYLES = {
  base: "block w-full px-4 pt-2 pb-1.5 text-left transition-colors duration-200 nav-text",
  active: "bg-purple-500/10 text-purple-500",
  inactive: "text-text-secondary hover:bg-purple-500/10 hover:text-purple-500"
};

// Component for individual language menu items
export function LanguageItem({ language, active, onSelect }: LanguageItemProps) {
  return (
    <Menu.Item>
      {({ active: isActive }) => (
        <button
          onClick={() => onSelect(language.code)}
          className={classNames(
            ITEM_STYLES.base,
            isActive ? ITEM_STYLES.active : ITEM_STYLES.inactive
          )}
        >
          {language.name}
        </button>
      )}
    </Menu.Item>
  );
} 