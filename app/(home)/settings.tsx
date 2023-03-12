import React from 'react';
import { Text, VectorIcon, View } from '../../components/view';
import { IC_Settings } from '../../components/icons';

export default function Settings() {
  return (
    <View className="flex-1 justify-center bg-white dark:bg-black">
      <View className="mx-4 mt-3 mb-12 h-24 w-24 self-center object-contain">
        <VectorIcon
          darkModeColor="#fff"
          lightModeColor="#000"
          icon={IC_Settings}
        />
      </View>

      <Text className="my-2 self-center font-app-regular text-gray-600 dark:text-white">
        File Path: \app\(home)\settings.tsx
      </Text>
    </View>
  );
}
