/**
 * Componente de input moderno com animações
 * Design inspirado em Material Design 3 e iOS
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Animated,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { BorderRadius, FontSizes, Spacing, Shadows } from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  containerStyle,
  style,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? colors.error : colors.border, colors.primary],
  });

  const inputStyle = {
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: leftIcon || rightIcon ? Spacing.lg : Spacing.xl,
    paddingVertical: Spacing.lg,
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    backgroundColor: colors.surface,
    minHeight: 56,
    ...Shadows.small,
  };

  return (
    <View style={[{ marginBottom: Spacing.lg }, containerStyle]}>
      {label && (
        <Text style={styles.label(colors)}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        <Animated.View style={[styles.inputWrapper, { borderColor }]}>
          <TextInput
            style={[inputStyle, style, {
              paddingLeft: leftIcon ? Spacing.xxxxl : Spacing.xl,
              paddingRight: rightIcon ? Spacing.xxxxl : Spacing.xl,
            }]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.textTertiary}
            {...props}
          />
        </Animated.View>
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text style={styles.error(colors)}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = {
  label: (colors: any) => ({
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  }),
  inputContainer: {
    position: 'relative' as const,
  },
  inputWrapper: {
    borderRadius: BorderRadius.xl,
  },
  leftIconContainer: {
    position: 'absolute' as const,
    left: Spacing.xl,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute' as const,
    right: Spacing.xl,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  error: (colors: any) => ({
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    color: colors.error,
    marginTop: Spacing.sm,
    marginLeft: Spacing.xs,
  }),
};