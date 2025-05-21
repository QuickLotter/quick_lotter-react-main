import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

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
          {/* ✅ Espaço seguro abaixo do header */}
          <View style={{ height: insets.top + 20 }} />

          <Text style={styles.pageTitle}>Close Account</Text>

          {/* ✅ Card com zIndex controlado */}
          <View style={[styles.card, { zIndex: open ? 2000 : 0 }]}>
            <Text style={styles.title}>We will Miss You</Text>
            <Text style={styles.sub}>
              Are you sure you want to close your account? If you have any
              questions or feedback, we would love to hear from you!
            </Text>

            <Image
              source={require("@/assets/icons/closingaccount.png")}
              style={styles.illustration}
            />

            {/* ✅ DropDown com zIndex controlado */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Please select a reason"
              style={styles.dropdown}
              textStyle={{ fontSize: 14 }}
              dropDownContainerStyle={{
                borderColor: Colors.border,
                borderRadius: 10,
              }}
              zIndex={1000}
              zIndexInverse={3000}
            />
          </View>

          {/* ✅ Botão dentro do padrão */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseAccount}
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  pageTitle: {
    ...Typography.heading,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 32,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    ...Typography.heading,
    fontSize: 18,
    marginBottom: 12,
    color: Colors.text,
  },
  sub: {
    color: Colors.textMuted,
    fontSize: 14,
    marginBottom: 20,
  },
  illustration: {
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  dropdown: {
    borderColor: Colors.border,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: Colors.danger,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
