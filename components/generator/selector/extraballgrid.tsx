import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MegaBall from "./megaball";

type Props = {
  onChange: (selected: number[]) => void; // Callback sempre que mudar a seleção
};

export default function MegaBallGrid({ onChange }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggle = (value: number) => {
    const isSelected = selected.includes(value);
    const newSelected = isSelected
      ? selected.filter((n) => n !== value)
      : [...selected, value];

    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <View style={styles.container}>
      {/* Título e contador de quantas bolas foram selecionadas */}
      <Text style={styles.label}>
        Mega ball <Text style={styles.badge}>{selected.length}</Text>
      </Text>

      {/* Grelha de botões MegaBall (1 a 24 apenas) */}
      <View style={styles.grid}>
        {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
          <MegaBall
            key={num}
            value={num}
            selected={selected.includes(num)}
            onPress={() => handleToggle(num)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#154BA9",
    color: "#fff",
    paddingHorizontal: 6,
    borderRadius: 12,
    overflow: "hidden",
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
