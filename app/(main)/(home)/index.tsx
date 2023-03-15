import React from 'react';
import { ScrollView } from 'react-native';
import { Image, Text, View, printSpace } from '../../../components/view';
import { useAuth } from '../../../context/authContext';

interface IHomeFieldProps {
  field: string;
  value: string;
}
function HomeField({ field, value }: IHomeFieldProps) {
  return (
    <View className="my-1 flex-1 flex-row gap-x-2 bg-[#d7d7d7] px-2 py-1 dark:bg-[#676767]">
      <Text className="w-4/12 font-app-light text-lg tracking-[2px] text-black dark:text-white">
        {field}
      </Text>
      <Text className="flex-1 font-app-bold text-lg tracking-[2px] text-black dark:text-white">
        {value}
      </Text>
    </View>
  );
}
export default function Home() {
  const { user } = useAuth();
  return (
    <ScrollView style={{ marginLeft: 24, marginRight: 24 }}>
      {printSpace(4)}
      <Image
        source={{ uri: user.image }}
        className="mx-4 mt-16 h-20 w-20 self-end object-contain"
      />
      <Text className="-mt-1 font-app-light text-xl tracking-[4px] text-black dark:text-white">
        Welcome
      </Text>
      <Text className="font-app-bold text-2xl tracking-[4px] text-black dark:text-white">
        {`${user.firstName} ${user.lastName} 👋`}
      </Text>
      {printSpace(3)}
      <View className="my-8 rounded-lg bg-[#e8e8e8] py-4 px-2 dark:bg-[#242424]">
        <Text className="mx-2 mb-4 font-app-light text-xl uppercase tracking-[4px] text-black underline dark:text-white">
          Profile Details
        </Text>
        <View className="mx-4">
          <HomeField field="Age" value={`${user.age}`} />
          <HomeField field="Gender" value={user.gender} />
          <HomeField field="Email" value={user.email} />
          <HomeField field="Phone" value={user.phone} />
          <HomeField field="Birth Date" value={user.birthDate} />
          <HomeField field="Blood Group" value={user.bloodGroup} />
          <HomeField field="Height" value={`${user.height}`} />
          <HomeField field="Weight" value={`${user.weight}`} />
          <HomeField field="Eye Color" value={user.eyeColor} />
        </View>
      </View>
      {printSpace(1)}
    </ScrollView>
  );
}
