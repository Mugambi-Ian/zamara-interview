import { Stack } from 'expo-router';
import React from 'react';
import useProtectedRoutes from '../hooks/useProtectedRoute';
import { useAuth } from '../context/authContext';

export default function AppLayout() {
  const { user } = useAuth();
  useProtectedRoutes(user);
  return (
    <Stack
      initialRouteName="(auth)"
      screenOptions={{
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}
