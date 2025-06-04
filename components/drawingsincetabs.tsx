import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  LayoutAnimation,
  Platform,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

// Cores padrão por jogo (NY)
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

// Quantidade de positions/tabs por jogo NY
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

function getTabs(game: string) {
  const tabs = [
    {
      label: "DRAWING SINCE",
      path: `/overview/NY/${game}/drawingsince`,
    },
  ];
  const maxPos = GAME_TAB_COUNT[game] ?? 5;
  for (let i = 1; i <= maxPos; i++) {
    tabs.push({
      label: `POSITION ${i.toString().padStart(2, "0")}`,
      path: `/overview/NY/${game}/position${i}`,
    });
  }
  if (game === "megamillions") {
    tabs.push({
      label: "POSITION MB",
      path: `/overview/NY/${game}/positionmb`,
    });
  }
  if (game === "powerball") {
    tabs.push({
      label: "POSITION PB",
      path: `/overview/NY/${game}/positionpb`,
    });
  }
  if (game === "cash4life") {
    tabs.push({
      label: "POSITION CB",
      path: `/overview/NY/${game}/positioncb`,
    });
  }
  return tabs;
}

export default function DrawingSinceTabs({
  tabColors = {},
}: {
  tabColors?: Record<string, { backgroundColor?: string; color?: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Extrai o nome do jogo da URL /overview/NY/:game/xxxx
  const match = pathname?.match(/^\/overview\/NY\/([^/]+)/i);
  const game = match?.[1]?.toLowerCase() || "megamillions";
  const mainColor = GAME_COLORS[game] || "#0E4CA1";
  const TABS = getTabs(game);

  // Tab ativa (compare só até o 4º segmento)
  const pathRoot = pathname?.split("/").slice(0, 4).join("/").toLowerCase();

  const activeIndex = TABS.findIndex((tab) =>
    pathname?.toLowerCase().startsWith(tab.path.toLowerCase())
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
          const isActive =
            pathname?.toLowerCase() === tab.path.toLowerCase() ||
            pathname?.toLowerCase().startsWith(tab.path.toLowerCase());

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
