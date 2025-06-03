// app/(main)/analysis/AR/AnalysisSelector.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import { MaterialIcons } from "@expo/vector-icons";

// Logos de AZ - ajuste os paths conforme sua estrutura!
import Powerball from "@/assets/logos/AR/powerball.svg";
import MegaMillions from "@/assets/logos/AR/megamillions.svg";
import Lotto from "@/assets/logos/AR/lotto.svg";
import NaturalStateJackpot from "@/assets/logos/AR/naturalstatejackpot.svg";
import LuckyforLife from "@/assets/logos/AR/luckyforlife.svg";
import Cash4Midday from "@/assets/logos/AR/cash4midday.svg";
import Cash4Evening from "@/assets/logos/AR/cash4evening.svg";
import Cash3Midday from "@/assets/logos/AR/cash3midday.svg";
import Cash3Evening from "@/assets/logos/AR/cash3evening.svg";

// Cada card = 1 jogo. Ajuste os caminhos conforme sua estrutura!
const GAMES = [
  { route: "powerball", Logo: Powerball, color: "#C7102E" },
  { route: "megamillions", Logo: MegaMillions, color: "#C7102E" },
  { route: "lotto", Logo: Lotto, color: "#C7102E" },
  { route: "naturalstatejackpot", Logo: NaturalStateJackpot, color: "#C7102E" },
  { route: "luckyforlife", Logo: LuckyforLife, color: "#C7102E" },
  { route: "cash4midday", Logo: Cash4Midday, color: "#C7102E" },
  { route: "cash4evening", Logo: Cash4Evening, color: "#C7102E" },
  { route: "cash3midday", Logo: Cash3Midday, color: "#C7102E" },
  { route: "cash3evening", Logo: Cash3Evening, color: "#C7102E" },
];

export default function AnalysisSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480);

  return (
    <View style={styles.container}>
      <HeaderLogoBack title="" />
      <Text style={styles.pageTitle}>Select Game to Analyze</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {GAMES.map(({ route, Logo, color }) => (
          <View
            key={route}
            style={[
              styles.card,
              {
                borderColor: color,
                shadowColor: color + "22",
                width: maxWidth,
              },
            ]}
          >
            {/* Logo do jogo à esquerda */}
            <Logo width={56} height={28} />

            {/* Ícone central */}
            <View style={styles.centerIcon}>
              <MaterialIcons name="analytics" size={26} color={color} />
            </View>

            {/* Botão de análise */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: color,
                  shadowColor: color + "33",
                },
              ]}
              activeOpacity={0.82}
              onPress={() => {
                // Ajuste os caminhos conforme sua estrutura real!
                if (route === "megamillions") {
                  router.push(
                    "/generator/states/arkansas/megamillions/analysis/sum"
                  );
                } else {
                  router.push(`/analysis`);
                }
              }}
            >
              <Text style={styles.buttonText}>Start Analysis</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F8" },
  pageTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#0E4CA1",
    marginTop: 14,
    marginBottom: 12,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  scrollContent: {
    paddingBottom: 90,
    alignItems: "center",
    gap: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOpacity: 0.13,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 2,
  },
  centerIcon: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 0,
    shadowOpacity: 0.07,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
