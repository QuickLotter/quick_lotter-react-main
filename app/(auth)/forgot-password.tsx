import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { Colors, Typography } from "@/theme";
import { useRouter } from "expo-router";

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgot = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // --- INTEGRAÇÃO COM API DE RECUPERAÇÃO DE SENHA ---
    // try {
    //   const res = await api.forgotPassword({ email });
    //   if (res.success) {
    //     router.replace("/verify-code");
    //   } else {
    //     setError(res.message);
    //   }
    // } catch (e) {
    //   setError("Network or server error");
    // }

    // MOCK: redireciona direto para verificação de código
    setTimeout(() => {
      router.replace("/verify-code");
    }, 800);
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
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we’ll send you instructions to reset
            your password.
          </Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Email"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleForgot}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>

          {/* Links para Login e Signup */}
          <Text style={styles.footerText}>
            Remembered your password?{" "}
            <Text style={styles.link} onPress={() => router.push("/login")}>
              Login
            </Text>
          </Text>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.link} onPress={() => router.push("/signup")}>
              Sign Up
            </Text>
          </Text>
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
  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
  footerText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    fontSize: 14,
  },
});
