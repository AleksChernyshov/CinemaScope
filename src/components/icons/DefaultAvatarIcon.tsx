import type { DefaultAvatarIconProps } from '../../types/user.types';

// Styling constants
const STYLES = {
  container: "w-full h-full text-purple-500"
};

export function DefaultAvatarIcon({ className = '' }: DefaultAvatarIconProps) {
  return (
    <svg 
      className={`${STYLES.container} ${className}`}
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM4 15.32C4.01 13.32 8 12.24 10 12.24C12 12.24 15.99 13.32 16 15.32C14.7 17.26 12.5 18.5 10 18.5C7.5 18.5 5.3 17.26 4 15.32Z" 
      />
    </svg>
  );
} 