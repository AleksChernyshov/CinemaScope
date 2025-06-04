export interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
  placeholder: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: () => void;
  onSuccess?: () => void;
}

export interface AuthSwitchProps {
  mode: 'login' | 'register';
  onSwitchMode: () => void;
} 