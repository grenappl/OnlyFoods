import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
 'expo-document-picker';

export function EditProfileContent(){
  const { isDark } = useTheme();

  const handleEdit = async () => {

  }

  const handleAttachImage = async () => {
    const pickedFile = await DocumentPicker.getDocumentAsync({
      type: 'image/*', // Allow all file types
      copyToCacheDirectory: true, // Ensures file is readable by expo-file-system
      multiple: false,
    });
    console.log(pickedFile)
  }

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-3">Profile Settings</Text>
      <View>
        <View className='mb-5 justify-center items-center'>
          <TouchableOpacity 
            className="size-32 bg-primary-100 dark:bg-background-dark-50 rounded-full"
            onPress={() => handleAttachImage()}
          >
            
          </TouchableOpacity>
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Username</Text>
          <TextInput
            className="text-field"
            placeholder="Edit your username"
            // value={username}
            // onChangeText={setUsername}
            autoCorrect={false}
            placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
          />
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Email</Text>
          <TextInput
            className="text-field"
            placeholder="Edit your email"
            // value={email}
            // onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
          />
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

export function LogOutContent(){
  const { logout } = useAuth();

  const handleLogout = async () => {
      await logout();
      router.replace('/Login');
  };
  
  return (
    <View>
      <Text className="text-center text-2xl font-bold text-secondary-500 dark:text-secondary-600 mb-3">Log Out</Text>
      <View>
        <Text className="text-center text-md text-text-700 dark:text-text-dark-800 leading-5 mb-6">
          Are you sure you want to logout?
        </Text>
        <TouchableOpacity
          className="bg-secondary-500 dark:bg-secondary-600 py-4 px-6 rounded-xl items-center mt-3"
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Confirm</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}