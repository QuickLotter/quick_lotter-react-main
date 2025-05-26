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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Imagem SVG
import ChangePasswordIllustration from "@/assets/images/change_password.svg";

// Cores padrão iOS
const COLORS = {
  background: "#F6F6F8",
  card: "#FFF",
  border: "#E5E7EB",
  text: "#21242A",
  textMuted: "#8C95A3",
  primary: "#007AFF",
  white: "#FFF",
};

export default function ChangePassword() {
  const insets = useSafeAreaInsets();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          {/* Espaço seguro */}
          <View style={{ height: insets.top + 12 }} />

          {/* Imagem */}
          <View style={styles.imageWrapper}>
            <ChangePasswordIllustration width={140} height={94} />
          </View>

          {/* Título e descrição */}
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

          {/* Botão */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Set new password</Text>
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
    marginTop: -11, // metade do ícone (22)
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
});
