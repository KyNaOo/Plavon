import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function GroupLayout() {

  return (
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Chat" options={{ headerShown: false }} />
      </Stack>
  );
}
