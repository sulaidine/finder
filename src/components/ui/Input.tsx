/**
 * Componente de input customizado
 * Suporta diferentes tipos e estados
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { BorderRadius, FontSizes, Spacing } from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    borderWidth: 2,
    borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    fontSize: FontSizes.md,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
    backgroundColor: colors.background,
    minHeight: 56,
  };

  return (
    <View style={[{ marginBottom: Spacing.md }, containerStyle]}>
      {label && (
        <Text style={styles.label(colors)}>
          {label}
        </Text>
      )}
      <TextInput
        style={[inputStyle, style]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
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
    fontFamily: 'Poppins-Medium',
    color: colors.text,
    marginBottom: Spacing.xs,
  }),
  error: (colors: any) => ({
    fontSize: FontSizes.sm,
    fontFamily: 'Poppins-Regular',
    color: colors.error,
    marginTop: Spacing.xs,
  }),
};