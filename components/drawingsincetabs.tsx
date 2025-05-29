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

// Cores padrão por jogo (usadas se não houver override por tab)
const GAME_COLORS: Record<string, string> = {
  powerball: "#C7102E",
  megamillions: "#0E4CA1",
  cash4life: "#2D7F67",
  nylotto: "#D31245",
  pick10: "#FFE363",
  take5_midday: "#CA3092",
  take5_evening: "#CA3092",
  win4_midday: "#7E0C6E",
  win4_evening: "#7E0C6E",
  numbers_midday: "#2E73B5",
  numbers_evening: "#2E73B5",
};

// Quantidade de tabs por jogo NY
const GAME_TAB_COUNT: Record<string, number> = {
  powerball: 5,
  megamillions: 5,
  cash4life: 5,
  nylotto: 6,
  pick10: 20,
  take5_midday: 5,
  take5_evening: 5,
  win4_midday: 4,
  win4_evening: 4,
  numbers_midday: 3,
  numbers_evening: 3,
};

// Gera as tabs para cada jogo
function getTabs(game: string) {
  const tabs = [
    {
      label: "DRAWING SINCE",
      path: `/generator/states/new_york/${game}/overview/drawingsince`,
    },
  ];
  // Adiciona POSITION 01 até o total do jogo
  const maxPos = GAME_TAB_COUNT[game] ?? 5;
  for (let i = 1; i <= maxPos; i++) {
    tabs.push({
      label: `POSITION ${i.toString().padStart(2, "0")}`,
      path: `/generator/states/new_york/${game}/overview/position${i}`,
    });
  }
  // Tabs especiais
  if (game === "megamillions") {
    tabs.push({
      label: "POSITION MB",
      path: `/generator/states/new_york/${game}/overview/positionmb`,
    });
  }
  if (game === "powerball") {
    tabs.push({
      label: "POSITION PB",
      path: `/generator/states/new_york/${game}/overview/positionpb`,
    });
  }
  if (game === "cash4life") {
    tabs.push({
      label: "POSITION CB",
      path: `/generator/states/new_york/${game}/overview/positioncb`,
    });
  }
  return tabs;
}

/**
 * Props:
 * - tabColors: objeto { [label]: { backgroundColor, color } } para sobrescrever a cor de QUALQUER botão
 * Exemplo de uso:
 * <DrawingSinceTabs tabColors={{
 *   "DRAWING SINCE": { backgroundColor: "#000", color: "#fff" },
 *   "POSITION 01": { backgroundColor: "#FFD700", color: "#333" },
 *   "POSITION PB": { backgroundColor: "#000", color: "#fff" }
 * }} />
 */
export default function DrawingSinceTabs({
  tabColors = {}, // Pode passar customização por label
}: {
  tabColors?: Record<string, { backgroundColor?: string; color?: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Extrai o nome do jogo da URL (ex: /generator/states/new_york/powerball/...)
  const match = pathname?.match(/\/generator\/states\/new_york\/([^\/]+)/);
  const game = match ? match[1] : "megamillions";
  const mainColor = GAME_COLORS[game] || "#0E4CA1";

  const TABS = getTabs(game);
  const activeIndex = TABS.findIndex(
    (tab) => tab.path.toLowerCase() === pathname?.toLowerCase()
  );

  // Scroll automático para tab ativa
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
          // Procura customização de cor no tabColors OU fallback para cor padrão
          const customColors = tabColors[tab.label] || {};
          const bgColor = isActive
            ? customColors.backgroundColor || mainColor
            : "#fff";
          const fontColor = isActive
            ? customColors.color || "#fff"
            : customColors.backgroundColor || mainColor;

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
