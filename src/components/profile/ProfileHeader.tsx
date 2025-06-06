import { PencilIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { ProfileAvatar } from './ProfileAvatar';
import type { ProfileHeaderProps } from '../../types/profile.types';

// Styling constants
const STYLES = {
  container: "relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-20",
  content: "sm:flex sm:items-end sm:space-x-5",
  info: "mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1",
  nameDesktop: "mt-6 min-w-0 flex-1 sm:hidden md:block",
  nameMobile: "mt-6 hidden min-w-0 flex-1 sm:block md:hidden",
  name: "truncate text-2xl font-bold text-text-primary",
  buttons: "mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0",
  buttonGroup: "flex space-x-2",
  editButton: "nav-text inline-flex items-center justify-center rounded-md bg-purple-600 px-3 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200 leading-none h-9",
  editIcon: "-ml-0.5 mr-1.5 size-5",
  saveButton: "nav-text inline-flex items-center justify-center rounded-md bg-purple-600 px-3 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200 leading-none h-9",
  cancelButton: "nav-text inline-flex items-center justify-center rounded-md bg-bg-secondary/80 backdrop-blur-sm px-3 font-semibold text-text-primary shadow-sm ring-1 ring-inset ring-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200 leading-none h-9",
  buttonText: "mt-0.5"
};

export function ProfileHeader({ profile, isEditing, onEdit, onSave, onCancel, updateAvatar }: ProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.container}>
      <div className={STYLES.content}>
        <ProfileAvatar 
          avatar={profile.avatar}
          onAvatarChange={updateAvatar}
        />
        
        <div className={STYLES.info}>
          <div className={STYLES.nameDesktop}>
            <h1 className={STYLES.name}>{profile.name}</h1>
          </div>
          <div className={STYLES.buttons}>
            {!isEditing ? (
              <button
                type="button"
                onClick={onEdit}
                className={STYLES.editButton}
              >
                <PencilIcon className={STYLES.editIcon} aria-hidden="true" />
                <span className={STYLES.buttonText}>{t('userMenu.edit')}</span>
              </button>
            ) : (
              <div className={STYLES.buttonGroup}>
                <button
                  type="button"
                  onClick={onSave}
                  className={STYLES.saveButton}
                >
                  <span className={STYLES.buttonText}>{t('common.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className={STYLES.cancelButton}
                >
                  <span className={STYLES.buttonText}>{t('common.cancel')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={STYLES.nameMobile}>
        <h1 className={STYLES.name}>{profile.name}</h1>
      </div>
    </div>
  );
} 