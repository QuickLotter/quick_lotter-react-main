import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// SVGs dos botões
import Analysis from "@/assets/buttons_slider/analysis.svg";
import EditFilter from "@/assets/buttons_slider/edit_filter.svg";
import Open from "@/assets/buttons_slider/open.svg";
import Checker from "@/assets/buttons_slider/checker.svg";
import Delete from "@/assets/buttons_slider/delete.svg";

type Props = {
  onFilterPress?: (filterId: string) => void;
};

const BUTTONS = [
  { id: "open", Component: Open },
  { id: "delete", Component: Delete },
];

export default function SelectorSliderOptions({ onFilterPress }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Record<string, View | null>>({});
  const { width } = useWindowDimensions();

  const handlePress = (id: string) => {
    setSelectedId(id);
    if (onFilterPress) {
      onFilterPress(id); // 🚀 dispara evento para a página pai
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
    <View style={styles.barBackground}>
      {width >= 1200 && (
        <TouchableOpacity
          onPress={() => scrollRef.current?.scrollTo({ x: 0, animated: true })}
          style={styles.arrow}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={styles.sliderContent}
      >
        <View style={styles.sliderWrapper}>
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
        </View>
      </ScrollView>

      {width >= 1200 && (
        <TouchableOpacity
          onPress={() =>
            scrollRef.current?.scrollTo({ x: 1000, animated: true })
          }
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
    gap: 1,
    maxWidth: 768,
    alignSelf: "center",
    width: "100%",
  },
  sliderContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  buttonSelected: {
    opacity: 0.5,
  },
  arrow: {
    paddingHorizontal: 10,
  },
});
