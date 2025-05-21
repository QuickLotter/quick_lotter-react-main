//index com gameSliderCard

import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import GameCardSlider from "@/components/cards/GameCardSlider"; // <<-- NOVO
import MenuDrawer from "../menu-drawer";
import { GameData } from "@/types/GameData";
import { fetchNewYorkGames } from "@/states/new_york/games";

const DRAWER_WIDTH = 300;

export default function HomeScreen() {
  const router = useRouter();
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-DRAWER_WIDTH))[0];

  useEffect(() => {
    async function loadGames() {
      const data = await fetchNewYorkGames();
      setGames(data);
      setLoading(false);
    }
    loadGames();
  }, []);

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <View style={styles.container}>
      <HeaderLogoBack onMenuPress={openDrawer} />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ResponsiveContainer>
            <GameCardSlider games={games} />
          </ResponsiveContainer>
        </ScrollView>
      )}

      <BottomNav />

      <Modal transparent visible={drawerVisible} animationType="none">
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
    backgroundColor: "#ECF1FF",
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#ECF1FF",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },
});
