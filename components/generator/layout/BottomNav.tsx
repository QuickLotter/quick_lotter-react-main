// components/layout/BottomNav.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
const INACTIVE_COLOR = "#909090";
const BG_COLOR = "#fff";
const LABEL_SIZE = 12;
const NAV_HEIGHT = 56;

const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (color: string) => <Ionicons name="home" size={24} color={color} />,
    // route será dinâmico!
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
      <FontAwesome5 name="check" size={20} color={color} />
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

  // Garante sempre um estado válido, default para "ny" se não houver:
  const userState = state || "NY";
  const stateSlug = userState.toLowerCase();

  // Rotas dinâmicas usando stateSlug (sempre minúsculo)
  const routes = {
    home: "/home",
    analysis: `/analysis/${stateSlug}/analysis`,
    overview: `/overview/${stateSlug}/overview`,
    checker: `/checker/${stateSlug}/checker`,
    results: `/results/${stateSlug}/results`,
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
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const route = routes[key as keyof typeof routes];
          // Mantém ativa se o pathname começa com a rota base:
          const isActive = pathname?.startsWith(route);
          return (
            <TouchableOpacity
              key={key}
              style={styles.navItem}
              activeOpacity={0.75}
              onPress={() => router.push(route)}
            >
              {icon(isActive ? ACTIVE_COLOR : INACTIVE_COLOR)}
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                    fontWeight: isActive ? "600" : "400",
                  },
                ]}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 50,
  },
  navInner: {
    flexDirection: "row",
    width: "100%",
    height: NAV_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    minHeight: 48,
  },
  label: {
    fontSize: LABEL_SIZE,
    marginTop: 2,
    letterSpacing: 0.1,
  },
});
