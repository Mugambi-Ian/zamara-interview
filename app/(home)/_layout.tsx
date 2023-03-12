import React from 'react';
import { useRouter, Stack } from 'expo-router';
import { Pressable, VectorIcon } from '../../components/view';
import { IC_Settings } from '../../components/icons';

function SettingsBtn() {
  const { push } = useRouter();
  return (
    <Pressable
      onTouchStart={() => {
        push('/settings');
      }}
      className="h-6 w-6"
    >
      <VectorIcon
        darkModeColor="#fff"
        lightModeColor="#000"
        icon={IC_Settings}
      />
    </Pressable>
  );
}
export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerRight: SettingsBtn,
        }}
      />
      <Stack.Screen name="settings" options={{ headerShown: true }} />
    </Stack>
  );
}
