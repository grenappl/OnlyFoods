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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Users, X } from 'lucide-react-native';
import { scheduleOnRN } from 'react-native-worklets';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 120;

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  description: string;
}

interface RecipeDetailSheetProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDetailSheet({ recipe, onClose }: RecipeDetailSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

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
      onMoveShouldSetPanResponder: (_, { dy, dx }) =>
        dy > 10 && Math.abs(dy) > Math.abs(dx),
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
  return (
    <View className="absolute inset-0" style={{ zIndex: 999 }}>
      {/* Backdrop */}
      <Animated.View
        style={[{ flex: 1 }]}
      >
        <TouchableOpacity className="flex-1" onPress={handleClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[sheetStyle, { position: 'absolute', bottom: 0, left: 0, right: 0, height: '98%' }]}
        className="bg-background-50 dark:bg-background-dark-50 overflow-hidden rounded-2xl"
      >
        {/* Drag handle */}
        <View {...panResponder.panHandlers} className="items-center pt-3 pb-2 bg-background-50 dark:bg-background-dark-50">
          <View className="w-10 h-1 rounded-full bg-text-300" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
        >
          {/* Hero image */}
          <View style={{ height: 280 }}>
            <Image
              source={{ uri: recipe.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.75)']}
              className="absolute bottom-0 left-0 right-0 h-[60%]"
            />
            <View className="absolute bottom-0 left-0 right-0 p-5">
              <Text className="text-white text-3xl font-bold mb-2">{recipe.name}</Text>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-2">
                  <Clock color='white' size={16}/>
                  <Text className="text-white text-sm">{recipe.cookTime}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Users color='white' size={16}/>
                  <Text className="text-white text-sm">{recipe.servings} servings</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-primary-500">
                  <Text className="text-text-800 text-sm font-semibold">{recipe.difficulty}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="p-5">
            <Text className="text-xl text-text-900 dark:text-text-dark-900 font-semibold text-text mb-2">About</Text>
            <Text className="text-base text-text-800 dark:text-text-dark-700 leading-6 mb-6 text-justify">
              {recipe.description}
            </Text>

            {/* Placeholder detail sections */}
            <Text className="text-xl text-text-900 dark:text-text-dark-900 font-semibold text-text mb-3">Ingredients</Text>
            <View className="bg-background-200 dark:bg-background-dark-200 rounded-2xl p-4 mb-6">
              <Text className="text-text-800 dark:text-text-dark-800 text-sm">
                Ingredient details coming soon...
              </Text>
            </View>

            <Text className="text-xl text-text-900 dark:text-text-dark-900 font-semibold text-text mb-3">Instructions</Text>
            <View className="bg-background-200 dark:bg-background-dark-200 rounded-2xl p-4 mb-6">
              <Text className="text-text-800 dark:text-text-dark-800 text-sm">
                Step-by-step instructions coming soon...
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Close button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-8 right-4 size-9 rounded-full bg-black/20 items-center justify-center"
        >
          <X size={18} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}