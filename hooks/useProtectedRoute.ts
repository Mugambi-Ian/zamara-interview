import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { IUser } from '../models/user';

export default function useProtectedRoutes(user: IUser) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (user && inAuthGroup) {
      router.replace('/(home)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments]);
}
