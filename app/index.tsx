import { AuthProvider } from '@/context/AuthProvider';
import useAuth from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function IndexPage() {
  const { auth } = useAuth();

  console.log(auth)

  return (
    <AuthProvider>
      {Object.keys(auth).length <= 0 ? <Redirect href="/Login" />: <Redirect href="/Discover" />}
    </AuthProvider>
  )
}