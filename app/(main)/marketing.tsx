import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Ionicons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IOSSwitch from "@/components/ui/IOSSwitch"; // <<-- IMPORTANTE

const COLORS = {
  background: "#F6F6F8",
  white: "#FFF",
  border: "#E5E7EB",
  text: "#23242A",
  textMuted: "#8C95A3",
  primary: "#007AFF",
  success: "#22C55E",
  offer: "#FFD700",
};

export default function Marketing() {
  const insets = useSafeAreaInsets();

  const [emailAlerts, setEmailAlerts] = useState(false);
  const [jackpotAlerts, setJackpotAlerts] = useState(false);
  const [strategyTips, setStrategyTips] = useState(true);
  const [gameResults, setGameResults] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Exibe notificação temporária ao trocar
  const handleToggle = (toggleFn: any) => {
    toggleFn((prev: boolean) => {
      const updated = !prev;
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 10 }} />

          <View style={styles.pageHeader}>
            <Ionicons
              name="notifications-outline"
              size={26}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.title}>Marketing Updates</Text>
          </View>

          {showSuccess && (
            <View style={styles.successBox}>
              <Ionicons
                name="checkmark-circle"
                size={23}
                color="#fff"
                style={styles.successIcon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.successTitle}>Preferences Saved</Text>
                <Text style={styles.successText}>
                  You’ll receive lottery alerts, promotions and strategies
                  tailored to your profile!
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowSuccess(false)}
                hitSlop={10}
              >
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Manage Your Notifications</Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Receive updates via email</Text>
              <IOSSwitch
                value={emailAlerts}
                onValueChange={() => handleToggle(setEmailAlerts)}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Jackpot above $100M</Text>
              <IOSSwitch
                value={jackpotAlerts}
                onValueChange={() => handleToggle(setJackpotAlerts)}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Weekly strategy tips</Text>
              <IOSSwitch
                value={strategyTips}
                onValueChange={() => handleToggle(setStrategyTips)}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Game result notifications</Text>
              <IOSSwitch
                value={gameResults}
                onValueChange={() => handleToggle(setGameResults)}
              />
            </View>
          </View>

          <View style={styles.promoBox}>
            <Ionicons
              name="star"
              size={24}
              color={COLORS.offer}
              style={{ marginRight: 8 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>Exclusive Offer</Text>
              <Text style={styles.promoText}>
                Subscribe to the Annual Plan and get{" "}
                <Text style={{ fontWeight: "700", color: COLORS.primary }}>
                  1 month free!
                </Text>
              </Text>
            </View>
          </View>
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
    paddingBottom: 54,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    marginTop: 2,
  },
  title: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    letterSpacing: 0.07,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 22,
    gap: 18,
    shadowColor: "#111A1A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: Platform.OS === "android" ? 4 : 0,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.03,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 14,
    marginBottom: 19,
    gap: 12,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 11,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  successIcon: {
    marginTop: 2,
  },
  successTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  successText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  promoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    marginTop: 13,
    gap: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#FFD700",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  promoTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: COLORS.offer,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    marginBottom: 2,
  },
  promoText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    lineHeight: 18,
  },
});
