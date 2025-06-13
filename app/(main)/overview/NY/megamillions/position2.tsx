import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams, usePathname } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import MegaMillionsLogo from "@/assets/logos/ny/megamillions.svg";

// ====== HEADER PARA POSITION 02 ======
const POSITION_HEADERS = {
  "POSITION 02": [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  ],
};

// MOCK DATA
const DATA_ROWS = Array.from({ length: 20 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  values: Array(POSITION_HEADERS["POSITION 02"].length)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const FREQ = Array.from(
  { length: POSITION_HEADERS["POSITION 02"].length },
  () => Math.floor(Math.random() * 350) + 10
);

const TABS = [
  { label: "Drawing Since", route: "drawingsince" },
  { label: "Position 01", route: "position1" },
  { label: "Position 02", route: "position2" },
  { label: "Position 03", route: "position3" },
  { label: "Position 04", route: "position4" },
  { label: "Position 05", route: "position5" },
  { label: "Position MB", route: "positionmb", color: "#FDB927" },
];

export default function Position2MegaMillions() {
  // Pega selected1 da query para continuar o fluxo
  const params = useLocalSearchParams();
  const selected1 =
    typeof params.selected1 === "string" ? params.selected1 : "";

  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1));
  const [toDate, setToDate] = useState(new Date(2025, 4, 20));
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);

  // Estado de seleção da posição 2
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const headerScrollRef = useRef(null);
  const dataRowsRefs = useRef<any[]>([]);
  const footerScrollRef = useRef(null);
  const numberBarScrollRef = useRef(null);

  // Tabs
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop();
  const scrollRef = useRef<ScrollView>(null);
  const tabRefs = useRef<Array<TouchableOpacity | null>>([]);
  const { width: windowWidth } = useWindowDimensions();

  // Centraliza tab
  const scrollToTab = (idx: number) => {
    if (!tabRefs.current[idx] || !scrollRef.current) return;
    tabRefs.current[idx].measureLayout(
      // @ts-ignore
      scrollRef.current.getInnerViewNode
        ? scrollRef.current.getInnerViewNode()
        : scrollRef.current,
      (x, y, btnWidth) => {
        const scrollX = Math.max(0, x - windowWidth / 2 + btnWidth / 2);
        scrollRef.current.scrollTo({ x: scrollX, animated: true });
      }
    );
  };

  useEffect(() => {
    const idx = TABS.findIndex((tab) => tab.route === currentTab);
    if (idx !== -1) setTimeout(() => scrollToTab(idx), 120);
  }, [currentTab, windowWidth]);

  const formatDate = (date: Date) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  };

  const HEADER = POSITION_HEADERS["POSITION 02"];
  const ROWS = DATA_ROWS;
  const filteredRows = ROWS;
  const drawCount = filteredRows.length;

  if (dataRowsRefs.current.length !== filteredRows.length) {
    dataRowsRefs.current = Array(filteredRows.length)
      .fill(null)
      .map((_, i) => dataRowsRefs.current[i] || React.createRef());
  }

  // Sincronização horizontal
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    if (headerScrollRef.current)
      headerScrollRef.current.scrollTo({ x: scrollX, animated: false });
    dataRowsRefs.current.forEach((ref) =>
      ref?.current?.scrollTo({ x: scrollX, animated: false })
    );
    if (footerScrollRef.current)
      footerScrollRef.current.scrollTo({ x: scrollX, animated: false });
    if (numberBarScrollRef.current)
      numberBarScrollRef.current.scrollTo({ x: scrollX, animated: false });
  };

  // Manipulação do Date Picker
  const showPicker = (mode: "from" | "to") => setPickerMode(mode);
  const onDateChange = (event, selectedDate) => {
    setPickerMode(null);
    if (event.type === "set" && selectedDate) {
      if (pickerMode === "from") {
        setFromDate(selectedDate);
        if (selectedDate > toDate) setToDate(selectedDate);
      } else if (pickerMode === "to") {
        setToDate(selectedDate);
        if (selectedDate < fromDate) setFromDate(selectedDate);
      }
    }
  };

  // Troca estado de marcado da bolinha
  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(num)
        ? prev.filter((n) => n !== num)
        : [...prev, num].sort((a, b) => a - b)
    );
  };

  // Salvar e navegar para Position 03
  const handleSave = () => {
    if (selectedNumbers.length > 0) {
      router.push(
        `/overview/ny/megamillions/position3?selected1=${selected1}&selected2=${selectedNumbers.join(
          ","
        )}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GameHeader
        logo={<MegaMillionsLogo width={100} height={40} />}
        title="Overview"
        subtitle="New York Mega Millions"
        headerColor="#0E4CA1"
        backTo="/overview/ny/megamillions"
      />

      {/* --- TABS --- */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {TABS.map((tab, idx) => {
            const isActive = currentTab === tab.route;
            const isPB = tab.route === "positionmb";
            return (
              <TouchableOpacity
                key={tab.route}
                ref={(ref) => (tabRefs.current[idx] = ref)}
                onPress={() => {
                  router.replace(`/overview/ny/megamillions/${tab.route}`);
                  setTimeout(() => scrollToTab(idx), 100);
                }}
                style={[
                  styles.tabButton,
                  isActive &&
                    (isPB
                      ? {
                          backgroundColor: "#FDB927",
                          borderColor: "#FDB927",
                        }
                      : {
                          backgroundColor: "#0E4CA1",
                          borderColor: "#FDB927",
                        }),
                ]}
                activeOpacity={0.78}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive &&
                      (isPB
                        ? { color: "#222", fontWeight: "800" }
                        : { color: "#fff", fontWeight: "800" }),
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Data Range Picker */}
      <View style={styles.fixedHeader}>
        <View style={styles.filtersPad}>
          <View style={styles.datesRow}>
            <Text style={styles.dateLabel}>From</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showPicker("from")}
              activeOpacity={0.8}
            >
              <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>To</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showPicker("to")}
              activeOpacity={0.8}
            >
              <Text style={styles.inputText}>{formatDate(toDate)}</Text>
            </TouchableOpacity>
            <View style={[styles.input, { backgroundColor: "#F1F3F7" }]}>
              <Text
                style={[
                  styles.inputText,
                  { color: "#0E4CA1", fontWeight: "800" },
                ]}
              >
                {drawCount}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {(pickerMode === "from" || pickerMode === "to") && (
        <DateTimePicker
          value={pickerMode === "from" ? fromDate : toDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
          maximumDate={pickerMode === "from" ? toDate : undefined}
          minimumDate={pickerMode === "to" ? fromDate : undefined}
        />
      )}

      {/* Header da tabela */}
      <View style={styles.tableHeaderRow}>
        <View style={styles.dateBoxHeader}>
          <Text style={styles.headerText}>DATE</Text>
        </View>
        <View style={styles.headerSeparator} />
        <ScrollView
          horizontal
          ref={headerScrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row" }}>
            {HEADER.map((n, i) => (
              <View
                key={i}
                style={[styles.headerNumberBox, styles.headerNumberBoxRed]}
              >
                <Text
                  style={[styles.headerNumberText, styles.headerNumberTextRed]}
                >
                  {n}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Data Rows */}
      <ScrollView style={{ flex: 1 }}>
        {filteredRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.gridRow}>
            <View style={styles.dateBoxGrid}>
              <Text style={styles.dateText}>{row.date}</Text>
            </View>
            <View style={styles.rowSeparator} />
            <ScrollView
              horizontal
              ref={dataRowsRefs.current[rowIndex]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row" }}>
                {row.values.slice(0, HEADER.length).map((val, j) => (
                  <View key={j} style={styles.gridBox}>
                    <Text style={styles.gridText}>{val}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Frequencies + Barra de seleção de números sincronizada */}
      <View style={styles.footerPad}>
        <View style={styles.footerContent}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.freqLabel}>
              <Text style={styles.freqLabelText}>FREQUENCY</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.saveButton,
                selectedNumbers.length === 0 && styles.saveButtonDisabled,
              ]}
              disabled={selectedNumbers.length === 0}
              onPress={handleSave}
              activeOpacity={selectedNumbers.length === 0 ? 1 : 0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerSeparator} />

          <ScrollView
            horizontal
            ref={footerScrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                {FREQ.map((freq, i) => (
                  <View key={i} style={styles.freqBox}>
                    <Text style={styles.freqText}>{freq}</Text>
                  </View>
                ))}
              </View>
              {/* Barra de seleção de números */}
              <ScrollView
                horizontal
                ref={numberBarScrollRef}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 2 }}
              >
                <View style={{ flexDirection: "row" }}>
                  {HEADER.map((num, i) => {
                    const isSelected = selectedNumbers.includes(num);
                    return (
                      <TouchableOpacity
                        key={num}
                        style={[
                          styles.numberCircle,
                          isSelected && styles.numberCircleSelected,
                        ]}
                        onPress={() => toggleNumber(num)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.numberCircleText,
                            isSelected && styles.numberCircleTextSelected,
                          ]}
                        >
                          {num}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ========== STYLES (Mesmo padrão do seu projeto) ==========

const CELL_SIZE = 30;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ECF1FF" },
  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingLeft: 8,
    borderBottomColor: "#E3E8F1",
    borderBottomWidth: 1.2,
    shadowColor: "#16233C",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 9,
    elevation: 3,
    zIndex: 14,
  },
  tabButton: {
    marginRight: 8,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 19,
    backgroundColor: "#ECF1FF",
    borderWidth: 1.5,
    borderColor: "#ECF1FF",
    minWidth: 80,
    alignItems: "center",
  },
  tabText: {
    fontSize: 15,
    color: "#0E4CA1",
    fontWeight: "500",
    letterSpacing: 0.03,
  },
  fixedHeader: {
    backgroundColor: "#fff",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  filtersPad: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    borderBottomColor: "#E5EAF3",
    borderBottomWidth: 1,
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  dateLabel: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0E4CA1",
    letterSpacing: 0.05,
  },
  input: {
    height: 30,
    width: 85,
    backgroundColor: "#F7F8FA",
    borderRadius: 7,
    borderWidth: 1.3,
    borderColor: "#E1E8F3",
    paddingHorizontal: 10,
    fontSize: 13,
    color: "#222",
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 12,
    marginTop: 7,
    marginBottom: 4,
    zIndex: 10,
  },
  dateBoxHeader: {
    width: 75,
    height: CELL_SIZE,
    backgroundColor: "#0E4CA1",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0E4CA1",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: 0.08,
  },
  headerSeparator: {
    width: 4,
    height: CELL_SIZE,
    backgroundColor: "#F2F2F7",
  },
  headerNumberBox: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    borderRadius: 3,
  },
  headerNumberBoxRed: {
    backgroundColor: "#0E4CA1",
  },
  headerNumberText: {
    fontWeight: "bold",
    fontSize: 12.5,
    letterSpacing: 0.09,
  },
  headerNumberTextRed: {
    color: "#FFF",
  },
  gridRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  dateBoxGrid: {
    width: 75,
    height: CELL_SIZE,
    backgroundColor: "#0E4CA1",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0,
    borderColor: "#E8EBF6",
  },
  rowSeparator: {
    width: 4,
    height: CELL_SIZE,
    backgroundColor: "#ECF1FF",
  },
  gridBox: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    backgroundColor: "#F4F9FF",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#E3EAF4",
  },
  gridText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A1A22",
    letterSpacing: 0.04,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.1,
  },
  footerPad: {
    backgroundColor: "#ECF1FF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 13,
    borderTopColor: "#E7ECF5",
    borderTopWidth: 1,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 12,
    gap: 0,
  },
  freqLabel: {
    backgroundColor: "#0E4CA1",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    width: 75,
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: "#0E4CA1",
    borderRadius: 7,
    marginTop: 6,
    marginBottom: 2,
    width: 75,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.06,
  },
  freqLabel: {
    backgroundColor: "#0E4CA1",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  footerSeparator: {
    width: 4,
    height: CELL_SIZE,
    backgroundColor: "#ECF1FF",
  },
  freqLabelText: {
    fontWeight: "700",
    fontSize: 10.5,
    color: "#fff",
    letterSpacing: 0.04,
  },
  freqBox: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    backgroundColor: "#000",
    marginBottom: 4,
  },
  freqText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
    letterSpacing: 0.03,
  },
  numberCircle: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    borderWidth: 2,
    borderColor: "#0E4CA1",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    marginTop: 3,
  },
  numberCircleSelected: {
    backgroundColor: "#0E4CA1",
    borderColor: "#0E4CA1",
  },
  numberCircleText: {
    fontWeight: "700",
    fontSize: 15,
    color: "#0E4CA1",
  },
  numberCircleTextSelected: {
    color: "#fff",
  },
});
