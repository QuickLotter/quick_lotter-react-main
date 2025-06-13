// components/EmailConfirmNotice.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useAuth } from "@/app/(auth)/AuthContext";

export default function EmailConfirmNotice() {
  const { user, signOut } = useAuth();

  const handleResend = async () => {
    try {
      // Supabase resend code (adjust for your SDK version)
      // await supabase.auth.resend({ type: "signup", email: user.email });
      alert("A new confirmation link was sent to your e-mail!");
    } catch {
      alert("Failed to resend confirmation link. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Check your e-mail!</Text>
      <Text style={styles.desc}>
        We've sent a confirmation link to your e-mail address.{"\n"}
        Please click the link to activate your Quick Lotter account.
      </Text>
      <TouchableOpacity
        onPress={handleResend}
        style={styles.resendBtn}
        activeOpacity={0.85}
      >
        <Text style={styles.resendText}>Resend confirmation link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signOut}
        style={styles.logoutBtn}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  logo: {
    width: 84,
    height: 84,
    marginBottom: 28,
    borderRadius: 24,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#007EFF",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#007EFF",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  desc: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    fontWeight: "500",
  },
  resendBtn: {
    backgroundColor: "#007EFF",
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 17,
    marginTop: 0,
    minWidth: 210,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#007EFF",
        shadowOpacity: 0.13,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 1 },
    }),
  },
  resendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15.5,
    letterSpacing: 0.2,
  },
  logoutBtn: {
    marginTop: 22,
    padding: 8,
  },
  logoutText: {
    color: "#777",
    fontSize: 13.5,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
});
