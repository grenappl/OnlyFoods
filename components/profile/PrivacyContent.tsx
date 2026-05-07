import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import { View , Switch, Text, TouchableOpacity } from "react-native";

export function PrivacyContent() {
  const { isDark } = useTheme();

  const [settings, setSettings] = useState({
    privateAccount: false,
    showFavorites: true,
    showRecipes: true,
    allowTagging: true,
    dataCollection: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    // save to backend/storage
  };

  const privacySettings = [
    {
      key: 'privateAccount',
      label: 'Private Account',
      description: 'Only approved followers can see your recipes',
    },
    {
      key: 'showFavorites',
      label: 'Show Favorites',
      description: 'Allow others to see your favorited recipes',
    },
    {
      key: 'showRecipes',
      label: 'Show My Recipes',
      description: 'Make your created recipes visible to others',
    }
  ] as const;

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-3">
        Privacy
      </Text>

      <View className="mb-3">
        {privacySettings.map((item, index) => (
          <View
            key={item.key}
            className={`flex-row items-center justify-between py-4 ${
              index < privacySettings.length - 1
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