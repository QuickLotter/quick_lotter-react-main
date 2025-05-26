import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { useRouter } from "expo-router";

// Cores estilo iOS
const COLORS = {
  background: "#F6F6F8",
  white: "#FFF",
  text: "#21242A",
  textMuted: "#8C95A3",
  primary: "#007AFF",
  success: "#00C851",
  iconBg: "#E6F7EA",
};

export default function Completed() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />

      <View style={styles.container}>
        <View style={{ height: 0 }} />

        <View style={styles.iconCircle}>
          <MaterialIcons name="celebration" size={50} color={COLORS.success} />
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>
          Your information has been successfully verified. You’re ready to start
          using Quick Lotter.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 22,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconCircle: {
    backgroundColor: COLORS.iconBg,
    borderRadius: 80,
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#1ACB4F",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 13,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.12,
  },
  subtitle: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 38,
    paddingHorizontal: 10,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    lineHeight: 23,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 17,
    paddingHorizontal: 58,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.17,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.13,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
