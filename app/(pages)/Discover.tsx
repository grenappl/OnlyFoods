import '@/global.css';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RecipeCard from '@/components/RecipeCard';
import recipes from '@/utils/Recipes';
import { Heart, X } from 'lucide-react-native';

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  description: string;
}

interface DiscoverPageProps {
  recipes: Recipe[];
  onLike: (recipe: Recipe) => void;
}

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [passedRecipes, setPassedRecipes] = useState<Recipe[]>([]);
  const [removedRecipe, setRemovedRecipe] = useState<{
    recipe: Recipe;
    action: 'liked' | 'passed';
  } | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= recipes.length) return;
    const recipe = recipes[currentIndex];
    setRemovedRecipe({ recipe, action: direction === 'right' ? 'liked' : 'passed' });
    if (direction === 'right') {
      // onLike(recipe);
    } else {
      setPassedRecipes((prev) => [...prev, recipe]);
    }
    setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
  };

  const handleUndo = () => {
    if (!removedRecipe || currentIndex === 0) return;
    if (removedRecipe.action === 'passed') {
      setPassedRecipes((prev) => prev.slice(0, -1));
    }
    setCurrentIndex((prev) => prev - 1);
    setRemovedRecipe(null);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setPassedRecipes([]);
    setRemovedRecipe(null);
  };

  return (
    <View className="flex-1 bg-background items-center justify-center px-4 overflow-hidden">
      {currentIndex < recipes.length ? (
        <View className="w-full" style={{ aspectRatio: 3 / 4.5 }}>
          {recipes.slice(currentIndex, currentIndex + 2).map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSwipe={index === 0 ? handleSwipe : () => {}}
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
            onPress={() => handleSwipe('left')}
            className="size-16 rounded-full bg-secondary-500 items-center justify-center shadow-lg"
          >
            <X color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSwipe('right')}
            className="size-16 rounded-full bg-primary-500 items-center justify-center shadow-lg"
          >
            <Heart color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}