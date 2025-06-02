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
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";
import AnalysisTabs from "@/components/analysistabs";

const HEADER_HEIGHT = 370;
const FOOTER_HEIGHT = 70;

// Ranges fixos de SUM para exemplo visual (cores/intervalos)
const SUM_RANGES = [
  { top: "15", bottom: "129", color: "#FFEB3B" },
  { top: "130", bottom: "175", color: "#00B0FF" },
  { top: "176", bottom: "220", color: "#388E3C" },
  { top: "221", bottom: "335", color: "#F44336" },
];

// MOCK DATA (remova depois e troque pelo resultado do fetch do Supabase)
const MOCK_ROWS = Array.from({ length: 32 }, (_, i) => ({
  date: `05/${(i + 1).toString().padStart(2, "0")}/25`,
  sum: 129 + ((i * 7) % 210),
  values: [
    Math.round(Math.random()), // 0/1 para box1
    Math.round(Math.random()), // 0/1 para box2
    Math.round(Math.random()), // 0/1 para box3
    Math.round(Math.random()), // 0/1 para box4
  ],
}));
const MOCK_FREQ = [12, 22, 15, 9]; // Frequências por faixa de sum

export default function AnalysisSum() {
  // Datas do filtro
  const [fromDate, setFromDate] = useState(new Date(2025, 4, 1));
  const [toDate, setToDate] = useState(new Date(2025, 4, 20));
  const [pickerMode, setPickerMode] = useState<null | "from" | "to">(null);

  // SCROLL SYNC refs (para quando tiver rolagem horizontal, se quiser)
  const headerScrollRef = useRef(null);

  // *** QUANDO CONECTAR NO SUPABASE:
  // const [rows, setRows] = useState([]);
  // const [freq, setFreq] = useState([0,0,0,0]);
  // const [loading, setLoading] = useState(false);

  // Função para formatar datas no padrão MM/DD/YY
  const formatDate = (date: Date) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  };

  // *** DESCOMENTAR E USAR DEPOIS ***
  // useEffect(() => {
  //   setLoading(true);
  //   // Exemplo: fetch do Supabase conforme datas selecionadas
  //   fetchSumAnalysis(fromDate, toDate).then(({ rows, freq }) => {
  //     setRows(rows);
  //     setFreq(freq);
  //     setLoading(false);
  //   });
  // }, [fromDate, toDate]);

  // Date Picker
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

  // MOCK enquanto não tem API
  const rows = MOCK_ROWS;
  const freq = MOCK_FREQ;
  const loading = false; // troque para "loading" da API quando plugar

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
          backTo="/analysis/NY/analysis"
        />

        {/* TABS DE FILTRO */}
        <AnalysisTabs />

        {/* FILTRO DE DATA + DRAW COUNT */}
        <View style={styles.datesPad}>
          <View style={styles.innerWrapper}>
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

        {/* DateTimePicker */}
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

        {/* CABEÇALHO DA GRADE */}
        <View style={styles.innerWrapper}>
          <View style={styles.gridHeader}>
            <View style={styles.dateBox}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            <View style={styles.sumBox}>
              <Text style={styles.headerText}>SUM</Text>
            </View>
            {SUM_RANGES.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.greenBox,
                  { backgroundColor: item.color, borderColor: "#000" },
                ]}
              >
                <Text style={styles.rangeText}>{item.top}</Text>
                <View style={styles.separator} />
                <Text style={styles.rangeText}>{item.bottom}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* GRADE DE DADOS */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerWrapper}>
          {loading ? (
            <ActivityIndicator color="#0E4CA1" style={{ marginTop: 40 }} />
          ) : (
            rows.map((row, i) => (
              <View key={i} style={styles.row}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{row.date}</Text>
                </View>
                <View style={styles.sumBox}>
                  <Text style={styles.sumText}>{row.sum}</Text>
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

      {/* RODAPÉ FREQUENCIES */}
      <View style={styles.footer}>
        <View style={styles.innerWrapper}>
          <View style={styles.row}>
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
                    ][i],
                  },
                ]}
              >
                <Text style={styles.freqText}>{val}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ==== Styles
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#ECF1FF" },
  fixedHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    backgroundColor: "#ECF1FF",
  },
  datesPad: {
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  innerWrapper: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dateLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 30,
    width: 75,
    backgroundColor: "#FFF",
    borderRadius: 6,
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
  gridHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    gap: 5,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT - 80,
    paddingBottom: FOOTER_HEIGHT + 10,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    gap: 5,
    justifyContent: "center",
  },
  dateBox: {
    width: 80,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { fontSize: 13 },
  sumBox: {
    width: 50,
    height: 45,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  sumText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 15,
  },
  headerText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 13,
  },
  greenBox: {
    width: 45,
    height: 45,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9EAD3",
  },
  greenText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 14,
  },
  separator: {
    width: "70%",
    height: 2,
    backgroundColor: "#000",
    marginVertical: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ECF1FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: FOOTER_HEIGHT,
  },
  freqLabel: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#AAA",
  },
  freqLabelText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  freqBox: {
    width: 45,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  freqText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});
