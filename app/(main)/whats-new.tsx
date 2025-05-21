import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WhatsNewScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Espaço seguro abaixo do header */}
        <View style={{ height: insets.top + 20 }} />

        <ResponsiveContainer>
          <Text style={styles.title}>🆕 What’s New</Text>

          <View style={styles.item}>
            <Text style={styles.subtitle}>🔄 Interface Update</Text>
            <Text style={styles.text}>
              Redesigned layout for better usability and modern experience.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.subtitle}>📈 New Game Analysis</Text>
            <Text style={styles.text}>
              Now you can see complete statistics by state and by game type.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.subtitle}>🖨️ Direct Printing</Text>
            <Text style={styles.text}>
              Support for thermal printers to print official lottery cards.
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.subtitle}>🌐 Multilingual</Text>
            <Text style={styles.text}>
              The app is now available in English, Spanish, Portuguese, French,
              and Italian.
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
    backgroundColor: "#ECF1FF",
  },
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: "#ECF1FF",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#05549E",
    marginBottom: 24,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 10, // 10px de distância entre os cards
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#05549E",
  },
  text: {
    fontSize: 15,
    color: "#555",
  },
});
