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

// Logos de NY
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

// Todos os jogos de New York
const GAMES = [
  { route: "powerball", Logo: Powerball, color: "#C7102E", label: "Powerball" },
  {
    route: "megamillions",
    Logo: MegaMillions,
    color: "#0E4CA1",
    label: "Mega Millions",
  },
  { route: "cash4life", Logo: Cash4Life, color: "#2D7F67", label: "Cash4Life" },
  { route: "nylotto", Logo: NYLotto, color: "#D31245", label: "NY Lotto" },
  { route: "pick10", Logo: Pick10, color: "#E7CE5C", label: "Pick 10" },
  {
    route: "take5midday",
    Logo: Take5Midday,
    color: "#CA3092",
    label: "Take 5 Midday",
  },
  {
    route: "take5evening",
    Logo: Take5Evening,
    color: "#CA3092",
    label: "Take 5 Evening",
  },
  {
    route: "win4midday",
    Logo: Win4Midday,
    color: "#7E0C6E",
    label: "Win 4 Midday",
  },
  {
    route: "win4evening",
    Logo: Win4Evening,
    color: "#7E0C6E",
    label: "Win 4 Evening",
  },
  {
    route: "numbersmidday",
    Logo: NumbersMidday,
    color: "#2E73B5",
    label: "Numbers Midday",
  },
  {
    route: "numbersevening",
    Logo: NumbersEvening,
    color: "#2E73B5",
    label: "Numbers Evening",
  },
];

export default function OverviewSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480);

  // Lógica de navegação específica por jogo
  const handleNavigate = (route: string) => {
    switch (route) {
      case "megamillions":
        router.push("/overview/NY/megamillions/drawingsince");
        break;
      case "powerball":
        router.push("/overview/NY/powerball/drawingsince");
        break;
      case "cash4life":
        router.push("/overview/NY/cash4life/drawingsince");
        break;
      case "nylotto":
        router.push("/overview/NY/nylotto/drawingsince");
        break;
      case "pick10":
        router.push("/overview/NY/pick10/drawingsince");
        break;
      case "take5midday":
        router.push("/overview/NY/take5midday/drawingsince");
        break;
      case "take5evening":
        router.push("/overview/NY/take5evening/drawingsince");
        break;
      case "win4midday":
        router.push("/overview/NY/win4midday/drawingsince");
        break;
      case "win4evening":
        router.push("/overview/NY/win4evening/drawingsince");
        break;
      case "numbersmidday":
        router.push("/overview/NY/numbersmidday/drawingsince");
        break;
      case "numbersevening":
        router.push("/overview/NY/numbersevening/drawingsince");
        break;
      default:
        // Se não encontrar, vai para overview geral (pode customizar!)
        router.push("/overview");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderLogoBack
        title=""
        showMenu={false}
        showStateSelector
        backTo="/overview"
      />
      <Text style={styles.pageTitle}>Select Game to View Overview</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {GAMES.map(({ route, Logo, color, label }) => (
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

            {/* Ícone central */}
            <View style={styles.centerIcon}>
              <MaterialIcons name="remove-red-eye" size={26} color={color} />
            </View>

            {/* Botão */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: color,
                  shadowColor: color + "33",
                },
              ]}
              activeOpacity={0.82}
              onPress={() => handleNavigate(route)}
            >
              <Text style={styles.buttonText}>View Overview</Text>
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
    maxWidth: 480,
    width: "100%",
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
