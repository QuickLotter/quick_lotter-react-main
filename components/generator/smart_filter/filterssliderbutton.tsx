import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// SVGs dos filtros
import Sum from "@/assets/buttons_slider/sum.svg";
import Odd from "@/assets/buttons_slider/odd.svg";
import Low from "@/assets/buttons_slider/low.svg";
import Prime from "@/assets/buttons_slider/prime.svg";
import Fibonacci from "@/assets/buttons_slider/fibonacci.svg";
import MultOf3 from "@/assets/buttons_slider/multof3.svg";
import Adjacent from "@/assets/buttons_slider/adjacent.svg";
import Sequence from "@/assets/buttons_slider/sequence.svg";
import Repeated from "@/assets/buttons_slider/repeated.svg";
import Digits from "@/assets/buttons_slider/digits.svg";
import Lines from "@/assets/buttons_slider/lines.svg";
import Columns from "@/assets/buttons_slider/columns.svg";

// Componente de filtro de datas
import DateRangeFilter from "@/components/generator/smart_filter/daterangefilter";

type Props = {
  onFilterPress?: (filterId: string) => void;
};

const BUTTONS = [
  { id: "sum", Component: Sum },
  { id: "odd", Component: Odd },
  { id: "low", Component: Low },
  { id: "prime", Component: Prime },
  { id: "fibonacci", Component: Fibonacci },
  { id: "multof3", Component: MultOf3 },
  { id: "adjacent", Component: Adjacent },
  { id: "sequence", Component: Sequence },
  { id: "repeated", Component: Repeated },
  { id: "digits", Component: Digits },
  { id: "lines", Component: Lines },
  { id: "columns", Component: Columns },
];

export default function FiltersSlideButton({ onFilterPress }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Record<string, View | null>>({});
  const { width } = useWindowDimensions();

  const handlePress = (id: string) => {
    setSelectedId(id);
    if (onFilterPress) {
      onFilterPress(id);
    }
  };

  useEffect(() => {
    if (selectedId) {
      setTimeout(() => {
        const ref = itemRefs.current[selectedId];
        if (ref && scrollRef.current) {
          ref.measureLayout(
            scrollRef.current.getInnerViewNode(),
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
    }
  }, [selectedId]);

  return (
    <>
      {/* 🎛️ Slider de filtros */}
      <View style={styles.barBackground}>
        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            contentContainerStyle={styles.sliderContent}
          >
            {BUTTONS.map(({ id, Component }) => (
              <TouchableOpacity
                key={id}
                ref={(el) => (itemRefs.current[id] = el)}
                style={[
                  styles.button,
                  selectedId === id && styles.buttonSelected,
                ]}
                onPress={() => handlePress(id)}
              >
                <Component width={100} height={40} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 📅 Filtro de datas logo abaixo */}
      <View style={{ marginTop: 3 }}>
        <DateRangeFilter />
      </View>
    </>
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
  sliderContainer: {
    maxWidth: 768,
    width: "100%",
    alignSelf: "center",
  },
  sliderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  buttonSelected: {
    opacity: 0.5,
  },
});
