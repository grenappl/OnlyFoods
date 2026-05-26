import '@/global.css';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import RecipeCard, { RecipeCardRef } from '@/components/discover/RecipeCard';
import { Heart, RefreshCw, WifiOff, X } from 'lucide-react-native';
import RECIPES from '@/utils/Recipes';
import RecipeDetails from '@/components/RecipeDetails';
import { RecipeType } from '@/utils/Recipes';
import useFavorites from '@/hooks/useFavorites';
import { privateApi } from '@/utils/api';
import useRecipes from '@/hooks/useRecipes';
import useTheme from '@/hooks/useTheme';
import formatRecipe from '@/utils/formatRecipe';
import useAuth from '@/hooks/useAuth';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const { recipes, feedRecipes, setFeedRecipes } = useRecipes()
  const {auth} = useAuth()

  const cardRef = useRef<RecipeCardRef>(null);
  const { favorites, addFavorite, setFavorites } = useFavorites()
  const {isDark} = useTheme();
  const [networkError, setNetworkError] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    if(direction === 'right') addFavorite(feedRecipes[currentIndex].id)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleButtonPress = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    cardRef.current?.triggerSwipe(direction);
  };

  const fetchRecipes = async () => {
    try {
      setNetworkError(false)
      console.log(await privateApi.post('/recommendations/train'))
      const res = await privateApi.post('/recommendations', {
        user_id: auth.user?.id,
        n: 10, 
      })
      console.log(res)
      // const res = await privateApi.get('/recipes')
      const recipeData = [...res.recommendations];
      console.log(recipeData)
      recipeData.forEach((r, index) => {
        recipeData[index] = formatRecipe(r.recipe);
      })
      // const filteredRecipes = recipeData.filter(r => (!favorites.includes(r) && !recipes.includes(r)))
      setFeedRecipes(recipeData)
    } catch (e) {
      setNetworkError(true)
      console.log(e)
    }
  }
  const loadFavorites = async () => {
    try {
      const res = await privateApi.get('/favorites/me/saved')
      console.log(res.data[0])
      const fav = [...res.data]
      fav.forEach((f: {recipes: RecipeType}, index) => {
        const r = {...f.recipes};
        fav[index] = formatRecipe(r);
      })
      console.log(fav);
      setFavorites(fav);
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    loadFavorites();
    fetchRecipes();
  }, [])

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100 items-center justify-center px-4 overflow-hidden">
      {currentIndex < feedRecipes.length ? (
        <View className="w-full" style={{ aspectRatio: 3 / 4.5 }}>
          <RecipeCard
            key={feedRecipes[currentIndex].id}
            ref={cardRef}
            recipe={feedRecipes[currentIndex]}
            onSwipe={handleSwipe}
            onPress={() => setSelectedRecipe(feedRecipes[currentIndex])}
            setIsAnimating={setIsAnimating}
          />
        </View>
      ) : (
        networkError ?
        <View className="items-center px-6 gap-4">
          <View className="size-20 rounded-full bg-secondary-100 dark:bg-secondary-900 items-center justify-center">
            <WifiOff size={36} color="#FB4141" />
          </View>
          <Text className="text-xl font-bold text-text-800 dark:text-text-dark-800">
            No Connection
          </Text>
          <Text className="text-sm text-text-400 dark:text-text-dark-500 text-center">
            Check your internet connection and try again.
          </Text>
          <TouchableOpacity
            onPress={fetchRecipes}
            className="flex-row items-center gap-2 bg-accent-500 px-6 py-3 rounded-full mt-2"
          >
            <RefreshCw size={16} color="white" />
            <Text className="text-white font-semibold text-sm">Try Again</Text>
          </TouchableOpacity>
        </View>
        :
        <View className="items-center px-6">
          <ActivityIndicator size={64} color={isDark ? "white": "#374151"} />
        </View>
      )}
      {currentIndex < feedRecipes.length && (
        <View className="flex-row items-center justify-center gap-10 my-4">
          <TouchableOpacity
            onPress={() => handleButtonPress('left')}
            className="size-16 rounded-full bg-secondary-500 items-center justify-center shadow-lg"
            disabled={isAnimating}
          >
            <X color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('right')}
            className="size-16 rounded-full bg-accent-500 items-center justify-center shadow-lg"
            disabled={isAnimating}
          >
            <Heart color="white" />
          </TouchableOpacity>
        </View>
      )}
      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </View>
  );
}