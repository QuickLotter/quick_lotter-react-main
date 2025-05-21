import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer"; // ⬅️ Importa o container de 768px

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 0 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Espaço seguro abaixo do header */}
        <View style={{ height: insets.top + 20 }} />

        <ResponsiveContainer>
          <Text style={styles.title}>My Profile</Text>

          <View style={styles.optionsList}>
            <Option
              icon="person-outline"
              label="Personal Data"
              route="/personal-data"
            />
            <Option
              icon="phone-android"
              label="Edit Phone"
              route="/edit-phone"
            />
            <Option
              icon="credit-card"
              label="Payment Method"
              route="/payment-method"
            />
            <Option
              icon="receipt-long"
              label="Transactions"
              route="/transactions"
            />
            <Option icon="settings" label="Settings" route="/settings" />
            <Option
              icon="campaign"
              label="Marketing Preferences"
              route="/marketing"
            />
            <Option icon="security" label="Security" route="/security" />
            <Option
              icon="vpn-key"
              label="Change Password"
              route="/change-password"
            />
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

function Option({
  icon,
  label,
  route,
}: {
  icon: any;
  label: string;
  route: string;
}) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push(route)}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon} size={22} color={Colors.primary} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  title: {
    ...Typography.heading,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 16,
    color: Colors.text,
  },
  optionsList: {
    gap: 5, // ⬅️ Espaço de 2px entre os pads
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Profile;
