import { UserRecipesContext } from "@/context/UserRecipesProvider";
import { useContext } from "react";

const useRecipes = () => useContext(UserRecipesContext);
export default useRecipes