import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onGenerate: () => void;
  onCancel: () => void;
}

export default function GensettingButton({ onGenerate, onCancel }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 },
      ]}
    >
      <View style={styles.buttonRow}>
        {/* Botão Generate */}
        <TouchableOpacity style={styles.generateButton} onPress={onGenerate}>
          <Feather name="zap" size={20} color="#FFFFFF" />
          <Text style={styles.generateText}>Generate</Text>
        </TouchableOpacity>

        {/* Botão Cancel */}
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Feather name="x" size={20} color="#FFFFFF" />
          <Text style={styles.cancelText}>Cancel</Text>
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
  generateButton: {
    flex: 1,
    backgroundColor: "#00BD42",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  generateText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
