import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, Alert } from 'react-native';
import {
  Plus,
  Clock,
  Users,
  Pencil,
  Utensils,
  Trash2,
  Heart,
  Search,
  UtensilsCrossed,
} from 'lucide-react-native';
import { router } from 'expo-router';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes';
import { RecipeType } from '@/utils/Recipes';
import { useState } from 'react';
import RecipeDetail from '@/components/RecipeDetails';
import ConfirmModal from '@/components/ConfirmModal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;

// Array of cuisine types starting with Pinoy
const CUISINE_TYPES = [
  'American',
  'Chinese',
  'Filipino',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Spanish',
  'Thai',
];

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
  const favorites = recipe.favorites || 0; // Example favorites count
  let imageUri: string | null = null;
  if (typeof recipe.image === 'string' && recipe.image.trim().length > 0) {
    // It's already a clean string URL
    imageUri = recipe.image;
  } else if (Array.isArray(recipe.image) && recipe.image.length > 0) {
    // If it's a raw media array, extract the URL from the first object, or use it directly if it's an array of strings
    const firstMedia = recipe.image[0];
    imageUri = typeof firstMedia === 'object' ? firstMedia?.url : firstMedia;
  } else if (recipe.image && Array.isArray(recipe.image) && recipe.image.length > 0) {
    // Backup fallback: check if it's lurking inside the standard backend recipe_media sub-array
    imageUri = recipe.image[0]?.url || 'null';
  }
  //console.log('Recipe img in MyRecipes1: ', imageUri);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: CARD_WIDTH,
        marginBottom: 20,
        alignSelf: 'center',
      }}
      className="mb-3 overflow-hidden rounded-2xl bg-background-50 dark:bg-background-dark-50 shadow-2xl">
      {/* Image — Rectangular shape */}
      <View style={{ height: 220, position: 'relative' }}>
        {recipe.image ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full items-center justify-center gap-2 bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800">
            <UtensilsCrossed size={50} />
            <Text className="text-sm">No Image Provided</Text>
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
            onPress={onDelete}
            className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
            <Trash2 size={16} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info section */}
      <View className="px-4 py-3.5">
        {/* Cuisine Type - Below image */}
        <View className="mb-2 flex-row items-center gap-1.5">
          <Utensils size={12} color={isDark ? '#E5E7EB' : '#1F2A38'} />
          <Text
            className="text-xs font-medium uppercase tracking-wide text-text-500 dark:text-text-dark-400"
            style={{ color: isDark ? '#E5E7EB' : '#1F2A38' }}>
            {recipe.cuisineType} Cuisine
          </Text>
        </View>

        {/* Recipe Name */}
        <Text
          className="mb-2 text-lg font-bold"
          numberOfLines={1}
          style={{ color: isDark ? '#E5E7EB' : '#1F2A38' }}>
          {recipe.name}
        </Text>

        {/* Time & Servings */}
        <View className="flex-row items-center gap-4">
          {recipe.cookTime && (
            <View className="flex-row items-center gap-1.5">
              <Clock size={14} color={isDark ? '#E5E7EB' : '#1F2A38'} />
              <Text
                className="text-sm font-medium text-text-600 dark:text-text-dark-400"
                style={{ color: isDark ? '#E5E7EB' : '#1F2A38' }}>
                {recipe.cookTime} min
              </Text>
            </View>
          )}

          {recipe.servings && (
            <View className="flex-row items-center gap-1.5">
              <Users size={14} color={isDark ? '#E5E7EB' : '#1F2A38'} />
              <Text
                className="text-sm font-medium text-text-600 dark:text-text-dark-400"
                style={{ color: isDark ? '#E5E7EB' : '#1F2A38' }}>
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
  const { recipes, removeRecipe } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<RecipeType | null>(null); // 1. Add this

  const handleCreate = () => router.push('/RecipeEditor');

  const handleDelete = () => {
    if (recipeToDelete) {
      removeRecipe(recipeToDelete.id);
      setRecipeToDelete(null);
    }
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100">
      {/* Header with gradient background */}
      <View className="bg-gradient-to-b from-accent-500/10 via-transparent to-transparent px-4 pb-6 pt-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-text-700 dark:text-text-dark-800">
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
          renderItem={({ item }) => {
            console.log('item: ', item);
            return (
              <RecipeCard
                recipe={item}
                isDark={isDark}
                onPress={() => setSelectedRecipe(item)}
                onEdit={() => router.push({ pathname: '/RecipeEditor', params: { id: item.id } })}
                onDelete={() => {
                  setRecipeToDelete(item);
                  setModalVisible(true);
                }}
              />
            );
          }}
        />
      ) : (
        <View className="-mt-20 flex-1 items-center justify-center px-8">
          <View className="items-center">
            {/* Green Circle with Plus */}
            <View
              className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-300 shadow-lg shadow-green-500/30"
              style={{ backgroundColor: isDark ? '#0b7a29' : '#1F2A38' }}>
              <Plus size={35} color={isDark ? '#23da3e' : '#1F2A38'} />
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

      <ConfirmModal
        visible={modalVisible}
        title="Delete Item?"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
        danger={true}
      />

      <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </View>
  );
}
