import React, { useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import useAssets from '../hooks/useAssets';
import { AuthContext } from '../context/authContext';
import { IUser } from '../models/user';
import useAppTheme from '../hooks/useTheme';
import useProtectedRoutes from '../hooks/useProtectedRoute';

export default function RootLayout() {
  const { loaded } = useAssets();
  const { isDark } = useAppTheme();
  const [user, updateUser] = useState<IUser>();

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const authContext = { user, updateUser };
  useProtectedRoutes(user);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {!loaded && <SplashScreen />}
      <AuthContext.Provider value={authContext}>
        {loaded && (
          <Stack
            initialRouteName="(auth)"
            screenOptions={{
              animation: 'simple_push',
            }}
          >
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="(main)"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </Stack>
        )}
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
