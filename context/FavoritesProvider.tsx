import { privateApi } from '@/utils/api';
import formatRecipe from '@/utils/formatRecipe';
import RECIPES, { RecipeType } from '@/utils/Recipes';
import { createContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: RecipeType[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  setFavorites: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  setFavorites: () => {}
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<RecipeType[]>([]);

  const addFavorite = async (id: number) => {
    try {
      await privateApi.post(`favorites/${id}/save`)
      const res = await privateApi.get(`/recipes/${id}`)
      const r = {...res.data}
      const recipe = formatRecipe(r)
      setFavorites(prev => [...prev, recipe])
    } catch (e) {
      console.log(e)
    }
  }
  const removeFavorite = async (id: number) => {
    try {
      await privateApi.delete(`favorites/${id}/save`)
      console.log('removed fav!')
      setFavorites((prev) => prev.filter((r) => r.id !== id))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, setFavorites }}>
        {children}
    </FavoritesContext.Provider>
  );
};