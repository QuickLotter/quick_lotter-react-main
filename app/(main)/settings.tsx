import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import ResponsiveContainer from "@/components/shared/responsivecontainer";

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top + 20 }} />

        <ResponsiveContainer>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.card}>
            {/* Marketing Communication */}
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push("/marketing")}
              activeOpacity={0.75}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.primary}
              />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Marketing Communication</Text>
                <Text style={styles.itemSub}>
                  Activate to get exclusive offers
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Security */}
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push("/security")}
              activeOpacity={0.75}
            >
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={22}
                color={Colors.primary}
              />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Security</Text>
                <Text style={styles.itemSub}>
                  Security settings for your account
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Close Account */}
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push("/close-account")}
              activeOpacity={0.75}
            >
              <Ionicons
                name="person-remove-outline"
                size={22}
                color={Colors.primary}
              />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Close Account</Text>
                <Text style={styles.itemSub}>
                  Want to close your Quick Lotter account permanently?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  scrollContent: {
    backgroundColor: "#ECF1FF",
    minHeight: "100%",
    alignItems: "center",
    paddingBottom: 60,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    marginBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
  },
  textBox: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  itemSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
});
