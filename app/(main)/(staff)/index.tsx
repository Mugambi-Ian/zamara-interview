import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from '../../../components/view';
import { listStaffAPI } from '../../../api/staff';
import { useStaff } from '../../../context/staffContext';
import { IStaff } from '../../../models/staff';

function StaffItem({
  item: { staffNumber, name, department },
  id,
}: {
  item: IStaff;
  id: number;
}) {
  const router = useRouter();
  const { setEdit } = useStaff();
  return (
    <Pressable
      onPress={() => {
        setEdit(id);
        router.push(staffNumber);
      }}
      className="ml-7 mr-10 flex-row rounded-lg bg-[#e0e0e0] py-2 px-4 dark:bg-[#2e2e2e]"
    >
      <Text className="w-3/12 font-app-thin text-lg text-black dark:text-white">
        {staffNumber}
      </Text>
      <Text className="flex-1 font-app-medium text-lg text-black dark:text-white">
        {name}
      </Text>
      <Text className="whitespace-nowrap font-app-light text-lg text-black dark:text-white">
        {department}
      </Text>
    </Pressable>
  );
}

function StaffDivider() {
  return <View className="h-2" />;
}

export default function Staff() {
  const { staff, updateStaff } = useStaff();
  const [refreshing, setRefreshing] = useState(true);

  const loadData = useCallback(async () => {
    setRefreshing(true);
    const s = await listStaffAPI();
    updateStaff(s.data);
    setRefreshing(false);
  }, [updateStaff]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="mt-8 flex-1 justify-center">
      {refreshing ? <View /> : null}
      <FlatList
        data={staff}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={StaffDivider}
        renderItem={({ item, index }) => <StaffItem item={item} id={index} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      />
    </View>
  );
}
