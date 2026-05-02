import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      animation: 'none',
      presentation: "transparentModal" 
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