/**
 * Sistema de cores moderno e refinado
 * Inspirado em apps premium como Uber, Spotify e Apple
 */

export const Colors = {
  light: {
    // Primary - Gradiente laranja moderno
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    primaryLight: '#FF8A65',
    
    // Secondary - Azul sofisticado
    secondary: '#2563EB',
    secondaryLight: '#3B82F6',
    
    // Backgrounds - Tons neutros suaves
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    
    // Text - Hierarquia clara
    text: '#0F172A',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    
    // Borders - Sutis e elegantes
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    
    // Status colors - Vibrantes mas equilibradas
    success: '#10B981',
    successLight: '#34D399',
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    error: '#EF4444',
    errorLight: '#F87171',
    
    // Utility
    white: '#FFFFFF',
    black: '#000000',
    
    // Gradients
    gradientPrimary: ['#FF6B35', '#FF8A65'],
    gradientSecondary: ['#2563EB', '#3B82F6'],
    gradientSuccess: ['#10B981', '#34D399'],
  },
  dark: {
    // Primary - Mantém identidade da marca
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    primaryLight: '#FF8A65',
    
    // Secondary
    secondary: '#3B82F6',
    secondaryLight: '#60A5FA',
    
    // Backgrounds - Dark mode sofisticado
    background: '#0F172A',
    surface: '#1E293B',
    surfaceElevated: '#334155',
    
    // Text - Contraste otimizado
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    
    // Borders
    border: '#334155',
    borderLight: '#475569',
    
    // Status colors
    success: '#10B981',
    successLight: '#34D399',
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    error: '#EF4444',
    errorLight: '#F87171',
    
    // Utility
    white: '#FFFFFF',
    black: '#000000',
    
    // Gradients
    gradientPrimary: ['#FF6B35', '#FF8A65'],
    gradientSecondary: ['#3B82F6', '#60A5FA'],
    gradientSuccess: ['#10B981', '#34D399'],
  },
};

// Sistema de espaçamento baseado em 4px
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
};

// Border radius moderno
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Tipografia refinada
export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 19,
  xxl: 22,
  xxxl: 28,
  xxxxl: 34,
  xxxxxl: 40,
};

export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// Shadows modernas
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};