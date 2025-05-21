import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

type Props = {
  title?: string;
  columns: number;
  selected: number[][];
  onSelect: (colIndex: number, num: number) => void;
  themeColor: string;
  textColor: string;
  columnGap?: number;
  ballGap?: number;
  ballSize?: number;
};

export default function PickGamesGrid({
  title,
  columns,
  selected,
  onSelect,
  themeColor,
  textColor,
  columnGap = 12,
  ballGap = 8,
  ballSize = 42,
}: Props) {
  const { width } = useWindowDimensions();

  const digits = Array.from({ length: 10 }, (_, i) => i);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      {/* Grade com colunas */}
      <View
        style={[
          styles.grid,
          {
            columnGap,
            maxWidth: columns * (ballSize + columnGap),
          },
        ]}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <View key={colIndex} style={[styles.column, { rowGap: ballGap }]}>
            {digits.map((num) => {
              const isSelected = selected[colIndex]?.includes(num);
              return (
                <TouchableOpacity
                  key={num}
                  onPress={() => onSelect(colIndex, num)}
                  style={[
                    styles.ball,
                    {
                      width: ballSize,
                      height: ballSize,
                      borderRadius: ballSize / 2,
                    },
                    isSelected && {
                      backgroundColor: themeColor,
                      borderColor: themeColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.numberText,
                      {
                        color: isSelected ? textColor : "#333",
                        fontSize: ballSize * 0.45,
                      },
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    color: "#00429E",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center", // ✅ centraliza todas as colunas
    alignItems: "flex-start",
    flexWrap: "nowrap",
    width: "100%",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  ball: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  numberText: {
    fontWeight: "bold",
  },
});
