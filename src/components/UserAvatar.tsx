import { useAuth } from '../contexts/AuthContext';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';
import type { UserAvatarProps } from '../types/user.types';

// Styling constants
const STYLES = {
  container: "rounded-full w-full h-full",
  image: "w-full h-full object-cover",
  defaultIcon: "flex items-center justify-center",
  size: {
    sm: 'h-8 w-8',
    lg: 'h-12 w-12'
  }
};

export function UserAvatar({ size = 'sm', className = '', avatarUrl }: UserAvatarProps) {
  const { user } = useAuth();
  const finalAvatarUrl = avatarUrl || user?.avatar;

  if (finalAvatarUrl) {
    return (
      <div className={`${STYLES.container} ${STYLES.size[size]} overflow-hidden ${className}`}>
        <img 
          src={finalAvatarUrl} 
          alt="User avatar" 
          className={STYLES.image} 
        />
      </div>
    );
  }

  return (
    <div className={`${STYLES.container} ${STYLES.size[size]} ${STYLES.defaultIcon} ${className}`}>
      <DefaultAvatarIcon />
    </div>
  );
} 