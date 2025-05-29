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

// ================= LOGOS DE NY =================
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

// ================= MOCK LOGOS OUTROS ESTADOS =================
const OhPowerball = () => (
  <View
    style={{
      width: 56,
      height: 28,
      backgroundColor: "#eee",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#C7102E", fontWeight: "bold", fontSize: 12 }}>
      OH PB
    </Text>
  </View>
);
const CaMegaMillions = () => (
  <View
    style={{
      width: 56,
      height: 28,
      backgroundColor: "#eef",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#0E4CA1", fontWeight: "bold", fontSize: 12 }}>
      CA MM
    </Text>
  </View>
);

// =============== ARRAY DE JOGOS POR ESTADO ===============
const GAMES = [
  // NEW YORK
  {
    state: "new_york",
    games: [
      {
        route: "powerball",
        Logo: Powerball,
        color: "#C7102E",
        label: "Powerball",
      },
      {
        route: "megamillions",
        Logo: MegaMillions,
        color: "#0E4CA1",
        label: "Mega Millions",
      },
      {
        route: "cash4life",
        Logo: Cash4Life,
        color: "#2D7F67",
        label: "Cash4Life",
      },
      { route: "nylotto", Logo: NYLotto, color: "#D31245", label: "NY Lotto" },
      { route: "pick10", Logo: Pick10, color: "#E7CE5C", label: "Pick 10" },
      {
        route: "take5_midday",
        Logo: Take5Midday,
        color: "#CA3092",
        label: "Take 5 Midday",
      },
      {
        route: "take5_evening",
        Logo: Take5Evening,
        color: "#CA3092",
        label: "Take 5 Evening",
      },
      {
        route: "win4_midday",
        Logo: Win4Midday,
        color: "#7E0C6E",
        label: "Win 4 Midday",
      },
      {
        route: "win4_evening",
        Logo: Win4Evening,
        color: "#7E0C6E",
        label: "Win 4 Evening",
      },
      {
        route: "numbers_midday",
        Logo: NumbersMidday,
        color: "#2E73B5",
        label: "Numbers Midday",
      },
      {
        route: "numbers_evening",
        Logo: NumbersEvening,
        color: "#2E73B5",
        label: "Numbers Evening",
      },
    ],
  },
  // MOCK OHIO
  {
    state: "ohio",
    games: [
      {
        route: "powerball",
        Logo: OhPowerball,
        color: "#C7102E",
        label: "Powerball (OH)",
      },
      {
        route: "megamillions",
        Logo: CaMegaMillions,
        color: "#0E4CA1",
        label: "Mega Millions (OH)",
      },
    ],
  },
  // MOCK CALIFORNIA
  {
    state: "california",
    games: [
      {
        route: "megamillions",
        Logo: CaMegaMillions,
        color: "#0E4CA1",
        label: "Mega Millions (CA)",
      },
    ],
  },
];

// =============== ESCOLHA DO ESTADO (fixado NY para teste) ===============
const SELECTED_STATE = "new_york"; // Substitua por valor dinâmico no futuro

export default function OverviewSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480);

  // Procura os jogos do estado selecionado
  const currentGames =
    GAMES.find((s) => s.state === SELECTED_STATE)?.games || [];

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
        {currentGames.map(({ route, Logo, color, label }) => (
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
            <Logo />
            {/* Ícone central */}
            <View style={styles.centerIcon}>
              <MaterialIcons name="remove-red-eye" size={26} color={color} />
            </View>
            {/* Botão iOS-like */}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: color, shadowColor: color + "33" },
              ]}
              activeOpacity={0.82}
              onPress={() => {
                // Regras de navegação por jogo NY
                if (route === "megamillions") {
                  router.push(
                    "/generator/states/new_york/megamillions/overview/drawingsince"
                  );
                } else if (route === "powerball") {
                  router.push(
                    "/generator/states/new_york/powerball/overview/drawingsince"
                  );
                } else {
                  router.push(
                    `/generator/states/new_york/${route}/overview/index`
                  );
                }
              }}
            >
              <Text style={styles.buttonText}>View Overview</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* MOCK: outros estados */}
        {SELECTED_STATE !== "new_york" && (
          <View style={{ padding: 24 }}>
            <Text style={{ textAlign: "center", color: "#888" }}>
              More games coming soon for other states!
            </Text>
          </View>
        )}
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
