// hooks/useBreakpoint.ts
import { useWindowDimensions } from "react-native";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();

  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 480) return "sm";
  return "xs";
}
