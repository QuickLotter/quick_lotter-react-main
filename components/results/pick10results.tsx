import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import Pick10Logo from "@/assets/images/ny_game_logo/pick10.svg";

const results = [
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    megaBall: "",
  },
];

// Helper: Split numbers into arrays of N
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ResultsPage() {
  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Results"
        subtitle="New York Pick 10"
        logo={<Pick10Logo width={120} height={48} />}
        headerColor="#FFE363"
        backTo="/results"
        titleColor="#111"
        subtitleColor="#111"
        backIconColor="#111"
      />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <ResponsiveContainer>
          {results.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.headerRow}>
                <View style={styles.dateWrapper}>
                  <Text style={styles.dayText}>{item.date.split(",")[0]},</Text>
                  <Text style={styles.dateText}>
                    {item.date.split(",")[1].trim()}
                  </Text>
                </View>
                <View style={styles.jackpotWrapper}>
                  <Text style={styles.jackpotLabel}>Est. jackpot</Text>
                  <Text style={styles.jackpotValue}>{item.jackpot}</Text>
                </View>
              </View>

              <View style={styles.separator} />

              {/* LINHAS DE BOLAS */}
              <View style={styles.numbersBlock}>
                {chunkArray(item.numbers, 7).map((row, rowIdx) => (
                  <View key={rowIdx} style={styles.numbersRow}>
                    {row.map((n, i) => (
                      <View
                        key={`white-${rowIdx}-${i}`}
                        style={styles.whiteBall}
                      >
                        <Text style={[styles.ballText, styles.ballTextWhite]}>
                          {n.toString().padStart(2, "0")}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F6F6F8",
  },
  contentWrapper: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#222",
    shadowOpacity: 0.12,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  dayText: {
    fontWeight: "600",
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: "#444",
  },
  jackpotWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  jackpotLabel: {
    fontSize: 12,
    color: "#555",
  },
  jackpotValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#DDD",
    marginBottom: 12,
  },
  numbersBlock: {
    gap: 8, // espaço entre as linhas
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "center", // <-- Centraliza cada linha!
    marginBottom: 4,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE363",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4, // espaçamento lateral entre as bolas
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ballTextWhite: {
    color: "#000",
  },
});
