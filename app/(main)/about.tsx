import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top - 60 }} />

        <ResponsiveContainer>
          {/* LOGO/EMOJI */}
          <View style={styles.emojiBox}>
            <Text style={styles.logoText}></Text>
          </View>
          {/* Título central */}
          <Text style={styles.title}>About Quick Lotter</Text>

          {/* PARTE 1 - Intro */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What is Quick Lotter?</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.boldText}>Quick Lotter</Text> is an
              independent app that helps lottery players{" "}
              <Text style={styles.boldText}>generate, analyze, and print</Text>{" "}
              numbers for games like Powerball, Mega Millions, NY Lotto, and
              more.
              {"\n\n"}
              Our platform offers a{" "}
              <Text style={styles.blueText}>smart, easy and modern</Text>{" "}
              experience for everyone who wants to play with strategy and
              responsibility!
            </Text>
          </View>

          {/* PARTE 2 - How It Works */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>How Does It Work?</Text>
            <Text style={styles.paragraph}>
              Quick Lotter provides advanced mathematical strategies, historical
              analysis, and software tools to help you maximize your odds.
              Create combinations, filter by statistics, print directly on
              official slips, and manage your lottery pools — all in one app.
            </Text>
          </View>

          {/* PARTE 3 - Disclaimer */}
          <View style={[styles.card, styles.disclaimerCard]}>
            <Text style={styles.sectionTitle}>Important Disclaimer</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.boldText}>
                Quick Lotter does NOT process or register bets, does NOT sell
                lottery tickets or participate in any official lottery process,
                and is NOT affiliated with any lottery commission or government.
              </Text>
              {"\n\n"}
              All solutions are mathematical/statistical tools to help you play
              better — but we do{" "}
              <Text style={styles.boldText}>NOT guarantee any winnings</Text>.
              Lottery is always a game of chance!
            </Text>
          </View>

          {/* PARTE 4 - Features (cards bonitos com ícones) */}
          <Text
            style={[styles.sectionTitle, { marginBottom: 12, marginTop: 12 }]}
          >
            Main Tools & Features
          </Text>
          <View style={styles.featureBlock}>
            <MaterialCommunityIcons
              name="magic-staff"
              size={28}
              color="#007AFF"
              style={styles.featureIcon}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Automatic Generator</Text>
              <Text style={styles.featureDesc}>
                Instantly create combinations for any game. Supports Powerball,
                Mega Millions, NY games, and more.
              </Text>
            </View>
          </View>
          <View style={styles.featureBlock}>
            <Ionicons
              name="stats-chart"
              size={26}
              color="#34C759"
              style={styles.featureIcon}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Advanced Analysis</Text>
              <Text style={styles.featureDesc}>
                Analyze hot/cold numbers, see historical trends, and filter by
                dozens of criteria to pick your best numbers.
              </Text>
            </View>
          </View>
          <View style={styles.featureBlock}>
            <FontAwesome5
              name="filter"
              size={24}
              color="#FF9500"
              style={styles.featureIcon}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Filters</Text>
              <Text style={styles.featureDesc}>
                Filter by sum, odds, repeats, high/low, primes, adjacent, and
                more. Zero manual work.
              </Text>
            </View>
          </View>
          <View style={styles.featureBlock}>
            <MaterialCommunityIcons
              name="printer"
              size={26}
              color="#AF52DE"
              style={styles.featureIcon}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Direct Printing</Text>
              <Text style={styles.featureDesc}>
                Print formatted lottery slips on thermal or inkjet printers.
                Compatible with official tickets.
              </Text>
            </View>
          </View>
          <View style={styles.featureBlock}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color="#32D74B"
              style={styles.featureIcon}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Safe & Private</Text>
              <Text style={styles.featureDesc}>
                Your numbers and data are never shared. No tracking. Play with
                peace of mind.
              </Text>
            </View>
          </View>

          {/* PARTE 5 - Comunidade/Encerramento */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Transparency & Community</Text>
            <Text style={styles.paragraph}>
              Quick Lotter is{" "}
              <Text style={styles.boldText}>completely independent</Text> and
              not endorsed or sponsored by any lottery or betting company.
              Everything is designed for{" "}
              <Text style={styles.blueText}>
                educational and entertainment purposes only
              </Text>
              .{"\n"}
              <Text>
                Join our community of responsible players and take your lottery
                game to the next level!
              </Text>
              {"\n\n"}
              <Text style={styles.boldText}>
                We wish you luck, fun, and prosperity! 🎉
              </Text>
            </Text>
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  scrollContent: {
    paddingBottom: 60,
    backgroundColor: "#F4F6FA",
  },
  emojiBox: {
    alignItems: "center",
    marginTop: 2,
    marginBottom: 0,
  },
  logoText: {
    fontSize: 42,
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#05549E",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
    letterSpacing: -0.6,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#007AFF",
    fontSize: 17.2,
    marginBottom: 7,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  paragraph: {
    fontSize: 15.7,
    color: "#444950",
    marginBottom: 6,
    lineHeight: 23,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  boldText: {
    fontWeight: "700",
    color: "#1A2333",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  blueText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  disclaimerCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
    backgroundColor: "#F2F2F7",
    marginBottom: 20,
  },
  featureBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 14,
    marginBottom: 13,
    shadowColor: "#1A237E11",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: Platform.OS === "android" ? 1 : 0,
    gap: 12,
  },
  featureIcon: {
    width: 36,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16.2,
    color: "#222",
    fontWeight: "700",
    marginBottom: 2,
    letterSpacing: -0.1,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  featureDesc: {
    fontSize: 14.1,
    color: "#5B5E6B",
    fontWeight: "400",
    lineHeight: 19.5,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
