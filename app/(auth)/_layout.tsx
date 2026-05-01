import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      animation: 'none'
    }}>
      <Stack.Screen name="Login" options={{ 
        headerShown: false
      }} />
      <Stack.Screen name="Signup" options={{
        headerShown: false
      }} />
    </Stack>
  );
}