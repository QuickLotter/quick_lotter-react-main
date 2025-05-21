// ✅ Path: app/(main)/generator/filterednumbers.tsx

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import SelectorSliderOptions from "@/components/generator/smart_filter/selectorslideroptions";
import { gameUI } from "@/constants/gameui";

export default function FilteredNumbersPage() {
  const { game } = useLocalSearchParams();
  const gameKey = game as keyof typeof gameUI;
  const currentUI = gameUI[gameKey];

  if (!currentUI) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Jogo inválido. Nenhum tema encontrado para: {game}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ECF1FF" }}>
      <GameHeader
        logo={<currentUI.Logo width={60} height={40} />}
        title="Generator – New York"
        subtitle={currentUI.name}
        headerColor={currentUI.primary}
      />

      <ResponsiveContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <SelectorSliderOptions onFilterPress={() => {}} />

          {/* Blocos dos filtros visuais (estáticos por enquanto) */}
          <ScrollView horizontal style={styles.filtersRow}>
            {FILTERS.map(({ label, value, color }) => (
              <View key={label} style={styles.filterBlock}>
                <View style={[styles.filterLabel, { backgroundColor: color }]}>
                  <Text style={styles.filterLabelText}>{label}</Text>
                </View>
                <View style={styles.filterValueBox}>
                  <Text style={styles.filterValueText}>{value}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </ResponsiveContainer>
    </View>
  );
}

const FILTERS = [
  { label: "SUM", value: 333, color: "#BDBDBD" },
  { label: "ODD", value: 3, color: "#4CAF50" },
  { label: "LOW", value: 2, color: "#9575CD" },
  { label: "PRIME", value: 2, color: "#FF8A65" },
  { label: "FIBONACCI", value: 1, color: "#F06292" },
  { label: "MULT. OF 3", value: 3, color: "#4DD0E1" },
  { label: "ADJACENT", value: 2, color: "#81C784" },
  { label: "REPEATED", value: 1, color: "#FF9800" },
  { label: "SEQUENCE", value: 1, color: "#000000" },
  { label: "DIGITS", value: 7, color: "#FFEB3B" },
  { label: "LINES", value: 5, color: "#2196F3" },
  { label: "COLUMNS", value: 4, color: "#F44336" },
];

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingTop: 20,
    gap: 24,
  },
  filtersRow: {
    paddingHorizontal: 8,
  },
  filterBlock: {
    alignItems: "center",
    marginHorizontal: 6,
  },
  filterLabel: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 70,
    alignItems: "center",
  },
  filterLabelText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 13,
  },
  filterValueBox: {
    backgroundColor: "#03A9F4",
    marginTop: 6,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  filterValueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
