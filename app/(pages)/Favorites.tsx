import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Heart, Search, Clock, Users, SearchX, LayoutList, LayoutGrid } from 'lucide-react-native';
import RecipeDetail from '@/components/RecipeDetails';
import { RecipeType } from '@/utils/Recipes';
import useTheme from '@/hooks/useTheme';
import useFavorites from '@/hooks/useFavorites';

function RecipeRow({ recipe, onPress, onUnlike }: RecipeFavoriteCard) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row items-center bg-background-50 dark:bg-background-dark-50 rounded-2xl mb-3 overflow-hidden"
      style={{
        height: 90,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
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
            <Clock size={12} color={isDark ? '#D1D5DB' : '#374151'} />
            <Text className="text-xs text-text-600 dark:text-text-dark-700">{recipe.cookTime}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Users size={12} color={isDark ? '#D1D5DB' : '#374151'} />
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

function RecipeGridCard({ recipe, onPress, onUnlike }: RecipeFavoriteCard) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-background-50 dark:bg-background-dark-50 rounded-2xl overflow-hidden mb-3"
      style={{
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View style={{ height: 120 }}>
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={onUnlike}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          className="absolute top-2 right-2 size-7 rounded-full bg-background-50/70 dark:bg-background-dark-50/70 items-center justify-center"
        >
          <Heart size={14} color="#e74c3c" fill="#e74c3c" />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text
          className="text-text-800 dark:text-text-dark-800 font-semibold text-sm mb-2"
          numberOfLines={1}
        >
          {recipe.name}
        </Text>
        <View className="flex-row items-center gap-2">
          <Clock size={11} color="#9CA3AF" />
          <Text className="text-xs text-text-400 dark:text-text-dark-500">{recipe.cookTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface RecipeFavoriteCard {
  recipe: RecipeType;
  onPress: () => void;
  onUnlike: () => void;
}

type ViewMode = 'list' | 'grid';

export default function FavoritesPage() {
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { isDark } = useTheme();
  const { favorites, removeFavorite } = useFavorites();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return favorites;
    return favorites.filter((r) => r.name.toLowerCase().includes(q));
  }, [search, favorites]);

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100 px-2 pt-5">
      <View className="flex-row items-center justify-between mb-5 mx-2">
        <Text className="text-2xl text-text-700 dark:text-text-dark-800 font-bold">
          Favorites
        </Text>
        <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 rounded-xl p-1 gap-1"
          style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}
        >
          <TouchableOpacity
            onPress={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-500' : ''}`}
          >
            <LayoutList size={18} color={viewMode === 'list' ? 'white' : isDark ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500' : ''}`}
          >
            <LayoutGrid size={18} color={viewMode === 'grid' ? 'white' : isDark ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        className="flex-row items-center bg-background-50 dark:bg-background-dark-50 rounded-2xl px-4 mb-5 mx-2 h-12"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 }}
      >
        <Search size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search favorites..."
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          className="flex-1 ml-3 text-sm text-text-800 dark:text-text-dark-800"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text className="text-text-400 text-lg">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          key={viewMode}
          numColumns={viewMode === 'grid' ? 2 : 1}
          columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          contentContainerClassName="px-2"
          renderItem={({ item }) =>
            viewMode === 'list' ? (
              <RecipeRow
                recipe={item}
                onPress={() => setSelectedRecipe(item)}
                onUnlike={() => removeFavorite(item.id)}
              />
            ) : (
              <RecipeGridCard
                recipe={item}
                onPress={() => setSelectedRecipe(item)}
                onUnlike={() => removeFavorite(item.id)}
              />
            )
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center pb-20">
          {search.length > 0 ? (
            <>
              <SearchX color={isDark ? '#E5E7EB' : '#1F2A38'} />
              <Text className="text-text-800 dark:text-text-dark-800 font-semibold text-lg mb-1">
                No results
              </Text>
              <Text className="text-text-800 dark:text-text-dark-800 opacity-50 text-sm">
                No favorites match "{search}"
              </Text>
            </>
          ) : (
            <>
              <View className="size-20 rounded-full bg-secondary-100 justify-center items-center mb-3">
                <Heart color="#FB4141" size={30} />
              </View>
              <Text className="text-text-800 dark:text-text-dark-800 font-semibold text-lg mb-1">
                No favorites yet
              </Text>
              <Text className="text-text-600 dark:text-text-dark-600 text-sm text-center">
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