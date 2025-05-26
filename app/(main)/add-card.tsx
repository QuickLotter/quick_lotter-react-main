import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Ionicons } from "@expo/vector-icons";
import CardVisual from "@/assets/images/card-visual.svg";
import VisaIcon from "@/assets/icons/visa.svg";
import MasterIcon from "@/assets/icons/master.svg";
import AmexIcon from "@/assets/icons/amex.svg";
import DiscoverIcon from "@/assets/icons/discover.svg";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  iosBg: "#F6F6F8",
  white: "#FFF",
  cardBg: "#FAFAFC",
  border: "#E5E7EB",
  text: "#23272F",
  label: "#4A7EFF",
  muted: "#A0A7B2",
  primary: "#007AFF",
  shadow: "#1A1A1A",
};

export default function AddCard() {
  const [saveCard, setSaveCard] = useState(true);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.iosBg }}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 8 }} />
          <Text style={styles.title}>Add New Card</Text>

          {/* SVG visual do cartão */}
          <View style={styles.cardVisualWrapper}>
            <CardVisual width={320} height={170} />
          </View>

          {/* Card Number */}
          <Text style={styles.label}>Card Number</Text>
          <View style={styles.inputCameraWrapper}>
            <TextInput
              style={styles.inputCamera}
              placeholder="---- ---- ---- ----"
              placeholderTextColor={COLORS.muted}
              keyboardType="number-pad"
              maxLength={19}
              returnKeyType="done"
              selectionColor={COLORS.primary}
            />
            <Ionicons
              name="camera-outline"
              size={22}
              color={COLORS.muted}
              style={styles.cameraIcon}
            />
          </View>

          {/* Card Holder */}
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name on your card"
            placeholderTextColor={COLORS.muted}
            autoCapitalize="words"
            selectionColor={COLORS.primary}
          />

          {/* Expiration + CVC */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Expiration Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={COLORS.muted}
                keyboardType="numeric"
                maxLength={5}
                selectionColor={COLORS.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Security Code</Text>
              <TextInput
                style={styles.input}
                placeholder="CVC"
                placeholderTextColor={COLORS.muted}
                keyboardType="number-pad"
                maxLength={4}
                selectionColor={COLORS.primary}
              />
            </View>
          </View>

          {/* Card Types */}
          <Text style={styles.label}>Card Type</Text>
          <View style={styles.cardTypeRow}>
            <View style={styles.cardTypeIconPad}>
              <VisaIcon width={38} height={26} />
            </View>
            <View style={styles.cardTypeIconPad}>
              <MasterIcon width={38} height={26} />
            </View>
            <View style={styles.cardTypeIconPad}>
              <AmexIcon width={38} height={26} />
            </View>
            <View style={styles.cardTypeIconPad}>
              <DiscoverIcon width={38} height={26} />
            </View>
          </View>

          {/* Save switch */}
          <View style={styles.switchRow}>
            <Switch
              value={saveCard}
              onValueChange={setSaveCard}
              trackColor={{ true: COLORS.primary, false: "#CED4DA" }}
              thumbColor={Platform.OS === "android" ? COLORS.white : undefined}
              ios_backgroundColor="#CED4DA"
            />
            <Text style={styles.switchLabel}>
              Save this card for future payment
            </Text>
          </View>

          {/* Confirm button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 56,
    backgroundColor: COLORS.iosBg,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 26,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.2,
  },
  cardVisualWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.label,
    marginBottom: 8,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 14,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  inputCameraWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  inputCamera: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    paddingRight: 44, // espaço pro ícone
    fontSize: 17,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  cameraIcon: {
    position: "absolute",
    right: 16,
    top: Platform.OS === "web" ? 17 : "50%",
    transform: [{ translateY: Platform.OS === "web" ? 0 : -12 }],
    opacity: 0.66,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  cardTypeRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 5,
    marginBottom: 18,
    alignItems: "center",
  },
  cardTypeIconPad: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 12,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 54,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
    marginTop: 8,
  },
  switchLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
