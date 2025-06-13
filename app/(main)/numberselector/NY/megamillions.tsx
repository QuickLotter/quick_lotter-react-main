import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

// ====== TABS PARA A PASTA MEGAMILLIONS ======
const TABS = [
  {
    label: "Selecionar Números",
    route: "/generator/ny/megamillions",
  }, // index.tsx
  {
    label: "Números Gerados",
    route: "/generator/ny/megamillions/MyLines",
  },
  {
    label: "Edit Filters",
    route: "/generator/ny/megamillions/edit_filters",
  },
  {
    label: "Configurações",
    route: "/generator/ny/megamillions/generatorsetting",
  },
  {
    label: "Checker",
    route: "/generator/ny/megamillions/checker",
  },
  // Adicione mais abas se tiver outras páginas!
];

export default function MegamillionsGeneratorPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1, backgroundColor: "#ECF1FF" }}>
      {/* NAV TABS */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map((tab) => {
            // Checa se é a aba ativa
            const isActive =
              tab.route === "/generator/ny/megamillions"
                ? pathname === tab.route ||
                  pathname === "/generator/ny/megamillions/index"
                : pathname === tab.route;
            return (
              <TouchableOpacity
                key={tab.route}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => !isActive && router.push(tab.route)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Conteúdo principal da página */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 22, color: "#1A237E", fontWeight: "bold" }}>
          Mega Millions - Selecionar Números
        </Text>
        <Text style={{ fontSize: 16, color: "#222", marginTop: 12 }}>
          (Aqui vai o conteúdo da página principal do generator Mega Millions)
        </Text>
        {/* ...restante do seu conteúdo (inputs, grades, botões, etc) */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsWrapper: {
    backgroundColor: "#ECF1FF",
    paddingTop: 10,
    paddingBottom: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ECF1FF",
  },
  activeTabButton: {
    backgroundColor: "#0E4CA1",
    borderColor: "#0E4CA1",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0E4CA1",
  },
  activeTabText: {
    color: "#fff",
  },
});
