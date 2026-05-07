import useTheme from "@/hooks/useTheme";
import { RecipeType } from "@/utils/Recipes";
import { Clock, Users } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RecipeGridCardType {
  recipe: RecipeType;
  onPress: () => void;
  icon: React.ReactNode;
  iconAction: () => void;
}

export default function RecipeGridCard({ recipe, onPress, icon, iconAction }: RecipeGridCardType) {
  const { isDark } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-background-50 dark:bg-background-dark-50 rounded-2xl overflow-hidden mb-3"
      style={{
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View style={{ height: 120 }}>
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={iconAction}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          className="absolute top-2 right-2 size-7 rounded-full bg-black/70 items-center justify-center"
        >
          {icon}
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text
          className="text-text-800 dark:text-text-dark-800 font-semibold text-sm mb-2"
          numberOfLines={1}
        >
          {recipe.name}
        </Text>
        <View className="flex-row gap-3">
          <View className="flex-row items-center gap-2">
            <Clock size={11} color={isDark ? '#D1D5DB' : '#374151'} />
            <Text className="text-xs text-text-600 dark:text-text-dark-700">{recipe.cookTime}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Users size={11} color={isDark ? '#D1D5DB' : '#374151'} />
            <Text className="text-xs text-text-600 dark:text-text-dark-700">{recipe.servings}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}