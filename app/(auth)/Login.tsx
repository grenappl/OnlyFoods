import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder for login logic
    console.log('Login attempt:', { email, password });
    // On success: router.replace('/(pages)');
  };

  return (
    <SafeAreaProvider className="flex-1 bg-gradient-to-b from-orange-50 to-amber-100">
      <View className="flex-1 px-6 py-12 justify-center bg-background">
        {/* Logo/Icon - placeholder */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900 text-center">Welcome to OnlyFoods!</Text>
          <Text className="text-lg text-text mt-2 text-center">Sign in to your account</Text>
        </View>

        <View className="space-y-4">
          <View className='mb-3'>
            <Text className="text-md font-medium text-text mb-1">Email</Text>
            <TextInput
              className="px-4 py-3 bg-accent-100 border border-accent-100  rounded-xl text-base focus:border-accent-500 focus:outline-none"
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
              className="px-4 py-3 bg-accent-100 border border-accent-100 rounded-xl text-base focus:border-accent-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-accent-500 py-4 px-6 rounded-xl items-center mt-3"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-white">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View className="flex-row justify-center mt-8 space-x-2">
          <Text className="text-sm text-text">Don't have an account? </Text>
          <Link href="/Signup" asChild>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-accent-600">Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaProvider>
  );
}