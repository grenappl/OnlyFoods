import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";


const useTheme = () => useContext(ThemeContext);
export default useTheme