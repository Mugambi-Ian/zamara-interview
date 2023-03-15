import React from 'react';
import { Stack, useSegments } from 'expo-router';
import AppHeader from '../../components/appHeader';

function Header() {
  let title = '';
  const segments = useSegments();
  switch (segments[1]) {
    case '(staff)':
      title = 'Staff';
      if (segments[2])
        title = segments[2] === 'new' ? 'Add Staff' : 'Update Staff';
      break;
    case '(continents)':
      title = 'Continents';
      break;
    default:
      title = 'Zamara';
      break;
  }
  return <AppHeader title={title} rightChild={false} />;
}
export default function HomeLayout() {
  const options = {
    headerShown: true,
    header: Header,
  };
  return (
    <Stack
      initialRouteName="(home)"
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="(home)" options={options} />
      <Stack.Screen name="(staff)" options={{ headerShown: false }} />
      <Stack.Screen name="(continents)" options={options} />
      <Stack.Screen
        name="drawer"
        options={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_left',
          gestureDirection: 'horizontal',
          animationDuration: 200,
        }}
      />
    </Stack>
  );
}
