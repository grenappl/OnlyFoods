import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAuth from '@/hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth()

  const handleLogin = async () => {
    // const { user, accessToken } = await yourLoginApiCall(email, password);
    setAuth({
      user: { id: '1', name: 'John', email: email },
      accessToken: 'your-token-here',
    });
    router.replace('/Discover');
  };
  
  return (
    <SafeAreaProvider className="flex-1 bg-gradient-to-b from-orange-50 to-amber-100">
      <View className="flex-1 px-6 py-12 justify-center bg-background-200">
        {/* Logo/Icon - placeholder */}
        <View className="items-center mb-8">
          <Image source={require('@/assets/logo.png')} className='object-fit items-center w-[65%] h-16'/>
          <Text className="text-lg text-text mt-2 text-center">Sign in to your account</Text>
        </View>

        <View className="space-y-4">
          <View className='mb-3'>
            <Text className="text-md font-medium text-text mb-1">Email</Text>
            <TextInput
              className="text-field"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className='mb-3'>
            <Text className="text-md font-medium text-text mb-1">Password</Text>
            <TextInput
              className="text-field"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-primary-500 py-4 px-6 rounded-xl items-center mt-3"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-white">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View className="flex-row justify-center mt-8 space-x-2">
          <Text className="text-sm text-text">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push('/Signup')}
          >
            <Text className="text-sm font-medium text-primary-600">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}