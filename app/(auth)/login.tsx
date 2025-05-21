import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography } from "@/theme";
import GoogleIcon from "@/assets/icons/google.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { useRouter } from "expo-router";

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Campos controlados para autenticação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Função de login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // --- INTEGRAÇÃO COM API DE LOGIN ---
    // Exemplo:
    // try {
    //   const res = await api.login({ email, password });
    //   if (res.success) {
    //     // Salve token, usuário, etc.
    //     router.replace("/home"); // ROTA DA HOME
    //   } else {
    //     setError(res.message);
    //   }
    // } catch (e) {
    //   setError("Network or server error");
    // }

    // TESTE MOCK:
    setTimeout(() => {
      // Troque para router.replace("/main/home") se for necessário
      router.replace("/main/home"); // ROTA DA HOME
    }, 800);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <HeaderLoginLogo title="" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: 16, paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color={Colors.text}
              />
            </Pressable>
          </View>

          {error ? (
            <Text style={{ color: Colors.danger, marginBottom: 12 }}>
              {error}
            </Text>
          ) : null}

          <View style={styles.row}>
            <Pressable
              onPress={() => setRemember(!remember)}
              style={styles.checkboxContainer}
            >
              <MaterialIcons
                name={remember ? "check-box" : "check-box-outline-blank"}
                size={20}
                color={Colors.success}
              />
              <Text style={styles.remember}> Remember Me</Text>
            </Pressable>
            <Pressable
              style={{ marginLeft: "auto" }}
              onPress={() => router.push("/forgot-password")}
            >
              <Text style={styles.link}>Forgot Password</Text>
            </Pressable>
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
              style={styles.loginButton}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.or}>─────────── Or With ──────────</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <GoogleIcon width={20} height={20} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FacebookIcon width={20} height={20} />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.legalTitle}>Responsible Play</Text>
          <Text style={styles.legalText}>
            You must be <Text style={styles.bold}>18 years or older</Text> to
            participate in the lottery in New York. If you or someone you know
            has a gambling problem, please call{" "}
            <Text style={styles.bold}>1–877–8–HOPE–NY</Text> or text{" "}
            <Text style={styles.bold}>HOPENY (467369)</Text>. For any questions,
            comments, or concerns, please email{" "}
            <Text style={styles.link}>support@quicklotter.com</Text>.
          </Text>

          <Text style={styles.legalText}>
            Quicklotter.com does not sell lottery tickets; we provide tools and
            resources to help you improve your lottery games and strategies.
          </Text>

          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.link} onPress={() => router.push("/signup")}>
              Sign Up
            </Text>
          </Text>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

// ... estilos igual ao seu original ...

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    minHeight: "100%",
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    padding: 24,
  },
  label: {
    ...Typography.subheading,
    color: Colors.primary,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 10,
    color: Colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 10,
  },
  eyeButton: {
    padding: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remember: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
    marginTop: 12,
  },
  loginText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  or: {
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    gap: 10,
  },
  socialText: {
    color: Colors.text,
    fontWeight: "500",
  },
  legalTitle: {
    color: Colors.text,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 4,
  },
  legalText: {
    color: "#333",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  footerText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
