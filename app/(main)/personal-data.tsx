import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PersonalData() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack title="" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <ResponsiveContainer>
          <View style={{ height: insets.top + 10 }} />
          <Text style={styles.title}>Personal Data</Text>

          {/* SECTION 1 */}
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
              onChange={setBirthDate}
              placeholder="MM/DD/YYYY"
              keyboardType="numeric"
            />
          </View>

          {/* SECTION 2 */}
          <View style={styles.section}>
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Field
              label="Phone Number"
              value={phone}
              onChange={setPhone}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              rightIcon={
                <TouchableOpacity onPress={() => router.push("/edit-phone")}>
                  <MaterialIcons name="edit" size={20} color={Colors.primary} />
                </TouchableOpacity>
              }
            />
          </View>

          {/* VERIFY ALERT */}
          <View style={styles.alertBox}>
            <View style={styles.alertRow}>
              <MaterialIcons name="shield" size={18} color="#F4C430" />
              <Text style={styles.alertText}>Your phone is not verified</Text>
            </View>
            <Text style={styles.alertDesc}>
              To keep your account more secure, please verify your phone number.
            </Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>Verify</Text>
            </TouchableOpacity>
          </View>
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
  rightIcon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightIcon?: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#A2A2A2"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
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
  },
  icon: {
    marginLeft: 8,
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
});
