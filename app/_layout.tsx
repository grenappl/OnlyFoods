import { AuthProvider } from '@/context/AuthProvider';
import { FavoritesProvider } from '@/context/FavoritesProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import { UserRecipesProvider } from '@/context/UserRecipesProvider';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <UserRecipesProvider>
            <Slot />
          </UserRecipesProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}