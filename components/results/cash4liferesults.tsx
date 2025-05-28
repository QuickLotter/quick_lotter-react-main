import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import Cash4LifeLogo from "@/assets/images/ny_game_logo/cash4life.svg";

const results = [
  {
    date: "Saturday, Apr 22, 2025",
    jackpot: "$50 Million",
    numbers: [25, 39, 49, 52, 60],
    megaBall: 2,
  },
  {
    date: "Monday, Apr 18, 2025",
    jackpot: "$112 Million",
    numbers: [5, 13, 15, 17, 28],
    megaBall: 1,
  },
  {
    date: "Wednesday, Apr 15, 2025",
    jackpot: "$96 Million",
    numbers: [6, 10, 13, 24, 59],
    megaBall: 2,
  },
  {
    date: "Saturday, Apr 11, 2025",
    jackpot: "$72 Million",
    numbers: [15, 37, 38, 56, 58],
    megaBall: 3,
  },
  {
    date: "Tuesday, Apr 8, 2025",
    jackpot: "$54 Million",
    numbers: [10, 16, 43, 50, 51],
    megaBall: 4,
  },
];

export default function ResultsPage() {
  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Results"
        subtitle="New York Cash 4 Life"
        logo={<Cash4LifeLogo width={120} height={48} />}
        headerColor="#2D7F67"
        backTo="/results" // ✅ CERTO //volta para tela resultsselector
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

              {/* Linha separadora */}
              <View style={styles.separator} />

              {/* Números */}
              <View style={styles.numbersRow}>
                {item.numbers.map((n, i) => (
                  <View key={`white-${index}-${i}`} style={styles.whiteBall}>
                    <Text style={[styles.ballText, styles.ballTextWhite]}>
                      {n}
                    </Text>
                  </View>
                ))}
                <View style={styles.megaBall}>
                  <Text style={[styles.ballText, styles.ballTextBlack]}>
                    {item.megaBall}
                  </Text>
                </View>
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
  numbersRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2D7F67",
    justifyContent: "center",
    alignItems: "center",
  },
  megaBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3E4982",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ballTextWhite: {
    color: "#fff",
  },
  ballTextBlack: {
    color: "#fff",
  },
});
