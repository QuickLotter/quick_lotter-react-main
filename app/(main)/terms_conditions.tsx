import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";

const MAX_WIDTH = 768;

export default function TermsOfUseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* ⚠️ CLAUSE 1: Disclaimer */}
          <View style={[styles.card, styles.disclaimerCard]}>
            <Text style={styles.disclaimerTitle}>
              Important Disclaimer: No Lottery Betting or Processing
            </Text>
            <Text style={styles.disclaimerText}>
              <Text style={{ fontWeight: "bold" }}>
                WE DO NOT PROCESS OR FACILITATE ANY LOTTERY BETS OR GAMES OF
                CHANCE.
              </Text>
              {"\n\n"}
              We do not sell luck or promise any winnings. Our platform does not
              participate in, accept, or process any lottery games, tickets, or
              wagers from any U.S. state or jurisdiction. We only provide
              combinatorial analysis, educational resources, tools, and
              strategies to help users better understand the mathematical
              aspects and probabilities involved in various lottery games.
            </Text>
          </View>

          {/* 2. Introduction */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>2. Introduction</Text>
            <Text style={styles.text}>
              Welcome to Quick Lotter. By accessing or using our website, tools,
              and services, you agree to comply with and be bound by these Terms
              and Conditions ("Terms"). If you do not agree with these Terms,
              please do not use our services.
            </Text>
          </View>

          {/* 3. Use of Services */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>3. Use of Services</Text>
            <Text style={styles.text}>
              Quick Lotter provides tools for generating, filtering, and
              printing numbers for lottery wheels ("Services"). These tools are
              intended for entertainment and informational purposes only.
            </Text>
          </View>

          {/* 4. No Guarantee of Wins */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>4. No Guarantee of Wins</Text>
            <Text style={styles.text}>
              Quick Lotter makes no guarantee, warranty, or representation that
              using our Services will result in winning any lottery or other
              game of chance. All outcomes are purely based on chance, and users
              should be aware of the risks associated with gambling.
            </Text>
          </View>

          {/* 5. User Responsibilities */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>5. User Responsibilities</Text>
            <Text style={styles.text}>
              - <Text style={styles.bold}>Age Requirement:</Text> Users must be
              at least 18 years old to use our Services.{"\n"}-{" "}
              <Text style={styles.bold}>Compliance with Laws:</Text> Users are
              responsible for ensuring that their use of our Services complies
              with all applicable laws and regulations in their jurisdiction.
              {"\n"}- <Text style={styles.bold}>Personal Use:</Text> The
              Services are for personal and non-commercial use only. Users may
              not use the Services for any unlawful or unauthorized purposes.
            </Text>
          </View>

          {/* 6. Intellectual Property */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
            <Text style={styles.text}>
              All content, tools, and features provided on the Quick Lotter
              website are the property of Quick Lotter and are protected by
              intellectual property laws. Users may not reproduce, distribute,
              or otherwise exploit any part of our website without our express
              written consent.
            </Text>
          </View>

          {/* 7. Limitation of Liability */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
            <Text style={styles.text}>
              To the fullest extent permitted by law, Quick Lotter shall not be
              liable for any direct, indirect, incidental, or consequential
              damages arising out of or in connection with the use of our
              Services.
            </Text>
          </View>

          {/* 8. Disclaimers */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>8. Disclaimers</Text>
            <Text style={styles.text}>
              - <Text style={styles.bold}>No Professional Advice:</Text> The
              content on Quick Lotter does not constitute professional advice
              and should not be relied upon as such.{"\n"}-{" "}
              <Text style={styles.bold}>No Warranties:</Text> The Services are
              provided "as is" without warranties of any kind, either express or
              implied.
            </Text>
          </View>

          {/* 9. Changes to Terms */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
            <Text style={styles.text}>
              Quick Lotter reserves the right to update or modify these Terms at
              any time. Users are encouraged to review the Terms periodically.
              Continued use of our Services after any changes constitutes
              acceptance of the new Terms.
            </Text>
          </View>

          {/* 10. Contact Information */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>10. Contact Information</Text>
            <Text style={styles.text}>
              For any questions or concerns regarding these Terms, please
              contact us at:{"\n"}
              <Text style={styles.bold}>Email:</Text> contact@quicklotter.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  container: {
    alignItems: "center",
    paddingBottom: 40,
    minHeight: "100%",
  },
  inner: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  disclaimerCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
    backgroundColor: "#F7FAFF",
    marginBottom: 18,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  disclaimerText: {
    color: "#222",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0E4CA1",
    marginBottom: 6,
  },
  text: {
    color: "#444",
    fontSize: 15,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "700",
    color: "#0E4CA1",
  },
});
