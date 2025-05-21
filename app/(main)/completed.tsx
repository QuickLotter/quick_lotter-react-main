import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography } from "@/theme";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { useRouter } from "expo-router";

export default function Completed() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />

      <View style={styles.container}>
        <View style={{ height: 112 }} />

        <View style={styles.iconCircle}>
          <MaterialIcons name="celebration" size={48} color="#00C851" />
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>
          Your information has been successfully verified. You're ready to start
          using Quick Lotter.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")} // ou /profile
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
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconCircle: {
    backgroundColor: "#E6F7EA",
    borderRadius: 60,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    ...Typography.heading,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 64,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
