export const palette = {
  // Brand Colors
  primaryBrand: '#5E56E8',
  primaryAccent: '#64D2FF',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic Colors
  red: '#EF4444',
  pink: '#EC4899',
  purple: '#8B5CF6',
  blue: '#3B82F6',
  teal: '#14B8A6',
  yellow: '#EAB308',
  green: '#22C55E',
};

export const lightTheme = {
  background: palette.gray100,
  surface: palette.white,
  text: palette.gray800,
  textSecondary: palette.gray500,
  primary: palette.primaryBrand,
  accent: palette.primaryAccent,
  border: palette.gray300,
  error: palette.red,
  success: palette.green,
  glassBorder: 'rgba(255, 255, 255, 0.5)',
  ...palette,
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#E0E0E0',
  textSecondary: palette.gray400,
  primary: palette.primaryAccent,
  accent: palette.primaryAccent,
  border: palette.gray600,
  error: palette.red,
  success: palette.green,
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  ...palette,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
