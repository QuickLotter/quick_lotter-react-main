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
} from "react-native";
import { Colors, Typography } from "@/theme";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { MaterialIcons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditPhone() {
  const [phone, setPhone] = useState("");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          {/* ✅ Espaço seguro abaixo do header */}
          <View style={{ height: insets.top + 20 }} />

          {/* ✅ Ícone circular */}
          <View style={styles.iconWrapper}>
            <MaterialIcons name="phone" size={36} color={Colors.primary} />
          </View>

          {/* ✅ Título */}
          <Text style={styles.title}>Edit Your Phone Number</Text>

          {/* ✅ Input com prefixo + edit */}
          <View style={styles.inputRow}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>+1</Text>
            </View>

            <View style={styles.phoneInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={Colors.textMuted}
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Pressable style={styles.editIcon}>
                <MaterialIcons name="edit" size={20} color={Colors.textMuted} />
              </Pressable>
            </View>
          </View>

          {/* ✅ Botão alinhado dentro do container */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save and send the message</Text>
          </TouchableOpacity>

          {/* ✅ Info com ícone */}
          <View style={styles.infoBox}>
            <MaterialIcons name="info-outline" size={18} color={Colors.text} />
            <Text style={styles.infoText}>
              After editing your phone number, you will receive a text message
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E7F5FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    ...Typography.heading,
    fontSize: 18,
    textAlign: "center",
    color: Colors.text,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  prefixBox: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  prefixText: {
    fontWeight: "600",
    color: Colors.text,
  },
  phoneInputWrapper: {
    flex: 1,
    position: "relative",
  },
  phoneInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingRight: 40,
    color: Colors.text,
    fontSize: 16,
  },
  editIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  infoText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 13,
  },
});
