import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthSuccess = () => {
    if (location.pathname === '/favorites') {
      navigate('/favorites', { replace: true });
    } else {
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal 
          isOpen={true}
          onClose={() => navigate('/')}
          mode={authMode}
          onSwitchMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
          onSuccess={handleAuthSuccess}
        />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary text-xl">
            Please log in to view this page
          </p>
        </div>
      </>
    );
  }

  return <>{children}</>;
} 