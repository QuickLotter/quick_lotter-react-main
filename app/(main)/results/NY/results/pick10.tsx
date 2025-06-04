import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import Pick10Logo from "@/assets/images/ny_game_logo/pick10.svg";

// Simulação: muitos resultados para paginação
const allResults = Array.from({ length: 50 }).map((_, idx) => ({
  date: "Saturday, Apr 22, 2025",
  jackpot: "$500,000",
  numbers: Array.from({ length: 20 }, (_, i) => i + 1),
  megaBall: "",
}));

// Helper: Split numbers into arrays of N (ex: 7 por linha)
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ResultsPage() {
  const { width } = useWindowDimensions();
  const cardMaxWidth = Math.min(width - 32, 480);

  // Pagination state
  const PAGE_SIZE = 20;
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  // Only show as many as displayCount
  const results = allResults.slice(0, displayCount);

  // True se ainda há mais jogos para mostrar
  const hasMore = displayCount < allResults.length;

  // Handler para carregar mais jogos
  function handleLoadMore() {
    setDisplayCount((c) => Math.min(c + PAGE_SIZE, allResults.length));
  }

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Results"
        subtitle="New York Pick 10"
        logo={<Pick10Logo width={120} height={48} />}
        headerColor="#FFE363"
        backTo="/results/NY/results"
        titleColor="#111"
        subtitleColor="#111"
        backIconColor="#111"
      />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <ResponsiveContainer>
          {results.map((item, index) => (
            <View
              key={index}
              style={[
                styles.card,
                { width: cardMaxWidth, alignSelf: "center" },
              ]}
            >
              <View style={styles.headerRow}>
                <View style={styles.dateWrapper}>
                  <Text style={styles.dayText}>{item.date.split(",")[0]},</Text>
                  <Text style={styles.dateText}>
                    {item.date.split(",")[1].trim()}
                  </Text>
                </View>
                <View style={styles.jackpotWrapper}>
                  <Text style={styles.jackpotLabel}>Top Prize</Text>
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

          {/* LOAD MORE */}
          {hasMore && (
            <TouchableOpacity
              style={styles.loadMoreBtn}
              onPress={handleLoadMore}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )}
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
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    width: "100%",
  },
  dateWrapper: {
    flexShrink: 1,
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
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 220,
    flex: 0,
  },
  jackpotLabel: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
  },
  jackpotValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    textAlign: "right",
    marginTop: -2,
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
    justifyContent: "center", // Centraliza cada linha!
    marginBottom: 4,
  },
  whiteBall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFE363",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ballTextWhite: {
    color: "#000",
  },
  // LOAD MORE styles
  loadMoreBtn: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 22,
    backgroundColor: "#FFE363",
    alignSelf: "center",
    shadowColor: "#FFD70044",
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  loadMoreText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    letterSpacing: 0.1,
  },
});
