import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import MegamillionsLogo from "@/assets/logos/ny/megamillions.svg";

const winningNumbers = [14, 37, 40, 41, 68];
const megaBall = 2;
const winningDate = "Fri, May 2, 2025";

const prizes = [
  {
    title: "Jackpot",
    rows: [[5, true]],
    values: ["$0"],
  },
  {
    title: "Megaplier 1x",
    rows: [
      [5, false],
      [4, true],
      [4, false],
      [3, true],
      [3, false],
      [2, true],
      [1, true],
      [0, true],
    ],
    values: ["$0", "$0", "$0", "$0", "$0", "$0", "$0", "$0"],
  },
];

// Ball component (maior, shadow, bonito)
const Ball = ({ num, isMega, size = 42 }) => (
  <View
    style={[
      styles.ball,
      { width: size, height: size, borderRadius: size / 2 },
      isMega ? styles.megaBall : styles.whiteBall,
      Platform.OS === "ios" ? styles.ballShadowIOS : styles.ballShadowAndroid,
    ]}
  >
    <Text
      style={[
        styles.ballText,
        isMega ? styles.megaBallText : styles.whiteBallText,
        { fontSize: size * 0.47 },
      ]}
    >
      {num !== "" ? num.toString().padStart(2, "0") : ""}
    </Text>
  </View>
);

// Pequena bola (para o grid de prêmios)
const SmallBall = ({ isMega }) => (
  <View
    style={[
      styles.ball,
      { width: 26, height: 26, borderRadius: 13 },
      isMega ? styles.megaBall : styles.whiteBall,
      Platform.OS === "ios" ? styles.ballShadowIOS : styles.ballShadowAndroid,
    ]}
  />
);

