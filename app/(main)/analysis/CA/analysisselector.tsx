// app/(main)/analysis/CA/AnalysisSelector.tsx

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

// Logos de CA - ajuste os paths conforme sua estrutura!
import Daily3Midday from "@/assets/logos/CA/daily3midday.svg";
import Daily3Evening from "@/assets/logos/CA/daily3evening.svg";
import Daily4 from "@/assets/logos/CA/daily4.svg";
import Fantasy5 from "@/assets/logos/CA/fantasy5.svg";
import DailyDerby from "@/assets/logos/CA/dailyderby.svg";
import SuperLotto from "@/assets/logos/CA/superlotto.svg";
import MegaMillions from "@/assets/logos/CA/megamillions.svg";
import Powerball from "@/assets/logos/CA/powerball.svg";

const GAMES = [
  { route: "megamillions", Logo: MegaMillions, color: "#0E4CA1" },
  { route: "powerball", Logo: Powerball, color: "#D0021B" },
  { route: "superlotto", Logo: SuperLotto, color: "#01BCF1" },
  { route: "fantasy5", Logo: Fantasy5, color: "#01BCF1" },
  { route: "daily4", Logo: Daily4, color: "#01BCF1" },
  { route: "daily3midday", Logo: Daily3Midday, color: "#01BCF1" },
  { route: "daily3evening", Logo: Daily3Evening, color: "#01BCF1" },
  { route: "dailyderby", Logo: DailyDerby, color: "#01BCF1" },
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
                    "/generator/states/california/megamillions/analysis/sum"
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
