import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import MegamillionsLogo from "@/assets/logos/ny/megamillions.svg";

// MOCK DRAWINGS
const DRAWINGS = [
  {
    winningNumbers: [4, 15, 33, 45, 61],
    winningMegaBall: 8,
    winningDate: "Sat, Oct 26, 2024",
    mockGames: [
      [4, 12, 15, 33, 54, 8],
      [4, 12, 15, 33, 54, 16],
      [4, 12, 15, 33, 51, 12],
      [1, 38, 50, 61, 65, 5],
      [1, 42, 58, 62, 63, 2],
      [1, 42, 61, 62, 65, 15],
      [2, 6, 14, 20, 65, 24],
      [2, 6, 14, 38, 42, 17],
      [3, 6, 29, 61, 62, 8],
      [3, 6, 34, 61, 65, 2],
      [3, 12, 14, 42, 61, 9],
      [3, 12, 38, 42, 50, 10],
      [3, 12, 38, 61, 62, 2],
      [3, 12, 46, 62, 63, 4],
      [4, 14, 34, 38, 58, 3],
      [4, 20, 34, 38, 61, 4],
      [4, 20, 46, 58, 62, 16],
      [5, 26, 29, 38, 50, 12],
    ],
  },
  {
    winningNumbers: [2, 9, 22, 38, 68],
    winningMegaBall: 12,
    winningDate: "Tue, Oct 22, 2024",
    mockGames: [
      [2, 9, 22, 38, 68, 12],
      [2, 12, 15, 38, 45, 2],
      [10, 21, 22, 38, 68, 9],
    ],
  },
  {
    winningNumbers: [10, 23, 28, 43, 56],
    winningMegaBall: 4,
    winningDate: "Fri, Oct 18, 2024",
    mockGames: [
      [10, 23, 28, 43, 56, 4],
      [10, 14, 18, 43, 56, 9],
      [2, 23, 28, 43, 56, 11],
    ],
  },
];

// Ball component for beautiful shadow/anim
const Ball = ({
  num,
  isMega,
  matched,
}: {
  num: number;
  isMega?: boolean;
  matched?: boolean;
}) => (
  <View
    style={[
      styles.ball,
      isMega ? styles.megaBall : styles.whiteBall,
      matched && styles.matchedBall,
      Platform.OS === "ios" ? styles.ballShadowIOS : styles.ballShadowAndroid,
    ]}
  >
    <Text
      style={[
        styles.ballText,
        isMega ? styles.megaBallText : styles.whiteBallText,
      ]}
    >
      {num.toString().padStart(2, "0")}
    </Text>
  </View>
);

