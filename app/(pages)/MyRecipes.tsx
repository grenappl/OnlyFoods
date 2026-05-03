import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Plus, Clock, Users, Pencil } from 'lucide-react-native';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes'; // your hook for user-created recipes
import RecipeRow from '@/components/RecipeRow';
import { RecipeType } from '@/utils/Recipes';
import { useState } from 'react';
import RecipeDetail from '@/components/RecipeDetails';

export default function MyRecipesPage() {
  const { isDark } = useTheme();
  const { recipes } = useRecipes();

  const handleCreate = () => router.push('/RecipeEditor');

  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100 px-2 pt-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5 px-2">
        <Text className="text-2xl font-semibold text-text-700 dark:text-text-dark-900">
          My Recipes
        </Text>
        <TouchableOpacity
          onPress={handleCreate}
          className="flex-row items-center gap-2 bg-accent-500 px-4 py-2 rounded-full"
        >
          <Plus size={16} color="white" />
          <Text className="text-white text-sm font-semibold">New Recipe</Text>
        </TouchableOpacity>
      </View>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          contentContainerClassName="px-2"
          renderItem={({ item }) => (
            <RecipeRow 
              recipe={item}
              onPress={() => setSelectedRecipe(item)}
              icon={<Pencil size={22} color={isDark ? '#9CA3AF' : '#6B7280'} />}
              iconAction={() => router.push({ pathname: '/RecipeEditor', params: { id: item.id }})}
            />
          )}
        />
      ) : (
        // Empty state
        <View className="flex-1 items-center justify-center pb-20 gap-4">
          <TouchableOpacity
            onPress={handleCreate}
            className="size-20 rounded-full bg-accent-100 dark:bg-accent-900 items-center justify-center"
          >
            <Plus size={36} color="#2ECC71" />
          </TouchableOpacity>
          <Text className="text-text-800 dark:text-text-dark-800 font-bold text-xl">
            No recipes yet
          </Text>
          <Text className="text-text-500 dark:text-text-dark-600 text-sm text-center px-8">
            Start creating your own recipes and share them with the community!
          </Text>
          <TouchableOpacity
            onPress={handleCreate}
            className="bg-accent-500 px-8 py-3 rounded-full mt-2"
          >
            <Text className="text-white font-semibold text-base">Create Your First Recipe</Text>
          </TouchableOpacity>
        </View>
      )}
      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </View>
  );
}