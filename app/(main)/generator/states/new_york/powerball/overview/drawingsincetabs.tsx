// DrawingSinceTabs.tsx
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

// Tabs e rotas
const TABS = [
  {
    label: "DRAWING SINCE",
    path: "/generator/states/new_york/powerball/overview/drawingsince",
  },
  {
    label: "POSITION 01",
    path: "/generator/states/new_york/powerball/overview/position1",
  },
  {
    label: "POSITION 02",
    path: "/generator/states/new_york/powerball/overview/position2",
  },
  {
    label: "POSITION 03",
    path: "/generator/states/new_york/powerball/overview/position3",
  },
  {
    label: "POSITION 04",
    path: "/generator/states/new_york/powerball/overview/position4",
  },
  {
    label: "POSITION 05",
    path: "/generator/states/new_york/powerball/overview/position5",
  },
  {
    label: "POSITION MB",
    path: "/generator/states/new_york/powerball/overview/positionmb",
  },
];

export default function DrawingSinceTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<ScrollView>(null);

  // Tab ativa baseada em path EXATO
  const activeIndex = TABS.findIndex(
    (tab) => tab.path.toLowerCase() === pathname?.toLowerCase()
  );

  // Scroll automático pro tab ativo
  useEffect(() => {
    if (scrollRef.current && activeIndex > -1) {
      // 130 = largura aprox. do botão + gap, ajuste se mudar o style!
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
                  isActive &&
                    (tab.label === "POSITION MB"
                      ? styles.tabButtonActiveYellow
                      : styles.tabButtonActiveBlue),
                  {
                    transform: [{ scale: isActive ? 1.1 : 1 }],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive
                      ? tab.label === "POSITION MB"
                        ? { color: "#222" }
                        : { color: "#fff" }
                      : { color: "#D0021B" },
                  ]}
                >
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
    shadowColor: "#D0021B",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonActiveBlue: {
    backgroundColor: "#D0021B",
    borderColor: "#D0021B",
    shadowColor: "#D0021B",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButtonActiveYellow: {
    backgroundColor: "#FDB927",
    borderColor: "#FDB927",
    shadowColor: "#FDB927",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButtonText: {
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.09,
  },
});
