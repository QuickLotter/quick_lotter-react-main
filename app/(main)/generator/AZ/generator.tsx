import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";

// Logos
import MegamillionsLogo from "@/assets/logos/AZ/megamillions.svg";
import PowerballLogo from "@/assets/logos/AZ/powerball.svg";
import Fantasy5Logo from "@/assets/logos/AZ/fantasy5.svg";
import ThePickLogo from "@/assets/logos/AZ/thepick.svg";

// Componentes
import GameHeader from "@/components/generator/header/gameheader";
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import ButtonNav from "@/components/generator/layout/buttonnav";
import SmartFilterPromptModal from "@/components/generator/modals/smartfilterpromptmodal";
import FiltersFormModal from "@/components/generator/modals/filters-form-modal";

// API
import { generateWithFilters } from "@/services/generatorApi";

// 1. CONFIG DOS JOGOS AZ
const AZ_GAMES = [
  {
    key: "megamillions",
    name: "Mega Millions",
    logo: <MegamillionsLogo width={65} height={36} />,
    headerColor: "#0E4CA1",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 70,
      pick: 5,
      color: "#0E4CA1",
      textColor: "#000",
      titleColor: "#0E4CA1",
    },
    extraGrid: {
      title: "Pick Mega Ball",
      total: 25,
      pick: 1,
      color: "#FFB500",
      textColor: "#000",
      titleColor: "#E69C0C",
    },
    resultsRoute: "/generator/az/megamillions/results",
  },
  {
    key: "powerball",
    name: "Powerball",
    logo: <PowerballLogo width={65} height={36} />,
    headerColor: "#C7102E",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 69,
      pick: 5,
      color: "#C7102E",
      textColor: "#000",
      titleColor: "#C7102E",
    },
    extraGrid: {
      title: "Pick Powerball",
      total: 26,
      pick: 1,
      color: "#F5002F",
      textColor: "#000",
      titleColor: "#B81A2A",
    },
    resultsRoute: "/generator/az/powerball/results",
  },
  {
    key: "fantasy5",
    name: "Fantasy 5",
    logo: <Fantasy5Logo width={65} height={36} />,
    headerColor: "#19C37D",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 41,
      pick: 5,
      color: "#19C37D",
      textColor: "#000",
      titleColor: "#19C37D",
    },
    extraGrid: null,
    resultsRoute: "/generator/az/fantasy5/results",
  },
  {
    key: "thepick",
    name: "The Pick",
    logo: <ThePickLogo width={65} height={36} />,
    headerColor: "#4C69BA",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 44,
      pick: 6,
      color: "#4C69BA",
      textColor: "#000",
      titleColor: "#4C69BA",
    },
    extraGrid: null,
    resultsRoute: "/generator/az/thepick/results",
  },
];

