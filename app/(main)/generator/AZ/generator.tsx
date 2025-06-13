// app/(main)/generator/az/generator.tsx

import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

// Importa logos SVG de cada jogo de Arizona
import MegamillionsLogo from "@/assets/logos/az/megamillions.svg";
import PowerballLogo from "@/assets/logos/az/powerball.svg";
import Fantasy5Logo from "@/assets/logos/az/fantasy5.svg";
import ThePickLogo from "@/assets/logos/az/thepick.svg";
import TripleTwistLogo from "@/assets/logos/az/tripletwist.svg";
import Pick3Logo from "@/assets/logos/az/pick3.svg";

// Componentes visuais
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/buttonselectoslider";
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import ButtonNav from "@/components/generator/layout/buttonnav";
import PickGamesGrid from "@/components/generator/selector/pickgamesgrid";

// Modais
import SmartFilterPromptModal from "@/components/generator/modals/smartfilterpromptmodal";
import FiltersFormModal from "@/components/generator/modals/filtersformmodal";

// API
import { generateWithFilters } from "@/services/generatorApi";
import { Ionicons } from "@expo/vector-icons";

// ======================
// 1. CONFIG DOS JOGOS AZ
// ======================
const AZ_GAMES = [
  {
    id: "megamillions",
    name: "Mega Millions",
    logo: MegamillionsLogo,
    headerColor: "#0E4CA1",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 70,
      pick: 5,
      color: "#fff",
      textColor: "#0E4CA1",
      selectedColor: "#0E4CA1",
      selectedTextColor: "#fff",
      selectedBorderColor: "#0E4CA1",
      pickedLabelColor: "#0E4CA1",
      pickedValueColor: "#fff",
      pickedBgColor: "#0E4CA1",
      pickedBorderColor: "#0E4CA1",
      linesLabelColor: "#333",
      linesValueColor: "#0E4CA1",
      linesBgColor: "#fff",
      linesBorderColor: "#0E4CA1",
      quickPickBgColor: "#0E4CA1",
      quickPickTextColor: "#fff",
      quickPickIconColor: "#FFD700",
      pickYourNumbersColor: "#333",
      gridBorderColor: "#e3e3e3",
    },
    extraGrid: {
      title: "Pick Mega Ball",
      total: 25,
      pick: 1,
      color: "#fff",
      textColor: "#FFB500",
      selectedColor: "#FFB500",
      selectedTextColor: "#fff",
      selectedBorderColor: "#FFB500",
      pickLabelColor: "#FFB500",
      gridBorderColor: "#e3e3e3",
    },
    resultsRoute: "/generator/az/MyLines",
  },
  {
    id: "powerball",
    name: "Powerball",
    logo: PowerballLogo,
    headerColor: "#C7102E",
    mainGrid: {
      title: "Pick 5 Main Numbers",
      total: 69,
      pick: 5,
      color: "#fff",
      textColor: "#000",
      selectedColor: "#000",
      selectedTextColor: "#fff",
      selectedBorderColor: "#000",
      pickedLabelColor: "#222",
      pickedValueColor: "#fff",
      pickedBgColor: "#000",
      pickedBorderColor: "#000",
      linesLabelColor: "#333",
      linesValueColor: "#C7102E",
      linesBgColor: "#fff",
      linesBorderColor: "#C7102E",
      quickPickBgColor: "#000",
      quickPickTextColor: "#fff",
      quickPickIconColor: "#FFD700",
      pickYourNumbersColor: "#333",
      gridBorderColor: "#e3e3e3",
    },
    extraGrid: {
      title: "Pick Powerball",
      total: 26,
      pick: 1,
      color: "#fff",
      textColor: "#000",
      selectedColor: "#C7102E",
      selectedTextColor: "#fff",
      selectedBorderColor: "#C7102E",
      pickLabelColor: "#C7102E",
      gridBorderColor: "#e3e3e3",
    },
    resultsRoute: "/generator/az/MyLines",
  },
  {
    id: "fantasy5",
    name: "Fantasy 5",
    logo: Fantasy5Logo,
    headerColor: "#19C37D",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 41,
      pick: 5,
      color: "#fff",
      textColor: "#19C37D",
      selectedColor: "#19C37D",
      selectedTextColor: "#fff",
      selectedBorderColor: "#19C37D",
      pickedLabelColor: "#19C37D",
      pickedValueColor: "#fff",
      pickedBgColor: "#19C37D",
      pickedBorderColor: "#19C37D",
      linesLabelColor: "#333",
      linesValueColor: "#19C37D",
      linesBgColor: "#fff",
      linesBorderColor: "#19C37D",
      quickPickBgColor: "#19C37D",
      quickPickTextColor: "#fff",
      quickPickIconColor: "#FFD700",
      pickYourNumbersColor: "#333",
      gridBorderColor: "#e3e3e3",
    },
    extraGrid: null,
    resultsRoute: "/generator/az/MyLines",
  },
  {
    id: "thepick",
    name: "The Pick",
    logo: ThePickLogo,
    headerColor: "#4C69BA",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 44,
      pick: 6,
      color: "#fff",
      textColor: "#4C69BA",
      selectedColor: "#4C69BA",
      selectedTextColor: "#fff",
      selectedBorderColor: "#4C69BA",
      pickedLabelColor: "#4C69BA",
      pickedValueColor: "#fff",
      pickedBgColor: "#4C69BA",
      pickedBorderColor: "#4C69BA",
      linesLabelColor: "#333",
      linesValueColor: "#4C69BA",
      linesBgColor: "#fff",
      linesBorderColor: "#4C69BA",
      quickPickBgColor: "#4C69BA",
      quickPickTextColor: "#fff",
      quickPickIconColor: "#FFD700",
      pickYourNumbersColor: "#333",
      gridBorderColor: "#e3e3e3",
    },
    extraGrid: null,
    resultsRoute: "/generator/az/MyLines",
  },
  {
    id: "tripletwist",
    name: "Triple Twist",
    logo: TripleTwistLogo,
    headerColor: "#A13AB3",
    mainGrid: {
      title: "Pick Your Numbers",
      total: 42,
      pick: 6,
      color: "#fff",
      textColor: "#A13AB3",
      selectedColor: "#A13AB3",
      selectedTextColor: "#fff",
      selectedBorderColor: "#A13AB3",
      pickedLabelColor: "#A13AB3",
      pickedValueColor: "#fff",
      pickedBgColor: "#A13AB3",
      pickedBorderColor: "#A13AB3",
      linesLabelColor: "#333",
      linesValueColor: "#A13AB3",
      linesBgColor: "#fff",
      linesBorderColor: "#A13AB3",
      quickPickBgColor: "#A13AB3",
      quickPickTextColor: "#fff",
      quickPickIconColor: "#FFD700",
      pickYourNumbersColor: "#333",
      gridBorderColor: "#e3e3e3",
    },
    extraGrid: null,
    resultsRoute: "/generator/az/MyLines",
  },
  {
    id: "pick3",
    name: "Pick 3",
    logo: Pick3Logo,
    headerColor: "#004785",
    isPick3: true,
    pick3Config: {
      ballColor: "#19437D", // bola normal
      textColor: "#fff", // texto normal
      selectedBallColor: "#214D90", // bola selecionada
      selectedTextColor: "#fff", // texto bola selecionada
      boltColor: "#FFD700", // cor do bolt Quick Pick
    },
    resultsRoute: "/generator/az/MyLines",
  },
];

