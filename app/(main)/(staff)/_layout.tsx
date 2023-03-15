import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Pressable, VectorIcon } from '../../../components/view';
import { IC_Newstaff } from '../../../components/icons';
import AppHeader from '../../../components/appHeader';
import { IStaff } from '../../../models/staff';
import { StaffContext, useStaff } from '../../../context/staffContext';

function StaffHeader() {
  const router = useRouter();
  const { setEdit } = useStaff();
  return (
    <AppHeader
      title="Staff"
      rightChild={
        <Pressable
          onTouchStart={() => {
            setEdit(-1);
            router.push('/(staff)/new');
          }}
          className="mt-px mr-3 h-9 w-9 self-center"
        >
          <VectorIcon
            darkModeColor="#fff"
            lightModeColor="#000"
            icon={IC_Newstaff}
          />
        </Pressable>
      }
    />
  );
}
export default function StaffLayout() {
  const [staff, updateStaff] = useState<IStaff[]>([]);
  const [edit, setEdit] = useState<number>(-1);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StaffContext.Provider value={{ staff, edit, updateStaff, setEdit }}>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: StaffHeader,
          }}
        />
        <Stack.Screen
          name="[edit]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StaffContext.Provider>
  );
}
