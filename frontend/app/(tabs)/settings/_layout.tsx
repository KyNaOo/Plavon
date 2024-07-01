import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function SettingsLayout() {

  return (
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="DetailsProfile" options={{ headerShown: false }} />
      </Stack>
  );
}
