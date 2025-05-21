import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SelectorSliderOptions from "@/components/generator/smart_filter/filterssliderbutton";
import GameHeader from "@/components/generator/header/gameheader";
import BottomNavAnalysis from "@/components/generator/smart_filter/bottomnavanalysis";
import FilterAnalysisBox from "@/components/generator/smart_filter/overviewtable";

// Asset do logo SVG
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";

export default function AnalysisMegaMillions() {
  return (
    <View style={styles.wrapper}>
      {/* ✅ Header com logo do jogo */}
      <GameHeader
        logo={<MegamillionsLogo width={100} height={40} />}
        title="Overview"
        subtitle="New York Mega Millions"
        headerColor="#0E4CA1"
      />

      {/* ✅ Filtros SVG no topo */}
      <View style={styles.sliderContainer}>
        <SelectorSliderOptions />
      </View>

      {/* ✅ Conteúdo scrollável do overview para lateral direita esquerda e e pra cima e pra baixo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FilterAnalysisBox />
      </ScrollView>

      {/* ✅ BottomNav fixo com as frequências */}
      <BottomNavAnalysis />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative", // Necessário para que o bottom fixo funcione corretamente
    backgroundColor: "#ECF1FF",
  },
  sliderContainer: {
    paddingTop: 1,
    paddingBottom: 0,
    backgroundColor: "#ECF1FF",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 70, // espaço para não ficar escondido atrás do bottom fixo
  },
});
