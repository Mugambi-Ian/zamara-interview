import React from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Pressable, Text, VectorIcon, View } from './view';
import { IC_Drawer } from './icons';

interface IProps {
  title: string;
  rightChild: JSX.Element | boolean;
}

export default function AppHeader({ title, rightChild }: IProps) {
  const segments = useSegments();
  const router = useRouter();

  return (
    <View className="mt-12 px-6">
      <View className="flex-row gap-x-3 self-center rounded-2xl bg-white pt-2 pb-2 shadow dark:bg-[#3535357a] ">
        <Pressable
          onTouchStart={() => {
            if (segments[1] === '(home)') router.push('/drawer');
            else router.replace('/drawer');
          }}
          className="mt-px h-9 w-9 self-center"
        >
          <VectorIcon
            darkModeColor="#fff"
            lightModeColor="#000"
            icon={IC_Drawer}
          />
        </Pressable>
        <Text className="self-center font-app-bold text-2xl tracking-[3px] text-black dark:text-white">
          {title}
        </Text>
        <View className="flex-1" />
        {rightChild && rightChild}
      </View>
    </View>
  );
}
