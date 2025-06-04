import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import GameHeader from "@/components/generator/header/gameheader";
import NYLottoLogo from "@/assets/images/ny_game_logo/nylotto.svg";
import DrawingSinceTabs from "../../../../../components/drawingsincetabs";

// ====== HEADER PARA POSITION 05 ======
const POSITION_HEADERS = {
  "POSITION 05": [
    3, 1, 4, 2, 8, 10, 7, 6, 11, 5, 9, 15, 14, 12, 13, 16, 17, 20, 21, 18, 19,
    29, 23, 28, 27, 25, 34, 22, 24,
  ],
};

// MOCK DATA (trocar pelo fetch do Supabase futuramente)
const DATA_ROWS = Array.from({ length: 20 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  values: Array(POSITION_HEADERS["POSITION 05"].length)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const FREQ = Array.from(
  { length: POSITION_HEADERS["POSITION 05"].length },
  () => Math.floor(Math.random() * 350) + 10
);

export default function Position1NYLotto() {
  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1)); // 05/01/2025
  const [toDate, setToDate] = useState(new Date(2025, 4, 20)); // 05/20/2025
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);

  const headerScrollRef = useRef(null);
  const dataRowsRefs = useRef([]);
  const footerScrollRef = useRef(null);

  // Formatação MM/DD/YY
  const formatDate = (date: Date) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  };

  const HEADER = POSITION_HEADERS["POSITION 05"];
  const ROWS = DATA_ROWS;
  const filteredRows = ROWS;
  const drawCount = filteredRows.length;

  if (dataRowsRefs.current.length !== filteredRows.length) {
    dataRowsRefs.current = Array(filteredRows.length)
      .fill()
      .map((_, i) => dataRowsRefs.current[i] || React.createRef());
  }

  // Sincronização horizontal header/grid/footer
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER PRINCIPAL */}
      <GameHeader
        logo={<NYLottoLogo width={100} height={40} />}
        title="Overview"
        subtitle="NY Lotto"
        headerColor="#155095"
        backTo="/overview/new_york/overview"
      />

      {/* TABS */}
      <DrawingSinceTabs />

      {/* Data Range Picker */}
      <View style={styles.fixedHeader}>
        <View style={styles.filtersPad}>
          <View style={styles.datesRow}>
            <Text style={[styles.dateLabel, { color: "#155095" }]}>From</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showPicker("from")}
              activeOpacity={0.8}
            >
              <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>
            <Text style={[styles.dateLabel, { color: "#155095" }]}>To</Text>
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
                  { color: "#155095", fontWeight: "700" },
                ]}
              >
                {drawCount}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Picker Modal */}
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
        <View style={[styles.dateBoxHeader, { backgroundColor: "#155095" }]}>
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
                style={[styles.headerNumberBox, styles.headerNumberBoxBlue]}
              >
                <Text
                  style={[styles.headerNumberText, styles.headerNumberTextBlue]}
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
            <View style={[styles.dateBoxGrid, { backgroundColor: "#155095" }]}>
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
const CELL_SIZE = 30;

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
    shadowColor: "#155095",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 12,
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
    marginRight: 2,
    borderRadius: 3,
  },
  headerNumberBoxBlue: {
    backgroundColor: "#155095",
  },
  headerNumberText: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.1,
  },
  headerNumberTextBlue: {
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
    alignItems: "center",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 12,
    gap: 0,
  },
  freqLabel: {
    backgroundColor: "#155095",
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
  },
  freqText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
    letterSpacing: 0.03,
  },
});
