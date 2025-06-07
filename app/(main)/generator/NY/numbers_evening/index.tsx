import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// ✅ Logo do Numbers Evening
import { default as NumbersLogo } from "@/assets/logos/ny/numbersevening.svg";

// ✅ Componentes reutilizáveis
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider"; // 🔵 corrigido
import PickedSummary from "@/components/generator/selector/pickedsummary";
import ButtonNav from "@/components/generator/layout/buttonnav"; // 🔵 corrigido
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import PickGamesGrid from "@/components/generator/selector/pickgamesgrid";

// ✅ Busca automática das cores e configs
import { getThemeFromUI } from "@/utils/getThemeFromUI";

export default function NumbersEveningGeneratorPage() {
  const [selected, setSelected] = useState<number[][]>([[], [], []]);
  const [smartEnabled, setSmartEnabled] = useState(false);

  // ✅ Carrega as cores dinâmicas
  const ui = getThemeFromUI("numbers_evening");

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
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={<NumbersLogo width={100} height={38} />}
          title="Generator"
          subtitle="New York Numbers - Evening"
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider state="ny" currentGame="numbers_evening" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          {/* ✅ Picked / Lines / Quick Pick */}
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

          {/* ✅ Grade de PickGamesGrid */}
          <PickGamesGrid
            title=""
            columns={3}
            selected={selected}
            onSelect={handleSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor} // ✅ cor do título dinâmica
            columnGap={20}
            ballGap={10}
            ballSize={42}
          />

          {/* ✅ Filtro inteligente */}
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

      {/* ✅ Botões fixos */}
      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={ui.accentColor}
        buttonTextColor={ui.buttonTextColor}
      />
    </View>
  );
}

// ✅ Função para calcular combinações (não precisa aqui pois é Pick 3 simples)

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
