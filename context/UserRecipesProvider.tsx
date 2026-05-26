import { createContext, useEffect, useState } from 'react';
import RECIPES, { RecipeType } from '@/utils/Recipes';
import { privateApi } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import formatRecipe from '@/utils/formatRecipe';

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
            // console.log('detail res: ', detailRes.data);
            return formatRecipe(detailRes.data);
          } catch {
            // If image fetch fails, return recipe without image
            return { ...recipe, image: null };
          }
        })
      );
      setRecipes(recipesWithImages);
      //console.log('Recipes with images: ', recipes);
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadUserRecipes();
  }, [auth?.accessToken]);

  // Persist whenever recipes change
  // useEffect(() => {
  //   // replace with actual API/storage call
  //   privateApi.get('/recipes/my');
  // }, [recipes]);

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

  const updateRecipe = async (id: number, updated: Partial<RecipeType>) => {
    try {
      const res = await privateApi.put(`/recipes/update/${id}`, updated);
      console.log('Server update response:', res.data);

      await loadUserRecipes();
    } catch (e) {
      console.error(`Failed to update recipe ID ${id}:`, e);
    }
    //setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const removeRecipe = async (id: number) => {
    try {
      // 1. Make the authenticated network call to delete it from the database
      const res = await privateApi.delete(`/recipes/${id}`);
      console.log('delete: ', res.data);
      if (res) {
        console.log('Backend deletion status:', res.message);
      }

      console.log('Backend deletion status:', res.message);

      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      // 🔴 ERROR: The backend returned 401, 403, 404, or 500
      if (e.response?.data) {
        // Look for ".error" because your team's docs show errors use the "error" key!
        const backendError = e.response.data.error || 'Unknown server error';
        console.error(`Archiving failed with status ${e.response.status}:`, backendError);

        // Optional: If you have detailed database debugging info sent by your friend:
        if (e.response.data.details) {
          console.error('Backend Dev Details:', e.response.data.details);
        }
      } else {
        // Fallback for absolute network failures (e.g., local server is turned off)
        console.error('Network/Server connection failed:', e.message || e);
      }
      //throw e; // Pass the error up so your UI can display a message if needed
    }
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
