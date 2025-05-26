import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";

// ====== HEADERS DE CADA POSITION ======
const POSITION_HEADERS = {
  "DRAWING SINCE": Array.from({ length: 70 }, (_, i) => i + 1),
  "POSITION 01": [
    3, 1, 4, 2, 8, 10, 7, 6, 11, 5, 9, 15, 14, 12, 13, 16, 17, 20, 21, 18, 19,
    29, 23, 28, 27, 25, 34, 22, 24, 33, 26, 30, 36, 46, 39, 38, 32, 31, 56, 52,
    41, 40, 37,
  ],
  "POSITION 02": [
    22, 17, 14, 20, 19, 24, 10, 15, 16, 12, 11, 13, 18, 26, 30, 31, 9, 23, 28,
    35, 29, 25, 37, 8, 5, 33, 21, 32, 7, 34, 43, 6, 38, 27, 36, 41, 40, 4, 3,
    45, 39, 47, 44, 42, 2, 46, 54, 50, 52, 55, 53, 49, 48, 66, 62, 60, 59, 58,
  ],
  "POSITION 03": [
    31, 26, 40, 29, 37, 39, 33, 30, 25, 44, 42, 28, 27, 36, 47, 53, 48, 32, 46,
    35, 38, 20, 34, 43, 50, 24, 23, 41, 19, 17, 14, 18, 21, 56, 22, 16, 15, 13,
    45, 49, 51, 58, 11, 60, 10, 54, 52, 55, 12, 59, 61, 57, 6, 9, 8, 65, 63, 5,
    7, 4, 66, 62, 67,
  ],
  "POSITION 04": [
    46, 52, 42, 58, 54, 48, 44, 38, 57, 59, 61, 41, 49, 51, 62, 53, 43, 56, 60,
    39, 47, 45, 64, 40, 32, 55, 50, 63, 35, 31, 37, 33, 36, 65, 29, 27, 34, 24,
    28, 66, 30, 68, 25, 18, 22, 67, 26, 19, 17, 21, 69, 20, 23, 16, 15, 13, 10,
    12, 8,
  ],
  "POSITION 05": [
    70, 66, 69, 64, 68, 67, 62, 65, 61, 63, 59, 57, 58, 60, 55, 56, 52, 53, 54,
    43, 48, 51, 45, 46, 50, 38, 49, 44, 47, 42, 39, 41, 40, 31, 33, 27, 34, 32,
    37, 29, 28, 30, 25, 18, 35, 36, 24, 22, 17, 23,
  ],
  "POSITION MB": [
    22, 11, 18, 24, 25, 9, 19, 13, 4, 17, 1, 3, 20, 16, 10, 14, 2, 12, 21, 6, 7,
    15, 23, 8, 5,
  ],
};

// TABS
const TABS = [
  "DRAWING SINCE",
  "POSITION 01",
  "POSITION 02",
  "POSITION 03",
  "POSITION 04",
  "POSITION 05",
  "POSITION MB",
];

