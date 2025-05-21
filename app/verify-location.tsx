// app/verify-location.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function VerifyLocationScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    // Enviar código para o backend
    const response = await fetch("https://yourapi.com/verify-code", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();

    if (data.success) {
      router.replace("/home");
    } else {
      alert("Invalid code!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Verification</Text>
      <Text style={styles.desc}>
        We detected a new location. Enter the code sent to your email or phone.
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        placeholder="Enter verification code"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#034C9F",
  },
  desc: { fontSize: 14, color: "#333", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#034C9F",
    borderRadius: 10,
    padding: 12,
    width: "80%",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007EFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
