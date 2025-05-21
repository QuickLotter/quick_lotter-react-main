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
import { Colors } from "@/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

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

  // Modal state for deletion
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
      <HeaderLogoBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ResponsiveContainer>
          <View style={{ height: insets.top + 160 }} />
          <Text style={styles.title}>📄 My Saved Lines</Text>
          <FlatList
            data={savedGames}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {/* X Button */}
                <Pressable
                  hitSlop={16}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.deletePressed,
                  ]}
                  onPress={() => showDeleteModal(item.id)}
                >
                  <Ionicons name="close" size={18} color="#777" />
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
                      styles.button,
                      { backgroundColor: "#00FF38" },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#000"
                      style={styles.icon}
                    />
                    <Text style={[styles.buttonText, { color: "#000" }]}>
                      Check
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handlePrint(item)}
                    style={({ pressed }) => [
                      styles.button,
                      { backgroundColor: "#000" },
                      pressed && styles.pressed,
                    ]}
                  >
                    <MaterialIcons
                      name="print"
                      size={16}
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
                      styles.button,
                      { backgroundColor: "#007AFF" },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons
                      name="download-outline"
                      size={16}
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

          {/* Custom Modal Alert */}
          <Modal
            visible={deleteModalVisible}
            transparent
            animationType="fade"
            onRequestClose={hideDeleteModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
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
                      Yes
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 4,
    borderRadius: 999,
  },
  deletePressed: {
    opacity: 0.6,
    backgroundColor: "#eee",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  date: {
    fontSize: 14,
    color: "#777",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 6,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    flexGrow: 1,
  },
  buttonText: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.65,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 28,
    alignItems: "center",
    minWidth: 270,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 14,
  },
  modalMsg: {
    color: "#222",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    gap: 14,
  },
  modalBtn: {
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  cancelBtn: {
    backgroundColor: "#eee",
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: "#FF3333",
  },
});
