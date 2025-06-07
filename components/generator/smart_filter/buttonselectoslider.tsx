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

interface ButtonItem {
  id: string;
  Component: any;
  route?: string;
}
interface Props {
  state?: string;
  currentGame?: string;
  customButtons?: ButtonItem[];
  onSelect?: (id: string) => void;
}

export default function GameSelectorSlider({
  state = "ny",
  currentGame = "megamillions",
  customButtons,
  onSelect,
}: Props) {
  const BUTTONS = customButtons || [];
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
    if (onSelect) {
      onSelect(id);
    } else if (route) {
      router.push(route);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const ref = itemRefs.current[selectedId];
      if (ref && scrollRef.current) {
        ref.measureLayout(
          scrollRef.current.getInnerViewNode(),
          (x) => {
            scrollRef.current?.scrollTo({
              x: x - width / 2 + 50,
              animated: true,
            });
          },
          () => {}
        );
      }
    }, 300);
  }, [selectedId, width]);

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
              activeOpacity={0.75}
              onPress={() => handlePress(id, route)}
            >
              <View style={styles.logoContainer}>
                <Component width={66} height={30} />
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
    shadowOpacity: 0.13,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginVertical: 2,
    marginHorizontal: 0,
    borderWidth: 0,
  },
  buttonSelected: {
    borderWidth: 2,
    borderColor: "#999",
    shadowOpacity: 0.22,
    elevation: 5,
  },
  logoContainer: {
    width: 66,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // Extra: nunca deixa a logo maior que o botão
  },
  arrow: {
    paddingHorizontal: 10,
  },
});
