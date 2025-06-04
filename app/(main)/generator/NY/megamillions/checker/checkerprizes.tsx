import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";

const winningNumbers = [14, 37, 40, 41, 68];
const megaBall = 2;
const winningDate = "Fri, May 2, 2025";

const prizes = [
  {
    title: "Jackpot",
    rows: [[5, true]],
    values: ["$80,000,000.00"],
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
    values: [
      "$1,000,000.00",
      "$10,000.00",
      "$500.00",
      "$200.00",
      "$10.00",
      "$10.00",
      "$7.00",
      "$5.00",
      "$5.00",
    ],
  },
  {
    title: "Megaplier 2x",
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
    values: [
      "$2,000,000.00",
      "$20,000.00",
      "$1,000.00",
      "$400.00",
      "$20.00",
      "$20.00",
      "$14.00",
      "$10.00",
      "$10.00",
    ],
  },
  {
    title: "Megaplier 3x",
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
    values: [
      "$3,000,000.00",
      "$30,000.00",
      "$1,500.00",
      "$600.00",
      "$30.00",
      "$30.00",
      "$21.00",
      "$15.00",
      "$15.00",
    ],
  },
  {
    title: "Megaplier 4x",
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
    values: [
      "$4,000,000.00",
      "$40,000.00",
      "$2,000.00",
      "$800.00",
      "$40.00",
      "$40.00",
      "$28.00",
      "$20.00",
      "$20.00",
    ],
  },
  {
    title: "Megaplier 5x",
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
    values: [
      "$5,000,000.00",
      "$50,000.00",
      "$2,500.00",
      "$1,000.00",
      "$50.00",
      "$50.00",
      "$35.00",
      "$25.00",
      "$25.00",
    ],
  },
  {
    title: "Megaplier 10x",
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
    values: [
      "$10,000,000.00",
      "$100,000.00",
      "$5,000.00",
      "$2,000.00",
      "$100.00",
      "$100.00",
      "$70.00",
      "$50.00",
      "$50.00",
    ],
  },
];

export default function CheckerPrizesPage() {
  const renderBalls = (whiteCount: number, hasMega: boolean) => {
    const whites = Array.from({ length: whiteCount }, (_, i) => (
      <View key={"w" + i} style={[styles.smallBall, styles.whiteBall]}>
        <Text style={[styles.ballText, styles.whiteBallText]}>{""}</Text>
      </View>
    ));
    return (
      <View style={styles.ballRow}>
        {whites}
        {hasMega && <Text style={styles.plus}>+</Text>}
        {hasMega && (
          <View style={[styles.smallBall, styles.megaBall]}>
            <Text style={[styles.ballText, styles.megaBallText]}>{""}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Checker"
        subtitle="New York Mega Millions"
        logo={<MegamillionsLogo width={120} height={48} />}
        headerColor="#0E4CA1"
      />

      <View style={styles.fixedTopContainer}>
        <View style={styles.fixedTopContent}>
          <ResponsiveContainer>
            <View style={styles.winningContainer}>
              <Text style={styles.title}>Winning Numbers</Text>
              <View style={styles.winningRow}>
                {winningNumbers.map((n, i) => (
                  <View key={i} style={[styles.ball, styles.whiteBall]}>
                    <Text style={[styles.ballText, styles.whiteBallText]}>
                      {n.toString().padStart(2, "0")}
                    </Text>
                  </View>
                ))}
                <View style={[styles.ball, styles.megaBall]}>
                  <Text style={[styles.ballText, styles.megaBallText]}>
                    {megaBall}
                  </Text>
                </View>
              </View>
              <View style={styles.dateRow}>
                <Pressable>
                  <Text>{"<"}</Text>
                </Pressable>
                <Text style={styles.date}>{winningDate}</Text>
                <Pressable>
                  <Text>{">"}</Text>
                </Pressable>
              </View>
              <View style={styles.tabRow}>
                <View style={styles.tabActive}>
                  <Text style={styles.tabTextActive}>Prizes</Text>
                </View>
                <View style={styles.tabInactive}>
                  <Text style={styles.tabTextInactive}>Your Prizes</Text>
                </View>
              </View>
            </View>
          </ResponsiveContainer>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        style={styles.scrollArea}
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

      <View style={styles.footerButtonsWrapper}>
        <ResponsiveContainer>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkText}>Check Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.prizeButton}>
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
  scrollArea: {
    flex: 1,
  },
  contentWrapper: {
    paddingBottom: 120,
  },
  fixedTopContainer: {
    position: "absolute",
    top: 128,
    left: 0,
    right: 0,
    backgroundColor: "#F9FBFF",
    zIndex: 10,
  },
  fixedTopSpacer: {
    height: 180,
  },
  winningContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  winningRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  smallBall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  whiteBall: {
    backgroundColor: "#0e4ca1",
  },
  megaBall: {
    backgroundColor: "#FFC107",
  },
  whiteBallText: {
    color: "#fff",
  },
  megaBallText: {
    color: "#000",
  },
  ballText: {
    fontWeight: "600",
    fontSize: 16,
  },
  plus: {
    marginHorizontal: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 80,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabRow: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    marginBottom: 12,
  },
  tabActive: {
    flex: 1,
    backgroundColor: "#0e4ca1",
    borderRadius: 8,
    padding: 10,
  },
  tabInactive: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    padding: 10,
  },
  tabTextActive: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  tabTextInactive: { color: "#888", textAlign: "center", fontWeight: "600" },
  section: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: { fontWeight: "bold", marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ballRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 8,
  },
  value: {
    fontWeight: "600",
    fontSize: 16,
  },
  footerButtonsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingBottom: 24,
    paddingTop: 12,
    zIndex: 10,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  checkButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  prizeButton: {
    flex: 1,
    backgroundColor: "#00bd42",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  prizeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
