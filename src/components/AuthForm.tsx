import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 rounded-xl backdrop-blur-md 
                    shadow-[0_10px_15px_-3px_rgb(147_51_234_/_0.6),0_4px_6px_-4px_rgb(147_51_234_/_0.6),inset_0_-20px_25px_-5px_rgb(147_51_234_/_0.2),inset_0_-10px_10px_-5px_rgb(147_51_234_/_0.3),inset_20px_0_25px_-5px_rgb(147_51_234_/_0.2),inset_-20px_0_25px_-5px_rgb(147_51_234_/_0.2),inset_0_20px_25px_-5px_rgb(147_51_234_/_0.2),inset_0_10px_10px_-5px_rgb(147_51_234_/_0.3)]
                    ring-1 ring-purple-500/30 dark:ring-purple-500/50 ${
      theme === 'dark' ? 'bg-neutral-900/95' : 'bg-zinc-50/95'
    }`}>
      <h2 className="text-4xl font-bold text-center mb-8 text-text-primary">
        {mode === 'login' ? t('auth.login') : t('auth.register')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-lg font-bebas-neue mb-2 text-text-secondary tracking-wider leading-none">
            {t('auth.username')}
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 px-4 bg-bg-secondary/95 border border-purple-500/30 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                     transition-all duration-200 text-text-primary placeholder-text-secondary
                     shadow-[0_0_10px_rgba(147,51,234,0.1)] focus:shadow-[0_0_15px_rgba(147,51,234,0.2)]
                     font-bebas-neue text-xl tracking-wider leading-none flex items-center"
            placeholder={t('auth.username')}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-bebas-neue mb-2 text-text-secondary tracking-wider leading-none">
            {t('auth.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-bg-secondary/95 border border-purple-500/30 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                     transition-all duration-200 text-text-primary placeholder-text-secondary
                     shadow-[0_0_10px_rgba(147,51,234,0.1)] focus:shadow-[0_0_15px_rgba(147,51,234,0.2)]
                     font-bebas-neue text-xl tracking-wider leading-none flex items-center"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="text-error text-lg bg-error/10 px-4 py-3 rounded-lg border border-error/20 font-bebas-neue tracking-wider leading-none flex items-center h-12">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-12 bg-bg-secondary/95 text-text-primary px-4 rounded-lg 
                   hover:text-purple-500 hover:bg-purple-500/20
                   transition-all duration-200 text-xl tracking-wider leading-none
                   focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                   border-2 border-purple-500/50 hover:border-purple-500/70
                   shadow-[0_0_10px_rgba(147,51,234,0.4)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]
                   cinema-button flex items-center justify-center"
        >
          {mode === 'login' ? t('auth.loginButton') : t('auth.registerButton')}
        </button>
      </form>
    </div>
  );
} 