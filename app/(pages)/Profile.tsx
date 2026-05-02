import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react-native';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, onPress, danger = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-background-50 dark:bg-background-dark-50 px-4 py-4 rounded-2xl mb-3"
      style={{
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        // Android
        elevation: 2,
      }}
    >
      <View className="w-8 items-center">{icon}</View>
      <Text
        className={`flex-1 ml-3 font-semibold text-base ${
          danger ? 'text-secondary-500' : 'text-text-700 dark:text-text-dark-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfilePage() {
  const { auth, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace('/Login');
  };

  return (
    <ScrollView
      className="flex-1 bg-background-200 dark:bg-background-dark-100"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-16">

        {/* Avatar + user info */}
        <View className="items-center mb-8">
          <View className="size-24 rounded-full bg-accent-500 items-center justify-center mb-4 shadow-md">
            <User size={44} color="white" />
          </View>
          <Text className="text-xl font-bold text-text-700 dark:text-text-dark-800 mb-1">
            {auth.user?.name}
          </Text>
          <Text className="text-sm text-text-400 dark:text-text-dark-700">
            {auth.user?.email}
          </Text>
        </View>

        {/* Menu items */}
        <MenuItem
          icon={<User size={20} color="#2ECC71" />}
          label="Edit Profile"
          onPress={() => {}}
        />
        <MenuItem
          icon={<Bell size={20} color="#F39C12" />}
          label="Notifications"
          onPress={() => {}}
        />
        <MenuItem
          icon={isDark ?
            <Moon size={18} color={isDark ? '#9CA3AF' : "#4B5563"}/> :
            <Sun size={18} color={isDark ? '#9CA3AF' : "#4B5563"}/>}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          onPress={toggleTheme}
        />
        <MenuItem
          icon={<Lock size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />}
          label="Privacy"
          onPress={() => {}}
        />
        <MenuItem
          icon={<HelpCircle size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />}
          label="Help & Support"
          onPress={() => {}}
        />

        {/* Divider */}
        <View className="h-px bg-background-300 dark:bg-background-dark-300 my-2 mx-1" />

        <MenuItem
          icon={<LogOut size={20} color="#FB4141" />}
          label="Log Out"
          onPress={handleLogout}
          danger
        />
      </View>
    </ScrollView>
  );
}