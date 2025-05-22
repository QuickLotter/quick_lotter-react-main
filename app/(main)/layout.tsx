// app/(main)/layout.tsx
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "@/components/generator/layout/BottomNav";

export default function MainLayout() {
  return (
    <View style={styles.wrapper}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
