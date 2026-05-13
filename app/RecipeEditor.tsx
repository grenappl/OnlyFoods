import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  X,
  ChevronDown,
  Utensils,
  Check,
  GripVertical,
} from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes';
import ErrorModal from '@/components/ErrorModal';

const CUISINE_TYPES = [
  'American',
  'Chinese',
  'Filipino',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Spanish',
  'Thai',
  'Lebanese',
  'Other',
];

type InstructionItem = {
  key: string;
  value: string;
};

export default function RecipeEditorPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isDark } = useTheme();
  const { addRecipe, updateRecipe, getRecipeById } = useRecipes();
  const isEditing = !!id;

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('American');
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  // Instructions stored as keyed items for DraggableFlatList
  const [instructions, setInstructions] = useState<InstructionItem[]>([
    { key: 'step-0', value: '' },
  ]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCuisineModal, setShowCuisineModal] = useState(false);
  const [descHeight, setDescHeight] = useState(96);

  // Populate fields if editing
  useEffect(() => {
    if (isEditing) {
      const recipe = getRecipeById(Number(id));
      if (recipe) {
        setImage(recipe.image ?? '');
        setName(recipe.name);
        setDescription(recipe.description);
        setCuisine(recipe.cuisineType || 'American');
        setCookTime(recipe.cookTime);
        setServings(String(recipe.servings));
        setIngredients(recipe.ingredients);
        setInstructions(
          recipe.instructions.map((v, i) => ({ key: `step-${i}-${Date.now()}`, value: v }))
        );
      }
    }
  }, [id]);

  const pickImage = async () => {
    const pickedFile = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!pickedFile.canceled) setImage(pickedFile.assets[0].uri);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorVisible(true);
    return false;
  };

  const handleSave = () => {
    const instructionValues = instructions.map((i) => i.value);
    if (!image) return showError('Please add a recipe photo');
    if (name.trim().length === 0) return showError('Please enter a recipe name.');
    if (description.trim().length === 0) return showError('Please enter a recipe description.');
    if (servings.length === 0) return showError('Please enter the serving amount.');
    if (ingredients[0].trim().length === 0) return showError('Please enter at least 1 ingredient.');
    if (instructionValues[0].trim().length === 0) return showError('Please enter the first step.');
    if (!name.trim()) return;

    const recipe = {
      name: name.trim(),
      description: description.trim(),
      cuisineType: cuisine,
      cookTime,
      servings: Number(servings),
      image,
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructionValues.filter((i) => i.trim()),
    };

    if (isEditing) {
      updateRecipe(Number(id), recipe);
    } else {
      addRecipe(recipe);
    }
    router.replace('/MyRecipes');
  };

  const updateIngredient = (text: string, index: number) => {
    setIngredients((prev) => prev.map((v, i) => (i === index ? text : v)));
  };

  const updateInstruction = (text: string, key: string) => {
    setInstructions((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value: text } : item))
    );
  };

  const removeInstruction = (key: string) => {
    setInstructions((prev) => prev.filter((item) => item.key !== key));
  };

  const addInstruction = () => {
    setInstructions((prev) => [...prev, { key: `step-${Date.now()}`, value: '' }]);
  };

  const handleCuisineSelect = (selectedCuisine: string) => {
    setCuisine(selectedCuisine);
    setShowCuisineModal(false);
  };

  const inputClass =
    'bg-background-100 dark:bg-background-dark-50 border border-text-100 dark:border-background-dark-300 rounded-2xl px-4 py-3 text-sm text-text-800 dark:text-text-dark-800';

  const renderInstruction = useCallback(
    ({ item, drag, isActive }: RenderItemParams<InstructionItem>) => {
      // Derive index from live state so it stays correct during and after drags
      const index = instructions.findIndex((s) => s.key === item.key);
      return (
        <ScaleDecorator activeScale={1.02}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              marginBottom: 8,
              opacity: isActive ? 0.95 : 1,
            }}>
            {/* Drag handle — long-press to drag */}
            <TouchableOpacity
              onLongPress={drag}
              delayLongPress={150}
              activeOpacity={0.7}
              style={{ marginTop: 8, alignItems: 'center', gap: 2 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: isActive ? '#e08c00' : '#F39C12',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#F39C12',
                  shadowOpacity: isActive ? 0.6 : 0,
                  shadowRadius: 8,
                  elevation: isActive ? 6 : 0,
                }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>{index + 1}</Text>
              </View>
              <GripVertical size={12} color={isDark ? '#6B7280' : '#9CA3AF'} />
            </TouchableOpacity>

            <TextInput
              value={item.value}
              onChangeText={(text) => updateInstruction(text, item.key)}
              placeholder={`Step ${index + 1}`}
              placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
              multiline
              textAlignVertical="top"
              style={{ flex: 1 }}
              className={`${inputClass} min-h-[60px] flex-1`}
            />

            {instructions.length > 1 && (
              <TouchableOpacity
                onPress={() => removeInstruction(item.key)}
                style={{ marginTop: 8 }}
                className="size-9 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
                <X size={14} color="#FB4141" />
              </TouchableOpacity>
            )}
          </View>
        </ScaleDecorator>
      );
    },
    [isDark, instructions, inputClass]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-1 bg-background-200 dark:bg-background-dark-100">
          {/* Header */}
          <View className="flex-row items-center justify-between bg-background-200 px-4 pb-4 pt-14 dark:bg-background-dark-100">
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => router.replace('/MyRecipes')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <ArrowLeft size={22} color={isDark ? '#E5E7EB' : '#2C3E50'} />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-text-800 dark:text-text-dark-800">
                {isEditing ? 'Edit Recipe' : 'Create Recipe'}
              </Text>
            </View>
            <TouchableOpacity onPress={handleSave} className="rounded-full bg-accent-500 px-5 py-2">
              <Text className="text-sm font-semibold text-white">Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
            keyboardShouldPersistTaps="handled">
            <View className="gap-6 px-4">
              {/* Image picker */}
              <TouchableOpacity
                onPress={pickImage}
                className="w-full overflow-hidden rounded-2xl border-2 border-dashed border-text-200 dark:border-background-dark-400"
                style={{ height: 180 }}>
                {image ? (
                  <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
                ) : (
                  <View className="flex-1 items-center justify-center gap-2 bg-background-100 dark:bg-background-dark-50">
                    <ImagePlus size={32} color={isDark ? '#6B7280' : '#9CA3AF'} />
                    <Text className="text-sm text-text-400 dark:text-text-dark-500">
                      Add Recipe Photo
                    </Text>
                    <Text className="text-xs text-text-300 dark:text-text-dark-400">Max 5MB</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Recipe Name */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                  Recipe Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter recipe name"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  className={inputClass}
                />
              </View>

              {/* Description */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                  Description
                </Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe your recipe..."
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  multiline
                  textAlignVertical="top"
                  onContentSizeChange={(e) => setDescHeight(e.nativeEvent.contentSize.height)}
                  style={{ height: Math.max(96, descHeight) }}
                  className={inputClass}
                />
              </View>

              {/* Cuisine Type Select Field */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                  Cuisine Type
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCuisineModal(true)}
                  className="flex-row items-center justify-between rounded-2xl border border-text-100 bg-background-100 px-4 py-3 dark:border-background-dark-300 dark:bg-background-dark-50">
                  <View className="flex-row items-center gap-2">
                    <Utensils size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
                    <Text className="text-sm text-text-800 dark:text-text-dark-800">
                      {cuisine} Cuisine
                    </Text>
                  </View>
                  <ChevronDown size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
                </TouchableOpacity>
              </View>

              {/* Cook Time + Servings */}
              <View className="flex-row gap-3">
                <View className="flex-1 gap-2">
                  <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                    Cook Time
                  </Text>
                  <TextInput
                    value={cookTime}
                    onChangeText={setCookTime}
                    placeholder="In min"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    keyboardType="numeric"
                    className={inputClass}
                  />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                    Servings
                  </Text>
                  <TextInput
                    value={servings}
                    onChangeText={setServings}
                    placeholder="Serving size"
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    keyboardType="numeric"
                    className={inputClass}
                  />
                </View>
              </View>

              {/* Ingredients */}
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                    Ingredients
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIngredients((prev) => [...prev, ''])}
                    className="flex-row items-center gap-1 rounded-full bg-accent-100 px-3 py-1.5 dark:bg-accent-900">
                    <Plus size={12} color="#2ECC71" />
                    <Text className="text-xs font-semibold text-accent-600 dark:text-accent-300">
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
                {ingredients.map((ingredient, index) => (
                  <View key={index} className="flex-row items-center gap-2">
                    <TextInput
                      onChangeText={(text) => updateIngredient(text, index)}
                      value={ingredient}
                      placeholder={`Ingredient ${index + 1}`}
                      placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                      className={`${inputClass} flex-1`}
                    />
                    {ingredients.length > 1 ? (
                      <TouchableOpacity
                        onPress={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}
                        className="size-9 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
                        <X size={14} color="#FB4141" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ))}
              </View>

              {/* Instructions — drag-to-reorder */}
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <View style={{ gap: 2 }}>
                    <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                      Instructions
                    </Text>
                    {instructions.length > 1 && (
                      <Text className="text-xs text-text-300 dark:text-text-dark-400">
                        Hold the number handle to reorder
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={addInstruction}
                    className="flex-row items-center gap-1 rounded-full bg-primary-100 px-3 py-1.5 dark:bg-primary-900">
                    <Plus size={12} color="#F39C12" />
                    <Text className="text-xs font-semibold text-primary-600 dark:text-primary-300">
                      Add Step
                    </Text>
                  </TouchableOpacity>
                </View>

                {/*
                  DraggableFlatList is nested inside a ScrollView.
                  scrollEnabled={false} delegates scrolling to the parent,
                  while the library's own gesture handler takes over for drags.
                */}
                <DraggableFlatList
                  data={instructions}
                  keyExtractor={(item) => item.key}
                  onDragEnd={({ data }) => setInstructions(data)}
                  renderItem={renderInstruction}
                  scrollEnabled={false}
                  activationDistance={5}
                />
              </View>
            </View>
          </ScrollView>

          {/* Cuisine Selection Modal */}
          <Modal
            visible={showCuisineModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowCuisineModal(false)}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowCuisineModal(false)}
              className="flex-1 justify-end bg-black/50">
              <View className="rounded-t-3xl bg-white dark:bg-background-dark-200">
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                  <Text className="text-lg font-semibold text-text-800 dark:text-text-dark-800">
                    Select Cuisine Type
                  </Text>
                  <TouchableOpacity onPress={() => setShowCuisineModal(false)}>
                    <X size={24} color={isDark ? '#E5E7EB' : '#2C3E50'} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={CUISINE_TYPES}
                  keyExtractor={(item) => item}
                  renderItem={({ item: cuisineType }) => (
                    <TouchableOpacity
                      onPress={() => handleCuisineSelect(cuisineType)}
                      className={`flex-row items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800 ${
                        cuisine === cuisineType ? 'bg-accent-50 dark:bg-accent-900/20' : ''
                      }`}>
                      <View className="flex-row items-center gap-3">
                        <Utensils size={18} color={isDark ? '#9CA3AF' : '#6B7280'} />
                        <Text className="text-base text-text-700 dark:text-text-dark-700">
                          {cuisineType}
                        </Text>
                      </View>
                      {cuisine === cuisineType && <Check size={20} color="#2ECC71" />}
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 400 }}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <ErrorModal
            visible={errorVisible}
            message={errorMessage}
            onClose={() => setErrorVisible(false)}
          />
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
