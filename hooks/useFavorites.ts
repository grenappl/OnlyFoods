import { FavoritesContext } from "@/context/FavoritesProvider";
import { useContext } from "react";

const useFavorites = () => useContext(FavoritesContext);
export default useFavorites