// MOCK DATA
const DATA_ROWS = Array.from({ length: 20 }, () => ({
  date: "10/08/24",
  values: Array(70)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const MB_ROWS = Array.from({ length: 20 }, () => ({
  date: "10/08/24",
  values: Array(25)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const FREQ_70 = Array.from(
  { length: 70 },
  () => Math.floor(Math.random() * 350) + 10
);
const FREQ_MB = Array.from(
  { length: 25 },
  () => Math.floor(Math.random() * 350) + 10
);

export default function DrawingSince() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [fromDate, setFromDate] = useState("05/12/25");
  const [toDate, setToDate] = useState("05/12/25");
  const headerScrollRef = useRef(null);
  const dataRowsRefs = useRef([]);
  const footerScrollRef = useRef(null);

  // Atualiza refs do grid
  const HEADER = POSITION_HEADERS[activeTab];
  const isMB = activeTab === "POSITION MB";
  const ROWS = isMB ? MB_ROWS : DATA_ROWS;
  const FREQ = isMB ? FREQ_MB : FREQ_70;

  if (dataRowsRefs.current.length !== ROWS.length) {
    dataRowsRefs.current = Array(ROWS.length)
      .fill()
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER PRINCIPAL */}
      <GameHeader
        logo={<MegamillionsLogo width={120} height={40} />}
        title="Overview"
        subtitle="New York Mega Millions"
        headerColor="#0E4CA1"
      />

      {/* TABS */}
      <View style={styles.fixedHeader}>
        <View style={styles.filtersPad}>
          <View style={styles.filtersInner}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sliderRow}
            >
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.85}
                  style={[
                    styles.filterButton,
                    activeTab === tab &&
                      (tab === "POSITION MB"
                        ? styles.filterButtonActiveYellow
                        : styles.filterButtonActive),
                  ]}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      activeTab === tab
                        ? tab === "POSITION MB"
                          ? { color: "#222" }
                          : { color: "#fff" }
                        : { color: "#0E4CA1" },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.datesRow}>
            <Text style={styles.dateLabel}>From</Text>
            <TextInput
              style={styles.input}
              value={fromDate}
              onChangeText={setFromDate}
              placeholder="MM/DD/YY"
            />
            <Text style={styles.dateLabel}>To</Text>
            <TextInput
              style={styles.input}
              value={toDate}
              onChangeText={setToDate}
              placeholder="MM/DD/YY"
            />
            <TextInput style={styles.input} value="1000" editable={false} />
          </View>
        </View>
      </View>

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
                style={[
                  styles.headerNumberBox,
                  isMB
                    ? styles.headerNumberBoxYellow
                    : styles.headerNumberBoxBlue,
                ]}
              >
                <Text
                  style={[
                    styles.headerNumberText,
                    isMB
                      ? styles.headerNumberTextYellow
                      : styles.headerNumberTextBlue,
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
        {ROWS.map((row, rowIndex) => (
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

      {/* Frequencies */}
      <View style={styles.footerPad}>
        <View style={styles.footerContent}>
          <View style={styles.freqLabel}>
            <Text style={styles.freqLabelText}>FREQUENCY</Text>
          </View>
          <View style={styles.footerSeparator} />
          <ScrollView
            horizontal
            ref={footerScrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: "row" }}>
              {FREQ.map((freq, i) => (
                <View key={i} style={styles.freqBox}>
                  <Text style={styles.freqText}>{freq}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ====== STYLES =======
const CELL_SIZE = 38;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ECF1FF" },
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
    paddingVertical: 7,
    borderBottomColor: "#E5EAF3",
    borderBottomWidth: 1,
  },
  filtersInner: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },
  sliderRow: {
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
  filterButton: {
    minWidth: 118,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E1E8F3",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 10,
  },
  filterButtonActive: {
    backgroundColor: "#0E4CA1",
    borderColor: "#0E4CA1",
    shadowColor: "#0E4CA1",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  filterButtonActiveYellow: {
    backgroundColor: "#FDB927",
    borderColor: "#FDB927",
    shadowColor: "#FDB927",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.1,
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
    color: "#0E4CA1",
    letterSpacing: 0.05,
  },
  input: {
    height: 32,
    width: 86,
    backgroundColor: "#F7F8FA",
    borderRadius: 7,
    borderWidth: 1.2,
    borderColor: "#E1E8F3",
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 2,
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
    width: 85,
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
    fontSize: 14,
    fontWeight: "700",
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
    marginRight: 4,
    borderRadius: 3,
  },
  headerNumberBoxBlue: {
    backgroundColor: "#0E4CA1",
  },
  headerNumberBoxYellow: {
    backgroundColor: "#FDB927",
  },
  headerNumberText: {
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  headerNumberTextBlue: {
    color: "#FFF",
  },
  headerNumberTextYellow: {
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
    width: 85,
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
    marginRight: 4,
    backgroundColor: "#F4F9FF",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#E3EAF4",
  },
  gridText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A22",
    letterSpacing: 0.04,
  },
  dateText: {
    fontSize: 14,
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
    alignItems: "center",
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
  },
  footerSeparator: {
    width: 4,
    height: CELL_SIZE,
    backgroundColor: "#ECF1FF",
  },
  freqLabelText: {
    fontWeight: "700",
    fontSize: 12,
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
    marginRight: 4,
    backgroundColor: "#000",
  },
  freqText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    letterSpacing: 0.03,
  },
});
