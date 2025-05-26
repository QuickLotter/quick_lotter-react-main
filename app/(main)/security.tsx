import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

// iOS Switch custom component
function IOSSwitch({ value, onValueChange, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && onValueChange(!value)}
      style={[
        iosSwitchStyles.switchBase,
        value ? iosSwitchStyles.switchBaseOn : iosSwitchStyles.switchBaseOff,
        disabled && { opacity: 0.5 },
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <View
        style={[
          iosSwitchStyles.thumb,
          value ? iosSwitchStyles.thumbOn : iosSwitchStyles.thumbOff,
        ]}
      />
    </TouchableOpacity>
  );
}

const iosSwitchStyles = StyleSheet.create({
  switchBase: {
    width: 52,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E5EA",
    justifyContent: "center",
    padding: 3,
    borderWidth: 0,
  },
  switchBaseOn: {
    backgroundColor: "#34C759", // iOS green
  },
  switchBaseOff: {
    backgroundColor: "#E5E5EA",
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    position: "absolute",
    top: 3,
    left: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    transition: "left 0.2s cubic-bezier(.4,0,.2,1)",
  },
  thumbOn: {
    left: 23,
    shadowColor: "#34C759",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  thumbOff: {
    left: 3,
  },
});

export default function SecuritySettings() {
  const insets = useSafeAreaInsets();

  const [email2FA, setEmail2FA] = useState(false);
  const [sms2FA, setSms2FA] = useState(false);
  const [loginNotif, setLoginNotif] = useState(true);

  return (
    <SafeAreaView style={styles.bg}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: 48,
        }}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>Security Settings</Text>

          {/* Password card */}
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Password</Text>
              <TouchableOpacity style={styles.editBtn}>
                <Feather name="edit-2" size={17} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardSub}>Change your password</Text>
          </View>

          {/* 2-Step Auth */}
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>2-Step Authentication</Text>
              <Feather name="info" size={17} color="#007AFF" />
            </View>
            <Text style={styles.cardSub}>
              For extra security, activate 2-Step Authentication to get a
              one-time code with your password at every login.
            </Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Get code via email</Text>
              <IOSSwitch value={email2FA} onValueChange={setEmail2FA} />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Get code via SMS</Text>
              <IOSSwitch value={sms2FA} onValueChange={setSms2FA} />
            </View>
            <View style={styles.infoBox}>
              <Feather
                name="alert-circle"
                size={18}
                color="#F5A623"
                style={{ marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>
                  First verify your Phone Number
                </Text>
                <Text style={styles.infoSub}>
                  To activate SMS security, please verify your phone number.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.verifyBtn}>
              <Text style={styles.verifyBtnText}>Verify</Text>
            </TouchableOpacity>
          </View>

          {/* Login Notifications */}
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Login Notifications</Text>
                <Text style={styles.cardSub}>
                  Receive an email notification every time your account is
                  accessed.
                </Text>
              </View>
              <IOSSwitch value={loginNotif} onValueChange={setLoginNotif} />
            </View>
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Montserrat",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#0E4CA1",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 18,
    elevation: 6,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  cardSub: {
    fontSize: 13,
    color: "#767676",
    marginBottom: 9,
    fontFamily: Platform.OS === "ios" ? "System" : "Montserrat",
  },
  editBtn: {
    padding: 8,
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    marginBottom: 4,
    gap: 16,
  },
  switchLabel: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "System" : "Montserrat",
  },
  infoBox: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    marginTop: 10,
    gap: 9,
  },
  infoTitle: {
    color: "#D68910",
    fontWeight: "600",
    fontSize: 13,
  },
  infoSub: {
    fontSize: 12,
    color: "#444",
  },
  verifyBtn: {
    marginTop: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#007AFF",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
    shadowColor: "#007AFF44",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  verifyBtnText: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.1,
  },
});
