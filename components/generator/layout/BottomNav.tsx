import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useLocation } from "@/app/(main)/context/LocationContext";

const ACTIVE_COLOR = "#007EFF";
const INACTIVE_COLOR = "#A3A7B5";
const BG_COLOR = "#fff";
const LABEL_SIZE = 13.5;
const NAV_HEIGHT = 56;

const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (color: string) => <Ionicons name="home" size={25} color={color} />,
  },
  {
    key: "analysis",
    label: "Analysis",
    icon: (color: string) => (
      <MaterialIcons name="analytics" size={24} color={color} />
    ),
  },
  {
    key: "overview",
    label: "Overview",
    icon: (color: string) => <Entypo name="eye" size={24} color={color} />,
  },
  {
    key: "checker",
    label: "Checker",
    icon: (color: string) => (
      <FontAwesome5 name="check" size={21} color={color} />
    ),
  },
  {
    key: "results",
    label: "Results",
    icon: (color: string) => (
      <MaterialIcons name="emoji-events" size={24} color={color} />
    ),
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { state } = useLocation();
  const scaleAnim = useRef(NAV_ITEMS.map(() => new Animated.Value(1))).current;

  const userState = state || "NY";
  const stateSlug = userState.toLowerCase();

  const routes = {
    home: "/home",
    analysis: `/analysis/${stateSlug}/analysis`,
    overview: `/overview/${stateSlug}/overview`,
    checker: `/checker/${stateSlug}/checker`,
    results: `/results/${stateSlug}/results`,
  };

  // Qual tab está ativa?
  const activeIndex = NAV_ITEMS.findIndex(({ key }) =>
    pathname?.startsWith(routes[key as keyof typeof routes])
  );

  // Função para animação de feedback no toque
  const handlePressIn = (i: number) => {
    Animated.spring(scaleAnim[i], {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 25,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = (i: number) => {
    Animated.spring(scaleAnim[i], {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 6,
    }).start();
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 4),
          height: NAV_HEIGHT + Math.max(insets.bottom, 4),
        },
      ]}
    >
      <ResponsiveContainer style={styles.navInner}>
        {NAV_ITEMS.map(({ key, label, icon }, i) => {
          const route = routes[key as keyof typeof routes];
          const isActive = i === activeIndex;

          return (
            <TouchableOpacity
              key={key}
              style={styles.navItem}
              activeOpacity={0.8}
              onPress={() => router.push(route)}
              onPressIn={() => handlePressIn(i)}
              onPressOut={() => handlePressOut(i)}
              accessibilityRole="button"
              accessibilityLabel={label}
            >
              <Animated.View
                style={[
                  styles.iconWrapper,
                  {
                    transform: [{ scale: scaleAnim[i] }],
                    opacity: isActive ? 1 : 0.74,
                  },
                ]}
              >
                {icon(isActive ? ACTIVE_COLOR : INACTIVE_COLOR)}
                {isActive && <View style={styles.activeBar} />}
              </Animated.View>
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                    fontWeight: isActive ? "700" : "400",
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ResponsiveContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: BG_COLOR,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    position: "absolute",
    bottom: 0,
    left: 0,
    shadowColor: "#007EFF",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: Platform.OS === "ios" ? 0.09 : 0.06,
    shadowRadius: 14,
    elevation: 10,
    zIndex: 50,
  },
  navInner: {
    flexDirection: "row",
    width: "100%",
    height: NAV_HEIGHT,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 54,
    minHeight: 44,
    paddingTop: 3,
    paddingBottom: 1,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 28,
    position: "relative",
  },
  activeBar: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    marginLeft: -13,
    width: 26,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: "#007EFF",
    opacity: 0.78,
    shadowColor: "#007EFF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: LABEL_SIZE,
    marginTop: 2,
    letterSpacing: 0.07,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    textAlign: "center",
  },
});
