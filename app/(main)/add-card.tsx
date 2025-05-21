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
import { Colors, Typography } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import CardVisual from "@/assets/images/card-visual.svg";
import VisaIcon from "@/assets/icons/visa.svg";
import MasterIcon from "@/assets/icons/master.svg";
import AmexIcon from "@/assets/icons/amex.svg";
import DiscoverIcon from "@/assets/icons/discover.svg";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddCard() {
  const [saveCard, setSaveCard] = useState(true);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 20 }} />

          <Text style={styles.title}>Add New Card</Text>

          {/* Cartão SVG visual centralizado */}
          <View style={styles.cardVisualWrapper}>
            <CardVisual width={340} height={180} />
          </View>

          {/* Card Number */}
          <Text style={styles.label}>Card Number:</Text>
          <View style={styles.inputCameraWrapper}>
            <TextInput
              style={styles.inputCamera}
              placeholder="---- ---- ---- ----"
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
              maxLength={19}
            />
            <Ionicons
              name="camera-outline"
              size={20}
              color={Colors.textMuted}
              style={styles.cameraIcon}
            />
          </View>

          {/* Card Holder */}
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name on your card"
            placeholderTextColor={Colors.textMuted}
          />

          {/* Expiration + CVC */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Expiration Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Security Code</Text>
              <TextInput
                style={styles.input}
                placeholder="CVC"
                placeholderTextColor={Colors.textMuted}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>

          {/* Card Types - barra premium visual */}
          <Text style={styles.label}>Card type</Text>
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
              trackColor={{ true: Colors.primary }}
              thumbColor="#fff"
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
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    color: Colors.text,
  },
  cardVisualWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 14,
    color: Colors.text,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  inputCameraWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  inputCamera: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 14,
    paddingRight: 40, // espaço para o ícone
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  cameraIcon: {
    position: "absolute",
    right: 14,
    top: Platform.OS === "web" ? 18 : "50%",
    transform: [{ translateY: Platform.OS === "web" ? 0 : -10 }],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTypeRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 4,
    marginBottom: 20,
    alignItems: "center",
  },
  cardTypeIconPad: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 52,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  switchLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
