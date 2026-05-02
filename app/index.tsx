import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import useAuth from '@/hooks/useAuth';

export default function IndexPage() {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="dark flex-[1] justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return auth.accessToken ? <Redirect href="/Discover" /> : <Redirect href="/Login" />;
}