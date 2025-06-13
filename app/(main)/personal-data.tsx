//Ele está pronto para migrar depois para SMS real (só trocar a função handleVerifyPhone):
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { supabase } from "@/app/(auth)/supabaseClient"; // Ative quando for salvar no Supabase
import { useAuth } from "@/app/(auth)/AuthContext"; // Para dados reais do usuário

// --- Funções utilitárias de formatação ---
function formatPhone(raw: string) {
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
  return formatted;
}

function formatBirthDate(raw: string) {
  let cleaned = raw.replace(/\D/g, "");
  if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
  let formatted = cleaned;
  if (cleaned.length >= 5)
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4
    )}`;
  else if (cleaned.length >= 3)
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return formatted;
}

export default function PersonalData() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile } = useAuth(); // dados reais do usuário (ajuste conforme sua estrutura!)

  // -- Estado dos campos --
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // -- Preenche sempre no padrão, mesmo vindo do banco!
  useEffect(() => {
    setName(profile?.name || "");
    setAddress(profile?.address || "");
    setBirthDate(formatBirthDate(profile?.birth_date || ""));
    setEmail(profile?.email || "");
    setPhone(formatPhone(profile?.phone || ""));
    setIsPhoneVerified(!!profile?.is_phone_verified);
  }, [profile]);

  // Salvar no banco (atualmente só visual, troque para integração real depois)
  const handleSave = async () => {
    Alert.alert("Saved!", "Your data has been saved (visual only for now).");
    // Descomente para salvar no Supabase:
    // await supabase.from("user_profiles").update({ ... }).eq("id", user.id);
  };

  // Simula verificação de telefone (para SMS real, troque por chamada de API/SMS)
  const handleVerifyPhone = () => {
    setIsPhoneVerified(true);
    // Descomente para salvar no banco:
    // await supabase.from("user_profiles").update({ is_phone_verified: true }).eq("id", user.id);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack title="" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <ResponsiveContainer>
          <View style={{ height: insets.top + 10 }} />
          <Text style={styles.title}>Personal Data</Text>

          {/* --- SECTION 1 --- */}
          <View style={styles.section}>
            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Full Name"
            />
            <Field
              label="Address"
              value={address}
              onChange={setAddress}
              placeholder="Street, City, State"
            />
            <Field
              label="Date of Birth"
              value={birthDate}
              onChange={(v) => setBirthDate(formatBirthDate(v))}
              placeholder="MM/DD/YYYY"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* --- SECTION 2 --- */}
          <View style={styles.section}>
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
            />
            <Field
              label="Phone Number"
              value={phone}
              onChange={(v) => setPhone(formatPhone(v))}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={14}
              rightIcon={
                !isPhoneVerified ? (
                  <TouchableOpacity onPress={() => router.push("/edit-phone")}>
                    <MaterialIcons
                      name="edit"
                      size={20}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                ) : null
              }
            />
          </View>

          {/* --- SAVE BUTTON --- */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          {/* --- ALERTA DE VERIFICAÇÃO --- */}
          {!isPhoneVerified ? (
            <View style={styles.alertBox}>
              <View style={styles.alertRow}>
                <MaterialIcons name="shield" size={18} color="#F4C430" />
                <Text style={styles.alertText}>Your phone is not verified</Text>
              </View>
              <Text style={styles.alertDesc}>
                To keep your account more secure, please verify your phone
                number.
              </Text>
              <TouchableOpacity
                style={styles.alertBtn}
                onPress={handleVerifyPhone}
              >
                <Text style={styles.alertBtnText}>Verify</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.verifiedBox}>
              <View style={styles.verifiedRow}>
                <MaterialIcons name="verified" size={19} color="#22C55E" />
                <Text style={styles.verifiedText}>Phone Verified</Text>
              </View>
              <Text style={styles.verifiedDesc}>
                Your phone number has been successfully verified!
              </Text>
            </View>
          )}
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
  autoCapitalize,
  editable = true,
  maxLength,
  rightIcon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
  maxLength?: number;
  rightIcon?: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            !editable && { color: "#999", backgroundColor: "#F6F6F8" },
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scroll: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
    color: "#000",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    fontSize: 13,
    color: "#6D6D72",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  icon: {
    marginLeft: 8,
  },
  saveBtn: {
    backgroundColor: "#3C82F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  alertBox: {
    backgroundColor: "#FFF8CC",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F4C430",
    shadowColor: "#F4C430",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  alertDesc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  alertBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  alertBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  verifiedBox: {
    backgroundColor: "#E6FDE6",
    borderColor: "#4ADE80",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22C55E",
  },
  verifiedDesc: {
    fontSize: 13,
    color: "#198754",
  },
});
