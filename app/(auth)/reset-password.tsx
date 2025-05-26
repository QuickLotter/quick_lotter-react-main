import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { Colors, Typography } from "@/theme";
import { useRouter } from "expo-router";

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // ---- INTEGRAÇÃO COM API DE RESET DE SENHA AQUI ----
    // await api.resetPassword({ password });
    // Após sucesso:
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLoginLogo title="" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.subtitle}>
            Enter and confirm your new password below.
          </Text>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Create a new password"
            placeholderTextColor={Colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Repeat your new password"
            placeholderTextColor={Colors.textMuted}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 12,
    paddingBottom: 36,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 370,
    alignSelf: "center",
    padding: 28,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#00397A22",
        shadowOpacity: 0.14,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 7 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
    color: "#007AFF",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  subtitle: {
    color: "#8CA1D2",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 14,
    marginTop: 2,
  },
  label: {
    color: "#2D3A5C",
    marginBottom: 6,
    marginTop: 15,
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    color: "#222",
    marginBottom: 8,
    borderWidth: 1.2,
    borderColor: "#DEE4F2",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 14,
    textAlign: "center",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 2,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.1,
  },
});
