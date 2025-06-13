import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { Colors, Typography } from "@/theme";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext"; // <-- ajuste o path conforme seu projeto

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleForgot = async () => {
    setError("");
    setSuccess("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email for the reset link.");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }
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
            autoCorrect={false}
          />
          {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleForgot}
            activeOpacity={0.82}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>

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
  // ...os mesmos estilos do seu código anterior...
  wrapper: {
    flex: 1,
    backgroundColor: "#F6F7FB",
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
    maxWidth: 370,
    alignSelf: "center",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 22,
    ...Platform.select({
      ios: {
        shadowColor: "#00397A22",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    color: "#007AFF",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  subtitle: {
    color: "#7B859B",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 26,
    fontWeight: "400",
    lineHeight: 22,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#DEE4F2",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 12,
    color: "#181A20",
    shadowColor: "#00397A22",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF2F2",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    textAlign: "center",
  },
  successText: {
    color: "#0BBD5B",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  link: {
    color: "#007AFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  footerText: {
    color: "#8C94A5",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    fontSize: 14,
  },
});
