import { PencilIcon, CameraIcon } from '@heroicons/react/20/solid'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { UserAvatar } from '../components/UserAvatar'
import { updateUserAvatar } from '../services/auth'

interface ProfileField {
  key: string
  value: string
  readonly?: boolean
  isPlaceholder?: boolean
}

interface ProfileData {
  name: string
  email: string
  avatar: string
  backgroundImage: string
  fields: ProfileField[]
}

const createDefaultProfile = (t: (key: string) => string): ProfileData => ({
  name: '',
  email: '',
  avatar: '',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
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
})

export default function Profile() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const defaultProfile = useMemo(() => createDefaultProfile(t), [t])
  const [profile, setProfile] = useState<ProfileData>(defaultProfile)
  const [formData, setFormData] = useState<ProfileData>(defaultProfile)
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      fields: prev.fields.map(field => ({
        ...field,
        value: field.isPlaceholder ? t(`profile.placeholders.${field.key}`) : field.value
      }))
    }))
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map(field => ({
        ...field,
        value: field.isPlaceholder ? t(`profile.placeholders.${field.key}`) : field.value
      }))
    }))
  }, [t])

  useEffect(() => {
    const savedProfile = localStorage.getItem(`userProfile_${user?.username}`)
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      const updatedProfile = {
        ...parsedProfile,
        fields: parsedProfile.fields.map((field: ProfileField) => ({
          ...field,
          value: field.isPlaceholder ? t(`profile.placeholders.${field.key}`) : field.value
        }))
      }
      setProfile(updatedProfile)
      setFormData(updatedProfile)
    } else if (user) {
      const initialProfile = {
        ...defaultProfile,
        name: user.username,
        fields: defaultProfile.fields.map(field => 
          field.key === 'email' ? { ...field, value: `${user.username}@example.com`, isPlaceholder: false } : field
        )
      }
      setProfile(initialProfile)
      setFormData(initialProfile)
      localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(initialProfile))
    }
  }, [user, defaultProfile])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(formData)
    if (user) {
      localStorage.setItem(`userProfile_${user.username}`, JSON.stringify(formData))
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...formData.fields]
    newFields[index] = { 
      ...newFields[index], 
      value,
      isPlaceholder: false
    }
    setFormData({ ...formData, fields: newFields })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const newAvatar = reader.result as string
        try {
          await updateUserAvatar(user.username, newAvatar)
          setProfile(prev => ({ ...prev, avatar: newAvatar }))
          setFormData(prev => ({ ...prev, avatar: newAvatar }))
          localStorage.setItem(`userProfile_${user.username}`, JSON.stringify({ ...profile, avatar: newAvatar }))
          window.location.reload()
        } catch (error) {
          console.error('Failed to update avatar:', error)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-bg-primary">
      <div className="relative h-72 -mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src={profile.backgroundImage}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary" />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="sm:flex sm:items-end sm:space-x-5">
          <div className="relative group flex">
            <div 
              className="size-24 sm:size-32 rounded-full ring-4 ring-bg-secondary shadow-xl overflow-hidden flex items-center justify-center"
              onMouseEnter={() => setIsHoveringAvatar(true)}
              onMouseLeave={() => setIsHoveringAvatar(false)}
              onClick={handleAvatarClick}
            >
              <UserAvatar size="lg" className="size-full" avatarUrl={profile.avatar} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity duration-200 cursor-pointer ${
                isHoveringAvatar ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => setIsHoveringAvatar(true)}
              onMouseLeave={() => setIsHoveringAvatar(false)}
              onClick={handleAvatarClick}
            >
              <div className="text-center">
                <CameraIcon className="mx-auto size-6 text-white" aria-hidden="true" />
                <span className="mt-1 block text-xs font-semibold text-white">
                  {t('profile.avatar.change')}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-white">{profile.name}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="nav-text inline-flex items-center justify-center rounded-md bg-purple-600 px-3 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200 leading-none h-9"
                >
                  <PencilIcon className="-ml-0.5 mr-1.5 size-5" aria-hidden="true" />
                  <span className="mt-0.5">{t('userMenu.edit')}</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="nav-text inline-flex items-center justify-center rounded-md bg-purple-600 px-3 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200 leading-none h-9"
                  >
                    <span className="mt-0.5">{t('common.save')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="nav-text inline-flex items-center justify-center rounded-md bg-bg-secondary/80 backdrop-blur-sm px-3 font-semibold text-text-primary shadow-sm ring-1 ring-inset ring-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200 leading-none h-9"
                  >
                    <span className="mt-0.5">{t('common.cancel')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-white">{profile.name}</h1>
        </div>

        {/* Profile Information Form */}
        <div className="mt-12 bg-bg-secondary shadow-lg shadow-purple-500/10 rounded-xl backdrop-blur-xl ring-1 ring-purple-500/30 transition-shadow duration-300 hover:shadow-purple-500/20">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {formData.fields.map((field, index) => (
                <div key={field.key} className="sm:col-span-1">
                  <dt className="nav-text font-medium text-text-secondary/80">
                    {t(`profile.fields.${field.key}`)}
                  </dt>
                  <dd className="mt-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => handleFieldChange(index, e.target.value)}
                        disabled={field.readonly}
                        className={`nav-text block w-full rounded-md border-0 px-4 font-semibold text-text-primary bg-bg-primary shadow-sm ring-1 ring-inset ring-purple-500/30 transition-all duration-200 leading-none h-9 outline-none ${
                          field.readonly 
                            ? 'cursor-not-allowed opacity-75' 
                            : 'placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-purple-500 focus:shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                        }`}
                      />
                    ) : (
                      <p className="nav-text font-semibold text-text-primary">{field.value}</p>
                    )}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 