import React from 'react';
import { Stack } from 'expo-router';

export default function ContinentsLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
