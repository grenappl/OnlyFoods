import { useRef } from 'react';
import { View, Text, Image, PanResponder, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const SWIPE_THRESHOLD = 100;

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  description: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: object;
}

export default function RecipeCard({ recipe, onSwipe, style }: RecipeCardProps) {
  const translateX = useSharedValue(0);

  const triggerSwipe = (direction: 'left' | 'right') => onSwipe(direction);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        translateX.value = dx;
      },
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          runOnJS(triggerSwipe)(dx > 0 ? 'right' : 'left');
        } else {
          translateX.value = withSpring(0);
        }
      },
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${interpolate(translateX.value, [-200, 200], [-20, 20])}deg` },
    ],
    opacity: interpolate(translateX.value, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]),
  }));

  return (
    <Animated.View
      className="absolute w-full h-full"
      style={[animatedStyle, style]}
      {...panResponder.panHandlers}
    >
      <View className="flex-1 rounded-2xl bg-[#FDF6EC] overflow-hidden shadow-2xl">

        {/* Image — top 60% */}
        <View className="flex-[3]">
          <Image
            source={{ uri: recipe.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-[70%] bg-black/55" />

          {/* Text overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text className="text-white text-2xl font-semibold mb-2">
              {recipe.name}
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs">🕐</Text>
                <Text className="text-white text-xs">{recipe.cookTime}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs">👥</Text>
                <Text className="text-white text-xs">{recipe.servings}</Text>
              </View>
              <View className="px-2.5 py-1 rounded-full bg-[#F39C12]">
                <Text className="text-[#2C3E50] text-xs font-semibold">
                  {recipe.difficulty}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description — bottom 40% */}
        <View className="flex-[2] p-4 justify-center">
          <Text className="text-sm text-[#2C3E50] opacity-80 leading-5">
            {recipe.description}
          </Text>
        </View>

      </View>
    </Animated.View>
  );
}