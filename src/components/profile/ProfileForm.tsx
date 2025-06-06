import { useTranslation } from 'react-i18next';
import type { ProfileFormProps } from '../../types/profile.types';

// Styling constants
const STYLES = {
  container: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-2",
  form: "mt-6 bg-bg-secondary/50 backdrop-blur-md shadow-lg shadow-purple-500/10 rounded-xl ring-1 ring-purple-500/30 transition-shadow duration-300 hover:shadow-purple-500/20",
  content: "px-4 py-5 sm:p-6",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2",
  field: "sm:col-span-1",
  label: "nav-text font-medium text-text-secondary/80",
  value: "nav-text font-semibold text-text-primary",
  input: (readonly: boolean) => `nav-text block w-full rounded-md border-0 px-4 font-semibold text-text-primary bg-bg-primary/50 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-purple-500/30 transition-all duration-200 leading-none h-9 outline-none ${
    readonly 
      ? 'cursor-not-allowed opacity-75' 
      : 'placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-purple-500 focus:shadow-[0_0_10px_rgba(147,51,234,0.3)]'
  }`
};

export function ProfileForm({ fields, isEditing, onFieldChange }: ProfileFormProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.container}>
      <div className={STYLES.form}>
        <div className={STYLES.content}>
          <div className={STYLES.grid}>
            {fields.map((field, index) => (
              <div key={field.key} className={STYLES.field}>
                <dt className={STYLES.label}>
                  {t(`profile.fields.${field.key}`)}
                </dt>
                <dd className="mt-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => onFieldChange(index, e.target.value)}
                      disabled={field.readonly}
                      className={STYLES.input(!!field.readonly)}
                    />
                  ) : (
                    <p className={STYLES.value}>{field.value}</p>
                  )}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 