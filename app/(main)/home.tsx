import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import GameCardSlider from "@/components/cards/GameCardSlider";
import MenuDrawer from "./menu-drawer";
import { GameData } from "@/types/GameData";
import { useLocation } from "@/app/(main)/context/LocationContext";
import { fetchGamesByState } from "@/utils/fetchGamesByState"; // NOVO

const DRAWER_WIDTH = 300;

export default function HomeScreen() {
  const router = useRouter();
  const { state, loading: stateLoading } = useLocation(); // NOVO
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-DRAWER_WIDTH))[0];

  // Sempre que o estado mudar, atualiza a lista de jogos!
  useEffect(() => {
    async function loadGames() {
      if (!state || stateLoading) return;
      setLoading(true);
      const data = await fetchGamesByState(state);
      setGames(data);
      setLoading(false);
    }
    loadGames();
  }, [state, stateLoading]);

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 230,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 220,
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <View style={styles.container}>
      <HeaderLogoBack onMenuPress={openDrawer} />
      {loading || stateLoading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 100 }}
          color="#007AFF"
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces
        >
          <ResponsiveContainer>
            <GameCardSlider games={games} />
          </ResponsiveContainer>
        </ScrollView>
      )}

      <BottomNav />

      <Modal
        transparent
        visible={drawerVisible}
        animationType="none"
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={closeDrawer} />
          <Animated.View style={[styles.drawer, { left: slideAnim }]}>
            <MenuDrawer />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F8",
  },
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 24,
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#F6F6F8",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.17,
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 7 : 0,
    zIndex: 999,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
});
