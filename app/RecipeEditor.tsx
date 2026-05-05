import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ImagePlus, Plus, X } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes';
import ErrorModal from '@/components/ErrorModal';

export default function RecipeEditorPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { isDark } = useTheme();
  const { addRecipe, updateRecipe, getRecipeById } = useRecipes();
  const isEditing = !!id;

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Populate fields if editing
  useEffect(() => {
    if (isEditing) {
      const recipe = getRecipeById(Number(id));
      if (recipe) {
        setImage(recipe.image ?? '');
        setName(recipe.name);
        setDescription(recipe.description);
        setCookTime(recipe.cookTime);
        setServings(String(recipe.servings));
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
      }
    }
  }, [id]);

  const pickImage = async () => {
    const pickedFile = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true, // Ensures file is readable by expo-file-system
      multiple: false,
    });
    console.log(pickedFile);
    if (!pickedFile.canceled) setImage(pickedFile.assets[0].uri);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorVisible(true);
    return false;
  };

  const handleSave = () => {
    if (!image) return showError('Please add a recipe photo');
    if (name.trim().length === 0) return showError('Please enter a recipe name.');
    if (description.trim().length === 0) return showError('Please enter a recipe description.');
    if (servings.length === 0) return showError('Please enter the serving amount.');
    if (ingredients[0].trim().length === 0) return showError('Please enter at least 1 ingredient.');
    if (instructions[0].trim().length === 0) return showError('Please enter the 1st step.');
    if (!name.trim()) return;
    const recipe = {
      name: name.trim(),
      description,
      cookTime,
      servings: Number(servings),
      image,
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim()),
    };
    if (isEditing) {
      updateRecipe(Number(id), recipe);
    } else {
      addRecipe(recipe);
    }
    //router.back();
    router.replace('/MyRecipes');
  };

  const updateIngredient = (text: string, index: number) => {
    setIngredients((prev) => prev.map((v, i) => (i === index ? text : v)));
  };

  const updateInstruction = (text: string, index: number) => {
    setInstructions((prev) => prev.map((v, i) => (i === index ? text : v)));
  };

  const inputClass =
    'bg-background-100 dark:bg-background-dark-50 border border-text-100 dark:border-background-dark-300 rounded-2xl px-4 py-3 text-sm text-text-800 dark:text-text-dark-800';

  return (
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
                numberOfLines={4}
                textAlignVertical="top"
                className={`${inputClass} h-24`}
              />
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

            {/* Instructions */}
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">
                  Instructions
                </Text>
                <TouchableOpacity
                  onPress={() => setInstructions((prev) => [...prev, ''])}
                  className="flex-row items-center gap-1 rounded-full bg-primary-100 px-3 py-1.5 dark:bg-primary-900">
                  <Plus size={12} color="#F39C12" />
                  <Text className="text-xs font-semibold text-primary-600 dark:text-primary-300">
                    Add Step
                  </Text>
                </TouchableOpacity>
              </View>
              {instructions.map((instruction, index) => (
                <View key={index} className="flex-row items-start gap-2">
                  <View className="mt-2 size-8 items-center justify-center rounded-full bg-primary-500">
                    <Text className="text-xs font-bold text-white">{index + 1}</Text>
                  </View>
                  <TextInput
                    value={instruction}
                    onChangeText={(text) => updateInstruction(text, index)}
                    placeholder={`Step ${index + 1}`}
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    multiline
                    textAlignVertical="top"
                    className={`${inputClass} min-h-[60px] flex-1`}
                  />
                  {instructions.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => setInstructions((prev) => prev.filter((_, i) => i !== index))}
                      className="mt-2 size-9 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
                      <X size={14} color="#FB4141" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <ErrorModal
          visible={errorVisible}
          message={errorMessage}
          onClose={() => setErrorVisible(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
