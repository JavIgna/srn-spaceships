import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Spaceships' }}
        />
        <Stack.Screen
          name="spaceship/[id]"
          options={{ title: 'Spaceship Details' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
