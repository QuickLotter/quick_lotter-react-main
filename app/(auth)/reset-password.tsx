import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Set a new password</Text>
          <Text style={styles.subtitle}>
            Enter and confirm your new password below.
          </Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="New Password"
            placeholderTextColor={Colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Confirm New Password"
            placeholderTextColor={Colors.textMuted}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

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
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 8,
    paddingBottom: 40,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    padding: 24,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    color: Colors.text,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
