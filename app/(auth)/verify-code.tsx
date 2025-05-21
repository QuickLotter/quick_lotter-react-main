import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Typography } from "@/theme";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { useRouter } from "expo-router";

// Componente para limitar largura e centralizar
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef<any[]>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }
      if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      setError("");
      // ---- INTEGRAÇÃO COM API DE VERIFICAÇÃO DE CÓDIGO ----
      // try {
      //   const res = await api.verifyCode({ code: fullCode });
      //   if (res.success) {
      //     router.replace("/reset-password");
      //   } else {
      //     setError(res.message);
      //   }
      // } catch (e) {
      //   setError("Network or server error");
      // }
      // MOCK: vai direto para reset de senha
      setTimeout(() => {
        router.replace("/reset-password");
      }, 700);
    } else {
      setError("Please enter all 6 digits.");
    }
  };

  return (
    <View style={styles.wrapper}>
      <HeaderLoginLogo title="Verify Code" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Enter Verification Code</Text>

          <View style={styles.codeRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => handleChange(text, index)}
                ref={(ref) => (inputs.current[index] = ref)}
                autoFocus={index === 0}
                returnKeyType="next"
                blurOnSubmit={false}
              />
            ))}
          </View>

          {error ? (
            <Text style={{ color: Colors.danger, marginBottom: 12 }}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resendLink}
            onPress={() => {
              // Aqui vai a chamada para reenviar o código pela API
              alert("A new code will be sent to your email/phone!");
            }}
          >
            <Text style={styles.resendText}>Resend code</Text>
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
    paddingTop: 8,
    paddingBottom: 40,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 32,
    textAlign: "center",
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    color: Colors.text,
    backgroundColor: Colors.white,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  resendLink: {
    marginTop: 20,
  },
  resendText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
