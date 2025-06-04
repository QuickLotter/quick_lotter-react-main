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
import PowerballLogo from "@/assets/images/ny_game_logo/powerball.svg";

// MOCK: muitos sorteios para testar "Load More"
const allResults = Array.from({ length: 42 }).map((_, idx) => ({
  date: "Saturday, Apr 22, 2025",
  jackpot: "$50 Million",
  numbers: [5, 39, 49, 52, 59],
  megaBall: (idx % 4) + 1,
}));

const PAGE_SIZE = 20;

export default function ResultsPage() {
  const { width } = useWindowDimensions();
  const cardMaxWidth = Math.min(width - 32, 480);

  // Paginação: quantos jogos mostrar
  const [visibleResults, setVisibleResults] = useState(PAGE_SIZE);
  const canLoadMore = visibleResults < allResults.length;

  function handleLoadMore() {
    setVisibleResults((v) => Math.min(v + PAGE_SIZE, allResults.length));
  }

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Results"
        subtitle="New York Powerball"
        logo={<PowerballLogo width={120} height={48} />}
        headerColor="#C7102E"
        backTo="/results/NY/results"
      />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <ResponsiveContainer>
          {allResults.slice(0, visibleResults).map((item, index) => (
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

              {/* Bolas Powerball (5 pretas + 1 vermelha, todos 2 dígitos) */}
              <View style={styles.numbersRow}>
                {item.numbers.map((n, i) => (
                  <View key={`white-${index}-${i}`} style={styles.whiteBall}>
                    <Text style={[styles.ballText, styles.ballTextWhite]}>
                      {n.toString().padStart(2, "0")}
                    </Text>
                  </View>
                ))}
                <View style={styles.megaBall}>
                  <Text style={[styles.ballText, styles.ballTextBlack]}>
                    {item.megaBall.toString().padStart(2, "0")}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Botão Load More */}
          {canLoadMore && (
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
    marginVertical: 3,
    gap: 2,
  },
  whiteBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000", // Bola preta Powerball
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  megaBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C7102E", // Bola vermelha Powerball
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
  loadMoreBtn: {
    marginVertical: 12,
    alignSelf: "center",
    backgroundColor: "#C7102E",
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 36,
    shadowColor: "#222",
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 3,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
