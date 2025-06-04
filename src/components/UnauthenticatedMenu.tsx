import { useTranslation } from 'react-i18next';
import type { UnauthenticatedMenuProps } from '../types/menu.types';
import { MenuItem } from './MenuItem';

export function UnauthenticatedMenu({ onLogin, onRegister }: UnauthenticatedMenuProps) {
  const { t } = useTranslation();

  return (
    <>
      <MenuItem onClick={onLogin}>{t('auth.login')}</MenuItem>
      <MenuItem onClick={onRegister}>{t('auth.register')}</MenuItem>
    </>
  );
} 