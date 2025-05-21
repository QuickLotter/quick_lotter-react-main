import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  number: number;
  selected: boolean;
  onPress: () => void;
  isExtra?: boolean;
  theme?: "default" | "red"; // <- ADICIONE ESSA PROP
}

export default function NumberBall({
  number,
  selected,
  onPress,
  isExtra = false,
  theme = "default",
}: Props) {
  const backgroundColor = selected
    ? isExtra
      ? theme === "red"
        ? "#D0021B"
        : "#007EFF"
      : theme === "red"
      ? "#000"
      : "#007EFF"
    : "#FFFFFF";

  const borderColor = isExtra
    ? theme === "red"
      ? "#D0021B"
      : "#007EFF"
    : "#000000";

  const textColor = selected ? "#FFFFFF" : "#000000";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ball,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{number}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
