import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack"; // Altere o caminho se necessário

// Wrapper para responsividade
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.responsiveContainer}>{children}</View>
);

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#ECF1FF" }}>
      <HeaderLogoBack title="" showMenu={true} showStateSelector={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>ℹ️ About Quick Lotter</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.sectionTitle}>What is Quick Lotter?</Text>
            {"\n"}
            Quick Lotter is an innovative and independent app designed to help
            lottery players generate, analyze, and print game tickets quickly
            and strategically. Our platform offers a smart, easy, and modern
            experience for anyone looking to improve their chances in games like
            Powerball, Mega Millions, and many others worldwide.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.sectionTitle}>How Does It Work?</Text>
            {"\n"}
            Quick Lotter provides advanced mathematical strategies, statistical
            studies, and software tools to maximize your odds in various
            lotteries. You can create complex combinations, perform historical
            analysis, print directly on official bet slips, and manage your
            lottery pools — all in one place and accessible from any device.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.sectionTitle}>Important Disclaimer</Text>
            {"\n"}
            <Text style={{ fontWeight: "bold" }}>
              Quick Lotter does NOT sell lottery tickets, does NOT process or
              register any lottery, sports betting, or gambling transactions,
              and is NOT affiliated with any state lottery commission or similar
              entity in any country.
            </Text>
            {"\n"}
            All solutions offered are purely mathematical strategies,
            statistical studies, and software programs to help our users
            increase their chances of winning. We do NOT guarantee any winnings,
            but we do provide tools to help maximize your odds of hitting a
            prize.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.sectionTitle}>Transparency and Integrity</Text>
            {"\n"}
            Our app is completely independent and is not endorsed or sponsored
            by any lottery, gaming, or betting company. All features are meant
            for educational and entertainment purposes only.{"\n"}
            By using Quick Lotter, you acknowledge that lottery games are games
            of chance and that all risks of participation are your own.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.sectionTitle}>Join Our Community</Text>
            {"\n"}
            We invite you to become part of this movement of smart, responsible,
            and strategic players. Together, we believe in responsible gaming
            and the power of knowledge.{"\n"}
            <Text style={{ fontWeight: "bold" }}>
              We wish you Success and Prosperity!
            </Text>
          </Text>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#ECF1FF",
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 24,
    paddingBottom: 40,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#ccc",
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#034C9F",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#007EFF",
    fontSize: 16,
  },
  paragraph: {
    fontSize: 15,
    color: "#222",
    marginBottom: 18,
    lineHeight: 24,
    textAlign: "justify",
  },
});
