import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';

// Styling constants
const STYLES = {
  container: "",
  background: {
    container: "relative h-72 -mt-16 overflow-hidden",
    image: "h-full w-full object-cover [mask-image:linear-gradient(to_bottom,black_60%,rgba(0,0,0,0.95)_70%,rgba(0,0,0,0.9)_75%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.6)_85%,rgba(0,0,0,0.4)_90%,rgba(0,0,0,0.1)_95%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,rgba(0,0,0,0.95)_70%,rgba(0,0,0,0.9)_75%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.6)_85%,rgba(0,0,0,0.4)_90%,rgba(0,0,0,0.1)_95%,transparent_98%)]",
    overlay: ""
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