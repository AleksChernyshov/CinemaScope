import { useTranslation } from 'react-i18next';
import type { AuthSwitchProps } from '../types/auth.types';

// Component for switching between login and register modes
export function AuthSwitch({ mode, onSwitchMode }: AuthSwitchProps) {
  const { t } = useTranslation();

  return (
    <p className="text-center mt-6 text-white font-bebas-neue text-lg tracking-wider">
      {mode === 'login' ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
      <button 
        onClick={onSwitchMode}
        className="text-purple-500 hover:text-purple-400 transition-colors"
      >
        {mode === 'login' ? t('auth.registerLink') : t('auth.loginLink')}
      </button>
    </p>
  );
} 