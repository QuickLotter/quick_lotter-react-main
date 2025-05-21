import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPrint: () => void;
  onSave: () => void;
}

export default function GeneratedBottomNav({ onPrint, onSave }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 },
      ]}
    >
      <View style={styles.buttonRow}>
        {/* Botão Print */}
        <TouchableOpacity style={styles.printButton} onPress={onPrint}>
          <Feather name="printer" size={20} color="#FFFFFF" />
          <Text style={styles.printText}>Print</Text>
        </TouchableOpacity>

        {/* Botão Save */}
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Feather name="save" size={20} color="#1A1A1A" />
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingTop: 12,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 768,
    paddingHorizontal: 20,
    gap: 12,
  },
  printButton: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#FFD600",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  printText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveText: {
    color: "#1A1A1A",
    fontWeight: "bold",
    fontSize: 16,
  },
});
