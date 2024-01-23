import ThemeContext from "../context/theme";
import { useContext } from "react";


export default function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext)

    return { theme, setTheme }
}
