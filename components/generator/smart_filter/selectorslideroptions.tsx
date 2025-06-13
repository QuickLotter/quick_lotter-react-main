import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { findNodeHandle } from "react-native";

type Props = {
  onFilterPress?: (filterId: string) => void;
};

const BUTTONS = [
  {
    id: "analysis",
    icon: "analytics-outline",
    label: "Analysis",
    color: "#A65918",
  },
  {
    id: "edit_filter",
    icon: "options-outline",
    label: "Edit Filter",
    color: "#37954A",
  },
  { id: "open", icon: "folder-open-outline", label: "Open", color: "#318CFA" },
  { id: "delete", icon: "trash-outline", label: "Delete", color: "#C6293F" },
];

export default function SelectorSliderOptions({ onFilterPress }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Record<string, View | null>>({});
  const { width } = useWindowDimensions();

  const handlePress = (id: string) => {
    setSelectedId(id);
    onFilterPress?.(id);
  };

  useEffect(() => {
    if (selectedId) {
      setTimeout(() => {
        const ref = itemRefs.current[selectedId];
        if (ref && scrollRef.current) {
          ref.measureLayout(
            findNodeHandle(scrollRef.current), // ← CORRETO!
            (x) => {
              scrollRef.current.scrollTo({
                x: x - width / 2 + 70,
                animated: true,
              });
            },
            () => {}
          );
        }
      }, 300);
    }
  }, [selectedId, width]);

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
          {BUTTONS.map(({ id, icon, label, color }) => {
            const isActive = selectedId === id;
            return (
              <TouchableOpacity
                key={id}
                ref={(el) => (itemRefs.current[id] = el)}
                style={[
                  styles.button,
                  { backgroundColor: color },
                  isActive && styles.buttonSelected,
                ]}
                onPress={() => handlePress(id)}
              >
                <Ionicons name={icon} size={20} color="#fff" />
                <Text style={styles.label}>{label}</Text>
              </TouchableOpacity>
            );
          })}
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
    alignItems: "center",
    gap: 12,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // garante centralização
    width: 140,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 0, // centraliza melhor
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  buttonSelected: {
    opacity: 0.7,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8, // espaço entre ícone e texto
  },
  arrow: {
    paddingHorizontal: 10,
  },
});
