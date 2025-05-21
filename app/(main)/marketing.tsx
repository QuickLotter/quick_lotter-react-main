import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Marketing() {
  const insets = useSafeAreaInsets();

  const [emailAlerts, setEmailAlerts] = useState(false);
  const [jackpotAlerts, setJackpotAlerts] = useState(false);
  const [strategyTips, setStrategyTips] = useState(true);
  const [gameResults, setGameResults] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = (toggleFn: any) => {
    toggleFn((prev: boolean) => {
      const updated = !prev;
      setShowSuccess(updated);
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
          {/* ✅ Espaço seguro abaixo do header */}
          <View style={{ height: insets.top + 20 }} />

          <Text style={styles.title}>Marketing Updates</Text>

          {showSuccess && (
            <View style={styles.successBox}>
              <Ionicons
                name="checkmark"
                size={20}
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
              <TouchableOpacity onPress={() => setShowSuccess(false)}>
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Manage Your Notifications</Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Receive updates via email</Text>
              <Switch
                value={emailAlerts}
                onValueChange={() => handleToggle(setEmailAlerts)}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Jackpot above $100M</Text>
              <Switch
                value={jackpotAlerts}
                onValueChange={() => handleToggle(setJackpotAlerts)}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Weekly strategy tips</Text>
              <Switch
                value={strategyTips}
                onValueChange={() => handleToggle(setStrategyTips)}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Game result notifications</Text>
              <Switch
                value={gameResults}
                onValueChange={() => handleToggle(setGameResults)}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>
          </View>

          <View style={styles.promoBox}>
            <MaterialIcons
              name="local-offer"
              size={20}
              color={Colors.primary}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>🎁 Exclusive Offer</Text>
              <Text style={styles.promoText}>
                Subscribe to the Annual Plan and get 1 months free!
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 48,
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
    borderRadius: 5,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
    flex: 1,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.success,
    borderRadius: 5,
    padding: 14,
    marginBottom: 16,
    gap: 12,
  },
  successIcon: {
    marginTop: 3,
  },
  successTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  successText: {
    color: "#fff",
    fontSize: 12,
  },
  promoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    marginTop: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promoTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: Colors.primary,
  },
  promoText: {
    fontSize: 13,
    color: Colors.text,
  },
});
