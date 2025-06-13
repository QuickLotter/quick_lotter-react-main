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

// HEADER PARA MEGA BALL (25 bolas)
const POSITION_HEADERS = {
  "POSITION MB": Array.from({ length: 25 }, (_, i) => i + 1),
};

const DATA_ROWS = Array.from({ length: 20 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  values: Array(POSITION_HEADERS["POSITION MB"].length)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const FREQ = Array.from(
  { length: POSITION_HEADERS["POSITION MB"].length },
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

export default function PositionMBMegaMillions() {
  // Recupera seleções das posições anteriores da query
  const params = useLocalSearchParams();
  const selected1 =
    typeof params.selected1 === "string" ? params.selected1 : "";
  const selected2 =
    typeof params.selected2 === "string" ? params.selected2 : "";
  const selected3 =
    typeof params.selected3 === "string" ? params.selected3 : "";
  const selected4 =
    typeof params.selected4 === "string" ? params.selected4 : "";
  const selected5 =
    typeof params.selected5 === "string" ? params.selected5 : "";

  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1));
  const [toDate, setToDate] = useState(new Date(2025, 4, 20));
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const headerScrollRef = useRef(null);
  const dataRowsRefs = useRef<any[]>([]);
  const footerScrollRef = useRef(null);
  const numberBarScrollRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop();
  const scrollRef = useRef<ScrollView>(null);
  const tabRefs = useRef<Array<TouchableOpacity | null>>([]);
  const { width: windowWidth } = useWindowDimensions();

  // Centraliza o tab clicado no carrossel
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

  const HEADER = POSITION_HEADERS["POSITION MB"];
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

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(num)
        ? prev.filter((n) => n !== num)
        : [...prev, num].sort((a, b) => a - b)
    );
  };

  // Salvar e ir para o grid final (generator), passando todas as selections
  const handleSave = () => {
    if (selectedNumbers.length > 0) {
      const selectedMain = [
        ...selected1,
        ...selected2,
        ...selected3,
        ...selected4,
        ...selected5,
      ];
      const selectedExtra = selectedNumbers.join(",");
      // Abre no caminho generator/ny/generator
      router.push({
        pathname: "/generator/ny/generator",
        params: {
          game: "megamillions_ny",
          selected: selectedMain.join(","),
          selected_extra: selectedExtra,
        },
      });
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
                  { color: "#FDB927", fontWeight: "800" },
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
        <View style={[styles.dateBoxHeader, { backgroundColor: "#FDB927" }]}>
          <Text style={[styles.headerText, { color: "#333" }]}>DATE</Text>
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
                style={[styles.headerNumberBox, { backgroundColor: "#FDB927" }]}
              >
                <Text
                  style={[
                    styles.headerNumberText,
                    { color: "#222", fontWeight: "800" },
                  ]}
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
            <View style={[styles.dateBoxGrid, { backgroundColor: "#FDB927" }]}>
              <Text style={[styles.dateText, { color: "#222" }]}>
                {row.date}
              </Text>
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
            <View style={[styles.freqLabel, { backgroundColor: "#FDB927" }]}>
              <Text style={[styles.freqLabelText, { color: "#222" }]}>
                FREQUENCY
              </Text>
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
              <Text style={[styles.saveButtonText, { color: "#222" }]}>
                Save
              </Text>
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
                  <View
                    key={i}
                    style={[
                      styles.freqBox,
                      { backgroundColor: "#FDB927", borderColor: "#fff" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.freqText,
                        { color: "#222", fontWeight: "bold" },
                      ]}
                    >
                      {freq}
                    </Text>
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

// ========== STYLES ==========
const CELL_SIZE = 30;
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ECF1FF" },
  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingLeft: 8,
  },
  tabButton: {
    marginRight: 8,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 19,
    backgroundColor: "#ECF1FF",
    borderWidth: 1,
    borderColor: "#ECF1FF",
  },
  tabText: {
    fontSize: 15,
    color: "#0E4CA1",
    fontWeight: "500",
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
    zIndex: 20,
  },
  filtersPad: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 4,
    borderBottomColor: "#E5EAF3",
    borderBottomWidth: 1,
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.05,
  },
  input: {
    height: 30,
    width: 85,
    backgroundColor: "#F7F8FA",
    borderRadius: 7,
    borderWidth: 1.2,
    borderColor: "#E1E8F3",
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 2,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 13,
    fontWeight: "600",
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
    marginTop: 8,
    marginBottom: 5,
    zIndex: 10,
  },
  dateBoxHeader: {
    width: 75,
    height: CELL_SIZE,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FDB927",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
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
  headerNumberText: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.1,
    color: "#222",
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
    backgroundColor: "#FFF3DB",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#F2D17B",
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
    color: "#222",
    letterSpacing: 0.1,
  },
  footerPad: {
    backgroundColor: "#FFF7E1",
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
    alignItems: "center",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 12,
    gap: 0,
  },
  freqLabel: {
    backgroundColor: "#FDB927",
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
    backgroundColor: "#FFF7E1",
  },
  freqLabelText: {
    fontWeight: "700",
    fontSize: 10.5,
    color: "#222",
    letterSpacing: 0.04,
  },
  saveButton: {
    marginTop: 7,
    backgroundColor: "#FDB927",
    borderRadius: 7,
    paddingHorizontal: 19,
    paddingVertical: 7,
    shadowColor: "#FFD700",
    shadowOpacity: 0.13,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  saveButtonDisabled: {
    backgroundColor: "#E0DECE",
  },
  saveButtonText: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
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
    backgroundColor: "#FDB927",
  },
  freqText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#222",
    letterSpacing: 0.03,
  },
  numberCircle: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 15,
    marginRight: 2,
    marginTop: 5,
    backgroundColor: "#fff",
    borderWidth: 1.7,
    borderColor: "#FDB927",
    justifyContent: "center",
    alignItems: "center",
  },
  numberCircleSelected: {
    backgroundColor: "#FDB927",
    borderColor: "#0E4CA1",
  },
  numberCircleText: {
    fontWeight: "700",
    color: "#FDB927",
    fontSize: 15,
  },
  numberCircleTextSelected: {
    color: "#222",
  },
});