// Slider
const azButtons = AZ_GAMES.map((game) => ({
  id: game.id,
  Component: game.logo,
}));

// =========================================
// 2. COMPONENTE PRINCIPAL DO GENERATOR AZ
// =========================================
export default function GeneratorAZUnified() {
  const [selectedGameIdx, setSelectedGameIdx] = useState(0);
  const game = AZ_GAMES[selectedGameIdx];
  const router = useRouter();

  // Pick 3: 3 colunas
  const [pick3Selected, setPick3Selected] = useState<number[][]>([[], [], []]);
  // Outros jogos
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [smartEnabled, setSmartEnabled] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [customFilters, setCustomFilters] =
    useState<Record<string, number[]>>(null);

  // Limpar ao trocar de jogo
  useEffect(() => {
    setMainNumbers([]);
    setExtraNumbers([]);
    setPick3Selected([[], [], []]);
    setCustomFilters(null);
    setSmartEnabled(false);
    setShowPromptModal(false);
    setShowFiltersForm(false);
  }, [selectedGameIdx]);

  // Pick 3 handlers
  const handlePick3Select = (col: number, num: number) => {
    setPick3Selected((prev) =>
      prev.map((column, index) =>
        index === col
          ? column.includes(num)
            ? column.filter((n) => n !== num)
            : [...column, num]
          : column
      )
    );
  };

  const handlePick3Clear = () => setPick3Selected([[], [], []]);
  const handlePick3QuickPick = () => {
    const newSelection = pick3Selected.map((col) => {
      let next;
      let tries = 0;
      do {
        next = Math.floor(Math.random() * 10);
        tries++;
      } while (col.includes(next) && tries < 10);
      return col.includes(next) ? col : [...col, next];
    });
    setPick3Selected(newSelection);
  };

  // Outros jogos handlers
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

  // Quick Pick universal
  const handleQuickPick = () => {
    if (game.isPick3) {
      handlePick3QuickPick();
    } else {
      // Main
      const remainingMain = Array.from(
        { length: game.mainGrid.total },
        (_, i) => i + 1
      ).filter((n) => !mainNumbers.includes(n));
      const randomMain: number[] = [];
      while (
        randomMain.length < game.mainGrid.pick &&
        remainingMain.length > 0
      ) {
        const rand = Math.floor(Math.random() * remainingMain.length);
        randomMain.push(remainingMain[rand]);
        remainingMain.splice(rand, 1);
      }
      // Extra (se houver)
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
    }
  };

  // Calcula linhas
  const lines = game.isPick3
    ? pick3Selected.every((col) => col.length > 0)
      ? pick3Selected.reduce((acc, col) => acc * col.length, 1)
      : 0
    : mainNumbers.length >= (game.mainGrid?.pick || 5) &&
      (!game.extraGrid || extraNumbers.length >= (game.extraGrid?.pick || 0))
    ? Math.floor(
        combinations(mainNumbers.length, game.mainGrid.pick) *
          (game.extraGrid
            ? combinations(extraNumbers.length, game.extraGrid.pick)
            : 1)
      )
    : 0;

  // Render
  return (
    <View style={styles.wrapper}>
      {/* HEADER COM SLIDER */}
      <View style={[styles.header, { backgroundColor: game.headerColor }]}>
        <GameHeader
          logo={<game.logo width={100} height={38} />}
          title="Generator"
          subtitle={`Arizona ${game.name}`}
          headerColor={game.headerColor}
          textColor="#fff"
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider
            customButtons={azButtons}
            currentGame={game.id}
            onSelect={(id) => {
              const idx = AZ_GAMES.findIndex((g) => g.id === id);
              if (idx !== -1) setSelectedGameIdx(idx);
            }}
          />
        </View>
      </View>

      {/* CORPO */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={
                game.isPick3
                  ? pick3Selected.flat().length
                  : mainNumbers.length + extraNumbers.length
              }
              lines={lines}
              onQuickPick={handleQuickPick}
              textColor={
                game.isPick3
                  ? "#004785"
                  : game.mainGrid.pickedLabelColor || "#333"
              }
              linesTextColor={
                game.isPick3
                  ? "#004785"
                  : game.mainGrid.linesLabelColor || "#555"
              }
              valueTextColor={
                game.isPick3 ? "#fff" : game.mainGrid.pickedValueColor || "#111"
              }
              linesValueColor={
                game.isPick3
                  ? "#19C37D"
                  : game.mainGrid.linesValueColor || "#19C37D"
              }
              accentColor={
                game.isPick3 ? "#004785" : game.headerColor || "#007AFF"
              }
              buttonTextColor="#fff"
              iconComponent={
                <Ionicons
                  name="flash"
                  size={20}
                  color={
                    game.isPick3
                      ? game.pick3Config.boltColor
                      : game.mainGrid.quickPickIconColor || "#FFD700"
                  }
                />
              }
              buttonBgColor={
                game.isPick3
                  ? "#004785"
                  : game.mainGrid.quickPickBgColor || "#0E4CA1"
              }
            />
          </View>

          {/* Pick 3: grid especial (3 colunas de 0 a 9) */}
          {game.isPick3 ? (
            <PickGamesGrid
              title=""
              columns={3}
              selected={pick3Selected}
              onSelect={handlePick3Select}
              themeColor={game.pick3Config.ballColor}
              textColor={game.pick3Config.textColor}
              selectedBallStyle={{
                backgroundColor: game.pick3Config.selectedBallColor,
              }}
              selectedTextStyle={{
                color: game.pick3Config.selectedTextColor,
                fontWeight: "bold",
              }}
              titleColor="#004785"
              columnGap={20}
              ballGap={10}
              ballSize={42}
            />
          ) : (
            <>
              {/* Grid principal */}
              <NumberGrid
                title={game.mainGrid.title}
                total={game.mainGrid.total}
                selected={mainNumbers}
                onSelect={handleMainSelect}
                themeColor={game.mainGrid.color}
                textColor={game.mainGrid.textColor}
                titleColor={game.mainGrid.pickYourNumbersColor}
                containerStyle={styles.gridCentralized}
                selectedBallStyle={{
                  backgroundColor: game.mainGrid.selectedColor,
                  borderColor: game.mainGrid.selectedBorderColor,
                }}
                selectedTextStyle={{
                  color: game.mainGrid.selectedTextColor,
                  fontWeight: "bold",
                }}
              />
              {/* Grid extra se o jogo tiver */}
              {game.extraGrid && (
                <NumberGrid
                  title={game.extraGrid.title}
                  total={game.extraGrid.total}
                  selected={extraNumbers}
                  onSelect={handleExtraSelect}
                  themeColor={game.extraGrid.color}
                  textColor={game.extraGrid.textColor}
                  titleColor={game.extraGrid.pickLabelColor}
                  containerStyle={styles.gridCentralized}
                  selectedBallStyle={{
                    backgroundColor: game.extraGrid.selectedColor,
                    borderColor: game.extraGrid.selectedBorderColor,
                  }}
                  selectedTextStyle={{
                    color: game.extraGrid.selectedTextColor,
                    fontWeight: "bold",
                  }}
                />
              )}
            </>
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
        onGenerate={() => {
          const numbers = game.isPick3
            ? pick3Selected
            : { mainNumbers, extraNumbers };
          router.push({
            pathname: game.resultsRoute,
            params: {
              data: encodeURIComponent(JSON.stringify(numbers)),
              game: game.id,
            },
          });
        }}
        onClear={() => {
          if (game.isPick3) handlePick3Clear();
          else handleClear();
        }}
        accentColor={game.headerColor}
        buttonTextColor="#fff"
      />

      {/* Modal: Smart Filter Prompt */}
      <SmartFilterPromptModal
        visible={showPromptModal}
        onAddFilters={() => {
          setShowPromptModal(false);
          setShowFiltersForm(true);
        }}
        onSkip={() => setShowPromptModal(false)}
      />
      {/* Modal: Filtros avançados */}
      <FiltersFormModal
        visible={showFiltersForm}
        onClose={() => setShowFiltersForm(false)}
        onApply={(filters) => {
          setCustomFilters(filters);
          setShowFiltersForm(false);
        }}
      />
    </View>
  );
}

// =====================
// Função de combinações
// =====================
function combinations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1));
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// ===========
// ESTILOS
// ===========
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
  gridCentralized: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
