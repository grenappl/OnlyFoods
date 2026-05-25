import useTheme from "@/hooks/useTheme";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

export function ChangePasswordContent(){
  const { isDark } = useTheme();

  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const [secureCurrPass, setSecureCurrPass] = useState(true);
  const [secureNewPass, setSecureNewPass] = useState(true);
  const [secureConfPass, setSecureConfPass] = useState(true);

  const [currPassError, setCurrPassError] = useState<string>('');
  const [newPassError, setNewPassError] = useState<string>('');
  const [confPassError, setConfPassError] = useState<string>('');

  const handleChange = async () => {
    if(!currPass) return setCurrPassError('Password cannot be empty!'); 
    if(!newPass) return setNewPassError('Password cannot be empty!'); 
    if(!confPass) return setConfPassError('Password cannot be empty!'); 

    // api stuff here
    // await privateApi.post('/reset-password/confirm')
  }

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-2">Change Password</Text>
      <Text className="text-center text-xs text-text-700 dark:text-text-dark-700 mb-8">Update password for enhance account security</Text>
      <View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Current Password</Text>
          <View className='relative'>
            <TextInput
              className={`edit-prof-field ${!currPassError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}
              placeholder="Enter your current password"
              value={currPass}
              onChangeText={setCurrPass}
              secureTextEntry={secureCurrPass}
              placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
              onPress={() => { if(currPassError) setCurrPassError('') }}
            />
            <TouchableOpacity
              onPress={() => setSecureCurrPass((prev) => !prev)}
              className="absolute right-4 top-0 bottom-0 justify-center"
            >
              {secureCurrPass
                ? <EyeOff size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                : <Eye size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
              }
            </TouchableOpacity>
          </View>
          {currPassError && <Text className="text-secondary-500 text-xs">{currPassError}</Text>}
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">New Password</Text>
          <View className='relative'>
            <TextInput
              className={`edit-prof-field ${!newPassError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}
              placeholder="Enter your new password"
              value={newPass}
              onChangeText={setNewPass}
              secureTextEntry={secureNewPass}
              placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
              onPress={() => { if(newPassError) setNewPassError('') }}
            />
            <TouchableOpacity
              onPress={() => setSecureNewPass((prev) => !prev)}
              className="absolute right-4 top-0 bottom-0 justify-center"
            >
              {secureNewPass
                ? <EyeOff size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                : <Eye size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
              }
            </TouchableOpacity>
          </View>
          {newPassError && <Text className="text-secondary-500 text-xs">{newPassError}</Text>}
        </View>
        <View className='mb-3'>
          <Text className="text-md font-medium text-text-800 dark:text-text-dark-900 mb-1">Confirm Password</Text>
          <View className='relative'>
            <TextInput
              className={`edit-prof-field ${!confPassError ? "border-primary-50 dark:border-background-dark-50": "border-secondary-500"}`}
              placeholder="Confirm your new password"
              value={confPass}
              onChangeText={setConfPass}
              secureTextEntry={secureConfPass}
              placeholderTextColor={isDark ? '#9CA3AF': "#4B5563"}
              onPress={() => { if(confPassError) setConfPassError('') }}
            />
            <TouchableOpacity
              onPress={() => setSecureConfPass((prev) => !prev)}
              className="absolute right-4 top-0 bottom-0 justify-center"
            >
              {secureConfPass
                ? <EyeOff size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
                : <Eye size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />
              }
            </TouchableOpacity>
          </View>
          {confPassError && <Text className="text-secondary-500 text-xs">{confPassError}</Text>}
        </View>
        <TouchableOpacity
          className="bg-accent-500 dark:bg-accent-700 py-3 px-6 rounded-xl items-center mt-3"
          onPress={handleChange}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Apply Changes</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}