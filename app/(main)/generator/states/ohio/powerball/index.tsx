import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// ✅ Logo do Powerball
import { default as PowerballLogo } from "@/assets/images/ny_game_logo/powerball.svg";

// ✅ Componentes reutilizáveis
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider"; // 🔵 corrigido
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import ButtonNav from "@/components/generator/layout/buttonnav"; // 🔵 corrigido
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";

// ✅ Cores do jogo dinâmicas
import { getThemeFromUI } from "@/utils/getThemeFromUI";

export default function PowerballGeneratorPage() {
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);

  // ✅ Cores e configurações do Powerball
  const ui = getThemeFromUI("powerball");

  const handleMainSelect = (num: number) => {
    setMainNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleExtraSelect = (num: number) => {
    setExtraNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleClear = () => {
    setMainNumbers([]);
    setExtraNumbers([]);
  };

  const handleGenerate = () => {
    console.log("Generate based on:", mainNumbers, extraNumbers);
  };

  const handleSmartFilter = () => {
    console.log("AI Smart Filter activated");
  };

  const handleQuickPick = () => {
    const remainingMain = Array.from(
      { length: ui.totalMainBalls },
      (_, i) => i + 1
    ).filter((n) => !mainNumbers.includes(n));
    const randomMain: number[] = [];
    while (randomMain.length < 5 && remainingMain.length > 0) {
      const rand = Math.floor(Math.random() * remainingMain.length);
      randomMain.push(remainingMain[rand]);
      remainingMain.splice(rand, 1);
    }

    const remainingExtra = Array.from(
      { length: ui.totalExtraBalls },
      (_, i) => i + 1
    ).filter((n) => !extraNumbers.includes(n));
    const randomExtra =
      remainingExtra.length > 0
        ? [remainingExtra[Math.floor(Math.random() * remainingExtra.length)]]
        : [];

    setMainNumbers((prev) => [...prev, ...randomMain]);
    setExtraNumbers((prev) => [...prev, ...randomExtra]);
  };

  const lines =
    mainNumbers.length >= 5 && extraNumbers.length >= 1
      ? Math.floor(combinations(mainNumbers.length, 5) * extraNumbers.length)
      : 0;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={<PowerballLogo width={100} height={38} />}
          title="Generator"
          subtitle="New York Powerball"
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider state="ny" currentGame="powerball" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={mainNumbers.length + extraNumbers.length}
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

          <NumberGrid
            title="Pick 5 Main Numbers"
            total={ui.totalMainBalls}
            selected={mainNumbers}
            onSelect={handleMainSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor}
          />

          <NumberGrid
            title="Pick Powerball"
            total={ui.totalExtraBalls}
            selected={extraNumbers}
            onSelect={handleExtraSelect}
            themeColor={ui.extraBallColor}
            textColor={ui.extraTextColor}
            titleColor={ui.extraTitleColor}
          />

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

      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={ui.accentColor}
        buttonTextColor={ui.buttonTextColor}
      />
    </View>
  );
}

function combinations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1));
  return factorial(n) / (factorial(r) * factorial(n - r));
}

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
