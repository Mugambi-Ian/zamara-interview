import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useColorScheme } from 'react-native';

export default function useAppTheme() {
  const colorScheme = useColorScheme();
  const { setColorScheme, toggleColorScheme } = useNativeWindColorScheme();
  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark: colorScheme === 'dark',
  };
}
