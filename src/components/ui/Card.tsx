/**
 * Componente de card moderno com elevação e bordas suaves
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { BorderRadius, Spacing, Shadows } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ 
  children, 
  style, 
  padding = Spacing.xl,
  variant = 'default'
}: CardProps) {
  const { colors } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xxl,
      padding,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceElevated,
          ...Shadows.large,
        };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
          ...Shadows.small,
        };
      default:
        return {
          ...baseStyle,
          ...Shadows.medium,
        };
    }
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
}