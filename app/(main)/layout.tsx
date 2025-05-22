import React from "react";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade", // ou 'fade', 'default', 'simple_push'
        headerShown: false,
      }}
    />
  );
}
