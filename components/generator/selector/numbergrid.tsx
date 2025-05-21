// ✅ Path: components/generator/selector/numbergrid.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// ✅ Tipos das props
type Props = {
  title?: string;
  total: number;
  selected: number[];
  onSelect: (num: number) => void;
  themeColor: string;
  textColor?: string;
  ballSize?: number; // ⭕ tamanho da bola (opcional)
  ballGap?: number; // ↔ espaço entre bolas (opcional)
  startFromZero?: boolean; // ⬅ se começa de 0 ou 1 (ex: Pick 0–9)
  titleColor?: string; // 🎨 NOVO: cor do título como "Pick 5 Main Numbers"
};

export default function NumberGrid({
  title,
  total,
  selected,
  onSelect,
  themeColor,
  textColor = "#FFFFFF",
  ballSize = 40,
  ballGap = 8,
  startFromZero = false,
  titleColor = "#00429E", // 🔹 fallback padrão
}: Props) {
  const start = startFromZero ? 0 : 1;
  const numbers = Array.from({ length: total }, (_, i) => i + start);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {title && (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      )}

      <View style={[styles.grid, { gap: ballGap }]}>
        {numbers.map((n) => {
          const isSelected = selected.includes(n);
          return (
            <TouchableOpacity
              key={n}
              onPress={() => onSelect(n)}
              style={[
                styles.number,
                {
                  width: ballSize,
                  height: ballSize,
                  borderRadius: ballSize / 2,
                  borderColor: isSelected ? themeColor : "#ccc",
                  backgroundColor: isSelected ? themeColor : "#fff",
                },
              ]}
            >
              <Text
                style={[
                  styles.numberText,
                  {
                    color: isSelected ? textColor : "#333",
                    fontSize: ballSize * 0.38,
                  },
                ]}
              >
                {n}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#00429E", // 🔹 Default fallback (vai ser sobrescrito se houver titleColor)
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  number: {
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontWeight: "bold",
  },
});
