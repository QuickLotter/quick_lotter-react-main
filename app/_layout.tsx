// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationProvider } from "@/app/(main)/context/LocationContext"; // ajuste o caminho conforme seu projeto

export default function Layout() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <Slot />
      </LocationProvider>
    </SafeAreaProvider>
  );
}
