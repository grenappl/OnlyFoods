import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Plus } from "lucide-react-native";

export function EditProfileContent(){
  const { isDark } = useTheme();
  const { auth } = useAuth();
  const [ pfp, setPfp ] = useState(auth?.user?.pfp);
  const { setAuth } = useAuth();

  const [ username, setUsername ] = useState(auth?.user?.name);
  const [ email, setEmail ] = useState(auth?.user?.email);

  const [ nameError, setNameError ] = useState<string>('');
  const [ emailError, setEmailError ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleEdit = async () => {
    if(!username) return setNameError('Username cannot be empty!'); 
    if(!email) return setEmailError('Email cannot be empty!'); 
    if(!email.includes('@')) return setEmailError('Invalid email!');

    try {
      // api route here
      setAuth(prev => ({
        ...prev,
      }))
    } catch (e: any) {
      return Alert.alert('Error', e?.message)
    }
  }

  const handleAttachImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(image);
    if (!image.canceled) setPfp(image.assets[0].uri)
  }

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-3">Profile Settings</Text>
      <View>
        <View className='mb-5 justify-center items-center'>
          <TouchableOpacity
            className="size-32 justify-center items-center bg-primary-50 dark:bg-background-dark-50 rounded-full overflow-hidden b"
            onPress={() => handleAttachImage()}
          >
            {pfp ? 
              <Image source={{ uri: pfp }} className="w-full h-full" resizeMode="cover" />:
              <Plus size={36} color={isDark ? '#9CA3AF' : "#4B5563"}/>
            }
          </TouchableOpacity>
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Username</Text>
          <TextInput
            className={`edit-prof-field ${!nameError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}
            placeholder="Edit your username"
            value={username}
            onChangeText={setUsername}
            autoCorrect={false}
            placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
            onPress={() => {if(nameError) setNameError('')}}
          />
          {nameError && <Text className="text-secondary-500 text-xs">{nameError}</Text>}
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Email</Text>
          <TextInput
            className={`edit-prof-field ${!emailError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}
            placeholder="Edit your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
            onPress={() => {if(emailError) setEmailError('')}}
          />
          {emailError && <Text className="text-secondary-500 text-xs">{emailError}</Text>}
        </View>
        <TouchableOpacity
          className="bg-accent-500 dark:bg-accent-700 py-3 px-6 rounded-xl items-center mt-3"
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Save</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}