export default function GeneratorAZUnified() {
  // 2. State para jogo selecionado
  const [selectedGameIdx, setSelectedGameIdx] = useState(0);
  const game = AZ_GAMES[selectedGameIdx];

  // 3. States para números
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [customFilters, setCustomFilters] =
    useState<Record<string, number[]>>(null);

  const router = useRouter();

  // 4. Limpar ao mudar de jogo
  React.useEffect(() => {
    setMainNumbers([]);
    setExtraNumbers([]);
    setCustomFilters(null);
    setSmartEnabled(false);
    setShowPromptModal(false);
    setShowFiltersForm(false);
  }, [selectedGameIdx]);

  // Handlers
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

  const handleGenerate = () => setShowPromptModal(true);
  const handleApplyFilters = () => {
    setShowPromptModal(false);
    setShowFiltersForm(true);
  };

  const handleSkipFilters = async () => {
    setShowPromptModal(false);
    try {
      const result = await generateWithFilters(
        game.key,
        mainNumbers,
        extraNumbers,
        null
      );
      router.push({
        pathname: game.resultsRoute,
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
        game.key,
        mainNumbers,
        extraNumbers,
        filters
      );
      router.push({
        pathname: game.resultsRoute,
        params: { data: encodeURIComponent(JSON.stringify(result)) },
      });
    } catch (err) {
      console.error("❌ Erro ao gerar com filtros:", err);
    }
  };

  const handleQuickPick = () => {
    // Main
    const remainingMain = Array.from(
      { length: game.mainGrid.total },
      (_, i) => i + 1
    ).filter((n) => !mainNumbers.includes(n));
    const randomMain: number[] = [];
    while (randomMain.length < game.mainGrid.pick && remainingMain.length > 0) {
      const rand = Math.floor(Math.random() * remainingMain.length);
      randomMain.push(remainingMain[rand]);
      remainingMain.splice(rand, 1);
    }
    // Extra
    let randomExtra: number[] = [];
    if (game.extraGrid) {
      const remainingExtra = Array.from(
        { length: game.extraGrid.total },
        (_, i) => i + 1
      ).filter((n) => !extraNumbers.includes(n));
      randomExtra = [];
      while (
        randomExtra.length < game.extraGrid.pick &&
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

  // Cálculo de linhas (combinatório)
  const lines =
    mainNumbers.length >= game.mainGrid.pick &&
    (!game.extraGrid || extraNumbers.length >= game.extraGrid.pick)
      ? Math.floor(
          combinations(mainNumbers.length, game.mainGrid.pick) *
            (game.extraGrid
              ? combinations(extraNumbers.length, game.extraGrid.pick)
              : 1)
        )
      : 0;

  // ---- UI ----
  return (
    <View style={styles.wrapper}>
      {/* Header com slider dos jogos */}
      <View style={[styles.header, { backgroundColor: game.headerColor }]}>
        <GameHeader
          logo={game.logo}
          title="Generator"
          subtitle={`Arizona ${game.name}`}
          headerColor={game.headerColor}
          textColor="#fff"
        />
        <View style={styles.sliderBar}>
          {AZ_GAMES.map((g, idx) => (
            <View key={g.key} style={styles.sliderItem}>
              <Text
                onPress={() => setSelectedGameIdx(idx)}
                style={[
                  styles.sliderLabel,
                  selectedGameIdx === idx && {
                    color: "#fff",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  },
                ]}
              >
                {g.logo}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Corpo dinâmico */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={mainNumbers.length + extraNumbers.length}
              lines={lines}
              onQuickPick={handleQuickPick}
              textColor="#111"
              linesTextColor="#555"
              valueTextColor="#111"
              linesValueColor="#19C37D"
              accentColor={game.headerColor}
              buttonTextColor="#fff"
              iconColor={game.headerColor}
            />
          </View>

          {/* Grid principal */}
          <NumberGrid
            title={game.mainGrid.title}
            total={game.mainGrid.total}
            selected={mainNumbers}
            onSelect={handleMainSelect}
            themeColor={game.mainGrid.color}
            textColor={game.mainGrid.textColor}
            titleColor={game.mainGrid.titleColor}
          />

          {/* Grid extra se existir */}
          {game.extraGrid && (
            <NumberGrid
              title={game.extraGrid.title}
              total={game.extraGrid.total}
              selected={extraNumbers}
              onSelect={handleExtraSelect}
              themeColor={game.extraGrid.color}
              textColor={game.extraGrid.textColor}
              titleColor={game.extraGrid.titleColor}
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

      {/* BottomNav */}
      <ButtonNav
        onGenerate={handleGenerate}
        onClear={handleClear}
        accentColor={game.headerColor}
        buttonTextColor="#fff"
      />

      {/* Modais */}
      <SmartFilterPromptModal
        visible={showPromptModal}
        onAddFilters={handleApplyFilters}
        onSkip={handleSkipFilters}
      />
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
    flexDirection: "row",
    backgroundColor: "#374BBB",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  sliderItem: {
    marginHorizontal: 8,
  },
  sliderLabel: {
    fontSize: 18,
    color: "#DDD",
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
