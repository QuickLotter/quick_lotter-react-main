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

// Ajuste os imports para o estado desejado!
// Logos de AZ - ajuste os paths conforme sua estrutura!
import Powerball from "@/assets/logos/az/powerball.svg";
import MegaMillions from "@/assets/logos/az/megamillions.svg";
import Fantasy5 from "@/assets/logos/az/fantasy5.svg";
import ThePick from "@/assets/logos/az/thepick.svg";
import TripleTwist from "@/assets/logos/az/tripletwist.svg";
import Pick3 from "@/assets/logos/az/pick3.svg";

// Cada card = 1 jogo. Ajuste os caminhos conforme sua estrutura!
const GAMES = [
  { route: "powerball", Logo: Powerball, color: "#C7102E" },
  { route: "megamillions", Logo: MegaMillions, color: "#0E4CA1" },
  { route: "fantasy5", Logo: Fantasy5, color: "#4358A6" },
  { route: "thepick", Logo: ThePick, color: "#004785" },
  { route: "tripletwist", Logo: TripleTwist, color: "#A0CB3A" },
  { route: "pick3", Logo: Pick3, color: "#FDB825" },
];

export default function ResultsSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 32, 480);

  return (
    <View style={styles.container}>
      <HeaderLogoBack title="" />
      <Text style={styles.pageTitle}>Select Game Results</Text>
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

            {/* Troféu central */}
            <View style={styles.centerIcon}>
              <MaterialIcons name="emoji-events" size={26} color={color} />
            </View>

            {/* Botão de resultados */}
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
                // Ajuste o caminho conforme sua estrutura real!
                router.push(`/results/az/results/${route}`);
              }}
            >
              <Text style={styles.buttonText}>View Results</Text>
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
