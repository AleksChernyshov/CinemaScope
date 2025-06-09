import { useTranslation } from 'react-i18next';
import type { UnauthenticatedMenuProps } from '../../types/menu.types';
import { MenuItem } from '../ui/MenuItem';

export function UnauthenticatedMenu({ onLogin, onRegister }: UnauthenticatedMenuProps) {
  const { t } = useTranslation();

  return (
    <div className="py-2">
      <MenuItem onClick={onLogin}>{t('auth.login')}</MenuItem>
      <MenuItem onClick={onRegister}>{t('auth.register')}</MenuItem>
    </div>
  );
} 