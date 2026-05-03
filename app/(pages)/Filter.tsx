import useTheme from "@/hooks/useTheme";
import { ChefHat, Clock, PlusCircle, Search, Users, X } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const COOK_TIMES = [
  "Any Time",
  "Under 30 min",
  "30-60 min",
  "Over 60 min",
];
const SERVING_SIZES = [
  "Any Serving",
  "1 Serving",
  "2-3 Servings",
  "4-5 Servings",
  "6-7 Servings",
  "8+ Servings",
]

export default function FilterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cookTimeRange, setCookTimeRange] = useState<string>(COOK_TIMES[0]);
  const [servingSizeRange, setServingSizeRange] = useState<string>(SERVING_SIZES[0]);

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const { isDark } = useTheme();

  const addIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (!trimmed || ingredients.includes(trimmed)) return;
    setIngredients((prev) => [...prev, trimmed]);
    setIngredientInput('');
  };
  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const handleFilters = () => {

  }
  const resetFilters = () => {
    setSearchQuery("");
    setCookTimeRange(COOK_TIMES[0]);
    setServingSizeRange(SERVING_SIZES[0]);
    setIngredients([])
  }

  return (
    <ScrollView className="flex-1 bg-background-200 dark:bg-background-dark-100 pt-8">
      <View className="px-4 py-6 gap-6">
        <Text className="text-2xl text-text-700 dark:text-text-dark-900 font-semibold">Find Your Recipe</Text>

        <View className="gap-2">
          <View className="flex-row gap-2">
            <Search size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Search</Text>
          </View>
          <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 border border-text-200 dark:border-background-dark-300 rounded-xl px-4">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Find recipes..."
              placeholderTextColor={isDark ? '#6B7280' : "#9CA3AF"}
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Clock size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Cook Time</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {COOK_TIMES .map((time) => {
              const isSelected = cookTimeRange === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setCookTimeRange(time)}
                  style={{ width: '48%' }}
                  className={`px-5 py-3 rounded-xl border ${
                    isSelected ? "bg-primary-500 border-primary-500"
                      : isDark ? "bg-background-dark-50 border-background-dark-300" : "bg-background-50 border-text-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-background-50" : isDark ? "text-text-dark-800" : "text-text-800"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View className="gap-2">
          <View className="flex-row gap-2">
            <Users size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Serving Size</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {SERVING_SIZES.map((size) => {
              const isSelected = servingSizeRange === size;
              return (
                <TouchableOpacity
                  key={size}
                  onPress={() => setServingSizeRange(size)}
                  style={{ width: '48%' }}
                  className={`px-5 py-3 rounded-xl border ${
                    isSelected ? "bg-primary-500 border-primary-500"
                      : isDark ? "bg-background-dark-50 border-background-dark-300" : "bg-background-50 border-text-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-background-50" : isDark ? "text-text-dark-800" : "text-text-800"
                    }`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row gap-2">
            <ChefHat size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Ingredients</Text>
          </View>

          <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 border border-text-200 dark:border-background-dark-300 rounded-xl px-4">
            <TextInput
              value={ingredientInput}
              onChangeText={setIngredientInput}
              onSubmitEditing={addIngredient}
              placeholder="Add ingredient..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              returnKeyType="done"
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
            <TouchableOpacity onPress={addIngredient} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <PlusCircle color={isDark ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>
          </View>

          {/* Chips */}
          {ingredients.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-1">
              {ingredients.map((item) => (
                <View
                  key={item}
                  className="flex-row items-center gap-1 bg-primary-100 dark:bg-primary-900 px-3 py-1.5 rounded-full"
                >
                  <Text className="text-sm text-primary-800 dark:text-primary-100 capitalize">
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeIngredient(item)}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <X size={12} color={isDark ? '#FDEBD0' : '#9C640C'} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Apply Button */}
        <View className="gap-3 my-8">
          <TouchableOpacity
            className="w-full py-4 rounded-xl bg-accent-500 dark:bg-accent-600 items-center shadow-md"
            activeOpacity={0.85}
            onPress={() => handleFilters()}
          >
            <Text className="text-white text-base font-semibold">
              Apply Filter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 rounded-xl bg-secondary-500 dark:bg-secondary-600 items-center shadow-md"
            activeOpacity={0.85}
            onPress={resetFilters}
          >
            <Text className="text-white text-base font-semibold">
              Reset Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}