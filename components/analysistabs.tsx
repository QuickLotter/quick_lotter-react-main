// components/analysistabs.tsx
import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Platform,
  LayoutAnimation,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

// Tabs de filtros da Analysis Mega Millions
const TABS = [
  // ...mesmo array de tabs como antes...
  {
    label: "SUM",
    color: "#E0E0E0",
    path: "/generator/states/new_york/megamillions/analysis/sum",
  },
  {
    label: "ODD",
    color: "#4CAF50",
    path: "/generator/states/new_york/megamillions/analysis/odd",
  },
  {
    label: "LOW",
    color: "#9575CD",
    path: "/generator/states/new_york/megamillions/analysis/low",
  },
  {
    label: "PRIME",
    color: "#009BDE",
    path: "/generator/states/new_york/megamillions/analysis/prime",
  },
  {
    label: "FIBONACCI",
    color: "#E1058C",
    path: "/generator/states/new_york/megamillions/analysis/fibonacci",
  },
  {
    label: "MULT. OF 3",
    color: "#4DD0E1",
    path: "/generator/states/new_york/megamillions/analysis/multipleof3",
  },
  {
    label: "VERTICAL",
    color: "#B71C1C",
    path: "/generator/states/new_york/megamillions/analysis/vertical",
  },
  {
    label: "ADJACENT",
    color: "#8BC34A",
    path: "/generator/states/new_york/megamillions/analysis/adjacent",
  },
  {
    label: "SEQUENCE",
    color: "#000000",
    path: "/generator/states/new_york/megamillions/analysis/sequence",
  },
  {
    label: "REPEATED",
    color: "#FF9800",
    path: "/generator/states/new_york/megamillions/analysis/repeated",
  },
  {
    label: "DIGITS",
    color: "#CDDC39",
    path: "/generator/states/new_york/megamillions/analysis/digits",
  },
  {
    label: "LINES",
    color: "#005BAA",
    path: "/generator/states/new_york/megamillions/analysis/lines",
  },
  {
    label: "COLUMNS",
    color: "#F8C1D9",
    path: "/generator/states/new_york/megamillions/analysis/columns",
  },
];

export default function AnalysisTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<ScrollView>(null);

  // Encontra o tab ativo baseado em path exato!
  const activeIndex = TABS.findIndex(
    (tab) => tab.path.toLowerCase() === pathname?.toLowerCase()
  );

  // Faz scroll automático pro botão ativo (efeito carrossel)
  useEffect(() => {
    if (scrollRef.current && activeIndex > -1) {
      // 132 = largura do botão + marginRight. Ajuste se trocar largura no style!
      scrollRef.current.scrollTo({ x: activeIndex * 132 - 16, animated: true });
    }
  }, [activeIndex]);

  return (
    <View style={styles.filtersPad}>
      <View style={styles.innerWrapper}>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderRow}
          keyboardShouldPersistTaps="handled"
        >
          {TABS.map((btn, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                key={btn.label}
                onPress={() => {
                  if (!isActive) router.push(btn.path);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                }}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: btn.color,
                      opacity: isActive ? 1 : 0.35,
                      transform: [{ scale: isActive ? 1.1 : 1 }],
                      borderWidth: btn.color === "#000000" ? 1.5 : 0,
                      borderColor:
                        btn.color === "#000000" ? "#DDD" : "transparent",
                    },
                    isActive && styles.activeShadow,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      btn.color === "#000000" && { color: "#FFF" },
                      isActive && styles.activeText,
                    ]}
                  >
                    {btn.label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersPad: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    zIndex: 10,
  },
  innerWrapper: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  sliderRow: { flexDirection: "row", gap: 8 },
  filterButton: {
    width: 124,
    height: 38,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  activeShadow: {
    shadowOpacity: 0.19,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  filterButtonText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  activeText: {
    textShadowColor: "#FFF2",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});
