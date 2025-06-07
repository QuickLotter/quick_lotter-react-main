import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import GameHeader from "@/components/generator/header/gameheader";
import MegamillionsLogo from "@/assets/logos/ny/megamillions.svg";
import AnalysisTabs from "@/components/analysistabs";

const HEADER_HEIGHT = 375;
const FOOTER_HEIGHT = 70;

const ODD_RANGES = [
  { label: "0", bgColor: "#ff0000", textColor: "#FFF" },
  { label: "1", bgColor: "#03b9F4", textColor: "#000" },
  { label: "2", bgColor: "#FFFB3B", textColor: "#000" },
  { label: "3", bgColor: "#EC407A", textColor: "#FFF" },
  { label: "4", bgColor: "#000", textColor: "#FFF" },
  { label: "5", bgColor: "#fff", textColor: "#000" },
];

// MOCK DATA – troque depois pelo fetch da API/Supabase!
const MOCK_ROWS = Array.from({ length: 30 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  odd: i % 6, // só para simular
  values: Array(6)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const MOCK_FREQ = [95, 78, 50, 49, 30, 29];

export default function AnalysisOdd() {
  // Data range
  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1));
  const [toDate, setToDate] = useState(new Date(2025, 4, 30));
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);

  // MOCK – substitua pelo estado dos dados da API
  const rows = MOCK_ROWS;
  const freq = MOCK_FREQ;
  const loading = false;

  // Date picker helpers
  const formatDate = (date: Date) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
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

  // Ponto para plug da API:
  // useEffect(() => {
  //   setLoading(true);
  //   fetchOddAnalysis(fromDate, toDate).then(({ rows, freq }) => {
  //     setRows(rows);
  //     setFreq(freq);
  //     setLoading(false);
  //   });
  // }, [fromDate, toDate]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* HEADER FIXO */}
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
          backTo="/analysis/ny/analysis"
        />

        {/* TABS DE FILTRO */}
        <AnalysisTabs />

        {/* CAMPOS DE DATA + DRAW COUNT */}
        <View style={styles.datesPad}>
          <View style={styles.filtersInner}>
            <View style={styles.datesRow}>
              <Text style={styles.dateLabel}>From:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => showPicker("from")}
              >
                <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
              </TouchableOpacity>
              <Text style={styles.dateLabel}>To</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => showPicker("to")}
              >
                <Text style={styles.inputText}>{formatDate(toDate)}</Text>
              </TouchableOpacity>
              <View style={[styles.input, { backgroundColor: "#F1F3F7" }]}>
                <Text
                  style={[
                    styles.inputText,
                    { color: "#0E4CA1", fontWeight: "700" },
                  ]}
                >
                  {rows.length}
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

        {/* CABEÇALHO DA TABELA */}
        <View style={styles.tableContent}>
          <View style={styles.tableRow}>
            <View style={styles.dateBox}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            <View style={styles.oddBoxGreen}>
              <Text style={styles.headerText}>ODD</Text>
            </View>
            {ODD_RANGES.map((box, i) => (
              <View
                key={i}
                style={[
                  styles.greenBox,
                  {
                    backgroundColor: box.bgColor,
                    borderColor: "#000",
                  },
                ]}
              >
                <Text style={[styles.rangeText, { color: box.textColor }]}>
                  {box.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* DADOS PRINCIPAIS */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tableContent}>
          {loading ? (
            <ActivityIndicator color="#0E4CA1" style={{ marginTop: 40 }} />
          ) : (
            rows.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{row.date}</Text>
                </View>
                <View style={styles.oddBoxGreen}>
                  <Text style={styles.oddBoxGreenText}>{row.odd}</Text>
                </View>
                {row.values.map((val, j) => (
                  <View key={j} style={styles.greenBox}>
                    <Text style={styles.greenText}>{val}</Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* RODAPÉ - FREQUENCY */}
      <View style={styles.footer}>
        <View style={styles.tableRow}>
          <View style={styles.freqLabel}>
            <Text style={styles.freqLabelText}>FREQUENCY</Text>
          </View>
          {freq.map((val, i) => (
            <View
              key={i}
              style={[
                styles.freqBox,
                {
                  backgroundColor: [
                    "#43A047",
                    "#388E3C",
                    "#FFEB3B",
                    "#FB8C00",
                    "#FFEB3B",
                    "#F44336",
                  ][i],
                },
              ]}
            >
              <Text style={styles.freqText}>{val}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#ECF1FF" },

  fixedHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    backgroundColor: "#ECF1FF",
  },

  filtersPad: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
  },

  filtersInner: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },

  sliderRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
  },

  filterButton: {
    width: 124,
    height: 38,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  datesPad: {
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    paddingVertical: 6,
  },

  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 20,
  },

  dateLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    height: 32,
    width: 75,
    backgroundColor: "#FFF",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 6,
    fontSize: 13,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },

  scrollContent: {
    paddingTop: HEADER_HEIGHT - 110,
    paddingBottom: FOOTER_HEIGHT + 10,
    alignItems: "center",
  },

  tableContent: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 16,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4, //espaço lateral das caixas
    marginBottom: 4, //espaço embaixo das caixas
  },

  dateBox: {
    width: 80,
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },

  dateText: {
    fontSize: 14,
    fontWeight: "600",
  },

  oddBoxGreen: {
    width: 38,
    height: 30,
    backgroundColor: "#4CAF50",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  oddBoxGreenText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  greenBox: {
    width: 30,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#D9EAD3",
    justifyContent: "center",
    alignItems: "center",
  },

  greenText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },

  rangeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ECF1FF",
    paddingHorizontal: 16,
    height: FOOTER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  freqLabel: {
    backgroundColor: "#F5F5F5",
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#AAA",
  },

  freqLabelText: {
    fontWeight: "bold",
    fontSize: 14,
  },

  freqBox: {
    width: 30,
    height: 30,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  freqText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
});
