import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleSignup = () => {
    // Placeholder for login logic
    router.back()
  };

  return (
    <SafeAreaProvider className="flex-1 bg-gradient-to-b from-orange-50 to-amber-100">
      <View className="flex-1 px-6 py-12 justify-center bg-background">
        {/* Logo/Icon - placeholder */}
        <View className="items-center mb-8">
          <Image source={require('@/assets/logo.png')} className='object-fit items-center w-[65%] h-16'/>
          <Text className="text-lg text-text mt-2 text-center">Create your account</Text>
        </View>

        <View className="space-y-4">
          <View className='mb-3'>
            <Text className="text-md font-medium text-text mb-1">Username</Text>
            <TextInput
              className="text-field"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
            />
          </View>

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

          <View className='mb-3'>
            <Text className="text-md font-medium text-text mb-1">Confirm Password</Text>
            <TextInput
              className="text-field"
              placeholder="Confirm your password"
              value={confPassword}
              onChangeText={setConfPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-accent-500 py-4 px-6 rounded-xl items-center mt-3"
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-white">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View className="flex-row justify-center mt-8 space-x-2">
          <Text className="text-sm text-text">Already have an account? </Text>
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text className="text-sm font-medium text-accent-600">Log in</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}