import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ImagePlus, Plus, X } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import useTheme from '@/hooks/useTheme';
import useRecipes from '@/hooks/useRecipes';

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

  const handleSave = () => {
  //   if (!name.trim()) return;
  //   const recipe = {
  //     name,
  //     description,
  //     cookTime,
  //     servings: Number(servings),
  //     image,
  //     ingredients: ingredients.filter((i) => i.trim()),
  //     instructions: instructions.filter((i) => i.trim()),
  //   };
  //   if (isEditing) {
  //     updateRecipe(Number(id), recipe);
  //   } else {
  //     addRecipe(recipe);
  //   }
  //   router.back();
  };

  const updateIngredient = (text: string, index: number) => {
  //   setIngredients((prev) => prev.map((v, i) => (i === index ? text : v)));
  };

  const updateInstruction = (text: string, index: number) => {
  //   setInstructions((prev) => prev.map((v, i) => (i === index ? text : v)));
  };

  const inputClass = "bg-background-100 dark:bg-background-dark-50 border border-text-100 dark:border-background-dark-300 rounded-2xl px-4 py-3 text-sm text-text-800 dark:text-text-dark-800";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-background-200 dark:bg-background-dark-100">

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-background-200 dark:bg-background-dark-100">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.replace('/MyRecipes')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={22} color={isDark ? '#E5E7EB' : '#2C3E50'} />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-text-800 dark:text-text-dark-800">
              {isEditing ? 'Edit Recipe' : 'Create Recipe'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            className="bg-accent-500 px-5 py-2 rounded-full"
          >
            <Text className="text-white font-semibold text-sm">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-4 gap-6">

            {/* Image picker */}
            <TouchableOpacity
              onPress={pickImage}
              className="w-full rounded-2xl overflow-hidden border-2 border-dashed border-text-200 dark:border-background-dark-400"
              style={{ height: 180 }}
            >
              {image ? (
                <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <View className="flex-1 items-center justify-center gap-2 bg-background-100 dark:bg-background-dark-50">
                  <ImagePlus size={32} color={isDark ? '#6B7280' : '#9CA3AF'} />
                  <Text className="text-text-400 dark:text-text-dark-500 text-sm">Add Recipe Photo</Text>
                  <Text className="text-text-300 dark:text-text-dark-400 text-xs">Max 5MB</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Recipe Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Recipe Name</Text>
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
              <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Description</Text>
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
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Cook Time</Text>
                <TextInput
                  value={cookTime}
                  onChangeText={setCookTime}
                  placeholder="In min"
                  placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                  className={inputClass}
                />
              </View>
              <View className="flex-1 gap-2">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Servings</Text>
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
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Ingredients</Text>
                <TouchableOpacity
                  onPress={() => setIngredients((prev) => [...prev, ''])}
                  className="flex-row items-center gap-1 bg-accent-100 dark:bg-accent-900 px-3 py-1.5 rounded-full"
                >
                  <Plus size={12} color="#2ECC71" />
                  <Text className="text-accent-600 dark:text-accent-300 text-xs font-semibold">Add</Text>
                </TouchableOpacity>
              </View>
              {ingredients.map((ingredient, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <TextInput
                    value={ingredient}
                    onChangeText={(text) => updateIngredient(text, index)}
                    placeholder={`Ingredient ${index + 1}`}
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    className={`${inputClass} flex-1`}
                  />
                  {ingredients.length > 1 ?
                  <TouchableOpacity
                    onPress={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}
                    className="size-9 rounded-full bg-secondary-100 dark:bg-secondary-900 items-center justify-center"
                  >
                    <X size={14} color="#FB4141" />
                  </TouchableOpacity> : null}
                </View>
              ))}
            </View>

            {/* Instructions */}
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-text-800 dark:text-text-dark-800">Instructions</Text>
                <TouchableOpacity
                  onPress={() => setInstructions((prev) => [...prev, ''])}
                  className="flex-row items-center gap-1 bg-primary-100 dark:bg-primary-900 px-3 py-1.5 rounded-full"
                >
                  <Plus size={12} color="#F39C12" />
                  <Text className="text-primary-600 dark:text-primary-300 text-xs font-semibold">Add Step</Text>
                </TouchableOpacity>
              </View>
              {instructions.map((instruction, index) => (
                <View key={index} className="flex-row items-start gap-2">
                  <View className="size-8 rounded-full bg-primary-500 items-center justify-center mt-2">
                    <Text className="text-white text-xs font-bold">{index + 1}</Text>
                  </View>
                  <TextInput
                    value={instruction}
                    onChangeText={(text) => updateInstruction(text, index)}
                    placeholder={`Step ${index + 1}`}
                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                    multiline
                    textAlignVertical="top"
                    className={`${inputClass} flex-1 min-h-[60px]`}
                  />
                  {instructions.length > 1 ?
                  <TouchableOpacity
                    onPress={() => setInstructions((prev) => prev.filter((_, i) => i !== index))}
                    className="size-9 rounded-full bg-secondary-100 dark:bg-secondary-900 items-center justify-center mt-2"
                  >
                    <X size={14} color="#FB4141" />
                  </TouchableOpacity> : null}
                </View>
              ))}
            </View>

          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}