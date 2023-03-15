import React, { useState } from 'react';
import { ActivityIndicator, BackHandler, Alert } from 'react-native';
import axios from 'axios';
import {
  Pressable,
  Text,
  TextInput,
  VectorIcon,
  View,
  printSpace,
} from '../../components/view';
import { IC_Back } from '../../components/icons';
import useAppTheme from '../../hooks/useTheme';
import { IUser } from '../../models/user';
import { useAuth } from '../../context/authContext';

export default function Welcome() {
  const { isDark } = useAppTheme();
  const { updateUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const login = async () => {
    const AUTH_URL = 'https://dummyjson.com';
    if (!username || !password)
      Alert.alert('Invalid Entry', 'All input Fields are required', [], {
        cancelable: true,
      });
    else {
      setRefreshing(true);
      const res = await axios.post(`${AUTH_URL}/auth/login`, {
        username,
        password,
      });

      if (res.status === 200) {
        const user = res.data as IUser;
        const val = await axios.get(`${AUTH_URL}/users/${user.id}`);
        updateUser(val.data as IUser);
      }
      setRefreshing(false);
      if (res.status !== 200)
        Alert.alert(`Error ${res.status}`, 'Authentication Failed', [], {
          cancelable: true,
        });
    }
  };

  return (
    <View className="flex-1 bg-white  px-4 pt-20 dark:bg-black">
      <Pressable
        className="ml-2 h-8 w-8 p-1.5 "
        onPress={() => BackHandler.exitApp()}
      >
        <VectorIcon darkModeColor="#fff" lightModeColor="#000" icon={IC_Back} />
      </Pressable>
      {printSpace(3)}
      <Text className="mx-3 font-app-bold text-5xl tracking-[8px] text-black dark:text-white">
        Welcome
      </Text>
      <Text className="mx-6 mt-2 font-app-regular text-xl tracking-[3px] text-black dark:text-gray-300">
        Sign in to continue
      </Text>
      {printSpace(2)}
      <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
        Username
      </Text>
      <TextInput
        placeholder="user1234"
        value={username}
        onChangeText={val => setUsername(val)}
        placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
        className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
      />
      <Text className="mx-6 mt-5 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
        Password
      </Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={val => setPassword(val)}
        placeholder=" • • • • • • • • •"
        placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
        className="mx-4  rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black  dark:bg-gray-800 dark:text-white"
      />
      {printSpace(3)}
      <Pressable
        className="mx-4  w-1/2 self-end rounded-md bg-[#1F1F3D] pt-2 pb-3"
        onPress={login}
        disabled={refreshing}
      >
        {!refreshing && (
          <Text className="self-center font-app-bold text-xl uppercase tracking-[2px] text-white">
            Login
          </Text>
        )}
        {refreshing && (
          <ActivityIndicator size="small" color={isDark ? '#fff' : '#000'} />
        )}
      </Pressable>
      {printSpace(5)}
    </View>
  );
}
