import useTheme from '@/hooks/useTheme';
import { privateApi } from '@/utils/api';
import { ChefHat, Clock, PlusCircle, Search, Users, Utensils, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

const COOK_TIMES = ['Any Time', 'Under 30 min', '30-60 min', 'Over 60 min'];
const SERVING_SIZES = [
  'Any Serving',
  '1 Serving',
  '2-3 Servings',
  '4-5 Servings',
  '6-7 Servings',
  '8+ Servings',
];
const CUISINES = [
  'American', 'Chinese', 'Filipino', 'French',
  'Greek', 'Indian', 'Italian', 'Japanese', 
  'Korean', 'Mexican', 'Spanish', 'Thai'
];

export default function FilterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cookTimeRange, setCookTimeRange] = useState<string>(COOK_TIMES[0]);
  const [servingSizeRange, setServingSizeRange] = useState<string>(SERVING_SIZES[0]);

  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisineSearch, setCuisineSearch] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const cuisineTypesList = useMemo(() => {
    if (!cuisineSearch.trim()) return [];
    return CUISINES.filter((c) =>
      c.toLowerCase().includes(cuisineSearch.toLowerCase()) &&
      !selectedCuisines.includes(c)
    );
  }, [cuisineSearch, selectedCuisines]);

  const addIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (!trimmed || ingredients.includes(trimmed)) return;
    setIngredients((prev) => [...prev, trimmed]);
    setIngredientInput('');
  };
  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const addCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) return;
    setSelectedCuisines((prev) => [...prev, cuisine]);
    setCuisineSearch('');
  };
  const removeCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) => prev.filter((c) => c !== cuisine));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCookTimeRange(COOK_TIMES[0]);
    setServingSizeRange(SERVING_SIZES[0]);
    setIngredients([])
    setCuisineSearch('')
    setSelectedCuisines([])
  }
  const handleFilters = async () => {
    setIsLoading(true);
    try {
      const res = await privateApi.get('/recipes') // placeholder
      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background-200 pt-8 dark:bg-background-dark-100"
      contentContainerStyle={{ paddingBottom: 100 }}>
      <View className="gap-6 px-4 py-6">
        <Text className="text-2xl font-semibold text-text-700 dark:text-text-dark-900">
          Find Your Recipe
        </Text>

        <View className="gap-2">
          <View className="flex-row gap-2">
            <Search size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Search</Text>
          </View>
          <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 border border-text-200 dark:border-background-dark-300 rounded-xl px-4">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Find recipes..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <X size={16} color={isDark ? '#6B7280' : '#9CA3AF'} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* cuisine search */}
        <View className="gap-2">
          <View className="flex-row gap-2">
            <Utensils size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Cuisine Type</Text>
          </View>

          {/* Search input */}
          <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 border border-text-200 dark:border-background-dark-300 rounded-xl px-4">
            <TextInput
              value={cuisineSearch}
              onChangeText={setCuisineSearch}
              placeholder="Add cuisine types..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
            {cuisineSearch.length > 0 && (
              <TouchableOpacity
                onPress={() => setCuisineSearch('')}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <X size={16} color={isDark ? '#6B7280' : '#9CA3AF'} />
              </TouchableOpacity>
            )}
          </View>

          {/* Search results */}
          {cuisineTypesList.length > 0 && (
            <View
              className={`rounded-xl border overflow-hidden ${
                isDark
                  ? 'bg-background-dark-50 border-background-dark-300'
                  : 'bg-background-50 border-text-200'
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {cuisineTypesList.map((cuisine, index, filtered) => (
                <TouchableOpacity
                  key={cuisine}
                  onPress={() => addCuisine(cuisine)}
                  className={`flex-row items-center px-4 py-3 ${
                    index < filtered.length - 1
                      ? isDark
                        ? 'border-b border-background-dark-300'
                        : 'border-b border-background-200'
                      : ''
                  }`}
                >
                  <Text className={`text-sm ${isDark ? 'text-text-dark-800' : 'text-text-800'}`}>
                    {cuisine}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Selected chips */}
          {selectedCuisines.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-1">
              {selectedCuisines.map((cuisine) => (
                <View
                  key={cuisine}
                  className="flex-row items-center gap-1 bg-primary-100 dark:bg-primary-900 px-3 py-1.5 rounded-xl"
                >
                  <Text className="text-sm text-primary-800 dark:text-primary-100">
                    {cuisine}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeCuisine(cuisine)}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <X size={12} color={isDark ? '#FDEBD0' : '#9C640C'} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Clock size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Cook Time</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {COOK_TIMES.map((time) => {
              const isSelected = cookTimeRange === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setCookTimeRange(time)}
                  style={{ width: '48%' }}
                  className={`rounded-xl border px-5 py-3 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : isDark
                        ? 'border-background-dark-300 bg-background-dark-50'
                        : 'border-text-200 bg-background-50'
                  }`}>
                  <Text
                    className={`text-sm ${
                      isSelected
                        ? 'text-background-50'
                        : isDark
                          ? 'text-text-dark-800'
                          : 'text-text-800'
                    }`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row gap-2">
            <Users size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
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
                  className={`rounded-xl border px-5 py-3 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : isDark
                        ? 'border-background-dark-300 bg-background-dark-50'
                        : 'border-text-200 bg-background-50'
                  }`}>
                  <Text
                    className={`text-sm ${
                      isSelected
                        ? 'text-background-50'
                        : isDark
                          ? 'text-text-dark-800'
                          : 'text-text-800'
                    }`}>
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

          <View className="flex-row items-center rounded-xl border border-text-200 bg-background-50 px-4 dark:border-background-dark-300 dark:bg-background-dark-50">
            <TextInput
              value={ingredientInput}
              onChangeText={setIngredientInput}
              onSubmitEditing={addIngredient}
              placeholder="Add ingredient..."
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              returnKeyType="done"
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
            <TouchableOpacity
              onPress={addIngredient}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <PlusCircle color={isDark ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>
          </View>

          {/* Chips */}
          {ingredients.length > 0 && (
            <View className="mt-1 flex-row flex-wrap gap-2">
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
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <X size={12} color={isDark ? '#FDEBD0' : '#9C640C'} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Apply Button */}
        <View className="my-8 gap-3">
          <TouchableOpacity
            className="w-full items-center rounded-xl bg-accent-500 py-4 shadow-md dark:bg-accent-600"
            activeOpacity={0.85}
            onPress={() => handleFilters()}
            disabled={isLoading}
          >
            {isLoading ?
              <ActivityIndicator color="white" size={23} /> :
              <Text className="text-base font-semibold text-white">Apply Filter</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full items-center rounded-xl bg-secondary-500 py-4 shadow-md dark:bg-secondary-600"
            activeOpacity={0.85}
            onPress={resetFilters}>
            <Text className="text-base font-semibold text-white">Reset Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
