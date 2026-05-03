import useTheme from "@/hooks/useTheme";
import { RecipeType } from "@/utils/Recipes";
import { Clock, Users } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RecipeRowType {
  recipe: RecipeType;
  onPress: () => void;
  icon: React.ReactNode;
  iconAction: () => void;
}

export default function RecipeRow({ recipe, onPress, icon, iconAction }: RecipeRowType) {
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
        onPress={iconAction}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        className="pr-4"
      >
        {icon}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}