/**
 * Componente de botão moderno e elegante
 * Suporta gradientes, diferentes tamanhos e estados
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { BorderRadius, FontSizes, FontWeights, Spacing, Shadows } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...Shadows.medium,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = Spacing.sm;
        baseStyle.paddingHorizontal = Spacing.lg;
        baseStyle.minHeight = 36;
        break;
      case 'large':
        baseStyle.paddingVertical = Spacing.xl;
        baseStyle.paddingHorizontal = Spacing.xxl;
        baseStyle.minHeight = 56;
        break;
      default:
        baseStyle.paddingVertical = Spacing.md;
        baseStyle.paddingHorizontal = Spacing.xl;
        baseStyle.minHeight = 48;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = colors.primary;
        baseStyle.shadowOpacity = 0;
        baseStyle.elevation = 0;
        break;
      case 'ghost':
        baseStyle.backgroundColor = colors.surface;
        baseStyle.shadowOpacity = 0;
        baseStyle.elevation = 0;
        break;
      case 'gradient':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontFamily: 'Poppins-SemiBold',
      fontWeight: FontWeights.semibold,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = FontSizes.sm;
        break;
      case 'large':
        baseTextStyle.fontSize = FontSizes.lg;
        break;
      default:
        baseTextStyle.fontSize = FontSizes.md;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseTextStyle.color = colors.white;
        break;
      case 'outline':
        baseTextStyle.color = colors.primary;
        break;
      case 'ghost':
        baseTextStyle.color = colors.text;
        break;
      default:
        baseTextStyle.color = colors.white;
    }

    return baseTextStyle;
  };

  const ButtonContent = () => (
    <>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
          style={{ marginRight: icon || title ? Spacing.sm : 0 }}
        />
      )}
      {icon && !loading && (
        <React.Fragment>
          {icon}
          {title && <Text style={{ width: Spacing.sm }} />}
        </React.Fragment>
      )}
      {title && (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={style}
      >
        <LinearGradient
          colors={colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyle(), { shadowColor: colors.primary }]}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
}