import { useTranslation } from 'react-i18next';
import type { AuthenticatedMenuProps } from '../../types/menu.types';
import { MenuItem } from '../ui/MenuItem';

// Styling constants
const STYLES = {
  username: "px-4 py-2 border-b border-purple-500/30 dark:border-purple-500/50",
  menuItems: "py-2",
  divider: "my-2 border-b border-purple-500/30 dark:border-purple-500/50 lg:hidden"
};

export function AuthenticatedMenu({ username, onLogout }: AuthenticatedMenuProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={STYLES.username}>{username}</div>
      <div className={STYLES.menuItems}>
        <MenuItem to="/profile">{t('userMenu.profile')}</MenuItem>
        <MenuItem to="/favorites">{t('navigation.favorites')}</MenuItem>
        <div className={STYLES.divider} />
        <div className="lg:hidden">
          <MenuItem to="/">{t('navigation.popular')}</MenuItem>
          <MenuItem to="/movies">{t('navigation.movies')}</MenuItem>
          <MenuItem to="/tv">{t('navigation.tvShows')}</MenuItem>
        </div>
        <div className={STYLES.divider} />
        <MenuItem onClick={onLogout}>{t('auth.logout')}</MenuItem>
      </div>
    </>
  );
} 