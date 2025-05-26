import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

// Centralização e responsividade máxima
const MAX_WIDTH = 440;
const MIN_WIDTH = 320;

export default function VerifyLocationScreen() {
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);

  const handleResend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 1400);
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullWrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.centerBox}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Verify Your Location</Text>
        <Text style={styles.subtitle}>
          For your security, enter the 6-digit code sent to your email or phone
          to confirm your location.
        </Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="6-digit code"
          placeholderTextColor="#BBC4D5"
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          textAlign="center"
        />
        <TouchableOpacity
          style={[styles.button, code.length !== 6 && styles.buttonDisabled]}
          disabled={code.length !== 6}
          onPress={() => {
            /* handler */
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResend} disabled={sent}>
          <Text style={[styles.resend, sent && styles.resendSent]}>
            {sent ? "Code sent!" : "Resend code"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullWrapper: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Para web 100% viewport
    minWidth: "100vw",
  },
  centerBox: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    minWidth: MIN_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 38,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#1A237E11",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 26,
    elevation: 3,
    marginHorizontal: 12,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#245EC2",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  subtitle: {
    fontSize: 15,
    color: "#444B5B",
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 26,
    lineHeight: 21,
  },
  input: {
    width: "100%",
    borderWidth: 1.7,
    borderColor: "#C9D7EE",
    borderRadius: 13,
    paddingVertical: 16,
    backgroundColor: "#F6F7FA",
    fontSize: 20,
    fontWeight: "700",
    color: "#34415E",
    marginBottom: 14,
    shadowColor: "#B0C4DE",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    letterSpacing: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4A90FA",
    borderRadius: 13,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#1A237E11",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  buttonDisabled: {
    backgroundColor: "#BFDDF9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  resend: {
    color: "#245EC2",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 9,
  },
  resendSent: {
    color: "#41C86E",
  },
});
