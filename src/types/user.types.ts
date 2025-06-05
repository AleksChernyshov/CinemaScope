export type AvatarSize = 'sm' | 'lg';

export interface UserAvatarProps {
  size?: AvatarSize;
  className?: string;
  avatarUrl?: string;
}

export interface DefaultAvatarIconProps {
  className?: string;
} 