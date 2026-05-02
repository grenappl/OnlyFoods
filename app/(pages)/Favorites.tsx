import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Heart, Search, Clock, Users, SearchX } from 'lucide-react-native';
import RecipeDetail from '@/components/RecipeDetails';
import recipes, { RecipeType } from '@/utils/Recipes';
import useTheme from '@/hooks/useTheme';

interface RecipeFavoriteCard {
  recipe: RecipeType;
  onPress: () => void;
  onUnlike: () => void;
}

function RecipeRow({ recipe, onPress, onUnlike }: RecipeFavoriteCard) {
  const { isDark } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row items-center bg-background-50 dark:bg-background-dark-50 rounded-2xl mb-3 overflow-hidden"
      // style={{ height: 90 }}
      style={{
        height: 90,
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        // Android
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: recipe.image }}
        style={{ width: 90, height: 90 }}
        resizeMode="cover"
      />

      <View className="flex-1 px-4 justify-center">
        <Text className="text-text-800 dark:text-text-dark-800 font-semibold text-base mb-1" numberOfLines={1}>
          {recipe.name}
        </Text>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-2">
            <Clock size={12} color={ isDark ? '#D1D5DB': '#374151'} />
            <Text className="text-xs text-text-600 dark:text-text-dark-700">{recipe.cookTime}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Users size={12} color={ isDark ? '#D1D5DB': '#374151'} />
            <Text className="text-xs text-text-600 dark:text-text-dark-700">{recipe.servings}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={onUnlike}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        className="pr-4"
      >
        <Heart size={22} color="#e74c3c" fill="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function FavoritesPage() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<RecipeType[]>(recipes.slice(0, 5));
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const { isDark } = useTheme()

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return favorites;
    return favorites.filter((r) => r.name.toLowerCase().includes(q));
  }, [search, favorites]);

  const handleUnlike = (id: number) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100 px-2 pt-5">
      <Text className="text-2xl text-text-700 dark:text-text-dark-800 font-bold mb-5 ml-2">Favorites</Text>

      <View 
        className="flex-row items-center bg-background-50 dark:bg-background-dark-50 rounded-2xl px-4 mb-5 mx-2 h-12"
        style={{
          // iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          // Android
          elevation: 2,
        }}
      >
        <Search size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search favorites..."
          placeholderTextColor={isDark ? '#6B7280' : "#9CA3AF"}
          className="flex-1 ml-3 text-sm text-text-800 dark:text-text-dark-800"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text className="text-text opacity-40 text-lg">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <RecipeRow
              recipe={item}
              onPress={() => setSelectedRecipe(item)}
              onUnlike={() => handleUnlike(item.id)}
            />
          )}
          contentContainerClassName='px-2'
        />
      ) : (
        <View className="flex-1 items-center justify-center pb-20">
          {search.length > 0 ? (
            <>
              <SearchX color={isDark ? '#E5E7EB' : "#1F2A38"}/>
              <Text className="text-text-800 dark:text-text-dark-800 font-semibold text-lg mb-1">No results</Text>
              <Text className="text-text-800 dark:text-text-dark-800 opacity-50 text-sm">
                No favorites match "{search}"
              </Text>
            </>
          ) : (
            <>
              <Text className="text-text-800 font-semibold text-lg mb-1">No favorites yet</Text>
              <Text className="text-text-800 opacity-50 text-sm text-center">
                Swipe right on recipes you love to save them here
              </Text>
            </>
          )}
        </View>
      )}

      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </View>
  );
}