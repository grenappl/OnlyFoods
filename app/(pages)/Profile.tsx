import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  X,
  Heart,
  BookOpen,
  BookHeart,
} from 'lucide-react-native';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';
import ProfileItem from '@/components/ProfileItem';
import { useState } from 'react';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  title: string;
}

function EditProfileModal({ visible, onClose, title }: ModalProps){
  const { isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-center items-center px-6 h-full"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-full bg-background-50 dark:bg-background-dark-200 rounded-3xl p-6"
        >
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={18} color={isDark ? '#9CA3AF' : "#4B5563"} />
          </TouchableOpacity>

          <Text className="text-center text-xl font-bold text-text-800 dark:text-text-dark-800 mb-2">
            {title}
          </Text>

          {/* modal content here */}
          <View>
            <Text className="text-center text-sm text-text-700 dark:text-text-dark-700 leading-5 mb-6">
              stuff here
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

function StatCard({ icon, count, title }: StatCardProps){
  return (
    <View className='bg-background-50 dark:bg-background-dark-50 h-32 rounded-3xl flex-1 shadow-2xl flex-col justify-between items-center py-3'>
      {icon}
      <View className='justify-between items-center'>
        <Text className='text-text-800 dark:text-text-dark-800 text-3xl'>{count}</Text>
        <Text className='text-text-400 dark:text-text-dark-600 text-sm mb-1'>{title}</Text>
      </View>
    </View>
  )
}

export default function ProfilePage() {
  const { auth, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title: string) => {
    setModalTitle(title)
    setModalVisible(true);
  }

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
        <View className="items-center mb-5">
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

        {/* Stat Cards */}
        <View className='flex-row gap-3 my-5 mb-8'>
          <StatCard
            icon={<BookOpen color="#F39C12"/>}
            count={0}
            title='Recipes'
          />
          <StatCard 
            icon={<Heart color="#FB4141"/>}
            count={1}
            title='Saves'
          />
          <StatCard
            icon={<BookHeart color="#2ECC71"/>}
            count={1}
            title='Favorites'
          />
        </View>

        {/* Menu items */}
        <ProfileItem
          icon={<User size={20} color="#2ECC71" />}
          label="Edit Profile"
          onPress={() => openModal('Profile Settings')}
        />
        <ProfileItem
          icon={<Bell size={20} color="#F39C12" />}
          label="Notifications"
          onPress={() => openModal('Notifications')}
        />
        <ProfileItem
          icon={isDark ?
            <Moon size={18} color={isDark ? '#9CA3AF' : "#4B5563"}/> :
            <Sun size={18} color={isDark ? '#9CA3AF' : "#4B5563"}/>}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          onPress={toggleTheme}
        />
        <ProfileItem
          icon={<Lock size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />}
          label="Privacy"
          onPress={() => openModal('Privacy Settings')}
        />
        <ProfileItem
          icon={<HelpCircle size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />}
          label="Help & Support"
          onPress={() => openModal('Help & Support')}
        />

        {/* Divider */}
        <View className="h-px bg-background-300 dark:bg-background-dark-300 mx-1" />

        <ProfileItem
          icon={<LogOut size={20} color="#FB4141" />}
          label="Log Out"
          onPress={handleLogout}
          danger
        />

        <EditProfileModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
        />
      </View>
    </ScrollView>
  );
}