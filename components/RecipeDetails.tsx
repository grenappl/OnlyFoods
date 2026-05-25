import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookText,
  ChefHat,
  Clock,
  Dot,
  Heart,
  Info,
  Users,
  Utensils,
  X,
} from 'lucide-react-native';
import { scheduleOnRN } from 'react-native-worklets';
import useTheme from '@/hooks/useTheme';
import { RecipeType } from '@/utils/Recipes';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 120;

interface RecipeDetailSheetProps {
  recipe: RecipeType | null;
  onClose: () => void;
}

export default function RecipeDetailSheet({ recipe, onClose }: RecipeDetailSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const { isDark } = useTheme();
  console.log('Recipe in selected: ', recipe);
  const handleClose = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 350 }, (finished) => {
      if (finished) scheduleOnRN(onClose);
    });
    backdropOpacity.value = withTiming(0, { duration: 350 });
  };

  useEffect(() => {
    if (recipe) {
      translateY.value = withTiming(0, { duration: 350 });
      backdropOpacity.value = withTiming(0.5, { duration: 300 });
    }
  }, [recipe]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dy, dx }) => dy > 10 && Math.abs(dy) > Math.abs(dx),
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.value = dy;
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy > DISMISS_THRESHOLD) {
          handleClose();
        } else {
          translateY.value = withTiming(0, { duration: 300 });
        }
      },
    })
  ).current;

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!recipe) return null;
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
  return (
    <View className="absolute inset-0 z-[999]">
      {/* Backdrop */}
      <Animated.View style={[{ flex: 1 }]}>
        <TouchableOpacity className="flex-1" onPress={handleClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[sheetStyle, { position: 'absolute', bottom: 0, left: 0, right: 0, height: '98%' }]}
        className="z-[999] overflow-hidden rounded-2xl bg-background-50 dark:bg-background-dark-50"
        pointerEvents={recipe ? 'auto' : 'none'}>
        {/* Drag handle */}
        <View
          {...panResponder.panHandlers}
          className="items-center bg-background-50 pb-2 pt-3 dark:bg-background-dark-50">
          <View className="h-1 w-10 rounded-full bg-text-300" />
        </View>

        <ScrollView showsVerticalScrollIndicator={true} scrollEventThrottle={16} bounces={false}>
          {/* Hero image */}
          <View style={{ height: 280 }}>
            <Image source={{ uri: imageUri }} className="h-full w-full" resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.75)']}
              className="absolute bottom-0 left-0 right-0 h-[60%]"
            />
            <View className="absolute bottom-0 left-0 right-0 p-5">
              <Text className="mb-2 text-3xl font-bold text-white">{recipe.title}</Text>
              <View className="flex-row justify-between">
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center gap-2">
                    <Clock color="white" size={16} />
                    <Text className="text-sm text-white">{recipe.cook_time_minutes} min</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Users color="white" size={16} />
                    <Text className="text-sm text-white">{recipe.servings} servings</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Utensils color="white" size={16} />
                    <Text className="text-sm text-white">{recipe.cuisine_type} Cuisine</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2">
                  <Heart size={20} color="white" fill="white" />
                  <Text className="text-md text-white">
                    {recipe.favorites_count < 10000
                      ? recipe.favorites_count
                      : (recipe.favorites_count / 1000).toFixed(1) + 'k'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="p-5">
            <View className="flex-row gap-3">
              <Info color={isDark ? '#F9FAFB' : '#111827'} />
              <Text className="text-text mb-2 text-xl font-semibold text-text-900 dark:text-text-dark-900">
                About
              </Text>
            </View>
            <Text className="mb-8 text-justify text-base leading-6 text-text-800 dark:text-text-dark-700">
              {recipe.description}
            </Text>

            <View className="flex-row gap-3">
              <ChefHat color={isDark ? '#F9FAFB' : '#111827'} />
              <Text className="text-text mb-3 text-xl font-semibold text-text-900 dark:text-text-dark-900">
                Ingredients
              </Text>
            </View>
            <View className="mb-10 rounded-2xl bg-background-200 p-4 dark:bg-background-dark-100">
              {recipe.ingredients.map((ingredient, index) => (
                <View className="flex-row gap-2" key={`${recipe.name}_${index}_${ingredient}`}>
                  <Dot color={isDark ? '#F9FAFB' : '#111827'} />
                  <Text className="text-md mb-1 w-[80%] text-text-800 dark:text-text-dark-800">
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row gap-3">
              <BookText color={isDark ? '#F9FAFB' : '#111827'} />
              <Text className="text-text mb-3 text-xl font-semibold text-text-900 dark:text-text-dark-900">
                Instructions
              </Text>
            </View>
            <View className="justify-between rounded-2xl bg-background-200 p-4 dark:bg-background-dark-100">
              {recipe.steps.map((instruction, index) => (
                <View className="mb-6" key={`${recipe.name}_${index}_${instruction}`}>
                  <View className="mb-2 size-8 items-center justify-center rounded-full bg-primary-500">
                    <Text className="text-xs text-text-800">{Number(index + 1)}</Text>
                  </View>
                  <Text className="text-md text-justify text-text-800 dark:text-text-dark-800">
                    {instruction}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Close button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute right-4 top-8 size-9 items-center justify-center rounded-full bg-black/20">
          <X size={18} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
