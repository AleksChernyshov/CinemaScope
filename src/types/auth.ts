import type { ReactNode } from 'react';

export interface User {
  username: string;
  favorites: string[];
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<User>) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
} 