export default function CheckYourPrizePage() {
  const router = useRouter();

  const renderBalls = (whiteCount, hasMega) => {
    const whites = Array.from({ length: whiteCount }).map((_, i) => (
      <SmallBall key={"w" + i} />
    ));
    return (
      <View style={styles.ballRow}>
        {whites}
        {hasMega && <Text style={styles.plus}>+</Text>}
        {hasMega && <SmallBall isMega />}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Checker"
        subtitle="New York Mega Millions"
        logo={<MegamillionsLogo width={110} height={44} />}
        headerColor="#0E4CA1"
        backTo="/checker/ny/checker"
      />

      {/* FIXED TOP */}
      <View style={styles.fixedTopContainer}>
        <View style={styles.fixedTopContent}>
          <ResponsiveContainer>
            <View style={styles.winningContainer}>
              <Text style={styles.title}>Winning Numbers</Text>
              <View style={styles.winningRow}>
                {winningNumbers.map((n, i) => (
                  <Ball key={i} num={n} />
                ))}
                <Ball num={megaBall} isMega />
              </View>
              <View style={styles.dateRow}>
                <Pressable style={styles.arrowButton}>
                  <FontAwesome name="chevron-left" size={21} color="#222" />
                </Pressable>
                <Text style={styles.date}>{winningDate}</Text>
                <Pressable style={styles.arrowButton}>
                  <FontAwesome name="chevron-right" size={21} color="#222" />
                </Pressable>
              </View>
              {/* TAB */}
              <View style={styles.tabRow}>
                <Pressable
                  style={styles.tabInactive}
                  onPress={() =>
                    router.replace("/checker/ny/megamillions/checkerprizes")
                  }
                >
                  <Text style={styles.tabTextInactive}>Prizes</Text>
                </Pressable>
                <View style={styles.tabActive}>
                  <Text style={styles.tabTextActive}>Your Prizes</Text>
                </View>
              </View>
            </View>
          </ResponsiveContainer>
        </View>
      </View>

      {/* SPACER (para empurrar o scroll depois do topo fixo) */}
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fixedTopSpacer} />
        <ResponsiveContainer>
          {prizes.map((section, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.rows.map((row, idx) => (
                <View key={idx} style={styles.row}>
                  {renderBalls(row[0], row[1])}
                  <Text style={styles.value}>{section.values[idx]}</Text>
                </View>
              ))}
            </View>
          ))}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total Prize</Text>
            <Text style={styles.value}>$0</Text>
          </View>
        </ResponsiveContainer>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footerButtonsWrapper}>
        <ResponsiveContainer>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.checkButton} activeOpacity={0.82}>
              <Text style={styles.checkText}>Check Now</Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              style={styles.prizeButton}
              activeOpacity={0.82}
              onPress={() =>
                router.replace("/checker/ny/megamillions/checkerprizes")
              }
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
  wrapper: { flex: 1, backgroundColor: "#ECF1FF" },
  scrollArea: { flex: 1 },
  contentWrapper: { paddingBottom: 110 },
  // FIXED TOP
  fixedTopContainer: {
    position: "absolute",
    top: 128,
    left: 0,
    right: 0,
    backgroundColor: "#F9FBFF",
    zIndex: 10,
    shadowColor: "#101326",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 5,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    paddingBottom: 5,
  },
  fixedTopContent: {
    paddingHorizontal: 0,
    paddingTop: 8,
  },
  fixedTopSpacer: {
    height: 196,
  },
  // WINNING NUMBERS
  winningContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    color: "#132347",
    textAlign: "center",
    letterSpacing: 0.09,
  },
  winningRow: {
    flexDirection: "row",
    gap: 13,
    marginBottom: 7,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  // Bola principal e pequenas
  ball: {
    backgroundColor: "#fff",
    borderWidth: 1.2,
    borderColor: "#E6E9F5",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
    marginVertical: 1,
  },
  whiteBall: {
    backgroundColor: "#0e4ca1",
  },
  megaBall: {
    backgroundColor: "#FFC107",
  },
  whiteBallText: {
    color: "#fff",
    fontWeight: "bold",
  },
  megaBallText: {
    color: "#000",
    fontWeight: "bold",
  },
  ballText: {
    fontWeight: "700",
    letterSpacing: 0.04,
    textAlign: "center",
  },
  // Sombras de bola
  ballShadowIOS: {
    shadowColor: "#122140",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  ballShadowAndroid: {
    elevation: 3,
  },
  plus: {
    marginHorizontal: 6,
    fontSize: 17,
    fontWeight: "700",
    color: "#888",
  },
  // DATE ROW + ARROWS
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 72,
    marginBottom: 13,
    marginTop: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242B48",
    letterSpacing: 0.09,
    textAlign: "center",
  },
  arrowButton: {
    borderRadius: 100,
    padding: 6,
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
  // TABS
  tabRow: {
    flexDirection: "row",
    width: "100%",
    gap: 7,
    marginBottom: 9,
  },
  tabActive: {
    flex: 1,
    backgroundColor: "#0e4ca1",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#0e4ca1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 7,
    elevation: 2,
  },
  tabInactive: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tabTextActive: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15.7,
    letterSpacing: 0.08,
  },
  tabTextInactive: {
    color: "#6877A7",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15.7,
    letterSpacing: 0.08,
  },
  // PRIZE GRID
  section: {
    marginBottom: 13,
    borderTopWidth: 1.2,
    borderTopColor: "#F0F1F6",
    paddingTop: 14,
    paddingHorizontal: 13,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#132347",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 9,
    fontSize: 15.5,
    color: "#223356",
    letterSpacing: 0.06,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
    paddingVertical: 4,
    gap: 8,
  },
  ballRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 8,
  },
  value: {
    fontWeight: "600",
    fontSize: 15,
    color: "#2B2E38",
    letterSpacing: 0.04,
    minWidth: 48,
    textAlign: "right",
  },
  // FOOTER
  footerButtonsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingBottom: 23,
    paddingTop: 12,
    zIndex: 15,
    shadowColor: "#222347",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 7,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },
  checkButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#CED4F3",
    shadowColor: "#CED4F3",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  prizeButton: {
    flex: 1,
    backgroundColor: "#00bd42",
    borderRadius: 24,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00bd42",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  checkText: {
    color: "#141D31",
    fontWeight: "700",
    fontSize: 16.5,
    letterSpacing: 0.07,
  },
  prizeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16.5,
    letterSpacing: 0.07,
  },
});
