import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'lucide-react-native';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  // Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setColorScheme(saved);
        setIsDark(saved === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const next = isDark ? 'light' : 'dark';
    setColorScheme(next);
    setIsDark(!isDark);
    await AsyncStorage.setItem('theme', next);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};