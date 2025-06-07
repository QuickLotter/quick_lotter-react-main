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
import { FontAwesome5 } from "@expo/vector-icons";

// Logos
import Powerball from "@/assets/logos/ny/powerball.svg";
import MegaMillions from "@/assets/logos/ny/megamillions.svg";
import Cash4Life from "@/assets/logos/ny/cash4life.svg";
import NYLotto from "@/assets/logos/ny/nylotto.svg";
import Pick10 from "@/assets/logos/ny/pick10.svg";
import Take5Midday from "@/assets/logos/ny/take5midday.svg";
import Take5Evening from "@/assets/logos/ny/take5evening.svg";
import Win4Midday from "@/assets/logos/ny/win4midday.svg";
import Win4Evening from "@/assets/logos/ny/win4evening.svg";
import NumbersMidday from "@/assets/logos/ny/numbersmidday.svg";
import NumbersEvening from "@/assets/logos/ny/numbersevening.svg";

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

export default function CheckerSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480);

  return (
    <View style={styles.container}>
      <HeaderLogoBack title="" />
      <Text style={styles.pageTitle}>Select Game to Check Tickets</Text>
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

            {/* Ícone check central */}
            <View style={styles.centerIcon}>
              <FontAwesome5 name="check" size={24} color={color} />
            </View>

            {/* Botão iOS */}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: color, shadowColor: color + "33" },
              ]}
              activeOpacity={0.82}
              onPress={() =>
                router.push(`/generator/ny/${route}/checker/index`)
              }
            >
              <Text style={styles.buttonText}>Check Numbers</Text>
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
    backgroundColor: "#F6F6F8",
  },
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
    paddingBottom: 90,
    alignItems: "center",
    gap: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 18,
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
    shadowOpacity: 0.08,
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
