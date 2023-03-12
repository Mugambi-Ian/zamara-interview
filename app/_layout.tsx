import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import useAssets from '../hooks/useAssets';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { error, loaded } = useAssets();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && (
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="(home)">
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      )}
    </>
  );
}
