import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

export default function SecuritySettings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [email2FA, setEmail2FA] = useState(false);
  const [sms2FA, setSms2FA] = useState(false);
  const [loginNotif, setLoginNotif] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const handleToggle = (type: string) => {
    if (type === "email") {
      setEmail2FA(!email2FA);
      setSuccessMsg("2-Step Authentication with email is enabled");
    } else if (type === "notif") {
      setLoginNotif(!loginNotif);
      setSuccessMsg("Login notifications are now active");
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Security Settings</Text>

          {successMsg !== "" && (
            <View style={styles.successBox}>
              <Ionicons
                name="checkmark"
                size={20}
                color="#fff"
                style={styles.successIcon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.successTitle}>{successMsg}</Text>
              </View>
              <TouchableOpacity onPress={() => setSuccessMsg("")}>
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {/* Password editable */}
          <View style={styles.cardWithShadow}>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>Password</Text>
              <TouchableOpacity onPress={() => router.push("/change-password")}>
                <Feather name="edit-2" size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.sub}>Change your password</Text>
          </View>

          {/* 2-Step Auth */}
          <View style={styles.cardWithShadow}>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>2-Step Authentication</Text>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.sub}>
              For an extra layer of security, activate 2-Step Authentication to
              get one-time code with your password at every login.
            </Text>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Get code via email</Text>
              <Switch
                value={email2FA}
                onValueChange={() => handleToggle("email")}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Get code via SMS</Text>
              <Switch
                value={sms2FA}
                onValueChange={() => setSms2FA(!sms2FA)}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.verifyBox}>
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color={Colors.warning}
                style={{ marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.verifyTitle}>
                  First verify your Phone Number
                </Text>
                <Text style={styles.verifySub}>
                  To activate the security settings via SMS please verify your
                  phone number.
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>

          {/* Login Notifications */}
          <View style={styles.cardWithShadow}>
            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelBold}>Login Notifications</Text>
                <Text style={styles.sub}>
                  Activate this option to receive an email notification every
                  time your account is logged into.
                </Text>
              </View>
              <Switch
                value={loginNotif}
                onValueChange={() => handleToggle("notif")}
                trackColor={{ false: "#ccc", true: Colors.success }}
                thumbColor="#fff"
              />
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
    backgroundColor: "#ECF1FF",
  },
  scrollContent: {
    alignItems: "center",
    minHeight: "100%",
    backgroundColor: "#ECF1FF",
    paddingBottom: 80,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    color: Colors.text,
  },
  cardWithShadow: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 16,
    marginBottom: 24,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  labelBold: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  sub: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  verifyBox: {
    backgroundColor: "#FFFBDB",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 12,
    borderRadius: 10,
  },
  verifyTitle: {
    fontWeight: "600",
    color: Colors.warning,
    marginBottom: 4,
    fontSize: 13,
  },
  verifySub: {
    fontSize: 12,
    color: Colors.text,
  },
  verifyButton: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  verifyButtonText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.success,
    borderRadius: 10,
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
  },
});
