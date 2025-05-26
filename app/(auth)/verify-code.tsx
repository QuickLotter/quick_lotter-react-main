import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
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
    <SafeAreaView style={styles.wrapper}>
      <HeaderLoginLogo title="" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Verify your code</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your email or phone.
          </Text>
          <View style={styles.codeRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.codeInput,
                  digit ? styles.codeInputFilled : null,
                ]}
                value={digit}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => handleChange(text, index)}
                ref={(ref) => (inputs.current[index] = ref)}
                autoFocus={index === 0}
                returnKeyType="next"
                blurOnSubmit={false}
                selectionColor={Colors.primary}
              />
            ))}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    paddingTop: 10,
    paddingBottom: 38,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 370,
    alignSelf: "center",
    padding: 28,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 28,
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "800",
    color: "#007AFF",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  subtitle: {
    color: "#7B859B",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    marginTop: 0,
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 13,
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 58,
    borderWidth: 2,
    borderColor: "#DEE4F2",
    borderRadius: 13,
    textAlign: "center",
    fontSize: 22,
    color: "#222",
    backgroundColor: "#F9FAFB",
    marginHorizontal: 3,
    fontWeight: "700",
  },
  codeInputFilled: {
    borderColor: "#007AFF",
    backgroundColor: "#F1F6FF",
    color: "#0E4CA1",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 64,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  resendLink: {
    marginTop: 16,
    marginBottom: 0,
  },
  resendText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 12,
    textAlign: "center",
  },
});
