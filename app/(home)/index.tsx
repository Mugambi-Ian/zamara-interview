import React from 'react';
import { Image, Text, View } from '../../components/view';

export default function Welcome() {
  return (
    <View className="flex-1 justify-center bg-white dark:bg-black">
      <Image
        source={require('../../assets/images/logo.png')}
        className="mx-4 mt-3 mb-12 h-24 w-24 self-center object-contain"
      />

      <Text className="self-center font-app-bold  text-3xl tracking-[4px] text-gray-600 dark:text-white">
        LET&rsquo;S GET STARTED
      </Text>
      <Text className="my-2 self-center font-app-regular text-gray-600 dark:text-white">
        File Path: \app\(home)\index.tsx
      </Text>
    </View>
  );
}
