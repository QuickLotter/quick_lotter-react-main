import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { normalGamesConfig } from "./gamesNormalConfig";
import { pickGamesConfig } from "./gamesPickConfig";

// Junta todos os jogos para o slider/menu
const allGamesConfig = [...normalGamesConfig, ...pickGamesConfig];
const nyButtons = allGamesConfig.map((game) => ({
  id: game.id,
  Component: game.logo,
}));

// COMPONENTES
import GameHeader from "@/components/generator/header/gameheader";
import GameSelectorSlider from "@/components/generator/smart_filter/buttonselectoslider";
import PickedSummary from "@/components/generator/selector/pickedsummary";
import NumberGrid from "@/components/generator/selector/numbergrid";
import PickGamesGrid from "@/components/generator/selector/pickgamesgrid";
import SmartFilterToggle from "@/components/generator/smart_filter/smartfiltertoggle";
import ButtonNav from "@/components/generator/layout/buttonnav";
import GeneratorSettingModal from "@/components/generatorsettingmodal";
import GeneratorSettingModalPick from "@/components/generatorsettingmodalpick";
import SmartFilterPromptModal from "@/components/generator/modals/smartfilterpromptmodal";
import FiltersFormModal from "@/components/generator/modals/filtersformmodal";

export default function GeneratorNYUnified() {
  const params = useLocalSearchParams();
  const initialGame = allGamesConfig.findIndex((g) => g.id === params.game);
  const [selectedGameIdx, setSelectedGameIdx] = useState(
    initialGame !== -1 ? initialGame : 0
  );
  const game = allGamesConfig[selectedGameIdx];
  const router = useRouter();

  // States para os tipos normais e pick
  const [mainNumbers, setMainNumbers] = useState<number[]>([]);
  const [extraNumbers, setExtraNumbers] = useState<number[]>([]);
  const [pickSelected, setPickSelected] = useState<number[][]>(
    Array.from({ length: (game as any).ballCount || 4 }, () => [])
  );

  const [smartEnabled, setSmartEnabled] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showFiltersForm, setShowFiltersForm] = useState(false);
  const [customFilters, setCustomFilters] =
    useState<Record<string, number[]>>(null);
  const [showGeneratorSetting, setShowGeneratorSetting] = useState(false);
  const [showGeneratorSettingPick, setShowGeneratorSettingPick] =
    useState(false);
  const [prizeLines, setPrizeLines] = useState({});

  // Limpa tudo ao trocar de jogo
  useEffect(() => {
    setMainNumbers([]);
    setExtraNumbers([]);
    setPickSelected(
      Array.from({ length: (game as any).ballCount || 4 }, () => [])
    );
    setCustomFilters(null);
    setSmartEnabled(false);
    setShowPromptModal(false);
    setShowFiltersForm(false);
    setShowGeneratorSetting(false);
    setShowGeneratorSettingPick(false);
    setPrizeLines({});
  }, [selectedGameIdx]);

  // Handlers jogos normais
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

  // Handler Pick
  const handlePickSelect = (col: number, num: number) => {
    setPickSelected((prev) =>
      prev.map((column, index) =>
        index === col
          ? column.includes(num)
            ? column.filter((n) => n !== num)
            : [...column, num]
          : column
      )
    );
  };

  // Quick Pick
  const handleQuickPick = () => {
    if (game.type === "pick") {
      const newSelection = pickSelected.map((col, colIdx) => {
        let next;
        let tries = 0;
        const min = Array.isArray(game.ballRange) ? game.ballRange[0] : 0;
        const max = Array.isArray(game.ballRange)
          ? game.ballRange[1]
          : game.ballRange;
        do {
          next = Math.floor(Math.random() * (max - min + 1)) + min;
          tries++;
        } while (col.includes(next) && tries < 20);
        return col.includes(next) ? col : [...col, next];
      });
      setPickSelected(newSelection);
    } else {
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

  // Lines summary
  const lines =
    game.type === "pick"
      ? pickSelected.every((col) => col.length > 0)
        ? pickSelected.reduce((acc, col) => acc * col.length, 1)
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

  function handleOpenSettings() {
    if (game.type === "pick") setShowGeneratorSettingPick(true);
    else setShowGeneratorSetting(true);
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { backgroundColor: game.headerColor }]}>
        <GameHeader
          logo={<game.logo width={100} height={38} />}
          title="Generator"
          subtitle={`New York ${game.name}`}
          headerColor={game.headerColor}
          textColor="#fff"
        />
        <View style={styles.sliderBar}>
          <GameSelectorSlider
            customButtons={nyButtons}
            currentGame={game.id}
            onSelect={(id) => {
              const idx = allGamesConfig.findIndex((g) => g.id === id);
              if (idx !== -1) setSelectedGameIdx(idx);
            }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          <View style={styles.summaryWrapper}>
            <PickedSummary
              picked={
                game.type === "pick"
                  ? pickSelected.flat().length
                  : mainNumbers.length + (extraNumbers?.length || 0)
              }
              lines={lines}
              onQuickPick={handleQuickPick}
              textColor={
                game.type === "pick"
                  ? game.pickConfig.textColor
                  : game.mainGrid.pickedLabelColor
              }
              linesTextColor={
                game.type === "pick"
                  ? game.pickConfig.textColor
                  : game.mainGrid.linesLabelColor
              }
              valueTextColor={
                game.type === "pick"
                  ? game.pickConfig.selectedTextColor
                  : game.mainGrid.pickedValueColor
              }
              linesValueColor={
                game.type === "pick"
                  ? game.pickConfig.selectedTextColor
                  : game.mainGrid.linesValueColor
              }
              accentColor={game.headerColor}
              buttonTextColor={
                game.type === "pick"
                  ? game.pickConfig.selectedTextColor
                  : game.mainGrid.quickPickTextColor
              }
              iconColor={
                game.type === "pick"
                  ? game.pickConfig.boltColor
                  : game.mainGrid.quickPickIconColor
              }
              quickPickBgColor={
                game.type === "pick"
                  ? game.headerColor
                  : game.mainGrid.quickPickBgColor
              }
            />
          </View>

          {/* RENDER DIFERENTE PARA CADA TIPO */}
          {game.type === "normal" && (
            <>
              <NumberGrid
                title={game.mainGrid.title}
                total={game.mainGrid.total}
                selected={mainNumbers}
                onSelect={handleMainSelect}
                themeColor={game.mainGrid.color}
                textColor={game.mainGrid.textColor}
                titleColor={game.mainGrid.titleColor}
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

          {game.type === "pick" && (
            <PickGamesGrid
              columns={game.ballCount}
              selected={pickSelected}
              onSelect={handlePickSelect}
              themeColor={game.pickConfig.ballColor}
              textColor={game.pickConfig.textColor}
              titleColor={game.headerColor}
              selectedBallStyle={{
                backgroundColor: game.pickConfig.selectedBallColor,
              }}
              selectedTextStyle={{
                color: game.pickConfig.selectedTextColor,
              }}
              columnGap={20}
              ballGap={10}
              ballSize={42}
              minValue={Array.isArray(game.ballRange) ? game.ballRange[0] : 0}
              maxValue={
                Array.isArray(game.ballRange)
                  ? game.ballRange[1]
                  : game.ballRange
              }
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

      <ButtonNav
        onGenerate={handleOpenSettings}
        onClear={() => {
          if (game.type === "pick") {
            setPickSelected(Array.from({ length: game.ballCount }, () => []));
          } else {
            setMainNumbers([]);
            setExtraNumbers([]);
            setCustomFilters(null);
          }
        }}
        accentColor={game.headerColor}
        buttonTextColor="#fff"
      />

      {/* Modal padrão */}
      <GeneratorSettingModal
        visible={showGeneratorSetting && game.type === "normal"}
        onClose={() => setShowGeneratorSetting(false)}
        game={game}
        selectedMain={mainNumbers}
        selectedExtra={extraNumbers}
        onConfirm={(settings) => {
          setShowGeneratorSetting(false);
          router.push({
            pathname: game.resultsRoute,
            params: {
              data: encodeURIComponent(
                JSON.stringify({
                  numbers: { mainNumbers, extraNumbers },
                  settings,
                })
              ),
              game: game.id,
            },
          });
        }}
      />

      {/* Modal Pick */}
      <GeneratorSettingModalPick
        visible={showGeneratorSettingPick && game.type === "pick"}
        onClose={() => setShowGeneratorSettingPick(false)}
        gameId={game.id.toUpperCase()}
        selectedMain={pickSelected.flat()}
        prizeLines={prizeLines}
        setPrizeLines={setPrizeLines}
        onConfirm={(settings) => {
          setShowGeneratorSettingPick(false);
          router.push({
            pathname: game.resultsRoute,
            params: {
              data: encodeURIComponent(
                JSON.stringify({
                  numbers: pickSelected,
                  settings,
                  prizeLines,
                })
              ),
              game: game.id,
            },
          });
        }}
      />

      <SmartFilterPromptModal
        visible={showPromptModal}
        onAddFilters={() => {
          setShowPromptModal(false);
          setShowFiltersForm(true);
        }}
        onSkip={() => setShowPromptModal(false)}
      />
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
  gridCentralized: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
