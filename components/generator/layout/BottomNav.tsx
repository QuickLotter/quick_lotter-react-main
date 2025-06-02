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

// Importa o contexto de localização
import { useLocation } from "@/app/(main)/context/LocationContext"; // ajuste se o path mudar

// Cores padrão
const ACTIVE_COLOR = "#007EFF";
const INACTIVE_COLOR = "#909090";
const BG_COLOR = "#fff";
const LABEL_SIZE = 12;
const NAV_HEIGHT = 56;

/**
 * Gera o array de itens do menu com rotas dinâmicas pelo estado
 * @param state O estado selecionado, ex: 'AZ', 'NY'
 */
const getNavItems = (state: string | null) => {
  // fallback se não houver estado selecionado (exibe NY)
  const stateSlug = state ? state.toLowerCase() : "new_york";
  return [
    {
      route: "/home",
      label: "Home",
      icon: (color: string) => <Ionicons name="home" size={24} color={color} />,
    },
    {
      route: `/analysis/${stateSlug}/analysis`,
      label: "Analysis",
      icon: (color: string) => (
        <MaterialIcons name="analytics" size={24} color={color} />
      ),
    },
    {
      route: `/overview/${stateSlug}/overview`,
      label: "Overview",
      icon: (color: string) => <Entypo name="eye" size={24} color={color} />,
    },
    {
      route: `/checker/${stateSlug}`,
      label: "Checker",
      icon: (color: string) => (
        <FontAwesome5 name="check" size={20} color={color} />
      ),
    },
    {
      route: `/results/${stateSlug}`,
      label: "Results",
      icon: (color: string) => (
        <MaterialIcons name="emoji-events" size={24} color={color} />
      ),
    },
  ];
};

export default function BottomNav() {
  const { state } = useLocation(); // Captura o estado selecionado globalmente
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Gera dinamicamente o menu
  const NAV_ITEMS = getNavItems(state);

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
        {NAV_ITEMS.map(({ route, label, icon }, idx) => {
          // Ativo se o pathname começa com a rota daquele botão
          const isActive =
            pathname === route ||
            (route !== "/home" && pathname?.startsWith(route));
          return (
            <TouchableOpacity
              key={route}
              style={styles.navItem}
              activeOpacity={0.75}
              onPress={() => {
                // Garante navegação para rota correta do estado selecionado!
                if (pathname !== route) {
                  router.push(route);
                }
              }}
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
    // Elevação/sombra leve no Android/iOS
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
