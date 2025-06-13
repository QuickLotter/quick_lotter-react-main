// components/generator/smart_filter/gameselectorslider.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { findNodeHandle } from "react-native";

// SVGs padrões
import Powerball from "@/assets/buttons_slider/powerball.svg";
import Megamillions from "@/assets/buttons_slider/megamillions.svg";
import Cash4life from "@/assets/buttons_slider/cash4life.svg";
import NyLotto from "@/assets/buttons_slider/nylotto.svg";
import Pick10 from "@/assets/buttons_slider/pick10.svg";
import Take5Midday from "@/assets/buttons_slider/take5_midday.svg";
import Take5Evening from "@/assets/buttons_slider/take5_evening.svg";
import Win4Midday from "@/assets/buttons_slider/win4_midday.svg";
import Win4Evening from "@/assets/buttons_slider/win4_evening.svg";
import NumbersMidday from "@/assets/buttons_slider/numbers_midday.svg";
import NumbersEvening from "@/assets/buttons_slider/numbers_evening.svg";

const DEFAULT_BUTTONS = [
  {
    id: "powerball",
    Component: Powerball,
    route: "/(main)/generator/NY/powerball",
  },
  {
    id: "megamillions",
    Component: Megamillions,
    route: "/(main)/generator/NY/megamillions",
  },
  {
    id: "cash4life",
    Component: Cash4life,
    route: "/(main)/generator/NY/cash4life",
  },
  {
    id: "nylotto",
    Component: NyLotto,
    route: "/(main)/generator/NY/nylotto",
  },
  {
    id: "pick10",
    Component: Pick10,
    route: "/(main)/generator/NY/pick10",
  },
  {
    id: "take5_midday",
    Component: Take5Midday,
    route: "/(main)/generator/NY/take5_midday",
  },
  {
    id: "take5_evening",
    Component: Take5Evening,
    route: "/(main)/generator/NY/take5_evening",
  },
  {
    id: "win4_midday",
    Component: Win4Midday,
    route: "/(main)/generator/NY/win4_midday",
  },
  {
    id: "win4_evening",
    Component: Win4Evening,
    route: "/(main)/generator/NY/win4_evening",
  },
  {
    id: "numbers_midday",
    Component: NumbersMidday,
    route: "/(main)/generator/NY/numbers_midday",
  },
  {
    id: "numbers_evening",
    Component: NumbersEvening,
    route: "/(main)/generator/NY/numbers_evening",
  },
];

interface ButtonItem {
  id: string;
  Component: any;
  route?: string;
}

export default function GameSelectorSlider({
  state = "ny",
  currentGame = "megamillions",
  customButtons,
}: {
  state?: string;
  currentGame?: string;
  customButtons?: ButtonItem[];
}) {
  const BUTTONS = customButtons || DEFAULT_BUTTONS; // <- Aqui o truque
  const [selectedId, setSelectedId] = useState(currentGame);
  const scrollRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Record<string, View | null>>({});
  const { width } = useWindowDimensions();
  const router = useRouter();

  const handleScroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollTo({
      x: direction === "left" ? 0 : 1000,
      animated: true,
    });
  };

  const handlePress = (id: string, route?: string) => {
    setSelectedId(id);
    if (route) router.push(route);
  };

  useEffect(() => {
    setTimeout(() => {
      const ref = itemRefs.current[selectedId];
      if (ref && scrollRef.current) {
        ref.measureLayout(
          findNodeHandle(scrollRef.current), // <-- ESTA LINHA CORRIGE
          (x) => {
            scrollRef.current?.scrollTo({
              x: x - width / 2 + 45,
              animated: true,
            });
          },
          () => {}
        );
      }
    }, 300);
  }, []);

  return (
    <View style={styles.barBackground}>
      {width >= 1200 && (
        <TouchableOpacity
          onPress={() => handleScroll("left")}
          style={styles.arrow}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}

      <View style={styles.sliderWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={styles.sliderContent}
        >
          {BUTTONS.map(({ id, Component, route }) => (
            <TouchableOpacity
              key={id}
              ref={(el) => (itemRefs.current[id] = el)}
              style={[
                styles.button,
                selectedId === id && styles.buttonSelected,
              ]}
              onPress={() => handlePress(id, route)}
            >
              <View style={selectedId === id ? styles.grayscale : undefined}>
                <Component width={90} height={35} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {width >= 1200 && (
        <TouchableOpacity
          onPress={() => handleScroll("right")}
          style={styles.arrow}
        >
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  barBackground: {
    width: "100%",
    height: 56,
    backgroundColor: "#F1F1F1",
    borderBottomWidth: 1,
    borderColor: "#DFDEE8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // valor médio
    maxWidth: 768,
    alignSelf: "center",
    width: "100%",
  },
  sliderContent: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 19.2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  buttonSelected: {
    opacity: 0.5,
  },
  icon: {
    width: 24, // ajuste conforme necessário
    height: 24, // ajuste conforme necessário
  },
  iconSelected: {
    tintColor: "#999999", // ou aplicar diretamente no SVG via props (ver abaixo)
  },
  grayscale: {
    filter: "grayscale(100%)",
  },
  arrow: {
    paddingHorizontal: 10,
  },
});
