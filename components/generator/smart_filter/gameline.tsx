import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  index: number;
  mainNumbers: number[];
  extraNumber: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameLine({
  index,
  mainNumbers,
  extraNumber,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.index}>{String(index + 1).padStart(2, "0")}</Text>
      <View style={styles.numbers}>
        {mainNumbers.map((num, i) => (
          <View key={i} style={styles.circle}>
            <Text style={styles.circleText}>
              {String(num).padStart(2, "0")}
            </Text>
          </View>
        ))}
        <View style={styles.extraCircle}>
          <Text style={styles.extraText}>
            {String(extraNumber).padStart(2, "0")}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={{ marginLeft: 12 }}>
          <Ionicons name="pencil" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  index: {
    fontWeight: "bold",
    fontSize: 16,
    width: 28,
  },
  numbers: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    marginHorizontal: 10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    marginBottom: 4,
  },
  circleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  extraCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  extraText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
