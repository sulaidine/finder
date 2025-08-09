/**
 * Context para gerenciamento de tema moderno
 * Suporte a tema claro/escuro com persistência
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { Theme, ThemeColors } from '@/types';

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors & {
    gradientPrimary: string[];
    gradientSecondary: string[];
    gradientSuccess: string[];
    primaryDark: string;
    primaryLight: string;
    secondaryLight: string;
    successLight: string;
    warningLight: string;
    errorLight: string;
    textTertiary: string;
    borderLight: string;
    surfaceElevated: string;
  };
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@truck_finder_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('light');

  // Carrega o tema salvo ou usa o tema do sistema
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      } else {
        // Se não há tema salvo, usa o tema do sistema
        setTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
      setTheme('light');
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const colors = Colors[theme];
  const isDark = theme === 'dark';

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}