import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

const subscriptions = [
  {
    key: "weekly",
    title: "Weekly Subscription",
    price: "$5.99/week",
    desc: "Perfect for short-term use with full premium features.",
  },
  {
    key: "annual",
    title: "Annual Subscription",
    price: "$59.99/year",
    desc: "Best value – save over 15%! Enjoy all features for 12 months.",
    badge: "Recommended",
  },
];

const history = [
  {
    id: "1",
    date: "May 24, 2025",
    plan: "Annual Subscription",
    status: "Active",
    price: "$59.99",
  },
  {
    id: "2",
    date: "May 01, 2025",
    plan: "Weekly Subscription",
    status: "Expired",
    price: "$5.99",
  },
];

export default function SubscriptionScreen() {
  const [selected, setSelected] = useState("weekly");
  const [activePlan, setActivePlan] = useState("weekly");
  const [daysLeft, setDaysLeft] = useState(7);

  // Animation for active badge
  const scaleAnim = new Animated.Value(1);

  // Simula troca de assinatura (troque por integração real depois)
  const handleChangePlan = (plan) => {
    if (plan !== activePlan) {
      // TODO: implementar integração IAP para troca de plano aqui
      setActivePlan(plan);
      setSelected(plan);
      setDaysLeft(plan === "weekly" ? 7 : 365);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.09,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // Simula cancelamento (troque por integração real depois)
  const handleCancel = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your subscription?\nYou will lose access to all premium features.",
      [
        {
          text: "No, keep subscription",
          style: "cancel",
        },
        {
          text: "Yes, cancel it",
          style: "destructive",
          onPress: () => {
            // TODO: implementar integração IAP para cancelar assinatura aqui
            setActivePlan(null);
            setSelected(null);
            setDaysLeft(0);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.pageTitle}>Manage Subscription</Text>
          <View style={styles.switchBox}>
            {subscriptions.map((plan) => {
              const isActive = activePlan === plan.key;
              return (
                <TouchableOpacity
                  key={plan.key}
                  style={[
                    styles.planCard,
                    isActive && styles.planCardActive,
                    { flex: 1 },
                  ]}
                  activeOpacity={0.87}
                  onPress={() => handleChangePlan(plan.key)}
                  // TODO: Substituir handleChangePlan por compra real via IAP
                >
                  <Animated.View
                    style={[
                      styles.badgeAnim,
                      {
                        transform: [{ scale: isActive ? scaleAnim : 1 }],
                        opacity: plan.badge && plan.key === "annual" ? 1 : 0,
                      },
                    ]}
                  >
                    {plan.badge && (
                      <Text style={styles.badgeText}>{plan.badge}</Text>
                    )}
                  </Animated.View>
                  <View style={styles.planHeader}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    {isActive && (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="#34C759"
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </View>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planDesc}>{plan.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Progress Days */}
          {activePlan && (
            <View style={styles.daysBox}>
              <Text style={styles.daysTitle}>
                {activePlan === "weekly" ? "Days Left" : "Days Remaining"}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        activePlan === "weekly"
                          ? `${(daysLeft / 7) * 100}%`
                          : `${(daysLeft / 365) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.daysLeft}>
                <Text style={styles.daysNumber}>{daysLeft}</Text>
                {activePlan === "weekly" ? " days" : " days"}
              </Text>
            </View>
          )}

          {/* Cancel button */}
          {activePlan && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
              // TODO: Substituir handleCancel por função de cancelar IAP
            >
              <Ionicons name="close-circle" color="#FF3B30" size={20} />
              <Text style={styles.cancelText}>Cancel Subscription</Text>
            </TouchableOpacity>
          )}

          {/* History */}
          <Text style={styles.sectionTitle}>Subscription History</Text>
          <View style={styles.cardsList}>
            {history.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyRow}>
                  <Text style={styles.historyPlan}>{item.plan}</Text>
                  <View
                    style={[
                      styles.historyStatus,
                      item.status === "Active"
                        ? { backgroundColor: "#E3FCEC" }
                        : item.status === "Expired"
                        ? { backgroundColor: "#FFF0E3" }
                        : {},
                    ]}
                  >
                    <Text
                      style={[
                        styles.historyStatusText,
                        item.status === "Active"
                          ? { color: "#36C663" }
                          : item.status === "Expired"
                          ? { color: "#FF9500" }
                          : {},
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 80 }} />
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },
  scrollContent: {
    paddingBottom: 64,
  },
  pageTitle: {
    ...Typography.heading,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 28,
    color: Colors.text,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  switchBox: {
    flexDirection: "row",
    backgroundColor: "#F3F7FE",
    borderRadius: 16,
    padding: 7,
    gap: 12,
    marginBottom: 28,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planCard: {
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 18,
    shadowColor: "#1A237E11",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 1,
    marginRight: 2,
    minWidth: 155,
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "#fff",
  },
  planCardActive: {
    borderColor: "#007AFF",
    shadowOpacity: 0.17,
    elevation: 4,
    backgroundColor: "#F6FBFF",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  badgeAnim: {
    position: "absolute",
    top: 10,
    right: 12,
    zIndex: 10,
    backgroundColor: "#FFDD4B",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: "#FFD70055",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  badgeText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
  },
  planTitle: {
    fontSize: 16,
    color: "#222",
    fontWeight: "700",
  },
  planPrice: {
    fontSize: 19,
    color: "#007AFF",
    fontWeight: "700",
    marginVertical: 2,
    marginBottom: 4,
  },
  planDesc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  daysBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 1,
  },
  daysTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 6,
  },
  progressBar: {
    width: "100%",
    height: 10,
    borderRadius: 8,
    backgroundColor: "#F1F2F7",
    overflow: "hidden",
    marginBottom: 9,
    marginTop: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  daysLeft: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
  },
  daysNumber: {
    fontSize: 29,
    fontWeight: "700",
    color: "#007AFF",
    marginRight: 2,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#FF3B30",
    paddingVertical: 13,
    marginBottom: 30,
    marginTop: -10,
  },
  cancelText: {
    color: "#FF3B30",
    fontWeight: "bold",
    fontSize: 15.5,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E4CA1",
    marginBottom: 14,
    marginTop: 18,
    letterSpacing: 0.1,
  },
  cardsList: {
    gap: 10,
    marginTop: 3,
  },
  historyCard: {
    backgroundColor: "#F9FBFF",
    borderRadius: 10,
    padding: 17,
    marginBottom: 2,
    shadowColor: "#111",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  historyPlan: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  historyStatus: {
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 3,
    marginLeft: 8,
  },
  historyStatusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  historyDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  historyPrice: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "700",
  },
});
