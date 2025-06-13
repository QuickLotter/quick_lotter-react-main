import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useLocation } from "@/app/(main)/context/LocationContext";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/(auth)/AuthContext"; // Importante!

export default function PostLoginGate() {
  const { state } = useLocation();
  const router = useRouter();
  const { loading, canAccessApp } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!canAccessApp()) {
      router.replace("/paywall");
      return;
    }

    // Se não escolheu estado, obriga passar pelo Welcome
    if (!state) {
      router.replace("/welcome");
      return;
    }

    // Se tem acesso e já tem estado, vai para a home
    router.replace("/home");
  }, [loading, canAccessApp, state]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007EFF" />
    </View>
  );
}
