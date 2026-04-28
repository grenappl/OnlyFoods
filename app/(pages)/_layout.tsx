import '@/global.css';
import { Tabs } from 'expo-router';

export default function PagesLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="Filter" options={{ title: 'Filter' }} />
      <Tabs.Screen name="Favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="CreateRecipe" options={{ title: 'CreateRecipe' }} />
      <Tabs.Screen name="Profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}