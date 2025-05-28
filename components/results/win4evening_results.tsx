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
// Troque o logo se quiser Evening
import Win4EveningLogo from "@/assets/images/ny_game_logo/win4_evening.svg";

// MOCK: muitos sorteios para testar o "Load More"
const allResults = Array.from({ length: 38 }).map((_, idx) => ({
  date: "Saturday, Apr 22, 2025",
  jackpot: "$5,000",
  numbers: [1, 2, 3, 4], // Alterar conforme necessário
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
        subtitle="New York Win 4 Evening"
        logo={<Win4EveningLogo width={120} height={48} />}
        headerColor="#7E0C6E" // Escolha uma cor do Win 4
        backTo="/results"
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

              {/* 4 dígitos do Win 4 */}
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
    alignItems: "center",
    gap: 3,
    marginVertical: 2,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#7E0C6E", // Cor Win 4
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  ballText: {
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 1,
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
    backgroundColor: "#7E0C6E",
    alignSelf: "center",
    shadowColor: "#7C65A944",
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
