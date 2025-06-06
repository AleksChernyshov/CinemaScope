import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CameraIcon } from '@heroicons/react/20/solid';
import { UserAvatar } from '../user/UserAvatar';
import { updateUserAvatar } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';
import type { ProfileAvatarProps } from '../../types/profile.types';

// Styling constants
const STYLES = {
  container: "relative group flex",
  avatarWrapper: "size-24 sm:size-32 rounded-full ring-4 ring-purple-500/30 backdrop-blur-xl shadow-xl overflow-hidden flex items-center justify-center transition-all duration-200 group-hover:ring-purple-500/70 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]",
  fileInput: "hidden",
  overlay: (isHovering: boolean) => `absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity duration-200 cursor-pointer size-24 sm:size-32 ${
    isHovering ? 'opacity-100' : 'opacity-0'
  }`,
  overlayContent: "text-center",
  overlayIcon: "mx-auto size-6 text-white",
  overlayText: "mt-1 block text-xs font-semibold text-white"
};

export function ProfileAvatar({ avatar, onAvatarChange }: ProfileAvatarProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const newAvatar = reader.result as string;
      try {
        await updateUserAvatar(user.username, newAvatar);
        await onAvatarChange(newAvatar);
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={STYLES.container}>
      <div 
        className={STYLES.avatarWrapper}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleAvatarClick}
      >
        <UserAvatar size="lg" className="size-full" avatarUrl={avatar} />
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className={STYLES.fileInput}
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div
        className={STYLES.overlay(isHovering)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleAvatarClick}
      >
        <div className={STYLES.overlayContent}>
          <CameraIcon className={STYLES.overlayIcon} aria-hidden="true" />
          <span className={STYLES.overlayText}>
            {t('profile.avatar.change')}
          </span>
        </div>
      </div>
    </div>
  );
} 