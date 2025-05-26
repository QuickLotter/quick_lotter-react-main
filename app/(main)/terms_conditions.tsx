import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";

const MAX_WIDTH = 520;

export default function TermsOfUseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 18 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* iOS-style Title */}
          <Text style={styles.title}>Terms of Use</Text>

          {/* 1. Disclaimer – Highlighted */}
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Disclaimer</Text>
            <Text style={styles.alertText}>
              <Text style={{ fontWeight: "bold", color: "#007AFF" }}>
                We do not process or facilitate any lottery bets or games of
                chance.
              </Text>
              {"\n\n"}
              Quick Lotter does not sell luck or promise any winnings. Our
              platform does not participate in, accept, or process any lottery
              games, tickets, or wagers. We provide only educational tools and
              combinatorial analysis for entertainment and learning purposes.
            </Text>
          </View>

          {/* 2. Sections (styled like iOS settings/legal) */}
          <Section
            number="2."
            title="Introduction"
            text={
              "By accessing or using Quick Lotter, you agree to these Terms. Please do not use our services if you do not agree."
            }
          />
          <Section
            number="3."
            title="Use of Services"
            text={
              "Quick Lotter offers tools for generating, filtering, and printing lottery numbers. These are for entertainment and informational purposes only."
            }
          />
          <Section
            number="4."
            title="No Guarantee of Wins"
            text={
              "We make no guarantees, warranties, or representations regarding winnings. All lottery outcomes are based on chance. Play responsibly."
            }
          />
          <Section
            number="5."
            title="User Responsibilities"
            text={
              "• Age: You must be at least 18 years old.\n" +
              "• Compliance: You are responsible for following all local laws.\n" +
              "• Personal Use: Tools are for personal, non-commercial use only."
            }
          />
          <Section
            number="6."
            title="Intellectual Property"
            text={
              "All content, tools, and features on Quick Lotter are our property. You may not reproduce or exploit them without written permission."
            }
          />
          <Section
            number="7."
            title="Limitation of Liability"
            text={
              "Quick Lotter is not liable for any damages arising from use of our services."
            }
          />
          <Section
            number="8."
            title="Disclaimers"
            text={
              "• No Professional Advice: Information provided is for reference only.\n" +
              "• No Warranties: All services are provided 'as is', without warranty."
            }
          />
          <Section
            number="9."
            title="Changes to Terms"
            text={
              "We may update these Terms at any time. Continued use means you accept the current version."
            }
          />
          <Section
            number="10."
            title="Contact"
            text={
              "Questions or concerns? Contact us at:\ncontact@quicklotter.com"
            }
          />

          <Text style={styles.lastUpdated}>Last updated: May 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// iOS Section Component
function Section({ number, title, text }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        <Text style={styles.sectionNumber}>{number} </Text>
        {title}
      </Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  container: {
    alignItems: "center",
    paddingBottom: 32,
    minHeight: "100%",
  },
  inner: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
    paddingHorizontal: 18,
  },
  title: {
    ...Typography.heading,
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
    color: "#0E4CA1",
    fontFamily: Typography.fontFamily,
    letterSpacing: -0.5,
  },
  alertBox: {
    backgroundColor: "#EAF3FF",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    borderRadius: 13,
    padding: 17,
    marginBottom: 18,
    shadowColor: "#007AFF",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  alertTitle: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 6,
    fontFamily: Typography.fontFamily,
  },
  alertText: {
    color: "#222",
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Typography.fontFamily,
    fontWeight: "400",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 17,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sectionTitle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Typography.fontFamily,
    marginBottom: 6,
  },
  sectionNumber: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 15,
    fontFamily: Typography.fontFamily,
  },
  sectionText: {
    color: "#444",
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Typography.fontFamily,
    fontWeight: "400",
  },
  lastUpdated: {
    color: "#B0B7C3",
    fontSize: 13,
    textAlign: "center",
    marginTop: 30,
    fontFamily: Typography.fontFamily,
    marginBottom: 12,
  },
});
