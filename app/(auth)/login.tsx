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
  SafeAreaView,
  Platform,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setTimeout(() => {
      router.replace("/main/home");
    }, 800);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLoginLogo title="" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: 24, paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Access your Quick Lotter account to continue
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
                color={Colors.textMuted}
              />
            </Pressable>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
              <Text style={styles.link}>Forgot Password?</Text>
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

          <Text style={styles.or}>───── Or Continue With ─────</Text>
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

          {/* RESPONSIBLE PLAY */}
          <Text style={styles.legalTitle}>Responsible Play</Text>
          <Text style={styles.legalText}>
            Play responsibly. Only for 18 years or older. Need help with
            gambling? Support is free, confidential, and available 24/7 at{" "}
            <Text style={styles.link}>1-800-662-HELP (4357)</Text> or{" "}
            <Text style={styles.link}>support@quicklotter.com</Text>.
          </Text>
          <Text style={styles.legalText}>
            Quick Lotter does not sell lottery tickets. We provide digital tools
            and resources to help you enjoy and optimize your lottery
            experience.
          </Text>
          {/*  */}

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
    backgroundColor: "#F6F7FB",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    minHeight: "100%",
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 370,
    alignSelf: "center",
    padding: 26,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 20,
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
    fontSize: 22,
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
    marginBottom: 16,
    marginTop: 2,
  },
  label: {
    color: "#2D3A5C",
    marginBottom: 6,
    marginTop: 16,
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    color: "#222",
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: "#DEE4F2",
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#DEE4F2",
    paddingHorizontal: 6,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: "#222",
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 8,
  },
  eyeButton: {
    padding: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remember: {
    color: "#484F5C",
    fontSize: 14,
    fontWeight: "500",
  },
  link: {
    color: "#007AFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 22,
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  or: {
    color: "#8C94A5",
    textAlign: "center",
    marginBottom: 18,
    marginTop: 8,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 26,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 11,
    borderWidth: 1.2,
    borderColor: "#DEE4F2",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    gap: 10,
  },
  socialText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 14,
  },
  legalTitle: {
    color: "#222",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 7,
    marginTop: 8,
    fontSize: 15,
  },
  legalText: {
    color: "#7B859B",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  footerText: {
    color: "#8C94A5",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 10,
    fontSize: 14,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
});
