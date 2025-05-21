import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// ✅ Importa o logo do Take 5 midday
import { default as Take5Logo } from "@/assets/images/ny_game_logo/take5_midday.svg";

// ✅ Componentes reutilizáveis
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider"; // 🔵 corrigido
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import ButtonNav from "@/components/generator/layout/buttonnav"; // 🔵 corrigido
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";

// ✅ Importa o tema dinâmico
import { getThemeFromUI } from "@/utils/getThemeFromUI";

export default function Take5middayGeneratorPage() {
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);

  // ✅ Carrega o tema automático para o jogo Take 5
  const ui = getThemeFromUI("take5_midday");

  const handleMainSelect = (num: number) => {
    setMainNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleClear = () => {
    setMainNumbers([]);
  };

  const handleGenerate = () => {
    console.log("Generate based on:", mainNumbers);
  };

  const handleSmartFilter = () => {
    console.log("Smart Filter activated");
  };

  const handleQuickPick = () => {
    const remaining = Array.from(
      { length: ui.totalMainBalls },
      (_, i) => i + 1
    ).filter((n) => !mainNumbers.includes(n));

    const picks: number[] = [];
    while (picks.length < 5 && remaining.length > 0) {
      const rand = Math.floor(Math.random() * remaining.length);
      picks.push(remaining[rand]);
      remaining.splice(rand, 1);
    }
    setMainNumbers((prev) => [...prev, ...picks]);
  };

  // ✅ Calcula o número de linhas
  const lines =
    mainNumbers.length >= 5
      ? Math.round(combinations(mainNumbers.length, 5))
      : 0;

  return (
    <View style={styles.wrapper}>
      {/* ✅ Topo com logo e slider */}
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={<Take5Logo width={100} height={38} />}
          title="Generator"
          subtitle="New York Take 5 - Midday"
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider state="ny" currentGame="take5_midday" />
        </View>
      </View>

      {/* ✅ Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          {/* ✅ Picked Summary */}
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={mainNumbers.length}
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

          {/* ✅ Grade de números */}
          <NumberGrid
            title=""
            total={ui.totalMainBalls}
            selected={mainNumbers}
            onSelect={handleMainSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor}
          />

          {/* ✅ Smart Filter com IA */}
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

      {/* ✅ Rodapé com botões */}
      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={ui.accentColor}
        buttonTextColor={ui.buttonTextColor}
      />
    </View>
  );
}

// ✅ Função combinatória C(n, r)
function combinations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1));
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// ✅ Estilos visuais globais
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
