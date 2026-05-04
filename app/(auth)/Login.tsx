import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Button, Modal } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';
import AuthThemeSwitch from '@/components/AuthThemeSwitch';
import { Eye, EyeOff } from 'lucide-react-native';
import ErrorModal from '@/components/ErrorModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth()
  const { isDark } = useTheme()

  const [securePassword, setSecurePassword] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorVisible(true);
    return false;
  };

  const validateInput = () => {
    if (!email) return showError('Please enter your email address.');
    if (!password) return showError('Please enter your password.');
    if (!email.includes('@')) return showError('Please enter a valid email address.');
    return true;
  }

  const handleLogin = async () => {
    if(!validateInput()) return;
    try {
      // const { user, accessToken } = await yourLoginApi(email, password);
      setAuth({
        user: { id: '1', name: 'John', email: email },
        accessToken: 'your-token-here',
      });
      router.replace('/Discover');
    } catch (e: any) {
      showError(e?.message ?? 'Invalid email or password. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-background-200 dark:bg-background-dark-100 flex-1 px-6 py-12 justify-center relative">
        <AuthThemeSwitch />

        <View className="items-center mb-8 gap-5">
          <Image source={isDark ? require('@/assets/logo-dark.png'): require('@/assets/logo.png')} className='items-center w-[65%] h-16' resizeMode="contain"/>
          <Text className="text-lg text-text-800 dark:text-text-dark-900 mt-2 text-center">Sign in to your account</Text>
        </View>

        <View className="space-y-4">
          <View className='mb-3'>
            <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Email</Text>
            <TextInput
              className="text-field"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
            />
          </View>

          <View className='mb-3'>
            <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Password</Text>
            <View className='relative'>
              <TextInput
                className="text-field"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={securePassword}
                placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
              />
              <TouchableOpacity
                onPress={() => setSecurePassword((prev) => !prev)}
                className="absolute right-4 top-0 bottom-0 justify-center"
              >
                {securePassword
                  ? <EyeOff size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                  : <Eye size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                }
            </TouchableOpacity>
          </View>
          </View>

          <TouchableOpacity
            className="bg-primary-500 py-4 px-6 rounded-xl items-center mt-3"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-text-50">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View className="flex-row justify-center mt-8 space-x-2">
          <Text className="text-sm text-text-800 dark:text-text-dark-900">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push('/Signup')}
          >
            <Text className="text-sm font-medium text-primary-600 dark:text-primary-400">Sign up</Text>
          </TouchableOpacity>
        </View>

        <ErrorModal
          visible={errorVisible}
          message={errorMessage}
          onClose={() => setErrorVisible(false)}
        />
      </View>
    </ScrollView>
  );
}