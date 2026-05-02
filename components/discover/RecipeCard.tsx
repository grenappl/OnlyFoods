import { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Image, PanResponder } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { scheduleOnRN } from 'react-native-worklets';
import { Clock, Heart, Users } from 'lucide-react-native';
import { RecipeType } from '@/utils/Recipes';

const SWIPE_THRESHOLD = 130;

interface RecipeCardProps {
  recipe: RecipeType;
  onSwipe: (direction: 'left' | 'right') => void;
  onPress: () => void;
  style?: object;
}

export interface RecipeCardRef {
  triggerSwipe: (direction: 'left' | 'right') => void;
}

const RecipeCard = forwardRef<RecipeCardRef, RecipeCardProps>(({ recipe, onSwipe, onPress, style }, ref) => {
  const translateX = useSharedValue(0);
  const isDragging = useRef(false);

  useImperativeHandle(ref, () => ({
    triggerSwipe: (direction: 'left' | 'right') => {
      const target = direction === 'right' ? 500 : -500;
      translateX.value = withTiming(target, { duration: 350 }, (finished) => {
        if (finished) scheduleOnRN(onSwipe, direction);
      });
    },
  }));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging.current = false;
      },
      onPanResponderMove: (_, { dx, dy }) => {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          isDragging.current = true; // moved enough to be a drag
        }
        translateX.value = dx;
      },
      onPanResponderRelease: (_, { dx }) => {
        if (!isDragging.current) {
          translateX.value = withSpring(0);
          scheduleOnRN(onPress);
          return;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          const target = dx > 0 ? 500 : -500;
          translateX.value = withTiming(target, { duration: 250 }, (finished) => {
            if (finished) scheduleOnRN(onSwipe, dx > 0 ? 'right' : 'left');
          });
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
      className="absolute w-full h-full py-2"
      style={[animatedStyle, style]}
      {...panResponder.panHandlers}
    >
      <View className="flex-1 rounded-2xl bg-background-50 dark:bg-background-dark-50 overflow-hidden mt-2 shadow-md">
        <View className="flex-[4]">
          <Image
            source={{ uri: recipe.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-[50%]"
          />
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text className="text-white text-2xl font-semibold mb-2">
              {recipe.name}
            </Text>
            <View className='flex-row justify-between'>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-2">
                  <Clock size={12} color="white" />
                  <Text className="text-xs text-white">{recipe.cookTime}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Users size={12} color="white" />
                  <Text className="text-xs text-white">{recipe.servings} servings</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <Heart size={20} color="white" fill="white"/>
                <Text className="text-md text-white">0</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="h-full flex-[1] p-6">
          <View className='h-3/5'>
            <Text className="text-justify text-text-500 dark:text-text-dark-700 leading-5" numberOfLines={3} ellipsizeMode='tail'>
              {recipe.description}
            </Text>
          </View>
          <View className='h-3/5 justify-end pb-2'>
            <Text className="text-center text-text-300 dark:text-text-dark-600 text-sm opacity-75 leading-5">Press to view recipe</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

export default RecipeCard;