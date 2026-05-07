import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

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