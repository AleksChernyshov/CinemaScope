import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
} 