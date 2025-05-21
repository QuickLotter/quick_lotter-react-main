import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors, Typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { useRouter } from "expo-router";
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
    <View style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ResponsiveContainer>
          <View style={{ height: insets.top + 20 }} />
          <Text style={styles.pageTitle}>Personal Data</Text>

          <View style={styles.card}>
            {/* NAME */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={Colors.textMuted}
              value={name}
              onChangeText={setName}
            />
            <View style={styles.divider} />

            {/* ADDRESS */}
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Street Address, City, State"
              placeholderTextColor={Colors.textMuted}
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.divider} />

            {/* BIRTHDATE */}
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={Colors.textMuted}
              value={birthDate}
              onChangeText={setBirthDate}
              keyboardType="numeric"
            />
            <View style={styles.divider} />

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.divider} />

            {/* PHONE */}
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.textMuted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <Pressable
                onPress={() => router.push("/edit-phone")}
                style={({ pressed }) => [
                  styles.editBtn,
                  pressed && { opacity: 0.5 },
                ]}
              >
                <MaterialIcons name="edit" size={20} color={Colors.textMuted} />
              </Pressable>
            </View>

            {/* VERIFY CARD */}
            <View style={styles.verifyBox}>
              <View style={styles.verifyRow}>
                <MaterialIcons name="shield" size={20} color={Colors.primary} />
                <Text style={styles.verifyTitle}>
                  Your phone number is not verified
                </Text>
              </View>
              <Text style={styles.verifyDesc}>
                To keep your account more secure please verify your phone
                number.
              </Text>
              <TouchableOpacity
                style={({ pressed }) => [
                  styles.verifyButton,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 80,
  },
  pageTitle: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 20,
    gap: 12,
    maxWidth: 500,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    ...Typography.subheading,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  input: {
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editBtn: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 999,
  },
  verifyBox: {
    marginTop: 16,
    backgroundColor: "#FFFBE6",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAD940",
    shadowColor: "#F7D33E",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  verifyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  verifyTitle: {
    fontWeight: "700",
    color: Colors.text,
    fontSize: 14,
  },
  verifyDesc: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 12,
  },
  verifyButton: {
    borderWidth: 2,
    borderColor: Colors.text,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  verifyButtonText: {
    fontWeight: "600",
    color: Colors.text,
    fontSize: 15,
  },
});
