import useAuth from "@/hooks/useAuth";
import { privateApi } from "@/utils/api";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

function DeactivateAccountContent() {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
		setIsLoading(true);
		await privateApi.patch('/profiles/deactivate');
    setAuth({})
		router.replace('/Login');
  };
  
  return (
    <View>
      <Text className="text-center text-2xl font-bold text-secondary-500 dark:text-secondary-600 mb-3">Deactivate</Text>
      <View>
        <Text className="text-center text-md text-text-700 dark:text-text-dark-800 leading-5 mb-6">
          You will no longer be able to login once this action is done. Do you wish to deactivate your account?
        </Text>
        <TouchableOpacity
          className="bg-secondary-500 dark:bg-secondary-600 py-4 px-6 rounded-xl items-center mt-3"
          onPress={handleLogout}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ?
            <ActivityIndicator color="white" size={24} /> :
            <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Confirm</Text>}
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default DeactivateAccountContent