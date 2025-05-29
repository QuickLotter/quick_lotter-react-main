// ✅ Path: app/(main)/generator/ny/numbers_midday.tsx

import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// ✅ Importa o logo Numbers Midday
import { default as NumbersLogo } from "@/assets/images/ny_game_logo/numbers_midday.svg";

// ✅ Componentes reutilizáveis
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider"; // 🔵 corrigido
import PickedSummary from "@/components/generator/selector/pickedsummary";
import ButtonNav from "@/components/generator/layout/buttonnav"; // 🔵 corrigido
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import PickGamesGrid from "@/components/generator/selector/pickgamesgrid";

// ✅ Busca automática das cores
import { getThemeFromUI } from "@/utils/getThemeFromUI";

export default function NumbersMiddayGeneratorPage() {
  const [selected, setSelected] = useState<number[][]>([[], [], []]);
  const [smartEnabled, setSmartEnabled] = useState(false);

  // ✅ Carrega o tema dinâmico
  const ui = getThemeFromUI("numbers_midday");

  const handleSelect = (col: number, num: number) => {
    setSelected((prev) =>
      prev.map((column, index) =>
        index === col
          ? column.includes(num)
            ? column.filter((n) => n !== num)
            : [...column, num]
          : column
      )
    );
  };

  const handleClear = () => {
    setSelected([[], [], []]);
  };

  const handleGenerate = () => {
    console.log("Generate based on:", selected);
  };

  const handleSmartFilter = () => {
    console.log("Smart Filter activated");
  };

  const handleQuickPick = () => {
    const newSelection = selected.map((col) => {
      let next;
      let tries = 0;
      do {
        next = Math.floor(Math.random() * 10);
        tries++;
      } while (col.includes(next) && tries < 10);
      return col.includes(next) ? col : [...col, next];
    });

    setSelected(newSelection);
  };

  const totalPicked = selected.flat().length;
  const lines = selected.every((col) => col.length > 0)
    ? selected.reduce((acc, col) => acc * col.length, 1)
    : 0;

  return (
    <View style={styles.wrapper}>
      {/* ✅ Topo com logo e slider */}
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={<NumbersLogo width={100} height={38} />}
          title="Generator"
          subtitle="New York Numbers - Midday"
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider state="ny" currentGame="numbers_midday" />
        </View>
      </View>

      {/* ✅ Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          {/* ✅ Picked Summary */}
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={totalPicked}
              lines={lines}
              onQuickPick={handleQuickPick}
              textColor={ui.pickedLabelTextColor}
              linesTextColor={ui.linesLabelTextColor}
              valueTextColor={ui.pickedValueColor}
              linesValueColor={ui.linesValueColor}
              accentColor={ui.accentColor}
              buttonTextColor={ui.quickPickButtonColor}
              iconColor={ui.quickPickIconColor}
            />
          </View>

          {/* ✅ Grade PickGamesGrid */}
          <PickGamesGrid
            title=""
            columns={3}
            selected={selected}
            onSelect={handleSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor}
            columnGap={20}
            ballGap={10}
            ballSize={42}
          />

          {/* ✅ Smart Filter */}
          <View style={styles.smartWrapper}>
            <SmartFilterToggle
              enabled={smartEnabled}
              onToggle={() => {
                setSmartEnabled((prev) => !prev);
                handleSmartFilter();
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* ✅ Botões Inferiores */}
      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={ui.accentColor}
        buttonTextColor={ui.buttonTextColor}
      />
    </View>
  );
}

// ✅ Estilos globais
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  header: {
    paddingBottom: 0,
  },
  sliderBar: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 1,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  content: {
    paddingBottom: 20,
    alignItems: "center",
  },
  centered: {
    width: "100%",
    maxWidth: 768,
    paddingHorizontal: 12,
  },
  summaryWrapper: {
    marginTop: -12,
  },
  smartWrapper: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 8,
  },
});
