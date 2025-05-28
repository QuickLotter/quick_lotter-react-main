import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";

import Powerball from "@/assets/images/ny_game_logo/powerball.svg";
import MegaMillions from "@/assets/images/ny_game_logo/megamillions.svg";
import NYLotto from "@/assets/images/ny_game_logo/nylotto.svg";
import Cash4Life from "@/assets/images/ny_game_logo/cash4life.svg";
import Pick10 from "@/assets/images/ny_game_logo/pick10.svg";
import Take5Midday from "@/assets/images/ny_game_logo/take5_midday.svg";
import Take5Evening from "@/assets/images/ny_game_logo/take5_evening.svg";
import Win4Midday from "@/assets/images/ny_game_logo/win4_midday.svg";
import Win4Evening from "@/assets/images/ny_game_logo/win4_evening.svg";
import NumbersMidday from "@/assets/images/ny_game_logo/numbers_midday.svg";
import NumbersEvening from "@/assets/images/ny_game_logo/numbers_evening.svg";

// iOS-style colors
const BG = "#F6F6F8";
const CARD = "#FFF";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_CARD_WIDTH = Math.min(370, SCREEN_WIDTH - 16);
const CARD_HEIGHT = 74;

const gameCards = [
  {
    name: "Powerball",
    logo: Powerball,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 23:00",
    route: "powerball",
    color: "#C7102E",
  },
  {
    name: "Mega Millions",
    logo: MegaMillions,
    nextDraw: "Tuesday",
    nextDrawDate: "May 23, 2025 23:00",
    route: "megamillions",
    color: "#0E4CA1",
  },
  {
    name: "Cash 4 Life",
    logo: Cash4Life,
    nextDraw: "Tonight",
    nextDrawDate: "May 21, 2025 21:00",
    route: "cash4life",
    color: "#2D7F67",
  },
  {
    name: "New York Lotto",
    logo: NYLotto,
    nextDraw: "Saturday",
    nextDrawDate: "May 25, 2025 20:15",
    route: "nylotto",
    color: "#D31245",
  },
  {
    name: "Pick 10",
    logo: Pick10,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 20:30",
    route: "pick10",
    color: "#E7CE5C",
  },
  {
    name: "Take 5 Midday",
    logo: Take5Midday,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 14:30",
    route: "take5_midday",
    color: "#CA3092",
  },
  {
    name: "Take 5 Evening",
    logo: Take5Evening,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 20:30",
    route: "take5_evening",
    color: "#CA3092",
  },
  {
    name: "Win 4 Midday",
    logo: Win4Midday,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 14:30",
    route: "win4_midday",
    color: "#7E0C6E",
  },
  {
    name: "Win 4 Evening",
    logo: Win4Evening,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 19:30",
    route: "win4_evening",
    color: "#7E0C6E",
  },
  {
    name: "NUMBERS Midday",
    logo: NumbersMidday,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 14:30",
    route: "numbers_midday",
    color: "#2E73B5",
  },
  {
    name: "NUMBERS Evening",
    logo: NumbersEvening,
    nextDraw: "Monday",
    nextDrawDate: "May 22, 2025 19:30",
    route: "numbers_evening",
    color: "#2E73B5",
  },
];

const parseDrawDate = (dateString: string) => new Date(dateString);

function getDrawStatus(drawDate: Date) {
  const now = new Date();
  const oneHourBefore = new Date(drawDate.getTime() - 60 * 60 * 1000);
  const oneMinuteBefore = new Date(drawDate.getTime() - 1 * 60 * 1000);
  const thirtyMinutesAfter = new Date(drawDate.getTime() + 30 * 60 * 1000);
  if (now >= oneHourBefore && now < oneMinuteBefore) return "soon";
  if (now >= oneMinuteBefore && now <= thirtyMinutesAfter) return "started";
  return "none";
}

export default function ResultsSelector() {
  const router = useRouter();
  const [blinking, setBlinking] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setBlinking((b) => !b), 700);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <HeaderLogoBack title="" showMenu={false} showStateSelector />
      <Text style={styles.pageTitle}>Select Game to View Results</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {gameCards.map((game) => {
          const Logo = game.logo;
          const drawDate = parseDrawDate(game.nextDrawDate);
          const drawStatus = getDrawStatus(drawDate);
          return (
            <View
              key={game.route}
              style={[
                styles.cardWrapper,
                {
                  borderColor: game.color,
                  shadowColor: game.color + "44",
                  width: MAX_CARD_WIDTH,
                },
              ]}
            >
              <View style={styles.logoArea}>
                <Logo width={50} height={24} />
              </View>
              <View style={styles.infoArea}>
                <Text style={styles.nextDrawLabel}>
                  Next Draw:{" "}
                  <Text style={styles.nextDrawDay}>{game.nextDraw},</Text>
                </Text>
                <Text style={styles.nextDrawDate}>{game.nextDrawDate}</Text>
                {drawStatus === "started" && blinking && (
                  <Text style={styles.drawStartedOutline}>Draw Started</Text>
                )}
                {drawStatus === "soon" && (
                  <Text style={styles.drawStartSoonOutline}>Draw Soon</Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.pastResultButton,
                  { backgroundColor: game.color },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  router.push(`/results/new_york/${game.route}`);
                }}
              >
                <Text style={styles.pastResultText}>Past Results</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={{ height: 80 }} />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  pageTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#0E4CA1",
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 0,
    minWidth: "100%",
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 2,
    marginBottom: 16,
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    paddingHorizontal: 12,
    height: CARD_HEIGHT,
    width: "98%",
    maxWidth: 370,
  },
  logoArea: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    height: CARD_HEIGHT,
  },
  infoArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CARD_HEIGHT,
    paddingHorizontal: 3,
  },
  nextDrawLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#23242A",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  nextDrawDay: {
    fontWeight: "bold",
    color: "#23242A",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  nextDrawDate: {
    fontSize: 13,
    color: "#222",
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  drawStartedOutline: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1ABC9C",
    textShadowColor: "#12AB90",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 3,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  drawStartSoonOutline: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF5F5F",
    textShadowColor: "#A61A1A",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginTop: 3,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  pastResultButton: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 7,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginLeft: 12,
  },
  pastResultText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFF",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.3,
  },
});
