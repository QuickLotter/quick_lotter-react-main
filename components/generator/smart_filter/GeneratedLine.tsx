// ✅ Path: components/generator/smart_filter/generatedline.tsx
// Representa uma linha de jogo (números + megaball + botões de ação)

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  index: number;
  numbers: number[];
  megaball?: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function GeneratedLine({
  index,
  numbers,
  megaball,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      {/* Número do jogo */}
      <View style={styles.gameNumber}>
        <Text style={styles.gameNumberText}>
          {String(index + 1).padStart(2, "0")}
        </Text>
      </View>

      {/* Números principais */}
      <View style={styles.numbersWrapper}>
        {numbers.map((num, idx) => (
          <View key={idx} style={styles.numberCircle}>
            <Text style={styles.numberText}>{num}</Text>
          </View>
        ))}

        {/* Mega Ball */}
        {megaball !== undefined && (
          <View style={styles.megaBallCircle}>
            <Text style={styles.megaBallText}>{megaball}</Text>
          </View>
        )}
      </View>

      {/* Botões de ação */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete}>
          <Feather name="trash-2" size={20} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-3" size={20} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  gameNumber: {
    width: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  gameNumberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  numbersWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
  },
  numberCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  megaBallCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0E4CA1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  megaBallText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 10,
  },
});
