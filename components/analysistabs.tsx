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
import { ANALYSIS_TABS } from "@/constants/analysisTabsConfig";

export default function AnalysisTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<ScrollView>(null);

  // Extrai o estado e o jogo da rota: /generator/states/XX/JOGO/analysis/ROTA
  const match = pathname?.match(
    /\/generator\/states\/([^/]+)\/([^/]+)\/analysis\/([^/]+)/i
  );
  const state = match?.[1] || "ny";
  const game = match?.[2] || "megamillions";
  const route = match?.[3] || "sum";

  // Tabs específicas do jogo atual
  const TABS = ANALYSIS_TABS[game] || [];

  // Caminho base do jogo para montar o push de navegação
  const basePath = `/generator/states/${state}/${game}/analysis`;

  // Descobre o tab ativo pelo route (ex: "sum", "odd"...)
  const activeIndex = TABS.findIndex((tab) => tab.route === route);

  // Scroll para o tab ativo
  useEffect(() => {
    if (scrollRef.current && activeIndex > -1) {
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
                  if (!isActive) router.push(`${basePath}/${btn.route}`);
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