export default function CheckerPage() {
  const router = useRouter();
  const [drawIndex, setDrawIndex] = useState(0);
  const drawing = DRAWINGS[drawIndex];
  const games = drawing.mockGames;

  // Navegação entre sorteios
  const handlePrev = () => {
    if (drawIndex < DRAWINGS.length - 1) setDrawIndex(drawIndex + 1);
  };
  const handleNext = () => {
    if (drawIndex > 0) setDrawIndex(drawIndex - 1);
  };

  // Navegação do app
  const handleOpen = () => router.push("/my-lines");
  const handleCheckNow = () =>
    router.push("/checker/ny/megamillions/checkyourprize");
  const handlePrizeChart = () =>
    router.push("/checker/ny/megamillions/checkerprizes");

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Checker"
        subtitle="New York Mega Millions"
        logo={<MegamillionsLogo width={110} height={44} />}
        headerColor="#0E4CA1"
        backTo="/checker/ny/checker"
      />

      {/* BOTÕES SUPERIORES */}
      <View style={styles.buttonBar}>
        <ResponsiveContainer style={styles.topButtons}>
          <TouchableOpacity
            style={styles.openButton}
            activeOpacity={0.8}
            onPress={handleOpen}
          >
            <FontAwesome name="folder-open" size={20} color="#fff" />
            <Text style={styles.openText}>Open</Text>
          </TouchableOpacity>
          <View style={{ width: 18 }} />
          <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}>
            <FontAwesome name="trash" size={20} color="#fff" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </View>

      {/* WINNING NUMBERS */}
      <View style={{ backgroundColor: "#FFF", paddingVertical: 14 }}>
        <ResponsiveContainer>
          <Text style={styles.sectionTitle}>Winning Numbers</Text>
          <View style={styles.winningRow}>
            {drawing.winningNumbers.map((num, idx) => (
              <Ball key={`win-${idx}`} num={num} />
            ))}
            <Ball num={drawing.winningMegaBall} isMega />
          </View>
          <View style={styles.dateRow}>
            <Pressable
              onPress={handlePrev}
              disabled={drawIndex >= DRAWINGS.length - 1}
              style={({ pressed }) => [
                styles.arrowButton,
                drawIndex >= DRAWINGS.length - 1 && styles.arrowDisabled,
                pressed && { opacity: 0.6 },
              ]}
            >
              <FontAwesome name="chevron-left" size={22} color="#111" />
            </Pressable>
            <Text style={styles.dateText}>{drawing.winningDate}</Text>
            <Pressable
              onPress={handleNext}
              disabled={drawIndex === 0}
              style={({ pressed }) => [
                styles.arrowButton,
                drawIndex === 0 && styles.arrowDisabled,
                pressed && { opacity: 0.6 },
              ]}
            >
              <FontAwesome name="chevron-right" size={22} color="#111" />
            </Pressable>
          </View>
        </ResponsiveContainer>
      </View>

      {/* GAMES CARDS */}
      <ScrollView
        contentContainerStyle={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.sectionTitle}>Checker Number</Text>
          {games.map((nums, index) => {
            const main = nums.slice(0, 5);
            const mega = nums[5];
            const matched = main.filter((n) =>
              drawing.winningNumbers.includes(n)
            );
            const matchMega = mega === drawing.winningMegaBall;
            return (
              <Animated.View key={`game-${index}`} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.headerItem}>Game</Text>
                  <Text style={styles.headerItem}>Match</Text>
                  <Text style={styles.headerItem}>Mega Ball</Text>
                </View>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultItem}>0{index + 1}</Text>
                  <Text style={styles.resultItem}>
                    {matched.length.toString().padStart(2, "0")}
                  </Text>
                  <Text style={styles.resultItem}>
                    {matchMega ? "01" : "00"}
                  </Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.resultRow}>
                  {main.map((n, i) => (
                    <View
                      key={`main-${index}-${i}`}
                      style={styles.checkBallWrapper}
                    >
                      <Ball
                        num={n}
                        matched={drawing.winningNumbers.includes(n)}
                      />
                      {drawing.winningNumbers.includes(n) && (
                        <Text style={styles.check}>✔</Text>
                      )}
                    </View>
                  ))}
                  <View key={`mega-${index}`} style={styles.checkBallWrapper}>
                    <Ball num={mega} isMega matched={matchMega} />
                    {matchMega && <Text style={styles.check}>✔</Text>}
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </ResponsiveContainer>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNavWrapper}>
        <ResponsiveContainer>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.checkButton}
              activeOpacity={0.8}
              onPress={handleCheckNow}
            >
              <Text style={styles.checkText}>Check Now</Text>
            </TouchableOpacity>
            <View style={{ width: 16 }} />
            <TouchableOpacity
              style={styles.prizeButton}
              activeOpacity={0.8}
              onPress={handlePrizeChart}
            >
              <Text style={styles.prizeText}>Prize Chart</Text>
            </TouchableOpacity>
          </View>
        </ResponsiveContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  buttonBar: {
    backgroundColor: "#DFDEE8",
    width: "100%",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: "#E2E2F2",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#1877F2",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#1877F2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
      },
    }),
  },
  deleteButton: {
    backgroundColor: "#C62828",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#C62828",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
      },
    }),
  },
  openText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 8,
    color: "#14234D",
    textAlign: "center",
    letterSpacing: 0.1,
  },
  winningRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 76,
    marginBottom: 12,
    marginTop: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C2340",
    letterSpacing: 0.1,
  },
  arrowButton: {
    borderRadius: 100,
    padding: 7,
    backgroundColor: "#F6F7FB",
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  arrowDisabled: {
    opacity: 0.2,
  },
  // Ball Styles
  ball: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E4E7F6",
    marginHorizontal: 1,
    marginVertical: 1,
    backgroundColor: "#fff",
  },
  whiteBall: {
    backgroundColor: "#0E4CA1",
  },
  megaBall: {
    backgroundColor: "#FFC107",
  },
  matchedBall: {
    borderColor: "#13C34F",
    borderWidth: 2,
    elevation: 3,
  },
  ballText: {
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.05,
  },
  whiteBallText: {
    color: "#fff",
  },
  megaBallText: {
    color: "#000",
  },
  // Shadow for balls
  ballShadowIOS: {
    shadowColor: "#1C2340",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
  },
  ballShadowAndroid: {
    elevation: 3,
  },
  // Results
  resultsContainer: {
    paddingBottom: 102,
    alignItems: "center",
    paddingTop: 12,
    width: "100%",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    width: "100%",
    shadowColor: "#232359",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 7,
  },
  headerItem: {
    fontWeight: "600",
    fontSize: 14.5,
    flex: 1,
    textAlign: "center",
    color: "#223355",
    letterSpacing: 0.05,
  },
  resultItem: {
    fontWeight: "700",
    fontSize: 15,
    color: "#3B4A68",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.08,
  },
  separator: {
    height: 1.5,
    backgroundColor: "#F1F2F8",
    marginVertical: 9,
    borderRadius: 8,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 1,
  },
  checkBallWrapper: {
    position: "relative",
    alignItems: "center",
    marginHorizontal: 2,
  },
  check: {
    position: "absolute",
    top: 26,
    right: -8,
    backgroundColor: "#13C34F",
    color: "#fff",
    fontSize: 13,
    borderRadius: 12,
    width: 19,
    height: 19,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 19,
    overflow: "hidden",
    shadowColor: "#13C34F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomNavWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 14,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: "#102050",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 9,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    maxWidth: 768,
    width: "100%",
    alignSelf: "center",
  },
  checkButton: {
    flex: 1,
    backgroundColor: "#00BD42",
    borderRadius: 24,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    shadowColor: "#00BD42",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 2,
  },
  prizeButton: {
    flex: 1,
    backgroundColor: "#F7F7FC",
    borderRadius: 24,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: "#CED4F3",
    shadowColor: "#CED4F3",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  checkText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16.5,
    letterSpacing: 0.06,
  },
  prizeText: {
    color: "#101326",
    fontWeight: "700",
    fontSize: 16.5,
    letterSpacing: 0.06,
  },
});
