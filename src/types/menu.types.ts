export type AuthMode = 'login' | 'register' | null;

export interface MenuItemProps {
  onClick?: () => void;
  to?: string;
  children: React.ReactNode;
}

export interface AuthenticatedMenuProps {
  username?: string;
  onLogout: () => void;
}

export interface UnauthenticatedMenuProps {
  onLogin: () => void;
  onRegister: () => void;
} 