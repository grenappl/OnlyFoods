import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Plus } from "lucide-react-native";
import { privateApi } from "@/utils/api";

interface EditProfileContentType {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, 
  setPfp: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function EditProfileContent({setModalVisible, setPfp}: EditProfileContentType){
  const { isDark } = useTheme();
  const [ img, setImg ] = useState<string>('');
  const [ file, setFile ] = useState<{ uri: string, fileName: string, mimeType: string}>({});
  const { auth, setAuth } = useAuth();

  const [ username, setUsername ] = useState(auth?.user?.name);

  const [ nameError, setNameError ] = useState<string>('');
  const [ emailError, setEmailError ] = useState<string>('');
  const [ pfpError, setPfpError ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleEdit = async () => {
    if(!username) return setNameError('Username cannot be empty!'); 

    try {
      setIsLoading(true);
      console.log(await privateApi.put("/profiles/me", {
        name: username
      }))

      setAuth(prev => ({
        ...prev,
        user: {
          ...prev.user,
          name: username,
        }
      }));
      setNameError('')
    } catch (e: any) {
      setNameError(e.toString())
    } finally {
      setIsLoading(false)
    }

    if(img){
      try {
        setIsLoading(true);
        const form = new FormData();
        form.append("file", {
          uri: file.uri,
          name: file.fileName,
          type: file.mimeType,
        } as any);
        const res = await privateApi.post("/profiles/me/avatar", form);
        console.log(res)

        setAuth(prev => ({
          ...prev,
          user: {
            ...prev.user,
            avatar_url: res.data.avatar_url,
          }
        }));
        setPfp(res.data.avatar_url)
        setPfpError('')
      } catch (e: any) {
        setPfpError(e.toString())
      } finally {
        setIsLoading(false)
      }
    }

    if(!nameError && !pfpError){
      setModalVisible(false)
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
    if (!image.canceled) {
      setFile(image.assets[0])
      console.log(image.assets[0].fileName)
      console.log(image.assets[0].uri)
      console.log(image.assets[0].mimeType)
      setImg(image.assets[0].uri)
    }
  }

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-5">Profile Settings</Text>
      <View>
        <View className='mb-5 justify-center items-center'>
          <TouchableOpacity
            className="size-32 justify-center items-center bg-primary-50 dark:bg-background-dark-50 rounded-full overflow-hidden b"
            onPress={() => handleAttachImage()}
          >
            {img ? 
              <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />:
              <Plus size={36} color={isDark ? '#9CA3AF' : "#4B5563"}/>
            }
          </TouchableOpacity>
          {pfpError && <Text className="text-secondary-500 text-xs mt-2">{pfpError}</Text>}
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
        {/* <View className='mb-3'>
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
          <Text className={`edit-prof-field ${!emailError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}>
            {email}
          </Text>
        </View> */}
        <TouchableOpacity
          className="bg-accent-500 dark:bg-accent-700 py-3 px-6 rounded-xl items-center mt-3"
          onPress={handleEdit}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ?
            <ActivityIndicator color="white" size={24} /> :
          <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Save</Text>}
        </TouchableOpacity> 
      </View>
    </View>
  )
}