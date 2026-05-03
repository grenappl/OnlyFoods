import { createContext, useEffect, useState } from 'react';
import RECIPES, { RecipeType } from '@/utils/Recipes';

// Omit id since it's auto-generated on add
type NewRecipe = Omit<RecipeType, 'id'>;

interface RecipesContextType {
  recipes: RecipeType[];
  addRecipe: (recipe: NewRecipe) => void;
  updateRecipe: (id: number, recipe: Partial<RecipeType>) => void;
  removeRecipe: (id: number) => void;
  getRecipeById: (id: number) => RecipeType | undefined;
}

export const UserRecipesContext = createContext<RecipesContextType>({
  recipes: [],
  addRecipe: () => {},
  updateRecipe: () => {},
  removeRecipe: () => {},
  getRecipeById: () => undefined,
});

export const UserRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  // Load recipes on app start
  useEffect(() => {
    const loadUserRecipes = async () => {
      setRecipes(prev => [...prev, RECIPES[0]])
      // replace with actual API/storage call
    };
    loadUserRecipes();
  }, []);

  // Persist whenever recipes change
  useEffect(() => {
    // replace with actual API/storage call
  }, [recipes]);

  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe: RecipeType = {
      ...recipe,
      id: Date.now(), // temporary id until you have a backend
    };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const updateRecipe = (id: number, updated: Partial<RecipeType>) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const removeRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const getRecipeById = (id: number) => {
    return recipes.find((r) => r.id === id);
  };

  return (
    <UserRecipesContext.Provider value={{ recipes, addRecipe, updateRecipe, removeRecipe, getRecipeById }}>
      {children}
    </UserRecipesContext.Provider>
  );
};