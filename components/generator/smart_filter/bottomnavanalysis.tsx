import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const frequencies = [
  { value: 335, color: "#4CAF50" },
  { value: 258, color: "#81C784" },
  { value: 120, color: "#FFEB3B" },
  { value: 69, color: "#FF9800" },
];

export default function BottomNavAnalysis() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          width,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>FREQUENCY</Text>
        </View>

        <View style={styles.frequencyRow}>
          {frequencies.map((freq, index) => (
            <View
              key={index}
              style={[styles.box, { backgroundColor: freq.color }]}
            >
              <Text style={styles.boxText}>{freq.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    height: 71,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // alinhamento lateral
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  labelBox: {
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    height: 30,
    justifyContent: "center",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  frequencyRow: {
    flexDirection: "row",
    gap: 8,
  },
  box: {
    width: 30,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
