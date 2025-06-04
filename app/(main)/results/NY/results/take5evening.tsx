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
import Take5EveningLogo from "@/assets/logos/NY/take5evening.svg";

// MOCK: muitos sorteios para testar o "Load More"
const allResults = Array.from({ length: 42 }).map((_, idx) => ({
  date: "Saturday, Apr 22, 2025",
  jackpot: "$53,156",
  numbers: [2, 16, 29, 32, 39],
}));

export default function ResultsPage() {
  const { width } = useWindowDimensions();
  const cardMaxWidth = Math.min(width - 32, 480);

  // Paginação
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
        subtitle="New York NY Take 5 Evening"
        logo={<Take5EveningLogo width={120} height={48} />}
        headerColor="#00928F"
        backTo="/results/NY/results"
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
                  <Text style={styles.jackpotLabel}>Est. jackpot</Text>
                  <Text style={styles.jackpotValue}>{item.jackpot}</Text>
                </View>
              </View>

              {/* Linha separadora */}
              <View style={styles.separator} />

              {/* Números centralizados (dois dígitos) */}
              <View style={styles.numbersRow}>
                {item.numbers.map((n, i) => (
                  <View key={`white-${index}-${i}`} style={styles.whiteBall}>
                    <Text style={[styles.ballText, styles.ballTextWhite]}>
                      {n.toString().padStart(2, "0")}
                    </Text>
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
    minWidth: 112,
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
  numbersRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 3,
    alignItems: "center",
    marginTop: 4,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CA3092", // Cor do Take 5
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ballTextWhite: {
    color: "#fff",
  },
  // LOAD MORE styles
  loadMoreBtn: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 22,
    backgroundColor: "#00928F",
    alignSelf: "center",
    shadowColor: "#00928F44",
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
