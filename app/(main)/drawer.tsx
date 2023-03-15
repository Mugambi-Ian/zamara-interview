import React from 'react';
import { BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Pressable,
  Text,
  VectorIcon,
  View,
  printSpace,
} from '../../components/view';
import {
  IC_Back,
  IC_Exit,
  IC_Home,
  IC_Newstaff,
  IC_Power,
  IC_Staff,
  IC_World,
} from '../../components/icons';
import { useAuth } from '../../context/authContext';

interface IDrawerButtonProps {
  title: string;
  onPress: () => void;
  icon: (f: string) => string;
}
function DrawerButton({ icon, title, onPress }: IDrawerButtonProps) {
  return (
    <Pressable className="flex-1 p-1" onPress={onPress}>
      <View className="rounded-2xl bg-[#1F1F3D] py-8  dark:bg-[#222222]">
        <View className="h-16 w-16 self-center">
          <VectorIcon darkModeColor="#fff" lightModeColor="#fff" icon={icon} />
        </View>
        <Text className="mt-3 self-center font-app-light text-2xl tracking-[4px] text-white">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
export default function Drawer() {
  const { updateUser } = useAuth();
  const router = useRouter();
  return (
    <View className="flex-1 bg-opacity-25 pt-16">
      <View className="mx-8 flex-row">
        <Text className="flex-1 font-app-bold text-3xl tracking-[6px] text-black dark:text-white">
          MENU
        </Text>
        <Pressable
          className="ml-2  h-8 w-8 rotate-180 p-2"
          onPress={() => {
            router.back();
          }}
        >
          <VectorIcon
            darkModeColor="#fff"
            lightModeColor="#000"
            icon={IC_Back}
          />
        </Pressable>
      </View>
      {printSpace(3)}
      <View className="flex-row self-center px-6">
        <DrawerButton
          onPress={() => router.back()}
          title="Home"
          icon={IC_Home}
        />
        <DrawerButton
          onPress={() => router.replace('/(staff)')}
          title="Staff"
          icon={IC_Staff}
        />
        <DrawerButton
          onPress={() => {
            router.replace('/(staff)/new');
          }}
          title="New"
          icon={IC_Newstaff}
        />
      </View>
      <View className="mt-1 flex-row self-center px-6">
        <DrawerButton
          onPress={() => router.replace('/(continents)')}
          title="Continents"
          icon={IC_World}
        />
      </View>
      <View className="flex-row self-center px-6">
        <DrawerButton
          onPress={() => updateUser(undefined)}
          title="Log Out"
          icon={IC_Exit}
        />
        <DrawerButton
          onPress={() => BackHandler.exitApp()}
          title="Exit App"
          icon={IC_Power}
        />
      </View>
      {printSpace(9)}
    </View>
  );
}
