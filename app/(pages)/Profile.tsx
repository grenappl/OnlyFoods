import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Heart,
  BookOpen,
  BookHeart,
} from 'lucide-react-native';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';
import ProfileItem from '@/components/profile/ProfileItem';
import { useState } from 'react';
import StatTooltip, { STAT_TOOLTIPS } from '@/components/profile/StatToolTip';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { EditProfileContent, LogOutContent } from '@/components/profile/EditContent';
import useFavorites from '@/hooks/useFavorites';
import useRecipes from '@/hooks/useRecipes';

interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  title: string;
  onPress: () => void;
}

interface StatTooltipProps { 
  title: string; 
  description: string;
}

function StatCard({ onPress, icon, count, title }: StatCardProps){
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-background-50 dark:bg-background-dark-50 h-32 rounded-3xl flex-1 flex-col justify-between items-center py-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {icon}
      <View className='justify-between items-center'>
        <Text className='text-text-800 dark:text-text-dark-800 text-3xl'>{count}</Text>
        <Text className='text-text-400 dark:text-text-dark-600 text-sm mb-1'>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function ProfilePage() {
  const { auth } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { recipes } = useRecipes();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>();

  const [tooltip, setTooltip] = useState<StatTooltipProps | null>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content)
    setModalVisible(true);
  }

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
            icon={<BookOpen color="#F39C12" />}
            count={recipes.length}
            title="Recipes"
            onPress={() => setTooltip(() => STAT_TOOLTIPS.Recipes)}
          />
          <StatCard
            icon={<Heart color="#FB4141" />}
            count={1}
            title="Saves"
            onPress={() => setTooltip(() => STAT_TOOLTIPS.Saves)}
          />
          <StatCard
            icon={<BookHeart color="#2ECC71" />}
            count={favorites.length}
            title="Favorites"
            onPress={() => setTooltip(() => STAT_TOOLTIPS.Favorites)}
          />
        </View>

        <StatTooltip
          visible={!!tooltip}
          title={tooltip?.title ?? ''}
          description={tooltip?.description ?? ''}
          onClose={() => setTooltip(null)}
        />

        {/* Menu items */}
        <ProfileItem
          icon={<User size={20} color="#2ECC71" />}
          label="Edit Profile"
          onPress={() => openModal(<EditProfileContent />)}
        />
        <ProfileItem
          icon={<Bell size={20} color="#F39C12" />}
          label="Notifications"
          onPress={() => openModal(null)}
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
          onPress={() => openModal(null)}
        />
        <ProfileItem
          icon={<HelpCircle size={20} color={isDark ? '#9CA3AF' : "#4B5563"} />}
          label="Help & Support"
          onPress={() => openModal(null)}
        />

        {/* Divider */}
        <View className="h-px bg-background-300 dark:bg-background-dark-300 mx-1 my-3" />

        <ProfileItem
          icon={<LogOut size={20} color="#FB4141" />}
          label="Log Out"
          onPress={() => openModal(<LogOutContent />)}
          danger
        />

        <EditProfileModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          content={modalContent}
        />
      </View>
    </ScrollView>
  );
}