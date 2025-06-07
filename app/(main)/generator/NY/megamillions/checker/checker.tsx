import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import MegamillionsLogo from "@/assets/logos/ny/megamillions.svg";

const winningNumbers = [4, 15, 33, 45, 61];
const winningMegaBall = 8;
const winningDate = "Sat, Oct 26, 2024";

const mockGames = [
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
];

export default function CheckerPage() {
  const [games, setGames] = useState(mockGames);

  const handlePrint = () => console.log("Check Now");
  const handleSave = () => console.log("Prize Chart");

  const renderBall = (
    num: number,
    isMega = false,
    matched = false,
    key?: string
  ) => (
    <View
      key={key}
      style={[
        styles.ball,
        isMega ? styles.megaBall : styles.whiteBall,
        matched && styles.matchedBall,
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

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Checker"
        subtitle="New York Mega Millions"
        logo={<MegamillionsLogo width={120} height={48} />}
        headerColor="#0E4CA1"
      />

      <View style={styles.buttonBar}>
        <ResponsiveContainer style={styles.topButtons}>
          <TouchableOpacity style={styles.openButton}>
            <FontAwesome name="folder-open" size={20} color="#fff" />
            <Text style={styles.openText}>Open</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity style={styles.deleteButton}>
            <FontAwesome name="trash" size={20} color="#fff" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </View>

      <View style={{ backgroundColor: "#FFF", paddingVertical: 12 }}>
        <ResponsiveContainer>
          <Text style={styles.sectionTitle}>Winning Numbers</Text>
          <View style={styles.winningRow}>
            {winningNumbers.map((num, index) =>
              renderBall(num, false, false, `white-${index}`)
            )}
            {renderBall(winningMegaBall, true, false, "mega")}
          </View>

          <View style={styles.dateRow}>
            <Pressable>
              <FontAwesome name="chevron-left" size={20} color="#333" />
            </Pressable>
            <Text style={styles.dateText}> {winningDate} </Text>
            <Pressable>
              <FontAwesome name="chevron-right" size={20} color="#333" />
            </Pressable>
          </View>
        </ResponsiveContainer>
      </View>

      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <ResponsiveContainer>
          <Text style={styles.sectionTitle}>Checker Number</Text>
          {games.map((nums, index) => {
            const main = nums.slice(0, 5);
            const mega = nums[5];
            const matched = main.filter((n) => winningNumbers.includes(n));
            const matchMega = mega === winningMegaBall;

            return (
              <View key={`game-${index}`} style={styles.resultCard}>
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
                      {renderBall(
                        n,
                        false,
                        winningNumbers.includes(n),
                        `main-${index}-${i}`
                      )}
                      {winningNumbers.includes(n) && (
                        <Text style={styles.check}>✔</Text>
                      )}
                    </View>
                  ))}
                  <View key={`mega-${index}`} style={styles.checkBallWrapper}>
                    {renderBall(mega, true, matchMega, `mega-${index}`)}
                    {matchMega && <Text style={styles.check}>✔</Text>}
                  </View>
                </View>
              </View>
            );
          })}
        </ResponsiveContainer>
      </ScrollView>

      <View style={styles.bottomNavWrapper}>
        <ResponsiveContainer>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.checkButton} onPress={handlePrint}>
              <Text style={styles.checkText}>Check Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.prizeButton} onPress={handleSave}>
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
    paddingVertical: 12,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#1877F2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deleteButton: {
    backgroundColor: "#C62828",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  openText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: "#222",
    textAlign: "center",
  },
  winningRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 80,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
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
  whiteBall: {
    backgroundColor: "#0E4CA1",
  },
  megaBall: {
    backgroundColor: "#FFC107",
  },
  matchedBall: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  ballText: {
    fontWeight: "600",
    fontSize: 16,
  },
  whiteBallText: {
    color: "#fff",
  },
  megaBallText: {
    color: "#000",
  },
  resultsContainer: {
    paddingBottom: 100,
    alignItems: "center",
    paddingTop: 12,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: "100%",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
  },
  headerItem: {
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  resultItem: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 8,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  checkBallWrapper: {
    position: "relative",
    alignItems: "center",
  },
  check: {
    position: "absolute",
    top: 24,
    right: -6,
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: 12,
    borderRadius: 20,
    width: 16,
    height: 16,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 16,
  },
  bottomNavWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
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
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00BD42",
  },
  prizeButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  checkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  prizeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
