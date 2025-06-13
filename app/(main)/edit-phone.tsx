import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { MaterialIcons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Cores iOS-like
const COLORS = {
  background: "#F6F6F8",
  white: "#FFF",
  text: "#23242A",
  textMuted: "#8C95A3",
  border: "#E5E7EB",
  primary: "#007AFF",
  infoBg: "#EAF2FD",
  accent: "#FF3366",
};

export default function EditPhone() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Função para formatar (XXX) XXX-XXXX
  const handlePhoneChange = (raw: string) => {
    let cleaned = raw.replace(/\D/g, "");
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    let formatted = cleaned;
    if (cleaned.length >= 7)
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6)}`;
    else if (cleaned.length >= 4)
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    else if (cleaned.length > 0) formatted = `(${cleaned}`;
    setPhone(formatted);
    setError("");
  };

  // Valida se está completo
  const isValidPhone = (phone: string) => {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
  };

  // Ao salvar, apenas simula envio, depois volta à tela anterior
  const handleSave = () => {
    if (!isValidPhone(phone)) {
      setError("Enter a valid phone number (XXX) XXX-XXXX");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "A verification message has been sent!");
      router.back(); // Ou router.replace("/personal-data") se quiser garantir navegação
    }, 1200);
    // Depois, conecte aqui o Supabase + SMS
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 12 }} />

          {/* Ícone circular */}
          <View style={styles.iconWrapper}>
            <MaterialIcons name="phone" size={38} color={COLORS.primary} />
          </View>

          {/* Título */}
          <Text style={styles.title}>Edit Your Phone Number</Text>

          {/* Input + prefixo */}
          <View style={styles.inputRow}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>+1</Text>
            </View>
            <View style={styles.phoneInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={COLORS.textMuted}
                style={styles.phoneInput}
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                selectionColor={COLORS.primary}
                maxLength={14}
                autoFocus
                returnKeyType="done"
              />
              <Pressable style={styles.editIcon} hitSlop={8}>
                <MaterialIcons name="edit" size={22} color={COLORS.textMuted} />
              </Pressable>
            </View>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Botão */}
          <TouchableOpacity
            style={[
              styles.button,
              (!isValidPhone(phone) || loading) && { opacity: 0.55 },
            ]}
            onPress={handleSave}
            disabled={!isValidPhone(phone) || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Save and send the message"}
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.infoBox}>
            <MaterialIcons
              name="info-outline"
              size={19}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>
              After editing your phone number, you’ll receive a text message
              with a verification code. This is done to maintain your account’s
              security.
            </Text>
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 44,
    backgroundColor: COLORS.background,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E7F5FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
    marginTop: 6,
    shadowColor: "#007AFF",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.text,
    marginBottom: 23,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.04,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
    width: "100%",
  },
  prefixBox: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    minWidth: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  prefixText: {
    fontWeight: "700",
    color: COLORS.text,
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  phoneInputWrapper: {
    flex: 1,
    position: "relative",
  },
  phoneInput: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 18,
    paddingRight: 44,
    color: COLORS.text,
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  editIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -11,
    opacity: 0.68,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 28,
    width: "100%",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.11,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "left",
    marginLeft: 4,
    fontWeight: "600",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: COLORS.infoBg,
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    lineHeight: 20,
  },
});
