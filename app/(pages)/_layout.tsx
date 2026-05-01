import Header from '@/components/Header';
import useTheme from '@/hooks/useTheme';
import { Tabs } from 'expo-router';
import { BookSearch, ChefHat, Heart, ListFilterPlus, UserRound } from 'lucide-react-native';

export default function PagesLayout() {
  const activeColor = "#F39C12";
  const { isDark } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#18140F' : "#FEF9F3"
        },
      }}
    >
      <Tabs.Screen name="Discover" options={{ 
        header: () => <Header />,
        tabBarIcon: ({ color }) => <BookSearch color={color} />,
        tabBarActiveTintColor: activeColor,
      }} />
      <Tabs.Screen name="Filter" options={{
        header: () => <Header />,
        tabBarIcon: ({ color }) => <ListFilterPlus color={color} />,
        tabBarActiveTintColor: activeColor
      }} />
      <Tabs.Screen name="Favorites" options={{ 
        header: () => <Header />,
        tabBarIcon: ({ color }) => <Heart color={color} />,
        tabBarActiveTintColor: activeColor
      }} />
      <Tabs.Screen name="CreateRecipe" options={{ 
        title: 'Recipe',
        header: () => <Header />,
        tabBarIcon: ({ color }) => <ChefHat color={color} />,
        tabBarActiveTintColor: activeColor
      }} />
      <Tabs.Screen name="Profile" options={{ 
        header: () => {},
        tabBarIcon: ({ color }) => <UserRound color={color} />,
        tabBarActiveTintColor: activeColor
      }} />
    </Tabs>
  );
}
