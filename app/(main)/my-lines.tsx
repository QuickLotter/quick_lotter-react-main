import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import BottomNav from "@/components/generator/layout/BottomNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/app/(auth)/supabaseClient";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRouter } from "expo-router";
import PdfIcon from "@/assets/icons/pdf.svg";
import CsvIcon from "@/assets/icons/csv.svg";
import { LotteryLogo } from "@/components/shared/LotteryLogo"; // NOVO

const COLORS = {
  background: "#F6F6F8",
  card: "#FFF",
  border: "#E5E7EB",
  text: "#23242A",
  muted: "#8C95A3",
  blue: "#007AFF",
  red: "#FF3B30",
  green: "#22C55E",
  shadow: "#132347",
};

export default function MyLinesScreen() {
  const insets = useSafeAreaInsets();
  const [savedGames, setSavedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [downloadModal, setDownloadModal] = useState(false);
  const [downloadGame, setDownloadGame] = useState<any>(null);
  const [printModal, setPrintModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSavedLines() {
      setLoading(true);
      const { data, error } = await supabase
        .from("saved_lines")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setSavedGames(data || []);
      setLoading(false);
    }
    fetchSavedLines();
  }, []);

  function showDeleteModal(id: string) {
    setDeleteModalVisible(true);
    setDeleteId(id);
  }
  function hideDeleteModal() {
    setDeleteModalVisible(false);
    setDeleteId(null);
  }
  async function doDelete() {
    if (deleteId) {
      await supabase.from("saved_lines").delete().eq("id", deleteId);
      setSavedGames((prev) => prev.filter((g) => g.id !== deleteId));
    }
    hideDeleteModal();
  }

  // CHECK: Carrega os jogos e navega para checker
  const handleCheck = (item: any) => {
    let checkerRoute = "";
    // Você pode customizar conforme seus jogos:
    switch (item.game_id) {
      case "powerball":
        checkerRoute = "/checker/ny/powerball";
        break;
      case "megamillions":
        checkerRoute = "/checker/ny/megamillions";
        break;
      case "win4_midday_ny":
      case "win4_midday":
        checkerRoute = "/checker/ny/win4_midday";
        break;
      // ...adicione para cada jogo
      default:
        Alert.alert(
          "Not supported",
          "Checker not implemented for this game yet."
        );
        return;
    }
    router.push({
      pathname: checkerRoute,
      params: { data: encodeURIComponent(JSON.stringify(item.lines)) },
    });
  };

  // PRINT: Apenas exibe modal/placeholder
  const handlePrint = (item: any) => {
    setPrintModal(true);
  };

  // DOWNLOAD: Popup para escolher formato e salvar
  const handleDownload = (item: any) => {
    setDownloadGame(item);
    setDownloadModal(true);
  };

  // EXPORTA TXT OU CSV E SALVA
  async function exportLinesToFile(item: any, type: "txt" | "csv") {
    let content = "";
    if (type === "csv") {
      content =
        "Game,Numbers\n" +
        item.lines
          .map(
            (line: any, idx: number) =>
              `${item.name || "Line " + (idx + 1)},"${(
                line.mainNumbers ||
                line.numbers ||
                []
              ).join("-")}${
                line.extraNumbers ? " | " + line.extraNumbers.join("-") : ""
              }"`
          )
          .join("\n");
    } else {
      // TXT
      content = item.lines
        .map(
          (line: any, idx: number) =>
            `Line ${idx + 1}: ${(line.mainNumbers || line.numbers || []).join(
              " "
            )}${line.extraNumbers ? " | " + line.extraNumbers.join(" ") : ""}`
        )
        .join("\n");
    }
    const fileUri =
      FileSystem.cacheDirectory +
      `${item.name || "lines"}_${new Date().getTime()}.${type}`;
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    setDownloadModal(false);
    setTimeout(() => {
      Sharing.shareAsync(fileUri, {
        mimeType: type === "csv" ? "text/csv" : "text/plain",
        dialogTitle: "Save or share your lines",
      });
    }, 300);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack title="" />
      <Text style={styles.pageTitle}>📄 My Saved Lines</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.blue}
              style={{ marginTop: 80 }}
            />
          ) : (
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
                    <Ionicons name="close" size={20} color={COLORS.muted} />
                  </Pressable>

                  <View style={styles.header}>
                    <View style={styles.logoBox}>
                      <LotteryLogo logoPath={item.logo_path} size={44} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.date}>
                        {item.created_at?.slice(0, 10) || "—"}
                      </Text>
                    </View>
                  </View>
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
                        size={18}
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
                        size={18}
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
                        size={18}
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
          )}

          {/* Modal Delete */}
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
                  style={{ marginBottom: 7 }}
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

          {/* Modal Print - apenas placeholder! */}
          <Modal
            visible={printModal}
            transparent
            animationType="slide"
            onRequestClose={() => setPrintModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Ionicons
                  name="print-outline"
                  size={36}
                  color={COLORS.blue}
                  style={{ marginBottom: 7 }}
                />
                <Text style={styles.modalTitle}>Print Lines</Text>
                <Text style={styles.modalMsg}>Printing is coming soon.</Text>
                <Pressable
                  style={[styles.modalBtn, styles.cancelBtn, { minWidth: 110 }]}
                  onPress={() => setPrintModal(false)}
                >
                  <Text style={{ color: "#222", fontWeight: "bold" }}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Modal Download - minimalista, só os ícones */}
          <Modal
            visible={downloadModal}
            transparent
            animationType="slide"
            onRequestClose={() => setDownloadModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBoxDownload}>
                <Ionicons
                  name="download-outline"
                  size={32}
                  color="#222"
                  style={{ marginBottom: 4 }}
                />
                <Text style={styles.modalTitleDownload}>Download as...</Text>
                <View style={styles.downloadIconsRow}>
                  <TouchableOpacity
                    style={[
                      styles.downloadIconBtn,
                      { backgroundColor: "#D90416", marginRight: 18 },
                    ]}
                    onPress={() => exportLinesToFile(downloadGame, "pdf")}
                  >
                    <PdfIcon width={38} height={38} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.downloadIconBtn,
                      { backgroundColor: "#95D630" },
                    ]}
                    onPress={() => exportLinesToFile(downloadGame, "csv")}
                  >
                    <CsvIcon width={38} height={38} />
                  </TouchableOpacity>
                </View>
                <Pressable
                  style={[
                    styles.modalBtn,
                    styles.cancelBtn,
                    { minWidth: 110, marginTop: 12 },
                  ]}
                  onPress={() => setDownloadModal(false)}
                >
                  <Text style={{ color: "#222", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ResponsiveContainer>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

// STYLESHEET
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
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.blue,
    marginTop: 12,
    marginBottom: 16,
    letterSpacing: 0.01,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.card,
    padding: 20,
    marginBottom: 18,
    position: "relative",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: Platform.OS === "android" ? 4 : 0,
    borderWidth: 1,
    borderColor: "#F1F1F3",
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 7,
    borderRadius: 999,
    backgroundColor: "#F6F7FB",
  },
  deletePressed: {
    opacity: 0.7,
    backgroundColor: "#EAEAEA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 13,
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F5F8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#8DA7E6",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: "600",
    marginTop: 2,
    marginLeft: 1,
    letterSpacing: 0.02,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
    color: COLORS.text,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.01,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
    justifyContent: "space-between",
    marginTop: 4,
  },
  icon: {
    marginRight: 7,
  },
  iosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 999,
    minWidth: 94,
    flexGrow: 1,
    marginRight: 3,
    marginLeft: 3,
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
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 36,
    alignItems: "center",
    minWidth: 270,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 21,
    elevation: 12,
  },
  modalTitle: {
    fontWeight: "800",
    fontSize: 19,
    marginBottom: 11,
    color: COLORS.text,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  modalMsg: {
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 30,
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  modalActions: {
    flexDirection: "row",
    gap: 22,
    marginTop: 2,
  },
  modalBtn: {
    borderRadius: 999,
    paddingVertical: 13,
    paddingHorizontal: 31,
    minWidth: 88,
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

  // Download MODAL minimalista com ícones só!
  modalBoxDownload: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 30,
    alignItems: "center",
    minWidth: 320,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 10,
  },
  modalTitleDownload: {
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 18,
    color: "#23242A",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  downloadIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  downloadIconBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#222",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
});
