// ✅ Path: components/generator/smart_filter/gamerow.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type GameRowProps = {
  index: number;
  mainNumbers: number[];
  extraNumber?: number;
  date?: string;
  onDelete: () => void;
  onEdit: () => void;
};

export default function GameRow({
  index,
  mainNumbers,
  extraNumber,
  date,
  onDelete,
  onEdit,
}: GameRowProps) {
  const today = new Date();
  const formattedDate =
    date ||
    today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <View style={styles.wrapper}>
      {/* 🔵 Header de cima */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dateDay}>
            {formattedDate.split(",")[0].trim()}
          </Text>
          <Text style={styles.dateFull}>
            {formattedDate.split(",").slice(1).join(",").trim()}
          </Text>
        </View>

        <View style={styles.gameNumber}>
          <Text style={styles.gameTitle}>Game</Text>
          <Text style={styles.gameIndex}>{String(index).padStart(2, "0")}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <MaterialIcons name="edit" size={22} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={{ marginLeft: 12 }}>
            <MaterialIcons name="delete" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔵 Divider */}
      <View style={styles.divider} />

      {/* 🔵 Números */}
      <View style={styles.numbersContainer}>
        {mainNumbers.map((num, idx) => (
          <View key={idx} style={styles.ball}>
            <Text style={styles.ballText}>{num}</Text>
          </View>
        ))}
        {extraNumber !== undefined && (
          <View style={styles.extraBall}>
            <Text style={styles.extraBallText}>{extraNumber}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 512,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  dateDay: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  dateFull: {
    fontSize: 14,
    color: "#666",
  },
  gameNumber: {
    alignItems: "center",
  },
  gameTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  gameIndex: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7F9",
    borderWidth: 1,
    borderColor: "#333", // 🔵 Stroke preto
    justifyContent: "center",
    alignItems: "center",
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  extraBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDB927",
    borderWidth: 1,
    borderColor: "#333", // 🔵 Stroke preto também na extra
    justifyContent: "center",
    alignItems: "center",
  },
  extraBallText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});
