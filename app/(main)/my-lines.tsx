import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { Ionicons } from "@expo/vector-icons";

// Logos
import Cash4LifeLogo from "@/assets/images/ny_game_logo/cash4life.svg";
import MegaMillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";
import NumbersMiddayLogo from "@/assets/images/ny_game_logo/numbers_midday.svg";
import NumbersEveningLogo from "@/assets/images/ny_game_logo/numbers_evening.svg";
import NYLottoLogo from "@/assets/images/ny_game_logo/nylotto.svg";
import Pick10Logo from "@/assets/images/ny_game_logo/pick10.svg";
import PowerballLogo from "@/assets/images/ny_game_logo/powerball.svg";
import Take5MiddayLogo from "@/assets/images/ny_game_logo/take5_midday.svg";
import Take5EveningLogo from "@/assets/images/ny_game_logo/take5_evening.svg";
import Win4MiddayLogo from "@/assets/images/ny_game_logo/win4_midday.svg";
import Win4EveningLogo from "@/assets/images/ny_game_logo/win4_evening.svg";

// Cores iOS
const COLORS = {
  background: "#F6F6F8",
  card: "#FFF",
  border: "#E5E7EB",
  text: "#23242A",
  muted: "#8C95A3",
  blue: "#007AFF",
  red: "#FF3B30",
  green: "#22C55E",
  shadow: "#111A1A",
};

const initialGames = [
  {
    id: "1",
    name: "Lucky Pick 1",
    date: "2025-05-15",
    logo: <PowerballLogo width={48} height={48} />,
  },
  {
    id: "2",
    name: "Even Numbers Combo",
    date: "2025-05-12",
    logo: <MegaMillionsLogo width={48} height={48} />,
  },
  {
    id: "3",
    name: "Midday Numbers",
    date: "2025-05-11",
    logo: <NumbersMiddayLogo width={48} height={48} />,
  },
  {
    id: "4",
    name: "Evening Numbers",
    date: "2025-05-10",
    logo: <NumbersEveningLogo width={48} height={48} />,
  },
  {
    id: "5",
    name: "NY Lotto Entry",
    date: "2025-05-09",
    logo: <NYLottoLogo width={48} height={48} />,
  },
];

export default function MyLinesScreen() {
  const insets = useSafeAreaInsets();
  const [savedGames, setSavedGames] = useState(initialGames);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function showDeleteModal(id: string) {
    setDeleteModalVisible(true);
    setDeleteId(id);
  }
  function hideDeleteModal() {
    setDeleteModalVisible(false);
    setDeleteId(null);
  }
  function doDelete() {
    if (deleteId)
      setSavedGames((prev) => prev.filter((g) => g.id !== deleteId));
    hideDeleteModal();
  }

  const handleCheck = (item: any) => console.log("✔️ Checked:", item.name);
  const handlePrint = (item: any) => console.log("🖨️ Print:", item.name);
  const handleDownload = (item: any) => console.log("⬇️ Download:", item.name);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack title="" />
      <Text style={styles.pageTitle}>📄 My Saved Lines</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ResponsiveContainer>
          <FlatList
            data={savedGames}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Pressable
                  hitSlop={14}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.deletePressed,
                  ]}
                  onPress={() => showDeleteModal(item.id)}
                >
                  <Ionicons name="close" size={21} color={COLORS.muted} />
                </Pressable>

                <View style={styles.header}>
                  {item.logo}
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => handleCheck(item)}
                    style={({ pressed }) => [
                      styles.iosButton,
                      { backgroundColor: COLORS.green },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color="#fff"
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      Check
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handlePrint(item)}
                    style={({ pressed }) => [
                      styles.iosButton,
                      { backgroundColor: COLORS.blue },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="print-outline"
                      size={17}
                      color="#fff"
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      Print
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleDownload(item)}
                    style={({ pressed }) => [
                      styles.iosButton,
                      { backgroundColor: "#222" },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="download-outline"
                      size={17}
                      color="#fff"
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      Download
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <Modal
            visible={deleteModalVisible}
            transparent
            animationType="fade"
            onRequestClose={hideDeleteModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Ionicons
                  name="trash-outline"
                  size={36}
                  color={COLORS.red}
                  style={{ marginBottom: 6 }}
                />
                <Text style={styles.modalTitle}>Delete Saved Line</Text>
                <Text style={styles.modalMsg}>
                  Are you sure you want to delete this saved line?
                </Text>
                <View style={styles.modalActions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalBtn,
                      styles.cancelBtn,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={hideDeleteModal}
                  >
                    <Text style={{ color: "#222", fontWeight: "bold" }}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalBtn,
                      styles.deleteBtn,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={doDelete}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Yes, Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ResponsiveContainer>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.blue,
    marginTop: 10,
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.01,
  },
  card: {
    borderRadius: 18,
    backgroundColor: COLORS.card,
    padding: 18,
    marginBottom: 16,
    position: "relative",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 13,
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 7,
    borderRadius: 999,
    backgroundColor: "#F2F2F2",
  },
  deletePressed: {
    opacity: 0.6,
    backgroundColor: "#eaeaea",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    gap: 12,
  },
  date: {
    fontSize: 15,
    color: COLORS.muted,
    fontWeight: "600",
    marginLeft: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 13,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
    justifyContent: "space-between",
    marginTop: 3,
  },
  icon: {
    marginRight: 6,
  },
  iosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 999,
    minWidth: 94,
    flexGrow: 1,
    marginRight: 2,
    marginLeft: 2,
    shadowColor: COLORS.blue,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.03,
  },
  pressed: {
    opacity: 0.65,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.19)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 32,
    alignItems: "center",
    minWidth: 270,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 12,
  },
  modalTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.text,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  modalMsg: {
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 28,
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  modalActions: {
    flexDirection: "row",
    gap: 18,
    marginTop: 2,
  },
  modalBtn: {
    borderRadius: 999,
    paddingVertical: 13,
    paddingHorizontal: 29,
    minWidth: 80,
    alignItems: "center",
    marginHorizontal: 2,
  },
  cancelBtn: {
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderColor: "#eee",
  },
  deleteBtn: {
    backgroundColor: COLORS.red,
  },
});
