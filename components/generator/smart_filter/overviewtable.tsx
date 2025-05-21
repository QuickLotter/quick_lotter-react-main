import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// 🔢 Geração de dados mock com 95 bolas (70 azuis + 24 laranjas)
const NUM_NORMAL = 70;
const NUM_EXTRA = 24;

const headerBalls = [
  ...Array.from({ length: NUM_NORMAL }, (_, i) => ({
    number: i + 1,
    color: "#0E4CA1", // azul
    textColor: "#fff",
  })),
  ...Array.from({ length: NUM_EXTRA }, (_, i) => ({
    number: i + 1,
    color: "#FFA000", // laranja
    textColor: "#000",
  })),
];

const rows = Array.from({ length: 10 }, () => ({
  date: "10/08/24",
  values: Array.from({ length: NUM_NORMAL + NUM_EXTRA }, () => 1),
}));

export default function OverviewTable() {
  return (
    <View style={styles.wrapper}>
      {/* 🔝 Cabeçalho fixo no topo */}
      <View style={styles.headerContainer}>
        {/* Box fixo do DATE */}
        <View style={styles.headerDateBox}>
          <Text style={styles.headerText}>DATE</Text>
        </View>

        {/* 🔁 Scroll horizontal só das bolas */}
        <ScrollView horizontal contentContainerStyle={styles.headerRow}>
          {headerBalls.map((item, index) => (
            <View
              key={index}
              style={[styles.headerBallBox, { backgroundColor: item.color }]}
            >
              <Text style={[styles.headerText, { color: item.textColor }]}>
                {item.number}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 🔁 Linhas de dados */}
      <ScrollView>
        {rows.map((row, i) => (
          <View key={i} style={styles.dataRow}>
            {/* Coluna da data fixa à esquerda */}
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{row.date}</Text>
            </View>

            {/* Scroll horizontal dos valores */}
            <ScrollView horizontal contentContainerStyle={styles.valueRow}>
              {row.values.map((val, j) => (
                <View key={j} style={styles.greenBox}>
                  <Text style={styles.greenText}>{val}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },

  // 🔵 Cabeçalho com bolas
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#ECF1FF",
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerDateBox: {
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 3,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBallBox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 4,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  // 🟢 Corpo da tabela
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingLeft: 5,
  },
  dateBox: {
    width: 75,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 3,
    marginRight: 8,
  },
  dateText: {
    fontSize: 13,
    color: "#000",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenBox: {
    width: 30,
    height: 30,
    backgroundColor: "#D9EAD3",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 4,
  },
  greenText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
