//index da pagina do seletor de numeros e de jogos antes gerar

import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

// Logos e temas
import { default as MegamillionsLogo } from "@/assets/logos/NY/megamillions.svg";
import { getThemeFromUI } from "@/utils/getThemeFromUI";

// Componentes visuais
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider"; // 🔵 corrigido
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import ButtonNav from "@/components/generator/layout/buttonnav"; // 🔵 corrigido

// Modais
import SmartFilterPromptModal from "@/components/generator/modals/smartfilterpromptmodal"; // 🔵 corrigido
import FiltersFormModal from "@/components/generator/modals/filters-form-modal"; // 🔵 corrigido

// API
import { generateWithFilters } from "@/services/generatorApi";

export default function MegamillionsGeneratorPage() {
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [customFilters, setCustomFilters] =
    useState<Record<string, number[]>>(null);

  const ui = getThemeFromUI("megamillions");
  const router = useRouter();

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
    setCustomFilters(null);
  };

  const handleGenerate = () => {
    setShowPromptModal(true);
  };

  const handleApplyFilters = () => {
    setShowPromptModal(false);
    setShowFiltersForm(true);
  };

  const handleSkipFilters = async () => {
    setShowPromptModal(false);
    try {
      const result = await generateWithFilters(
        "megamillions",
        mainNumbers,
        extraNumbers,
        null
      );
      console.log("⚡ Jogos gerados sem filtros:", result);

      router.push({
        pathname: "/generator/ny/megamillions/results",
        params: { data: encodeURIComponent(JSON.stringify(result)) },
      });
    } catch (err) {
      console.error("❌ Erro ao gerar sem filtros:", err);
    }
  };

  const handleFiltersSubmit = async (filters: Record<string, number[]>) => {
    setCustomFilters(filters);
    setShowFiltersForm(false);

    try {
      const result = await generateWithFilters(
        "megamillions",
        mainNumbers,
        extraNumbers,
        filters
      );
      console.log("✅ Jogos gerados com filtros aplicados:", result);

      router.push({
        pathname: "/generator/ny/megamillions/results",
        params: { data: encodeURIComponent(JSON.stringify(result)) },
      });
    } catch (err) {
      console.error("❌ Erro ao gerar com filtros:", err);
    }
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
      {/* Header */}
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={38} />}
          title="Generator"
          subtitle="New York Mega Millions"
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider state="ny" currentGame="megamillions" />
        </View>
      </View>

      {/* Body */}
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
            title="Pick Your Numbers"
            total={ui.totalMainBalls}
            selected={mainNumbers}
            onSelect={handleMainSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor}
          />

          <NumberGrid
            title="Pick Mega Ball"
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
              onToggle={() => setSmartEnabled((prev) => !prev)}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={ui.accentColor}
        buttonTextColor={ui.buttonTextColor}
      />

      {/* Modal: Smart Filter Prompt */}
      <SmartFilterPromptModal
        visible={showPromptModal}
        onAddFilters={handleApplyFilters}
        onSkip={handleSkipFilters}
      />

      {/* Modal: Formulário de Filtros */}
      <FiltersFormModal
        visible={showFiltersForm}
        onClose={() => setShowFiltersForm(false)}
        onApply={handleFiltersSubmit}
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
  wrapper: { flex: 1, backgroundColor: "#ECF1FF" },
  header: { paddingBottom: 0 },
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
