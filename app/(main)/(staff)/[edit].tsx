import React, { useState } from 'react';
import { Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  Pressable,
  Text,
  TextInput,
  VectorIcon,
  View,
  printSpace,
} from '../../../components/view';
import { IC_Back, IC_Delete } from '../../../components/icons';
import { IStaff } from '../../../models/staff';
import {
  createStaffAPI,
  deleteStaffAPI,
  updateStaffAPI,
} from '../../../api/staff';
import useAppTheme from '../../../hooks/useTheme';
import { useStaff } from '../../../context/staffContext';

export default function Welcome() {
  const router = useRouter();
  const { params } = useRoute();
  const { isDark } = useAppTheme();
  const newStaff = params.edit === 'new';
  const [refreshing, setRefreshing] = useState(false);
  const { updateStaff, staff, edit, setEdit } = useStaff();
  const title = newStaff ? 'Create Staff Record' : 'Update Staff Record';
  const defaultUser = edit !== -1 ? staff[edit] : ({} as IStaff);
  const [s, setStaff] = useState<IStaff>(defaultUser);

  const save = async () => {
    const { department, email, name, salary, staffNumber } = s;
    if (!department || !email || !name || !salary || !staffNumber) {
      Alert.alert('Invalid Entry', 'All input Fields are required', [], {
        cancelable: true,
      });
      return true;
    }
    setRefreshing(true);
    if (newStaff) {
      const exist = staff.filter(x => x.staffNumber === s.staffNumber);
      if (exist.length !== 0) {
        Alert.alert('Staff Exist', 'All input Fields are required', [], {
          cancelable: true,
        });
        return true;
      }
      staff.push(s);
      await createStaffAPI(s);
    } else {
      staff[edit] = s;
      await updateStaffAPI(s);
    }

    setEdit(-1);
    updateStaff(staff);
    setRefreshing(false);
    router.back();
    return true;
  };

  const deleteStaff = async () => {
    setRefreshing(true);
    const st = staff.splice(edit, 1);
    await deleteStaffAPI(s);
    updateStaff(st);
    setRefreshing(false);
    setEdit(-1);
    router.back();
  };

  return (
    <View className="flex-1 bg-white  px-4 pt-16 dark:bg-black">
      <View className="flex-1 flex-row">
        <Pressable
          className="ml-2 h-8 w-8 p-1.5 "
          onPress={() => router.back()}
        >
          <VectorIcon
            darkModeColor="#fff"
            lightModeColor="#000"
            icon={IC_Back}
          />
        </Pressable>
        <View className="flex-1" />
        {!newStaff && (
          <Pressable className="ml-2 h-8 w-8 p-1.5 " onPress={deleteStaff}>
            <VectorIcon
              darkModeColor="#fff"
              lightModeColor="#000"
              icon={IC_Delete}
            />
          </Pressable>
        )}
      </View>
      {printSpace(3)}
      <Text className="mx-3 font-app-bold text-5xl tracking-[8px] text-black dark:text-white">
        {title}
      </Text>
      <Text className="mx-6 mt-2 font-app-regular text-xl tracking-[3px] text-black dark:text-gray-300">
        Fill the fields below.
      </Text>
      {printSpace(2)}
      <ScrollView>
        <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
          Staff Number
        </Text>
        <TextInput
          placeholder="ZAAC001"
          value={s.staffNumber}
          onChangeText={val => setStaff({ ...s, staffNumber: val })}
          placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
          className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
        />
        <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
          Staff Name
        </Text>
        <TextInput
          placeholder="John Doe"
          value={s.name}
          onChangeText={val => setStaff({ ...s, name: val })}
          placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
          className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
        />
        <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
          Staff Email
        </Text>
        <TextInput
          placeholder="jd@zamara.co.ke"
          value={s.email}
          onChangeText={val => setStaff({ ...s, email: val })}
          placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
          className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
        />
        <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
          Department
        </Text>
        <TextInput
          placeholder="ICT"
          value={s.department}
          onChangeText={val => setStaff({ ...s, department: val })}
          placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
          className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
        />
        <Text className="mx-6 mt-2 mb-2 font-app-light text-base tracking-widest text-black dark:text-gray-300">
          Salary
        </Text>
        <TextInput
          placeholder="50,000"
          value={s.salary}
          onChangeText={val => setStaff({ ...s, salary: val })}
          placeholderTextColor={isDark ? '#d6d4ce' : '#474643'}
          className="mx-4 rounded bg-gray-200 px-3 py-1 font-app-regular text-lg text-black placeholder:text-black dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-300"
        />
      </ScrollView>

      {printSpace(3)}
      <Pressable
        className="mx-4  w-1/2 self-end rounded-md bg-[#1F1F3D] pt-2 pb-3"
        onPress={save}
        disabled={refreshing}
      >
        {!refreshing && (
          <Text className="self-center font-app-bold text-xl uppercase tracking-[2px] text-white">
            {newStaff ? 'Save' : 'Update'}
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
