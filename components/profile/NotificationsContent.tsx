import useTheme from "@/hooks/useTheme";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export function NotificationsContent() {
  const { isDark } = useTheme();

  const [settings, setSettings] = useState({
    newRecipes: true,
    favorites: true,
    weeklyDigest: false,
    tips: false,
    updates: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    // save to backend/storage
  };

  const notifications = [
    {
      key: 'newRecipes',
      label: 'New Recipes',
      description: 'Get notified when new recipes are added',
    },
    {
      key: 'favorites',
      label: 'Favorites Activity',
      description: 'Updates about your saved recipes',
    },
    {
      key: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'A weekly summary of top recipes',
    },
    {
      key: 'tips',
      label: 'Cooking Tips',
      description: 'Helpful tips and tricks for cooking',
    },
    {
      key: 'updates',
      label: 'App Updates',
      description: 'Stay informed about new features',
    },
  ] as const;

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-3">
        Notifications
      </Text>

      <View className="mb-3">
        {notifications.map((item, index) => (
          <View
            key={item.key}
            className={`flex-row items-center justify-between py-4 ${
              index < notifications.length - 1
                ? 'border-b border-background-200 dark:border-background-dark-300'
                : ''
            }`}
          >
            <View className="flex-1 pr-4">
              <Text className="text-md font-medium text-text-800 dark:text-text-dark-900">
                {item.label}
              </Text>
              <Text className="text-xs text-text-400 dark:text-text-dark-500 mt-0.5">
                {item.description}
              </Text>
            </View>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggle(item.key)}
              trackColor={{ false: isDark ? '#374151' : '#D1D5DB', true: '#2ECC71' }}
              thumbColor="white"
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        className="bg-accent-500 dark:bg-accent-700 py-3 px-6 rounded-xl items-center mt-3"
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-semibold text-text-50 dark:text-text-dark-50">Save</Text>
      </TouchableOpacity>
    </View>
  );
}