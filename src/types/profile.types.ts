export interface ProfileField {
  key: string;
  value: string;
  readonly?: boolean;
  isPlaceholder?: boolean;
}

export interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  backgroundImage: string;
  fields: ProfileField[];
}

export interface ProfileHeaderProps {
  profile: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  updateAvatar: (newAvatar: string) => Promise<void>;
}

export interface ProfileAvatarProps {
  avatar: string;
  onAvatarChange: (newAvatar: string) => Promise<void>;
}

export interface ProfileFormProps {
  fields: ProfileField[];
  isEditing: boolean;
  onFieldChange: (index: number, value: string) => void;
} 