import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
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
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RecipeCardRef {
  triggerSwipe: (direction: 'left' | 'right') => void;
}

const RecipeCard = forwardRef<RecipeCardRef, RecipeCardProps>(({ recipe, onSwipe, onPress, setIsAnimating }, ref) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  let isDragging = false;

  const onSwipeRef = useRef(onSwipe);
  const onPressRef = useRef(onPress);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
    onPressRef.current = onPress;
  });

  useEffect(() => {
    // fade in when card mounts
    translateX.value = 0;
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  useImperativeHandle(ref, () => ({
    triggerSwipe: (direction: 'left' | 'right') => {
      const target = direction === 'right' ? 500 : -500;
      const callback = onSwipeRef.current;
      translateX.value = withTiming(target, { duration: 250 }, (finished) => {
        if (finished) scheduleOnRN(callback, direction);
      });
    },
  }));

  const panHandlers = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging = false;
      },
      onPanResponderMove: (_, { dx, dy }) => {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          isDragging = true;
        }
        translateX.value = dx;
      },
      onPanResponderRelease: (_, { dx }) => {
        if (!isDragging) {
          translateX.value = withSpring(0);
          const pressCallback = onPressRef.current;
          scheduleOnRN(pressCallback);
          return;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          setIsAnimating(true);
          const target = dx > 0 ? 500 : -500;
          const direction = dx > 0 ? 'right' : 'left'
          const swipeCallback = onSwipeRef.current; 
          translateX.value = withTiming(target, { duration: 250 }, (finished) => {
            if (finished) scheduleOnRN(swipeCallback, direction);
          });
        } else {
          translateX.value = withSpring(0);
        }
      },
    })
  ).current.panHandlers;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * interpolate(translateX.value, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]),
    transform: [
      { translateX: translateX.value },
      { rotate: `${interpolate(translateX.value, [-200, 200], [-20, 20])}deg` },
    ],
  }));

  return (
    <View className="absolute w-full h-full py-2 z-[1]">
      <Animated.View
        className="flex-1 rounded-2xl bg-background-50 dark:bg-background-dark-50 overflow-hidden mt-2 shadow-xl"
        style={[
          animatedStyle,
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
          }
        ]}
        {...panHandlers}
      >
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
      </Animated.View>
    </View>
  );
});

export default RecipeCard;