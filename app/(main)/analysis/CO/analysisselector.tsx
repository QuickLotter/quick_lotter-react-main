// app/(main)/analysis/NY/AnalysisSelector.tsx

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

// Logos de NY - ajuste os paths conforme sua estrutura!
import NumbersMidday from "@/assets/logos/NY/numbersmidday.svg";
import NumbersEvening from "@/assets/logos/NY/numbersevening.svg";
import Win4Midday from "@/assets/logos/NY/win4midday.svg";
import Win4Evening from "@/assets/logos/NY/win4evening.svg";
import Take5Midday from "@/assets/logos/NY/take5midday.svg";
import Take5Evening from "@/assets/logos/NY/take5evening.svg";
import Pick10 from "@/assets/logos/NY/pick10.svg";
import NYLotto from "@/assets/logos/NY/nylotto.svg";
import Cash4Life from "@/assets/logos/NY/cash4life.svg";
import MegaMillions from "@/assets/logos/NY/megamillions.svg";
import Powerball from "@/assets/logos/NY/powerball.svg";

const GAMES = [
  { route: "powerball", Logo: Powerball, color: "#C7102E" },
  { route: "megamillions", Logo: MegaMillions, color: "#0E4CA1" },
  { route: "cash4life", Logo: Cash4Life, color: "#2D7F67" },
  { route: "nylotto", Logo: NYLotto, color: "#D31245" },
  { route: "pick10", Logo: Pick10, color: "#E7CE5C" },
  { route: "take5midday", Logo: Take5Midday, color: "#CA3092" },
  { route: "take5evening", Logo: Take5Evening, color: "#CA3092" },
  { route: "win4midday", Logo: Win4Midday, color: "#7E0C6E" },
  { route: "win4evening", Logo: Win4Evening, color: "#7E0C6E" },
  { route: "numbersmidday", Logo: NumbersMidday, color: "#2E73B5" },
  { route: "numbersevening", Logo: NumbersEvening, color: "#2E73B5" },
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
            {/* Logo à esquerda */}
            <Logo width={56} height={28} />

            {/* Ícone analytics central */}
            <View style={styles.centerIcon}>
              <MaterialIcons name="analytics" size={26} color={color} />
            </View>

            {/* Botão iOS-like */}
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
                if (route === "megamillions") {
                  router.push(
                    "/generator/states/colorado/megamillions/analysis/sum"
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
