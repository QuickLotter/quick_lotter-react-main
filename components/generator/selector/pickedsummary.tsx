import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  picked: number;
  lines: number;
  onQuickPick: () => void;
  textColor?: string; // Cor de "Picked:"
  valueTextColor?: string; // Cor do número no círculo
  linesTextColor?: string; // Cor de "Lines:"
  linesValueColor?: string; // Cor do número de linhas
  accentColor?: string; // Fundo do botão
  buttonTextColor?: string; // Texto do botão
  iconColor?: string; // Ícone ⚡
};

export default function PickedSummary({
  picked,
  lines,
  onQuickPick,
  textColor = "#00429E",
  valueTextColor = "#000000",
  linesTextColor = "#00429E",
  linesValueColor = "#000000",
  accentColor = "#00429E",
  buttonTextColor = "#FFFFFF",
  iconColor = "#FFFFFF",
}: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.row, { paddingHorizontal: width < 768 ? 12 : 24 }]}>
      {/* Picked */}
      <View style={styles.item}>
        <Text style={[styles.label, { color: textColor }]}>Picked:</Text>
        <View style={[styles.circle, { borderColor: textColor }]}>
          <Text style={[styles.circleText, { color: valueTextColor }]}>
            {picked}
          </Text>
        </View>
      </View>

      {/* Lines */}
      <View style={styles.item}>
        <Text style={[styles.label, { color: linesTextColor }]}>Lines:</Text>
        <View style={[styles.inputBox, { borderColor: linesTextColor }]}>
          <Text style={[styles.inputText, { color: linesValueColor }]}>
            {lines}
          </Text>
        </View>
      </View>

      {/* Quick Pick */}
      <TouchableOpacity
        style={[styles.quickPickButton, { backgroundColor: accentColor }]}
        onPress={onQuickPick}
      >
        <Feather
          name="zap"
          size={18}
          color={iconColor}
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>
          Quick Pick
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginRight: 6,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontWeight: "700",
    fontSize: 15,
  },
  inputBox: {
    minWidth: 70,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "600",
    fontSize: 15,
  },
  quickPickButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
