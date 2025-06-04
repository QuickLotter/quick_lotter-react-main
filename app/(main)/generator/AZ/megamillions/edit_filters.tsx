import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import EditFilterModal from "@/components/generator/modals/editFilterModal";
import MegamillionsLogo from "@/assets/logos/AZ/megamillions.svg";

const FILTERS = [
  { key: "SUM", color: "#B9B9B9" },
  { key: "ODD", color: "#4CAF50" },
  { key: "LOW", color: "#9575CD" },
  { key: "PRIME", color: "#009BDE" },
  { key: "FIBONACCI", color: "#E1058C" },
  { key: "MULTIPLE OF 3", color: "#4DD0E1" },
  { key: "VERTICAL", color: "#B71C1C" },
  { key: "ADJACENT", color: "#8BC34A" },
  { key: "SEQUENCE", color: "#000000" },
  { key: "REPEATED", color: "#FF9800" },
  { key: "DIGITS", color: "#CDDC39" },
  { key: "LINES", color: "#005BAA" },
  { key: "COLUMNS", color: "#ff0004" },
];

const PAD_SIZE = 35;

export default function FilteredNumbersPage() {
  const { game } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, number[]>>({});
  const [gameStats, setGameStats] = useState<Record<string, number>[]>([]);

  useEffect(() => {
    const defaultFilters = Object.fromEntries(
      FILTERS.map((f) => [f.key, [0, 0]])
    );
    setFilters(defaultFilters);

    const exampleData = Array.from({ length: 50 }, (_, i) => ({
      GAME: i + 1,
      SUM: 120 + (i % 50),
      ODD: i % 5,
      LOW: 2,
      PRIME: 2,
      FIBONACCI: 1,
      "MULTIPLE OF 3": 3,
      VERTICAL: 4,
      ADJACENT: 2,
      REPEATED: 1,
      SEQUENCE: 0,
      DIGITS: 7,
      LINES: 2,
      COLUMNS: 3,
    }));

    setGameStats(exampleData);
  }, []);

  const openModal = (key: string) => {
    setSelectedFilter(key);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedFilter(null);
  };

  const handleConfirm = (newVal: number[]) => {
    if (selectedFilter) {
      setFilters((prev) => ({
        ...prev,
        [selectedFilter]: newVal,
      }));
      closeModal();
    }
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        logo={<MegamillionsLogo width={100} height={40} />}
        title="Game Filters"
        subtitle="Arizona Mega Millions"
        headerColor="#0E4CA1"
      />

      <ResponsiveContainer>
        {/* CABEÇALHO FIXO: GAME + filtros */}
        <View style={{ flexDirection: "row" }}>
          {/* Célula "GAME" fixa */}
          <View style={styles.filterBlock}>
            <View style={[styles.filterLabel, { backgroundColor: "#FFF" }]}>
              <Text style={styles.verticalText}>GAME</Text>
            </View>
          </View>

          {/* Cabeçalho de filtros com rolagem horizontal */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.headerRow}>
              {FILTERS.map(({ key, color }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => openModal(key)}
                  style={[styles.filterLabel, { backgroundColor: color }]}
                >
                  <Text
                    style={[
                      styles.verticalText,
                      { color: key === "SEQUENCE" ? "#FFF" : "#000" },
                    ]}
                  >
                    {key.replace(/_/g, "\n")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* SCROLL VERTICAL UNIFICADO */}
        <ScrollView style={{ height: 600 }}>
          <View style={{ flexDirection: "row" }}>
            {/* COLUNA GAME (rolando junto com a grade) */}
            <View>
              {gameStats.map((_, index) => (
                <View key={index} style={styles.filterBlock}>
                  <View style={styles.fixedValueBox}>
                    <Text style={styles.fixedValueText}>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* GRADE COM ROLAGEM HORIZONTAL */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {gameStats.map((game, index) => (
                  <View key={index} style={styles.rowWrapper}>
                    {FILTERS.map(({ key }) => {
                      const value = game[key] ?? 0;
                      const bgColor = getColorForFilterValue(key, value);
                      const textColor = getTextColor(key, value);

                      return (
                        <View
                          key={key}
                          style={[
                            styles.dynamicValueBox,
                            { backgroundColor: bgColor },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dynamicValueText,
                              { color: textColor },
                            ]}
                          >
                            {value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </ResponsiveContainer>

      <EditFilterModal
        visible={modalVisible}
        filterKey={selectedFilter || ""}
        mode="range"
        value={selectedFilter ? filters[selectedFilter] : [0, 0]}
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

function getColorForFilterValue(filterKey: string, value: number) {
  if (filterKey === "SUM") {
    if (value < 132) return "#FFF176";
    if (value < 178) return "#29B6F6";
    if (value < 224) return "#66BB6A";
    return "#EF5350";
  }
  if (value === 0) return "#00E676";
  if (value === 1) return "#03A9F4";
  if (value === 2) return "#EC407A";
  if (value === 3) return "#FFEB3B";
  if (value === 4) return "#212121";
  if (value === 5) return "#F44336";
  if (value === 6) return "#FF9800";
  if (value === 7) return "#9575CD";
  if (value === 8) return "#689F38";
  if (value === 9) return "#6D4C41";
  return "#FFF";
}

function getTextColor(filterKey: string, value: number) {
  if (filterKey === "SUM") return "#000";
  if ([1, 4, 5, 9].includes(value)) return "#FFF";
  return "#000";
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  headerRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    marginTop: 12,
  },
  rowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  filterBlock: {
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  filterLabel: {
    width: PAD_SIZE,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  verticalText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
  },
  fixedValueBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    width: PAD_SIZE,
    height: PAD_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  fixedValueText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  dynamicValueBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    width: PAD_SIZE,
    height: PAD_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  dynamicValueText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
