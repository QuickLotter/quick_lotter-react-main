import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert, // Importante!
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

const transactions = [
  {
    id: "1",
    date: "Tuesday 29th Sept’ 2023",
    plan: "Monthly Subscription",
    status: "Pending",
  },
  {
    id: "2",
    date: "Monday 31st Aug’ 2023",
    plan: "Monthly Subscription",
    status: "Approved",
  },
  {
    id: "3",
    date: "Tuesday 29th Sept’ 2022",
    plan: "Annual Subscription",
    status: "Rejected",
  },
  {
    id: "4",
    date: "Tuesday 29th Sept’ 2023",
    plan: "Monthly Subscription",
    status: "Approved",
  },
];

export default function Transactions() {
  const handleCancel = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your subscription?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            // Lógica de cancelamento ou simulação
            Alert.alert(
              "Subscription Cancelled",
              "Your subscription has been cancelled."
            );
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
        <View style={{ height: 20 }} />
        <ResponsiveContainer>
          <Text style={styles.pageTitle}>My Subscriptions</Text>

          <View style={styles.daysBox}>
            <Text style={styles.daysTitle}>Days Left</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
            <Text style={styles.daysLeft}>
              <Text style={styles.daysNumber}>16</Text>
            </Text>
          </View>

          {/* Botão de cancelamento */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel Subscriptions</Text>
          </TouchableOpacity>

          {/* Histórico */}
          <Text style={styles.sectionTitle}>Transactions</Text>
          <Text style={styles.sectionDate}>September 2023</Text>

          <View style={styles.cardsList}>
            {transactions.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardDate}>{item.date}</Text>
                <View style={styles.cardRow}>
                  <View style={styles.leftColumn}>
                    <View style={styles.dot} />
                    <Text style={styles.plan}>{item.plan}</Text>
                  </View>
                  <View style={[styles.statusBox, getStatusStyle(item.status)]}>
                    <Text
                      style={[
                        styles.statusText,
                        getStatusTextColor(item.status),
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={{ height: 80 }} />
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { backgroundColor: "#E0E0E0" };
    case "approved":
      return { backgroundColor: "#D4F4DD" };
    case "rejected":
      return { backgroundColor: "#FFDAD6" };
    default:
      return { backgroundColor: "#eee" };
  }
};

const getStatusTextColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { color: "#777" };
    case "approved":
      return { color: "#00C851" };
    case "rejected":
      return { color: "#FF4444" };
    default:
      return { color: Colors.textMuted };
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pageTitle: {
    ...Typography.heading,
    fontSize: 22,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 28,
  },
  daysBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  daysTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: Colors.text,
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00C851",
  },
  daysLeft: {
    fontSize: 14,
    color: Colors.text,
  },
  daysNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#00C851",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  sectionDate: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  cardsList: {
    gap: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 0,
  },
  cardDate: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 10,
    color: Colors.text,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF8C00",
    marginRight: 6,
  },
  plan: {
    fontSize: 14,
    color: Colors.text,
  },
  statusBox: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export default Transactions;
