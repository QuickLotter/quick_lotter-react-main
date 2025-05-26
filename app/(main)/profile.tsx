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
import ResponsiveContainer from "@/components/shared/responsivecontainer";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>My Profile</Text>

          {/* 🟦 SECTION 1 */}
          <View style={styles.card}>
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
              icon="receipt-long"
              label="Subscriptions"
              route="/subscriptions"
            />
          </View>

          {/* 🟪 SECTION 2 */}
          <View style={styles.card}>
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
      style={styles.option}
      onPress={() => router.push(route)}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon} size={20} color={Colors.primary} />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F2F2F7", // iOS-like background
  },
  scrollContent: {
    paddingBottom: 60,
  },
  title: {
    ...Typography.heading,
    fontSize: 18,
    color: Colors.text,
    marginVertical: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionText: {
    fontSize: 15,
    color: "#000",
    marginLeft: 12,
    fontWeight: "500",
  },
});
