import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import useTheme from '@/hooks/useTheme';
import { Eye, EyeOff } from 'lucide-react-native';
import AuthThemeSwitch from '@/components/AuthThemeSwitch';
import ErrorModal from '@/components/ErrorModal';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const { isDark } = useTheme();

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfPassword, setSecureConfPassword] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorVisible(true);
    return false;
  };

  const validateInput = () => {
    if (!username) return showError('Please enter your username.');
    if (!email) return showError('Please enter your email address.');
    if (!password) return showError('Please enter your password.');
    if (!confPassword) return showError('Please confirm your password.');

    if (!email.includes('@')) return showError('Please enter a valid email address.');
    if (password.length < 8 || confPassword.length < 8) return showError("Password must be at least 8 characters long.");
    if (password !== confPassword) return showError("Passwords don't match.");

    return true;
  }

  const handleSignup = async () => {
    if(!validateInput()) return;
    try {
      // smth here
      router.back()
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
      <View className="flex-1 px-6 py-12 justify-center bg-background-200 dark:bg-background-dark-100">
        <AuthThemeSwitch />

        <View className="items-center mb-8 gap-5">
          <Image source={isDark ? require('@/assets/logo-dark.png'): require('@/assets/logo.png')} className='items-center w-[65%] h-16' resizeMode="contain"/>
          <Text className="text-lg text-text-800 dark:text-text-dark-900 mt-2 text-center">Create your account</Text>
        </View>

        <View className="space-y-4">
          <View className='mb-3'>
            <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Username</Text>
            <TextInput
              className="text-field"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
            />
          </View>

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

          <View className='mb-3'>
            <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Confirm Password</Text>
            <View className='relative'>
              <TextInput
                className="text-field"
                placeholder="Confirm your password"
                value={confPassword}
                onChangeText={setConfPassword}
                secureTextEntry={secureConfPassword}
                placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
              />
              <TouchableOpacity
                onPress={() => setSecureConfPassword((prev) => !prev)}
                className="absolute right-4 top-0 bottom-0 justify-center"
              >
                {secureConfPassword
                  ? <EyeOff size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                  : <Eye size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                }
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary-500 py-4 px-6 rounded-xl items-center mt-3"
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-semibold text-text-50">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View className="flex-row justify-center mt-8 space-x-2">
          <Text className="text-sm text-text-800 dark:text-text-dark-900 ">Already have an account? </Text>
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text className="text-sm font-medium text-primary-600 dark:text-primary-400">Log in</Text>
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