import Header from '@/components/Header';
import { Tabs } from 'expo-router';
import { BookSearch, ChefHat, Heart, ListFilterPlus, UserRound } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function PagesLayout() {
  const colorScheme = useColorScheme();
  const activeColor = "#F39C12";
  // const inactiveColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fcf8f4"
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
        header: () => <Header />,
        tabBarIcon: ({ color }) => <UserRound color={color} />,
        tabBarActiveTintColor: activeColor
      }} />
    </Tabs>
  );
}
