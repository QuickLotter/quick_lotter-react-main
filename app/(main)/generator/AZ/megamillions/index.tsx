import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

// Troque pelo logo de cada jogo!
import { default as MegamillionsLogo } from "@/assets/logos/AZ/megamillions.svg";
import { default as PowerballLogo } from "@/assets/logos/AZ/powerball.svg";
import { default as Fantasy5Logo } from "@/assets/logos/AZ/fantasy5.svg";
import { default as ThePickLogo } from "@/assets/logos/AZ/thepick.svg";
import { default as TripleTwistLogo } from "@/assets/logos/AZ/tripletwist.svg";
import { default as Pick3Logo } from "@/assets/logos/AZ/pick3.svg";

// Utils e temas
import { getThemeFromUI } from "@/utils/getThemeFromUI";

// Componentes visuais
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/gameselectorslider";
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import ButtonNav from "@/components/generator/layout/buttonnav";

// Modais
import SmartFilterPromptModal from "@/components/generator/modals/smartfilterpromptmodal";
import FiltersFormModal from "@/components/generator/modals/filters-form-modal";

// API
import { generateWithFilters } from "@/services/generatorApi";

// --- CONFIG DE JOGOS AZ --- //
const GAMES = {
  megamillions: {
    name: "Mega Millions",
    logo: <MegamillionsLogo width={100} height={38} />,
    uiKey: "megamillions",
    mainTitle: "Pick Your Numbers",
    extraTitle: "Pick Mega Ball",
    resultsRoute: "/generator/az/megamillions/results",
  },
  powerball: {
    name: "Powerball",
    logo: <PowerballLogo width={100} height={38} />,
    uiKey: "powerball",
    mainTitle: "Pick Your Numbers",
    extraTitle: "Pick Powerball",
    resultsRoute: "/generator/az/powerball/results",
  },
  fantasy5: {
    name: "Fantasy 5",
    logo: <Fantasy5Logo width={90} height={36} />,
    uiKey: "fantasy5",
    mainTitle: "Pick Your Numbers",
    extraTitle: null,
    resultsRoute: "/generator/az/fantasy5/results",
  },
  thepick: {
    name: "The Pick",
    logo: <ThePickLogo width={90} height={36} />,
    uiKey: "thepick",
    mainTitle: "Pick Your Numbers",
    extraTitle: null,
    resultsRoute: "/generator/az/thepick/results",
  },
  tripletwistLogo: {
    name: "Triple Twist",
    logo: <TripleTwistLogo width={90} height={36} />,
    uiKey: "tripletwist",
    mainTitle: "Pick Your Numbers",
    extraTitle: null,
    resultsRoute: "/generator/az/tripletwist/results",
  },
  pick3: {
    name: "Pick 3",
    logo: <Pick3Logo width={90} height={36} />,
    uiKey: "pick3",
    mainTitle: "Pick Your Numbers",
    extraTitle: null,
    resultsRoute: "/generator/az/pick3/results",
  },
  // Adicione mais jogos aqui conforme o projeto
};

export default function GeneratorAZPage() {
  // Troque para o jogo que quiser renderizar nesta tela:
  const CURRENT_GAME_KEY: keyof typeof GAMES = "megamillions";
  const GAME = GAMES[CURRENT_GAME_KEY];

  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [customFilters, setCustomFilters] =
    useState<Record<string, number[]>>(null);

  const ui = getThemeFromUI(GAME.uiKey);
  const router = useRouter();

  // Handlers de seleção
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
        GAME.uiKey,
        mainNumbers,
        extraNumbers,
        null
      );
      router.push({
        pathname: GAME.resultsRoute,
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
        GAME.uiKey,
        mainNumbers,
        extraNumbers,
        filters
      );
      router.push({
        pathname: GAME.resultsRoute,
        params: { data: encodeURIComponent(JSON.stringify(result)) },
      });
    } catch (err) {
      console.error("❌ Erro ao gerar com filtros:", err);
    }
  };

  // Quick Pick (altere o número conforme a lógica de cada jogo)
  const handleQuickPick = () => {
    const remainingMain = Array.from(
      { length: ui.totalMainBalls },
      (_, i) => i + 1
    ).filter((n) => !mainNumbers.includes(n));
    const randomMain: number[] = [];
    while (
      randomMain.length < (ui.mainPickCount || 5) &&
      remainingMain.length > 0
    ) {
      const rand = Math.floor(Math.random() * remainingMain.length);
      randomMain.push(remainingMain[rand]);
      remainingMain.splice(rand, 1);
    }

    let randomExtra: number[] = [];
    if (ui.totalExtraBalls && ui.extraPickCount) {
      const remainingExtra = Array.from(
        { length: ui.totalExtraBalls },
        (_, i) => i + 1
      ).filter((n) => !extraNumbers.includes(n));
      randomExtra = [];
      while (
        randomExtra.length < ui.extraPickCount &&
        remainingExtra.length > 0
      ) {
        const rand = Math.floor(Math.random() * remainingExtra.length);
        randomExtra.push(remainingExtra[rand]);
        remainingExtra.splice(rand, 1);
      }
    }

    setMainNumbers((prev) => [...prev, ...randomMain]);
    setExtraNumbers((prev) => [...prev, ...randomExtra]);
  };

  // Calcular linhas possíveis (ajuste para cada jogo!)
  const lines =
    mainNumbers.length >= (ui.mainPickCount || 5) &&
    (!ui.extraPickCount || extraNumbers.length >= ui.extraPickCount)
      ? Math.floor(
          combinations(mainNumbers.length, ui.mainPickCount || 5) *
            (ui.extraPickCount
              ? combinations(extraNumbers.length, ui.extraPickCount)
              : 1)
        )
      : 0;

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: ui.headerColor }]}>
        <GameHeader
          logo={GAME.logo}
          title="Generator"
          subtitle={`Arizona ${GAME.name}`}
          headerColor={ui.headerColor}
          textColor={ui.mainTextColor}
        />
        <View style={styles.sliderBar}>
          {/* Mude state para "az" e passe o jogo ativo */}
          <GameSelectorSlider state="az" currentGame={GAME.uiKey} />
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
            title={GAME.mainTitle}
            total={ui.totalMainBalls}
            selected={mainNumbers}
            onSelect={handleMainSelect}
            themeColor={ui.mainBallColor}
            textColor={ui.mainTextColor}
            titleColor={ui.mainTitleColor}
          />

          {/* Só renderiza o grid extra se o jogo tiver! */}
          {ui.totalExtraBalls && (
            <NumberGrid
              title={GAME.extraTitle}
              total={ui.totalExtraBalls}
              selected={extraNumbers}
              onSelect={handleExtraSelect}
              themeColor={ui.extraBallColor}
              textColor={ui.extraTextColor}
              titleColor={ui.extraTitleColor}
            />
          )}

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

// --- Função de combinações --- //
function combinations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1));
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// --- Styles --- //
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
