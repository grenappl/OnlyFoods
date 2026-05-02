import '@/global.css';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RecipeCard, { RecipeCardRef } from '@/components/discover/RecipeCard';
import { Heart, X } from 'lucide-react-native';
import recipes from '@/utils/Recipes';
import RecipeDetails from '@/components/RecipeDetails';
import useAuth from '@/hooks/useAuth';
import { RecipeType } from '@/utils/Recipes';

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const cardRef = useRef<RecipeCardRef>(null);
  const { auth } = useAuth()

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= recipes.length) return;
    const recipe = recipes[currentIndex];
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setIsAnimating(false);
    }, 250);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    cardRef.current?.triggerSwipe(direction);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  useEffect(() => {
    console.log(auth)
  }, [])

  return (
    <View className="flex-1 bg-background-200 dark:bg-background-dark-100 items-center justify-center px-4 overflow-hidden">
      {currentIndex < recipes.length ? (
        <View className="w-full" style={{ aspectRatio: 3 / 4.5 }}>
          {recipes.slice(currentIndex, currentIndex + 3).map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              ref={index === 0 ? cardRef : undefined}
              recipe={recipe}
              onSwipe={handleSwipe}
              onPress={() => setSelectedRecipe(recipe)}
              style={{
                zIndex: recipes.length - index,
                transform: [{ scale: 1 - index * 0.05 }],
              }}
            />
          ))}
        </View>
      ) : (
        <View className="items-center px-6">
          <Text className="text-6xl mb-4">🎉</Text>
          <Text className="text-2xl mb-2 text-text">All done!</Text>
          <Text className="text-sm mb-6 text-text opacity-70">
            You've reviewed all recipes!
          </Text>
          <TouchableOpacity
            onPress={handleReset}
            className="px-8 py-3 bg-[#2ECC71] rounded-full shadow-lg"
          >
            <Text className="text-white text-base">Start Over</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentIndex < recipes.length && (
        <View className="flex-row items-center justify-center gap-10 my-4">
          <TouchableOpacity
            onPress={() => handleButtonSwipe('left')}
            className="size-16 rounded-full bg-secondary-500 items-center justify-center shadow-lg"
            disabled={isAnimating}
          >
            <X color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonSwipe('right')}
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