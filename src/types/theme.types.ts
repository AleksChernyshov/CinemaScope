export type Theme = 'light' | 'dark';

export interface ThemeIconProps {
  theme: Theme;
  isDark: boolean;
}

export interface ThemeKnobProps {
  isDark: boolean;
} 