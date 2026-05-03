import RECIPES, { RecipeType } from '@/utils/Recipes';
import { createContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: RecipeType[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {}
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<RecipeType[]>([]);

  // Load favorites on app start
  useEffect(() => {
    const loadFavorites = async () => {
        // backend stuff
    };
    loadFavorites();
  }, []);

  // Save to db
  useEffect(() => {
    // backend stuff
  }, [favorites]);

  const addFavorite = (id: number) => {
    const recipe = RECIPES.find(recipe => recipe.id === id) // will replace with api
    if(recipe) setFavorites(prev => [...prev, recipe])
  }
  const removeFavorite = (id: number) => {
    // backend
    setFavorites((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        {children}
    </FavoritesContext.Provider>
  );
};