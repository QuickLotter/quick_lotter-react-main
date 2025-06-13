import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChangePasswordIllustration from "@/assets/images/change_password.svg";
import { supabase } from "@/app/(auth)/supabaseClient";
import { useAuth } from "@/app/(auth)/AuthContext";

const COLORS = {
  background: "#F6F6F8",
  card: "#FFF",
  border: "#E5E7EB",
  text: "#21242A",
  textMuted: "#8C95A3",
  primary: "#007AFF",
  white: "#FFF",
  success: "#22C55E",
  error: "#FF3B30",
};

export default function ChangePassword() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  // States
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Para trocar senha, é obrigatório reautenticar o usuário.
  // Solução segura: tentar login com a senha antiga antes de alterar.
  const handleChangePassword = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    // 1. Validação simples
    if (!oldPassword || !newPassword || !confirm) {
      setErrorMsg("Fill in all fields.");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (newPassword === oldPassword) {
      setErrorMsg("New password must be different.");
      return;
    }

    setLoading(true);

    // 2. Checa se a senha antiga está correta (reauth)
    const user = supabase.auth.getUser
      ? (await supabase.auth.getUser()).data.user
      : supabase.auth.user(); // fallback para versões antigas

    const email = user?.email;
    if (!email) {
      setErrorMsg("Not logged in.");
      setLoading(false);
      return;
    }

    // 3. Login silencioso com a senha antiga
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    });
    if (signInError) {
      setErrorMsg("Current password is incorrect.");
      setLoading(false);
      return;
    }

    // 4. Atualiza senha no Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErrorMsg(updateError.message || "Error changing password.");
    } else {
      setSuccessMsg("Password changed successfully. Please log in again.");
      setTimeout(async () => {
        await signOut();
      }, 2200);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 12 }} />

          <View style={styles.imageWrapper}>
            <ChangePasswordIllustration width={140} height={94} />
          </View>

          <Text style={styles.title}>Change your password</Text>
          <Text style={styles.description}>
            Type your current and new password. Choose a unique password to
            protect your account.
          </Text>

          {/* Senha atual */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Current password"
              secureTextEntry={!showOld}
              style={styles.input}
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity
              onPress={() => setShowOld(!showOld)}
              style={styles.eyeButton}
              hitSlop={8}
            >
              <Ionicons
                name={showOld ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Nova senha */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="New password"
              secureTextEntry={!showNew}
              style={styles.input}
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowNew(!showNew)}
              style={styles.eyeButton}
              hitSlop={8}
            >
              <Ionicons
                name={showNew ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText}>
            Make sure your password contains at least 8 characters
          </Text>

          {/* Confirmar nova senha */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Confirm new password"
              secureTextEntry={!showConfirm}
              style={styles.input}
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              style={styles.eyeButton}
              hitSlop={8}
            >
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {errorMsg ? (
            <Text style={[styles.msg, styles.errorMsg]}>{errorMsg}</Text>
          ) : null}
          {successMsg ? (
            <Text style={[styles.msg, styles.successMsg]}>{successMsg}</Text>
          ) : null}

          {/* Botão */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Set new password</Text>
            )}
          </TouchableOpacity>
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
    paddingVertical: 30,
    backgroundColor: COLORS.background,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 7,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.2,
  },
  description: {
    textAlign: "center",
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 12,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  inputGroup: {
    position: "relative",
    marginBottom: 18,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 18,
    fontSize: 17,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -11,
    opacity: 0.8,
  },
  helperText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
    textAlign: "left",
    marginLeft: 2,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  submitText: {
    fontWeight: "700",
    color: COLORS.white,
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.15,
  },
  msg: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMsg: {
    color: COLORS.error,
  },
  successMsg: {
    color: COLORS.success,
  },
});
