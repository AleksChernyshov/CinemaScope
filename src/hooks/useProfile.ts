import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import type { ProfileData, ProfileField } from '../types/profile.types';

const DEFAULT_BACKGROUND = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

const createDefaultProfile = (t: (key: string) => string): ProfileData => ({
  name: '',
  email: '',
  avatar: '',
  backgroundImage: DEFAULT_BACKGROUND,
  fields: [
    { key: 'phone', value: '(555) 123-4567', isPlaceholder: false },
    { key: 'email', value: '', isPlaceholder: false },
    { key: 'location', value: t('profile.placeholders.location'), isPlaceholder: true },
    { key: 'birthday', value: t('profile.placeholders.birthday'), isPlaceholder: true },
    { key: 'favoriteGenre', value: t('profile.placeholders.favoriteGenre'), isPlaceholder: true },
    { key: 'watchedMovies', value: '127', readonly: true, isPlaceholder: false },
    { key: 'reviewsWritten', value: '45', readonly: true, isPlaceholder: false },
    { key: 'averageRating', value: '4.5/5', readonly: true, isPlaceholder: false },
  ],
});

export function useProfile() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const defaultProfile = useMemo(() => createDefaultProfile(t), [t]);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [formData, setFormData] = useState<ProfileData>(defaultProfile);

  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = (data: ProfileData) => ({
      ...data,
      fields: data.fields.map(field => ({
        ...field,
        value: field.isPlaceholder ? t(`profile.placeholders.${field.key}`) : field.value
      }))
    });

    setProfile(prev => updateTranslations(prev));
    setFormData(prev => updateTranslations(prev));
  }, [t]);

  // Load profile from localStorage
  useEffect(() => {
    if (!user) return;

    const savedProfile = localStorage.getItem(`userProfile_${user.username}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      const updatedProfile = {
        ...parsedProfile,
        fields: parsedProfile.fields.map((field: ProfileField) => ({
          ...field,
          value: field.isPlaceholder ? t(`profile.placeholders.${field.key}`) : field.value
        }))
      };
      setProfile(updatedProfile);
      setFormData(updatedProfile);
    } else {
      const initialProfile = {
        ...defaultProfile,
        name: user.username,
        fields: defaultProfile.fields.map(field => 
          field.key === 'email' ? { ...field, value: `${user.username}@example.com`, isPlaceholder: false } : field
        )
      };
      setProfile(initialProfile);
      setFormData(initialProfile);
      localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(initialProfile));
    }
  }, [user, defaultProfile, t]);

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = () => {
    setProfile(formData);
    if (user) {
      localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(formData));
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };
  
  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...formData.fields];
    newFields[index] = { 
      ...newFields[index], 
      value,
      isPlaceholder: false
    };
    setFormData({ ...formData, fields: newFields });
  };

  const updateAvatar = async (newAvatar: string) => {
    if (!user) return;
    
    const updatedProfile = { ...profile, avatar: newAvatar };
    setProfile(updatedProfile);
    setFormData(prev => ({ ...prev, avatar: newAvatar }));
    localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(updatedProfile));
    updateUser({ avatar: newAvatar });
  };

  return {
    profile,
    formData,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    handleFieldChange,
    updateAvatar
  };
} 