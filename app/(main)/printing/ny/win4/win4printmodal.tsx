// ✅ Path: app/printing/ny/win4/win4printmodal.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import Win4Logo from "@/assets/logos/ny/win4midday.svg"; // ajuste o path se for outro!
import { Ionicons } from "@expo/vector-icons";

// Configurações dos botões
const PAPER_TYPES = [
  { label: "Play–Slip", value: "playslip" },
  { label: "PDF", value: "pdf" },
  { label: "Thermal", value: "thermal" },
];

const MARKER_TYPES = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
];

const WAGER_TYPES = [
  { label: "Straight", value: "straight" },
  { label: "Box", value: "box" },
  { label: "Straight/Box", value: "straight_box" },
  { label: "Combination", value: "combination" },
];

const DRAW_TIMES = [
  { label: "Midday", value: "midday" },
  { label: "Evening", value: "evening" },
];

const AMOUNTS = [
  { label: "$1.00", value: "1.00" },
  { label: "$0.50", value: "0.50" },
];

const ALIGNMENTS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export default function Win4PrintModal({ visible, onClose, onPrint }) {
  const [paperType, setPaperType] = useState("playslip");
  const [markerType, setMarkerType] = useState("square");
  const [wagerType, setWagerType] = useState("straight_box");
  const [drawTime, setDrawTime] = useState("evening");
  const [amount, setAmount] = useState("0.50");
  const [alignment, setAlignment] = useState("right");
  const [topMargin, setTopMargin] = useState(0);
  const [sideMargin, setSideMargin] = useState(0);

  // Responsividade: largura mínima para modal
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const MODAL_WIDTH = windowWidth < 440 ? windowWidth - 20 : 400;
  const useScroll = windowHeight < 540;

  // Ajuste dos margins
  const adjustMargin = (type, dir) => {
    if (type === "top") setTopMargin((prev) => Math.max(0, prev + dir));
    if (type === "side") setSideMargin((prev) => Math.max(0, prev + dir));
  };

  // Renderiza botões quadrado e redondo com highlight no selecionado
  const renderMarkerType = () => (
    <View style={styles.markerChoices}>
      <TouchableOpacity
        style={[
          styles.markerBtn,
          markerType === "square" && styles.markerBtnActive,
          { borderRadius: 4 },
        ]}
        onPress={() => setMarkerType("square")}
        activeOpacity={0.77}
      >
        <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: "#181818",
            borderRadius: 4,
          }}
        />
        {markerType === "square" && (
          <Ionicons
            name="checkmark"
            size={15}
            color="#fff"
            style={styles.markerCheck}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.markerBtn,
          markerType === "circle" && styles.markerBtnActive,
          { borderRadius: 99 },
        ]}
        onPress={() => setMarkerType("circle")}
        activeOpacity={0.77}
      >
        <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: "#181818",
            borderRadius: 99,
          }}
        />
        {markerType === "circle" && (
          <Ionicons
            name="checkmark"
            size={15}
            color="#fff"
            style={styles.markerCheck}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // Conteúdo que pode rolar se necessário
  const renderContent = () => (
    <View style={styles.content}>
      {/* PAPER TYPE */}
      <Text style={styles.sectionTitle}>Printing Paper:</Text>
      <View style={styles.rowWrap}>
        {PAPER_TYPES.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.chip,
              paperType === item.value && styles.chipActive,
              { flex: 1, minWidth: 100 },
            ]}
            onPress={() => setPaperType(item.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.chipText,
                paperType === item.value && styles.chipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MARKER TYPE */}
      <View style={styles.markerRow}>
        <Text style={styles.label}>Marker Type:</Text>
        {renderMarkerType()}
      </View>

      {/* FEATURE SETTINGS */}
      <Text style={styles.settingsTitle}>Feature Settings</Text>
      <Text style={styles.label}>Wager Type</Text>
      <View style={styles.buttonRowWrap}>
        {WAGER_TYPES.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.wagerButton,
              wagerType === item.value && styles.wagerButtonActive,
            ]}
            onPress={() => setWagerType(item.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.wagerButtonText,
                wagerType === item.value && styles.wagerButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Draw Time</Text>
      <View style={styles.buttonRowWrap}>
        {DRAW_TIMES.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.wagerButton,
              drawTime === item.value && styles.wagerButtonActive,
            ]}
            onPress={() => setDrawTime(item.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.wagerButtonText,
                drawTime === item.value && styles.wagerButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.buttonRowWrap}>
        {AMOUNTS.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.wagerButton,
              amount === item.value && styles.wagerButtonActive,
            ]}
            onPress={() => setAmount(item.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.wagerButtonText,
                amount === item.value && styles.wagerButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* PRINT SETTINGS */}
      <Text style={styles.settingsTitle}>Print Settings</Text>
      <Text style={styles.label}>Printer Alignment</Text>
      <View style={styles.buttonRowWrap}>
        {ALIGNMENTS.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.wagerButton,
              alignment === item.value && styles.wagerButtonActive,
            ]}
            onPress={() => setAlignment(item.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.wagerButtonText,
                alignment === item.value && styles.wagerButtonTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Margins */}
      <View style={styles.marginBox}>
        <View style={styles.marginGroup}>
          <Text style={styles.marginLabel}>Top (mm)</Text>
          <View style={styles.marginBtns}>
            <TouchableOpacity
              style={styles.marginBtn}
              onPress={() => adjustMargin("top", -1)}
            >
              <Text style={styles.marginBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={styles.marginValue}>{topMargin}</Text>
            <TouchableOpacity
              style={styles.marginBtn}
              onPress={() => adjustMargin("top", 1)}
            >
              <Text style={styles.marginBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginGroup}>
          <Text style={styles.marginLabel}>Side (mm)</Text>
          <View style={styles.marginBtns}>
            <TouchableOpacity
              style={styles.marginBtn}
              onPress={() => adjustMargin("side", -1)}
            >
              <Text style={styles.marginBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={styles.marginValue}>{sideMargin}</Text>
            <TouchableOpacity
              style={styles.marginBtn}
              onPress={() => adjustMargin("side", 1)}
            >
              <Text style={styles.marginBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { width: MODAL_WIDTH }]}>
          {/* Header Fixo */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#2e204c" />
          </Pressable>
          <View style={styles.logoBox}>
            <Win4Logo width={120} height={45} />
          </View>
          {/* Conteúdo scrollável */}
          {useScroll ? (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 18, paddingTop: 6 }}
              showsVerticalScrollIndicator={false}
            >
              {renderContent()}
            </ScrollView>
          ) : (
            renderContent()
          )}
          {/* Botão Print fixo */}
          <TouchableOpacity
            style={styles.printBtn}
            onPress={() =>
              onPrint?.({
                paperType,
                markerType,
                wagerType,
                drawTime,
                amount,
                alignment,
                topMargin,
                sideMargin,
              })
            }
            activeOpacity={0.8}
          >
            <Ionicons
              name="print"
              size={22}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.printBtnText}>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(34,21,44,0.21)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 16,
    shadowColor: "#2e204c",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 13 },
    shadowRadius: 40,
    elevation: 8,
    alignItems: "stretch",
    minWidth: 260,
    maxWidth: 420,
    maxHeight: "96%",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 11,
    right: 9,
    zIndex: 100,
    backgroundColor: "#F5F1FC",
    borderRadius: 100,
    padding: 3,
  },
  logoBox: {
    alignSelf: "center",
    marginBottom: 6,
    marginTop: 0,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 6,
    paddingTop: 6,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#3b2e4d",
    marginTop: 10,
    marginBottom: 8,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  chip: {
    backgroundColor: "#F6F3F8",
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 11,
    alignItems: "center",
    marginRight: 7,
    marginBottom: 7,
  },
  chipActive: {
    backgroundColor: "#7E0C6E",
  },
  chipText: {
    color: "#7E0C6E",
    fontWeight: "600",
    fontSize: 15,
  },
  chipTextActive: {
    color: "#fff",
  },
  markerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  markerChoices: {
    flexDirection: "row",
    gap: 13,
    marginLeft: 10,
  },
  markerBtn: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "#B1A6C8",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    backgroundColor: "#ECEAEA",
    position: "relative",
  },
  markerBtnActive: {
    borderColor: "#7E0C6E",
    borderWidth: 2.5,
    backgroundColor: "#7E0C6E20",
  },
  markerCheck: {
    position: "absolute",
    top: 4,
    left: 4,
  },
  settingsTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#23242A",
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECE7F1",
    paddingBottom: 4,
    marginBottom: 6,
  },
  label: {
    fontWeight: "700",
    fontSize: 15,
    color: "#23242A",
    marginBottom: 6,
    marginTop: 2,
  },
  buttonRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 12,
    justifyContent: "flex-start",
  },
  wagerButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#F6F3F8",
    minWidth: 100,
    alignItems: "center",
    marginBottom: 8,
    marginRight: 8,
    marginTop: 0,
  },
  wagerButtonActive: {
    backgroundColor: "#7E0C6E",
  },
  wagerButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#7E0C6E",
  },
  wagerButtonTextActive: {
    color: "#fff",
  },
  marginBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
    gap: 14,
  },
  marginGroup: {
    flex: 1,
    alignItems: "center",
  },
  marginLabel: {
    fontWeight: "600",
    fontSize: 13,
    color: "#7E0C6E",
    marginBottom: 6,
  },
  marginBtns: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F5FB",
    borderRadius: 9,
    paddingHorizontal: 5,
    paddingVertical: 4,
    gap: 7,
  },
  marginBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#EFE6F8",
    alignItems: "center",
    justifyContent: "center",
  },
  marginBtnTxt: {
    fontSize: 21,
    color: "#7E0C6E",
    fontWeight: "bold",
  },
  marginValue: {
    minWidth: 22,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#432161",
  },
  printBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18171d",
    paddingVertical: 13,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 1,
    width: "100%",
    shadowColor: "#7E0C6E",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 3 : 0,
    position: "relative",
    bottom: 0,
  },
  printBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.2,
  },
});
