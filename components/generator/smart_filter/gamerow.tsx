import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type GameRowProps = {
  index: number;
  mainNumbers: number[];
  extraNumber?: number;
  date?: string;
  onDelete: () => void;
  onEdit: () => void;
  ballStyle?: ViewStyle; // Permite customização
  ballTextStyle?: TextStyle; // Permite customização
};

export default function GameRow({
  index,
  mainNumbers,
  extraNumber,
  date,
  onDelete,
  onEdit,
  ballStyle,
  ballTextStyle,
}: GameRowProps) {
  // Data formatada
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
      {/* Header */}
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

      {/* Divider */}
      <View style={styles.divider} />

      {/* Números */}
      <View style={styles.numbersContainer}>
        {mainNumbers.map((num, idx) => (
          <View key={idx} style={[styles.ball, ballStyle]}>
            <Text style={[styles.ballText, ballTextStyle]}>{num}</Text>
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
    maxWidth: 570,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  dateDay: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#0E4CA1",
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
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Sempre centralizado!
    gap: 8,
    marginTop: 2,
  },
  ball: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F5F7F9",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  ballText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
  },
  extraBall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FDB927",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 4,
  },
  extraBallText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});
