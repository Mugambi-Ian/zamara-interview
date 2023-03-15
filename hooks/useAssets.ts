import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function useAssets() {
  const [loaded, error] = useFonts({
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Ultra': require('../assets/fonts/Roboto-Black.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return { loaded, error };
}
