import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from "react-native";
import type { Theme } from '../../@types';
import { lightTheme, themes } from '../theme';

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightTheme;
}>({
  theme: 'light',
  toggleTheme: () => { },
  colors: lightTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme() ?? 'light';
  const [theme, setTheme] = useState<Theme>(systemScheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      } else {
        setTheme(systemScheme);
      }
    };
    loadTheme();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const currentColors = themes[theme];
  const navigationTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: currentColors.background,
      card: currentColors.surface,
      text: currentColors.text,
      primary: currentColors.primary,
      border: currentColors.border,
    },
  };

  const value = useMemo(() => ({ theme, toggleTheme, colors: currentColors }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <NavigationContainer theme={navigationTheme}>
        {children}
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};
