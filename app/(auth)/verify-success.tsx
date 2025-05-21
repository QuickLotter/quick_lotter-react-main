import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography } from "@/theme";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { useRouter } from "expo-router";

// Componente responsivo
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function VerifySuccess() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <HeaderLoginLogo title="Verification Success" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          {/* Ícone de sucesso */}
          <View style={styles.iconCircle}>
            <MaterialIcons name="check-circle" size={54} color="#00C851" />
          </View>

          <Text style={styles.title}>Verification Successful</Text>
          <Text style={styles.subtitle}>
            Your phone number has been successfully verified and added to your
            account.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/completed")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 24,
    paddingBottom: 40,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    backgroundColor: "#E6F7EA",
    borderRadius: 60,
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
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
