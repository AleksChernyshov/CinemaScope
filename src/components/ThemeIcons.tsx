import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';
import type { ThemeIconProps } from '../types/theme.types';

// Styling constants
const STYLES = {
  container: "absolute inset-0 flex items-center justify-center",
  icon: (isVisible: boolean) => `absolute size-4 transition-opacity duration-200 ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`
};

// Component for displaying theme icons with transition
export function ThemeIcons({ theme }: ThemeIconProps) {
  const isDark = theme === 'dark';

  return (
    <span className={STYLES.container}>
      <img
        src={moonIcon}
        alt="Dark mode"
        className={STYLES.icon(isDark)}
      />
      <img
        src={sunIcon}
        alt="Light mode"
        className={STYLES.icon(!isDark)}
      />
    </span>
  );
} 