import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ Imagem SVG
import ChangePasswordIllustration from "@/assets/images/change_password.svg";

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
          {/* ✅ Espaço seguro abaixo do header */}
          <View style={{ height: insets.top + 20 }} />

          {/* ✅ Imagem */}
          <View style={styles.imageWrapper}>
            <ChangePasswordIllustration width={160} height={100} />
          </View>

          {/* ✅ Título e descrição */}
          <Text style={styles.title}>Change your password</Text>
          <Text style={styles.description}>
            Type your current and new password. Choose a unique password to
            protect your account.
          </Text>

          {/* ✅ Campo: Senha atual */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Current password"
              secureTextEntry={!showOld}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowOld(!showOld)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showOld ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Campo: Nova senha */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="New password"
              secureTextEntry={!showNew}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowNew(!showNew)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showNew ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText}>
            Make sure your password contains at least 8 characters
          </Text>

          {/* ✅ Campo: Confirmar nova senha */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Confirm new password"
              secureTextEntry={!showConfirm}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Botões */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Set new password</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}></Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingVertical: 24,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    ...Typography.heading,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 6,
    color: Colors.text,
  },
  description: {
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  inputGroup: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.text,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  helperText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#0088FF",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    fontWeight: "700",
    color: Colors.white,
    fontSize: 15,
  },
  forgotText: {
    marginTop: 16,
    color: Colors.primary,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});
