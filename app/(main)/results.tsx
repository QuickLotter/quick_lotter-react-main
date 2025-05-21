import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { MaterialIcons } from "@expo/vector-icons";

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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_CARD_WIDTH = Math.min(359, SCREEN_WIDTH - 16);

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

export default function ResultsPage() {
  const router = useRouter();
  const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlinking((b) => !b), 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogoBack title="" />

      <Text style={styles.sectionTitle}>NEW YORK GAMES RESULTS</Text>

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
                  shadowColor: game.color,
                  width: MAX_CARD_WIDTH,
                },
              ]}
            >
              {/* Logo à esquerda */}
              <View style={styles.logoArea}>
                <Logo width={48} height={22} />
              </View>

              {/* Centro: infos centralizadas vertical/horizontal */}
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
                  <Text style={styles.drawStartSoonOutline}>
                    Draw Start Soon
                  </Text>
                )}
              </View>

              {/* Direita: Past Results */}
              <TouchableOpacity
                style={styles.rightArea}
                activeOpacity={0.83}
                onPress={() => router.push(`/results/${game.route}`)}
              >
                <Text style={styles.pastResults}>Past Results</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={22}
                  color="#7E8894"
                  style={{ marginLeft: 1 }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const CARD_HEIGHT = 72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E4CA1",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 36,
    minWidth: "100%",
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 14,
    borderWidth: 2,
    marginBottom: 12,
    // Sombra visível para o pad (azulada ou colorida por jogo)
    shadowColor: "#333",
    shadowOpacity: 0.19,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 11,
    paddingHorizontal: 8,
    height: CARD_HEIGHT,
  },
  logoArea: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
    height: CARD_HEIGHT,
  },
  infoArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CARD_HEIGHT,
    paddingHorizontal: 2,
  },
  drawStartedOutline: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00FFB0",
    textShadowColor: "#00955A",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 2,
  },
  drawStartSoonOutline: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF5F5F",
    textShadowColor: "#A61A1A",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginTop: 2,
  },
  nextDrawLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 0,
  },
  nextDrawDay: {
    fontWeight: "bold",
    color: "#222",
  },
  nextDrawDate: {
    fontSize: 13,
    color: "#222",
    fontWeight: "400",
    marginBottom: 0,
    textAlign: "center",
  },
  rightArea: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    minWidth: 54,
    justifyContent: "flex-end",
    height: CARD_HEIGHT,
  },
  pastResults: {
    fontSize: 12,
    color: "#7E8894",
    fontWeight: "500",
    marginRight: 2,
  },
});
