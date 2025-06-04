import React, { useState } from "react";
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
import MegamillionsLogo from "@/assets/logos/NY/megamillions.svg";
import AnalysisTabs from "@/components/analysistabs";

const HEADER_HEIGHT = 375;
const FOOTER_HEIGHT = 70;

const VALUE_BOXES = [
  { label: "0", bgColor: "#ff0000", textColor: "#FFF" },
  { label: "1", bgColor: "#03b9F4", textColor: "#000" },
  { label: "2", bgColor: "#FFFB3B", textColor: "#000" },
  { label: "3", bgColor: "#EC407A", textColor: "#FFF" },
];

// MOCK DATA — depois trocar pelo fetch da API/Supabase
const MOCK_ROWS = Array.from({ length: 30 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  fibonacci: i % 4,
  values: Array(4)
    .fill(0)
    .map(() => Math.round(Math.random())),
}));
const MOCK_FREQ = [95, 78, 50, 49];

export default function AnalysisFibonacci() {
  // Data range
  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1));
  const [toDate, setToDate] = useState(new Date(2025, 4, 30));
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);

  // MOCK (futuro: via API)
  const rows = MOCK_ROWS;
  const freq = MOCK_FREQ;

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

  // Aqui será feita a chamada à API/Supabase no futuro
  // useEffect(() => {
  //   fetchFibonacciAnalysis(fromDate, toDate).then(({ rows, freq }) => {
  //     setRows(rows);
  //     setFreq(freq);
  //   });
  // }, [fromDate, toDate]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
          backTo="/analysis/NY/analysis"
        />

        <AnalysisTabs />

        {/* Campos de data com picker */}
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

        {/* Cabeçalho da tabela */}
        <View style={styles.tableContent}>
          <View style={styles.tableRow}>
            <View style={styles.dateBox}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            <View style={styles.fibonacciBoxGreen}>
              <Text style={styles.fibonacciBoxGreenText}>FIB</Text>
            </View>
            {VALUE_BOXES.map((box, i) => (
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

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tableContent}>
          {rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{row.date}</Text>
              </View>
              <View style={styles.fibonacciBoxGreen}>
                <Text style={styles.fibonacciBoxGreenText}>
                  {row.fibonacci}
                </Text>
              </View>
              {row.values.map((val, j) => (
                <View key={j} style={styles.greenBox}>
                  <Text style={styles.greenText}>{val}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Rodapé */}
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
                { backgroundColor: VALUE_BOXES[i]?.bgColor ?? "#CCC" },
              ]}
            >
              <Text
                style={[
                  styles.freqText,
                  { color: VALUE_BOXES[i]?.textColor ?? "#000" },
                ]}
              >
                {val}
              </Text>
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
    gap: 4,
    marginBottom: 4,
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
  fibonacciBoxGreen: {
    width: 38,
    height: 30,
    backgroundColor: "#E1058C",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fibonacciBoxGreenText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
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
  },
});
