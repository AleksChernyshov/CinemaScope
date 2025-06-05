import { useTranslation } from 'react-i18next';
import type { AuthenticatedMenuProps } from '../../types/menu.types';
import { MenuItem } from '../ui/MenuItem';

// Styling constants
const STYLES = {
  username: "px-4 py-2 border-b border-purple-500/30 dark:border-purple-500/50"
};

export function AuthenticatedMenu({ username, onLogout }: AuthenticatedMenuProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={STYLES.username}>{username}</div>
      <MenuItem to="/profile">{t('userMenu.profile')}</MenuItem>
      <MenuItem to="/favorites">{t('navigation.favorites')}</MenuItem>
      <MenuItem onClick={onLogout}>{t('auth.logout')}</MenuItem>
    </>
  );
} 