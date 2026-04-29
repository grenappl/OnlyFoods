import '@/global.css';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ 

      }} />
      <Stack.Screen name="Signup" options={{
        
      }} />
    </Stack>
  );
}