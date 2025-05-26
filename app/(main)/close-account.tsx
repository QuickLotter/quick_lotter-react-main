import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

// iOS colors & danger color
const COLORS = {
  background: "#F6F6F8",
  white: "#FFF",
  border: "#E5E7EB",
  text: "#23272F",
  textMuted: "#8189A3",
  primary: "#007AFF",
  danger: "#F85C5C",
};

export default function CloseAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "I don’t play anymore", value: "no-play" },
    { label: "I found luck elsewhere", value: "elsewhere" },
    { label: "I have won enough money", value: "won" },
    { label: "I prefer another website to play", value: "other-site" },
    { label: "Other reasons", value: "other" },
  ]);

  const handleCloseAccount = () => {
    if (!value) {
      alert("Please select a reason before closing your account.");
      return;
    }
    alert("Your account will be reviewed for closure.");
    router.push("/");
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
          <View style={{ height: insets.top + 12 }} />

          <Text style={styles.pageTitle}>Close Account</Text>

          {/* Card visual iOS */}
          <View style={[styles.card, { zIndex: open ? 2000 : 0 }]}>
            <Text style={styles.title}>We Will Miss You</Text>
            <Text style={styles.sub}>
              Are you sure you want to close your account? If you have any
              questions or feedback, we would love to hear from you!
            </Text>
            <Image
              source={require("@/assets/icons/closingaccount.png")}
              style={styles.illustration}
            />

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Please select a reason"
              style={styles.dropdown}
              textStyle={{ fontSize: 16, color: COLORS.text }}
              placeholderStyle={{ color: COLORS.textMuted, fontSize: 15 }}
              dropDownContainerStyle={{
                borderColor: COLORS.border,
                borderRadius: 18,
                backgroundColor: COLORS.white,
              }}
              zIndex={1000}
              zIndexInverse={3000}
              listItemLabelStyle={{
                color: COLORS.text,
                fontWeight: "400",
                fontSize: 15,
                fontFamily: Platform.OS === "ios" ? "System" : undefined,
              }}
              labelStyle={{
                color: COLORS.text,
                fontSize: 15,
                fontWeight: "400",
                fontFamily: Platform.OS === "ios" ? "System" : undefined,
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseAccount}
            activeOpacity={0.7}
          >
            <Text style={styles.closeText}>Close Account</Text>
          </TouchableOpacity>
          <View style={{ height: 60 }} />
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
    paddingBottom: 38,
    backgroundColor: COLORS.background,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: COLORS.text,
    letterSpacing: 0.15,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 26,
    marginBottom: 20,
    shadowColor: "#111A1A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.11,
    shadowRadius: 20,
    elevation: Platform.OS === "android" ? 3 : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.04,
  },
  sub: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  illustration: {
    height: 112,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 2,
  },
  dropdown: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    minHeight: 50,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    marginTop: 8,
  },
  closeButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 18,
    shadowColor: COLORS.danger,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 2 : 0,
    width: "100%",
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.13,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
