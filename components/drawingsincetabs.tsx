// components/drawingsincetabs.tsx
import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  LayoutAnimation,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

/**
 * Cores principais por jogo (para botões padrões)
 */
const GAME_COLORS: Record<string, string> = {
  powerball: "#C7102E",
  megamillions: "#0E4CA1",
  cash4life: "#2D7F67",
  nylotto: "#D31245",
  pick10: "#E7CE5C",
  take5_midday: "#CA3092",
  take5_evening: "#CA3092",
  win4_midday: "#7E0C6E",
  win4_evening: "#7E0C6E",
  numbers_midday: "#2E73B5",
  numbers_evening: "#2E73B5",
};

/**
 * Defina aqui as cores individuais dos botões especiais (pode expandir se quiser)
 * Se não definir, usa a cor principal do jogo e fonte branca.
 */
const TAB_COLORS: Record<
  string, // game
  Record<
    string, // tab label
    { backgroundColor?: string; color?: string }
  >
> = {
  powerball: {
    "POSITION PB": { backgroundColor: "#000", color: "#fff" }, // vermelho, fonte branca
  },
  megamillions: {
    "POSITION MB": { backgroundColor: "#FDB927", color: "#000" }, // amarelo, fonte azul
  },
  cash4life: {
    "POSITION CB": { backgroundColor: "#3E4982", color: "#fff" }, // amarelo claro, fonte preta
  },
  // Você pode adicionar mais customizações se quiser
};

/**
 * Gera tabs dinâmicos por jogo.
 * Só adiciona PB, MB, CB se for o jogo certo.
 */
const getTabs = (game: string) => {
  // Tabs comuns para todos
  const tabs = [
    {
      label: "DRAWING SINCE",
      path: `/generator/states/new_york/${game}/overview/drawingsince`,
    },
    {
      label: "POSITION 01",
      path: `/generator/states/new_york/${game}/overview/position1`,
    },
    {
      label: "POSITION 02",
      path: `/generator/states/new_york/${game}/overview/position2`,
    },
    {
      label: "POSITION 03",
      path: `/generator/states/new_york/${game}/overview/position3`,
    },
    {
      label: "POSITION 04",
      path: `/generator/states/new_york/${game}/overview/position4`,
    },
    {
      label: "POSITION 05",
      path: `/generator/states/new_york/${game}/overview/position5`,
    },
  ];
  // Tab especial de cada jogo (Mega Ball, Power Ball, Cash Ball)
  if (game === "megamillions") {
    tabs.push({
      label: "POSITION MB",
      path: `/generator/states/new_york/${game}/overview/positionmb`,
    });
  } else if (game === "powerball") {
    tabs.push({
      label: "POSITION PB",
      path: `/generator/states/new_york/${game}/overview/positionpb`,
    });
  } else if (game === "cash4life") {
    tabs.push({
      label: "POSITION CB",
      path: `/generator/states/new_york/${game}/overview/positioncb`,
    });
  }
  return tabs;
};

export default function DrawingSinceTabs() {
  const router = useRouter();
  const pathname = usePathname();

  // Extrai o nome do jogo da URL (ex: /generator/states/new_york/powerball/...)
  const match = pathname?.match(/\/generator\/states\/new_york\/([^\/]+)/);
  const game = match ? match[1] : "megamillions";
  const mainColor = GAME_COLORS[game] || "#0E4CA1";

  // Tabs dinâmicos conforme jogo
  const TABS = getTabs(game);
  const activeIndex = TABS.findIndex(
    (tab) => tab.path.toLowerCase() === pathname?.toLowerCase()
  );

  // Scroll automático para tab ativo
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollRef.current && activeIndex > -1) {
      scrollRef.current.scrollTo({ x: activeIndex * 130 - 12, animated: true });
    }
  }, [activeIndex]);

  return (
    <View style={styles.tabWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScroll}
        keyboardShouldPersistTaps="handled"
      >
        {TABS.map((tab, idx) => {
          const isActive = idx === activeIndex;

          // Busca customização do tab especial
          const tabColors =
            (TAB_COLORS[game] && TAB_COLORS[game][tab.label]) || {};

          // Cor de fundo do botão ativo (custom ou cor padrão)
          const bgColor = isActive
            ? tabColors.backgroundColor || mainColor
            : "#fff";
          // Cor da fonte do botão ativo (custom ou branca)
          const fontColor = isActive ? tabColors.color || "#fff" : mainColor;

          return (
            <TouchableOpacity
              key={tab.label}
              onPress={() => {
                if (!isActive) router.push(tab.path);
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
              }}
              activeOpacity={0.87}
            >
              <Animated.View
                style={[
                  styles.tabButton,
                  isActive && {
                    backgroundColor: bgColor,
                    borderColor: bgColor,
                    shadowColor: bgColor,
                    shadowOpacity: 0.18,
                    elevation: 5,
                  },
                  {
                    transform: [{ scale: isActive ? 1.1 : 1 }],
                  },
                ]}
              >
                <Text style={[styles.tabButtonText, { color: fontColor }]}>
                  {tab.label}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: { backgroundColor: "#fff" },
  tabScroll: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: "#fff",
  },
  tabButton: {
    minWidth: 120,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E1E8F3",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    shadowColor: "#0E4CA1",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonText: {
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.09,
  },
});
