import '@/global.css';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import RecipeCard, { RecipeCardRef } from '@/components/discover/RecipeCard';
import { Heart, X } from 'lucide-react-native';
import RECIPES from '@/utils/Recipes';
import RecipeDetails from '@/components/RecipeDetails';
import { RecipeType } from '@/utils/Recipes';
import useFavorites from '@/hooks/useFavorites';
import { privateApi } from '@/utils/api';
import useRecipes from '@/hooks/useRecipes';
import useTheme from '@/hooks/useTheme';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [feedRecipes, setFeedRecipes] = useState<RecipeType[]>([]);
  const { recipes } = useRecipes()

  const cardRef = useRef<RecipeCardRef>(null);
  const { favorites, addFavorite } = useFavorites()
  const {isDark} = useTheme();

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

  // temp
  const handleReset = () => {
    const filteredRecipes = RECIPES.filter(r => (!favorites.includes(r) && !recipes.includes(r)))
    setFeedRecipes(filteredRecipes)
    setCurrentIndex(0)
  }

  useEffect(() => {
    async function fetchRecipes(){
      try {
        // console.log(await privateApi.get('/profiles/me'))
        // const res = await privateApi.get('/recipes')
        // const recipeData = [...res.data];
        // recipeData.forEach((r, index) => {
        //   recipeData[index] = {
        //     id: r.id,
        //     title: r.title,
        //     description: r.description,
        //     ingredients: r.ingredients,
        //     instructions: r.steps,
        //     cuisineType: r.cuisine_type,
        //     cookTime: r.cook_time_minutes,
        //     servings: r.servings,
        //     // "isPublic": r.is_publised,
        //     favorites: r.favorites_count,
        //     // authorId: r.author_id,
        //     // createdAt: r.created_at"
        //   }
        // })
        const filteredRecipes = RECIPES.filter(r => (!favorites.includes(r) && !recipes.includes(r)))
        setFeedRecipes(filteredRecipes)
      } catch (e) {
        console.log(e)
      }
    }
    fetchRecipes()
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