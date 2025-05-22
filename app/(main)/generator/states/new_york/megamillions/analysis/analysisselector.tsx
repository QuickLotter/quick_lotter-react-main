import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import { MaterialIcons } from "@expo/vector-icons";

// 🟦 Importação dos logos
import Powerball from "@/assets/images/ny_game_logo/powerball.svg";
import MegaMillions from "@/assets/images/ny_game_logo/megamillions.svg";
import Cash4Life from "@/assets/images/ny_game_logo/cash4life.svg";
import NYLotto from "@/assets/images/ny_game_logo/nylotto.svg";
import Pick10 from "@/assets/images/ny_game_logo/pick10.svg";
import Take5Midday from "@/assets/images/ny_game_logo/take5_midday.svg";
import Take5Evening from "@/assets/images/ny_game_logo/take5_evening.svg";
import Win4Midday from "@/assets/images/ny_game_logo/win4_midday.svg";
import Win4Evening from "@/assets/images/ny_game_logo/win4_evening.svg";
import NumbersMidday from "@/assets/images/ny_game_logo/numbers_midday.svg";
import NumbersEvening from "@/assets/images/ny_game_logo/numbers_evening.svg";

const GAMES = [
  { route: "powerball", Logo: Powerball, color: "#C7102E" },
  { route: "megamillions", Logo: MegaMillions, color: "#0E4CA1" },
  { route: "cash4life", Logo: Cash4Life, color: "#2D7F67" },
  { route: "nylotto", Logo: NYLotto, color: "#D31245" },
  { route: "pick10", Logo: Pick10, color: "#E7CE5C" },
  { route: "take5_midday", Logo: Take5Midday, color: "#CA3092" },
  { route: "take5_evening", Logo: Take5Evening, color: "#CA3092" },
  { route: "win4_midday", Logo: Win4Midday, color: "#7E0C6E" },
  { route: "win4_evening", Logo: Win4Evening, color: "#7E0C6E" },
  { route: "numbers_midday", Logo: NumbersMidday, color: "#2E73B5" },
  { route: "numbers_evening", Logo: NumbersEvening, color: "#2E73B5" },
];

export default function AnalysisSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480); // Limite de 480px

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
                shadowColor: color,
                width: maxWidth,
              },
            ]}
          >
            <Logo width={54} height={26} />

            <View style={styles.centerIcon}>
              <MaterialIcons name="analytics" size={26} color={color} />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: color, borderColor: "#999" },
              ]}
              onPress={() =>
                router.push(
                  `/generator/states/new_york/${route}/analysis/index`
                )
              }
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
  container: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E4CA1",
    marginTop: 10,
    marginBottom: 12,
  },
  scrollContent: {
    paddingBottom: 100,
    alignItems: "center",
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  centerIcon: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
