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
import Cash4LifeLogo from "@/assets/logos/ny/cash4life.svg";

// MOCK: muitos sorteios para testar o "Load More"
const allResults = Array.from({ length: 44 }).map((_, idx) => ({
  date: "Saturday, Apr 22, 2025",
  jackpot: "$1,000 Per Day for Life",
  numbers: [25, 39, 49, 52, 60],
  megaBall: (idx % 4) + 1,
}));

// Helper: Quebra em linhas de no máximo 5 bolas
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

  const results = allResults.slice(0, displayCount);
  const hasMore = displayCount < allResults.length;

  function handleLoadMore() {
    setDisplayCount((c) => Math.min(c + PAGE_SIZE, allResults.length));
  }

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Results"
        subtitle="New York Cash 4 Life"
        logo={<Cash4LifeLogo width={120} height={48} />}
        headerColor="#2D7F67"
        backTo="/results/ny/results"
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

              {/* Números em linhas de 5 */}
              <View style={styles.numbersBlock}>
                {chunkArray(item.numbers, 5).map((row, rowIdx) => (
                  <View key={rowIdx} style={styles.numbersRow}>
                    {row.map((n, i) => (
                      <View
                        key={`white-${index}-${rowIdx}-${i}`}
                        style={styles.whiteBall}
                      >
                        <Text style={[styles.ballText, styles.ballTextWhite]}>
                          {n.toString().padStart(2, "0")}
                        </Text>
                      </View>
                    ))}
                    {/* Mega Ball só na última linha */}
                    {rowIdx === chunkArray(item.numbers, 5).length - 1 && (
                      <View style={styles.megaBall}>
                        <Text style={[styles.ballText, styles.ballTextBlack]}>
                          {item.megaBall.toString().padStart(2, "0")}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* BOTÃO LOAD MORE */}
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
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 200,
    flex: 0,
  },
  jackpotLabel: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
    marginBottom: 0,
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
    gap: 8,
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 3,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2D7F67",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  megaBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3E4982",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
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
  // LOAD MORE styles
  loadMoreBtn: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 22,
    backgroundColor: "#2D7F67",
    alignSelf: "center",
    shadowColor: "#15509544",
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  loadMoreText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.1,
  },
});
