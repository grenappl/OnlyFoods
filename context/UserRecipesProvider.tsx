import { createContext, useEffect, useState } from 'react';
import RECIPES, { RecipeType } from '@/utils/Recipes';
import { privateApi } from '@/utils/api';
import useAuth from '@/hooks/useAuth';

// Omit id since it's auto-generated on add
type NewRecipe = Omit<RecipeType, 'id'>;

interface RecipesContextType {
  recipes: RecipeType[];
  addRecipe: (
    recipe: NewRecipe,
    imageFile: { uri: string; name: string; type: string } | null
  ) => void;
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
  const { auth } = useAuth();

  // Load recipes on app start
  const loadUserRecipes = async () => {
    try {
      if (!auth?.accessToken) {
        return;
      }
      const res = await privateApi.get('/recipes/my');
      //setRecipes((prev) => [...prev, RECIPES[0]]);
      // // replace with actual API/storage call
      // setRecipes(res.data);
      //console.log('access: ', auth?.accessToken);

      const recipesWithImages = await Promise.all(
        res.data.map(async (recipe: RecipeType) => {
          try {
            const detailRes = await privateApi.get(`/recipes/${recipe.id}`);
            //console.log('detail res: ', detailRes.data);
            return {
              ...recipe,
              image: detailRes.data.recipe_media ?? null,
            };
          } catch {
            // If image fetch fails, return recipe without image
            return { ...recipe, image: null };
          }
        })
      );
      setRecipes(recipesWithImages);
      //console.log('Recipes with images: ', recipes);
    } catch (e: any) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadUserRecipes();
  }, [auth?.accessToken]);

  // Persist whenever recipes change
  useEffect(() => {
    // replace with actual API/storage call
    privateApi.get('/recipes/my');
  }, [recipes]);

  const addRecipe = async (
    recipe: NewRecipe,
    imageFile: { uri: string; name: string; type: string } | null
  ) => {
    // const newRecipe: RecipeType = {
    //   ...recipe,
    //   id: Date.now(), // temporary id until you have a backend
    // };
    //console.log('stuff: ', recipe);
    try {
      //post text info first
      const res = await privateApi.post('recipes/create', recipe);

      //then post image
      const recipeId = res.data?.id;
      const newRecipe = res.data;
      console.log('RecipeID: ', recipeId);
      console.log('ImageFile: ', imageFile);
      if (imageFile && recipeId) {
        const formData = new FormData();
        console.log('imageFile: ', imageFile);
        // The key MUST match the backend field name exactly ('file')
        formData.append('file', {
          uri: imageFile.uri,
          name: imageFile.name,
          type: imageFile.type,
        } as any);

        // Matches 'caption' field
        formData.append('caption', 'Finished dish photo');

        // Matches 'position' field (Note: values in FormData are sent as strings)
        formData.append('position', '0');
        console.log('Form: ', formData);
        console.log('Form.file: ', formData.get('file'));
        try {
          // POST request to your specific upload sub-route
          const mediaRes = await privateApi.post(`/recipes/${recipeId}/media`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Media uploaded response:', mediaRes.data);
          const uploadedMedia = mediaRes.data?.data;

          if (uploadedMedia) {
            // Push the media object directly into our recipe record's media array
            newRecipe.image = uploadedMedia.url;
          }
        } catch (e: any) {
          console.error('Unable to upload file to database: ', e);
        }
      } else {
        console.log('No image file or recipeID found.');
      }
      loadUserRecipes();
      setRecipes((prev) => [...prev, newRecipe]);
      console.log('After adding: ', recipes);
    } catch (e: any) {
      if (e?.response?.data) {
        console.log('Validation Error Details:', JSON.stringify(e.response.data, null, 2));
      } else {
        console.error('Failed to create recipe:', e);
      }
    }
  };

  const updateRecipe = (id: number, updated: Partial<RecipeType>) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const removeRecipe = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const getRecipeById = (id: number) => {
    return recipes.find((r) => r.id === id);
  };

  return (
    <UserRecipesContext.Provider
      value={{ recipes, addRecipe, updateRecipe, removeRecipe, getRecipeById }}>
      {children}
    </UserRecipesContext.Provider>
  );
};
