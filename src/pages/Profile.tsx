import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';

// Styling constants
const STYLES = {
  container: "bg-bg-primary",
  background: {
    container: "relative h-72 -mt-16 overflow-hidden",
    image: "h-full w-full object-cover",
    overlay: "absolute inset-0 bg-gradient-to-t from-bg-primary"
  }
};

export default function Profile() {
  const {
    profile,
    formData,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    handleFieldChange,
    updateAvatar
  } = useProfile();

  return (
    <div className={STYLES.container}>
      <div className={STYLES.background.container}>
        <div className="absolute inset-0">
          <img
            className={STYLES.background.image}
            src={profile.backgroundImage}
            alt=""
          />
          <div className={STYLES.background.overlay} />
        </div>
      </div>

      <ProfileHeader 
        profile={profile}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        updateAvatar={updateAvatar}
      />

      <ProfileForm 
        fields={formData.fields}
        isEditing={isEditing}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
} 