import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, Alert } from 'react-native';
import { Plus, Clock, Users, Pencil, Utensils, Trash2, Heart, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes';
import { RecipeType } from '@/utils/Recipes';
import { useState } from 'react';
import RecipeDetail from '@/components/RecipeDetails';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;

function RecipeCard({
  recipe,
  onPress,
  onEdit,
  onDelete,
  isDark,
}: {
  recipe: RecipeType;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDark: boolean;
}) {
  // Default cuisine types - replace with recipe.cuisine if available
  const getCuisineType = () => {
    const cuisineMap: { [key: string]: string } = {
      Pizza: 'Italian',
      Pasta: 'Italian',
      Sushi: 'Japanese',
      Taco: 'Mexican',
      Curry: 'Indian',
      'Stir Fry': 'Chinese',
      Burger: 'American',
      Salad: 'International',
    };

    for (const [key, value] of Object.entries(cuisineMap)) {
      if (recipe.name.includes(key)) {
        return value;
      }
    }
    return 'International';
  };

  const cuisine = getCuisineType();
  const favorites = recipe.favorites || Math.floor(Math.random() * 100) + 1; // Example favorites count

  const handleDelete = () => {
    Alert.alert('Delete Recipe', `Are you sure you want to delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: CARD_WIDTH,
        marginBottom: 20,
        alignSelf: 'center',
      }}
      className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-background-dark-200">
      {/* Image — Rectangular shape */}
      <View style={{ height: 220, position: 'relative' }}>
        {recipe.image ? (
          <Image
            source={{ uri: recipe.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800">
            <Text style={{ fontSize: 56 }}>🍽️</Text>
          </View>
        )}

        {/* Favorites Count - Top Left */}
        <View className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-sm">
          <Heart size={12} color="#FF6B6B" fill="#FF6B6B" />
          <Text className="text-xs font-semibold text-white">{favorites}</Text>
        </View>

        {/* Action Buttons - Top Right */}
        <View className="absolute right-3 top-3 flex-row gap-2">
          <TouchableOpacity
            onPress={onEdit}
            className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
            <Pencil size={16} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
            <Trash2 size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info section */}
      <View className="px-4 py-3.5">
        {/* Cuisine Type - Below image */}
        <View className="mb-2 flex-row items-center gap-1.5">
          <Utensils size={12} color="#2ECC71" />
          <Text className="text-xs font-medium uppercase tracking-wide text-text-500 dark:text-text-dark-400">
            {cuisine} Cuisine
          </Text>
        </View>

        {/* Recipe Name */}
        <Text
          className="mb-2 text-lg font-bold text-text-800 dark:text-text-dark-800"
          numberOfLines={1}>
          {recipe.name}
        </Text>

        {/* Time & Servings */}
        <View className="flex-row items-center gap-4">
          {recipe.cookTime && (
            <View className="flex-row items-center gap-1.5">
              <Clock size={14} color="#2ECC71" />
              <Text className="text-sm font-medium text-text-600 dark:text-text-dark-400">
                {recipe.cookTime}
              </Text>
            </View>
          )}

          {recipe.servings && (
            <View className="flex-row items-center gap-1.5">
              <Users size={14} color="#3498DB" />
              <Text className="text-sm font-medium text-text-600 dark:text-text-dark-400">
                {recipe.servings}{' '}
                {typeof recipe.servings === 'number' && recipe.servings > 1
                  ? 'servings'
                  : 'serving'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MyRecipesPage() {
  const { isDark } = useTheme();
  const { recipes, removeRecipe } = useRecipes(); // Assuming deleteRecipe is available from your hook
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const handleCreate = () => router.push('/RecipeEditor');

  const handleDeleteRecipe = (recipeId: number) => {
    // Call your delete function from the recipes hook
    if (removeRecipe) {
      removeRecipe(recipeId);
    } else {
      // If deleteRecipe doesn't exist in your hook, you can implement it
      console.log('Delete recipe:', recipeId);
      // You might need to implement the deletion logic here
    }
  };

  return (
    <View className="flex-1 bg-background-100 dark:bg-background-dark-100">
      {/* Header with gradient background */}
      <View className="bg-gradient-to-b from-accent-500/10 via-transparent to-transparent px-4 pb-6 pt-12">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-text-800 dark:text-text-dark-800">
              My Recipes
            </Text>
            <Text className="mt-1 text-sm text-text-500 dark:text-text-dark-500">
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} created
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCreate}
            className="flex-row items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 shadow-lg shadow-accent-500/30">
            <Plus size={18} color="white" />
            <Text className="text-sm font-semibold text-white">New Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 100,
          }}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isDark={isDark}
              onPress={() => setSelectedRecipe(item)}
              onEdit={() => router.push({ pathname: '/RecipeEditor', params: { id: item.id } })}
              onDelete={() => handleDeleteRecipe(item.id)}
            />
          )}
        />
      ) : (
        <View className="-mt-20 flex-1 items-center justify-center px-8">
          <View className="items-center">
            {/* Green Circle with Magnifying Glass */}
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-300 shadow-lg shadow-green-500/30">
              <Plus size={35} color="green" />
            </View>

            <Text className="text-1xl mb-2 font-bold text-text-800 dark:text-text-dark-800">
              No recipes yet
            </Text>

            <Text className="mb-8 text-center text-sm leading-5 text-text-500 dark:text-text-dark-500">
              Start creating your own recipes and share them with the community!
            </Text>

            <TouchableOpacity
              onPress={handleCreate}
              className="flex-row items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 shadow-lg shadow-accent-500/40">
              <Text className="text-base font-semibold text-white">Create Your First Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </View>
  );
}
