import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export default function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        console.error("`useTheme` must be used within a `ThemeProvider`");
    }

    return context;
}