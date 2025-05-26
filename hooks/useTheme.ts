// useTheme.ts`
// hooks/useTheme.ts
import { useColorScheme } from "react-native";
import { theme } from "@/theme";

export function useTheme() {
  const scheme = useColorScheme(); // retorna "light", "dark" ou null
  if (scheme === "dark") return theme.dark;
  return theme.light;
}
