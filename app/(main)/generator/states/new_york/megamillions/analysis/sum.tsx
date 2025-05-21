import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";

const HEADER_HEIGHT = 370;
const FOOTER_HEIGHT = 70;

const rows = Array.from({ length: 50 }, () => ({
  date: "10/08/24",
  sum: 335,
  values: [1, 1, 1, 1],
}));

const filterButtons = [
  { label: "SUM", color: "#E0E0E0" },
  { label: "ODD", color: "#4CAF50" }, //0-5
  { label: "LOW", color: "#9575CD" }, //0-5
  { label: "PRIME", color: "#009BDE" }, //0-4
  { label: "FIBONACCI", color: "#E1058C" }, //0-3
  { label: "MULT. OF 3", color: "#4DD0E1" }, //0-5
  { label: "VERTICAL", color: "#B71C1C" }, //0-5
  { label: "ADJACENT", color: "#8BC34A" }, //0-3
  { label: "SEQUENCE", color: "#000000" }, //0-2
  { label: "REPEATED", color: "#FF9800" }, //0-3
  { label: "DIGITS", color: "#CDDC39" }, //4-9
  { label: "LINES", color: "#005BAA" }, //2-5
  { label: "COLUMNS", color: "#F8C1D9" }, //2-5
];

export default function AnalysisMegaMillions() {
  const [active, setActive] = useState("SUM");
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.wrapper}>
      {/* HEADER FIXO */}
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
        />

        {/* BOTOES FILTROS */}
        <View style={styles.filtersPad}>
          <View style={styles.innerWrapper}>
            <ScrollView
              horizontal
              ref={scrollRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sliderRow}
            >
              {filterButtons.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={(e) => {
                    setActive(btn.label);
                    if (scrollRef.current) {
                      e.target.measureLayout(
                        scrollRef.current.getInnerViewNode(),
                        (x) => {
                          scrollRef.current?.scrollTo({
                            x: x - 100,
                            animated: true,
                          });
                        },
                        () => {}
                      );
                    }
                  }}
                >
                  <View
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: btn.color,
                        opacity: active === btn.label ? 1 : 0.3,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        btn.color === "#000000" && { color: "#FFF" },
                      ]}
                    >
                      {btn.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* CAMPOS DE DATA */}
        <View style={styles.datesPad}>
          <View style={styles.innerWrapper}>
            <View style={styles.datesRow}>
              <Text style={styles.dateLabel}>Drawn date:</Text>
              <TextInput style={styles.input} value="05/12/25" />
              <Text style={styles.dateLabel}>to the</Text>
              <TextInput style={styles.input} value="05/12/25" />
              <TextInput style={styles.input} value="1000" />
            </View>
          </View>
        </View>

        {/* CABEÇALHO GRADE */}
        <View style={styles.innerWrapper}>
          <View style={styles.gridHeader}>
            <View style={styles.dateBox}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            <View style={styles.sumBox}>
              <Text style={styles.headerText}>SUM</Text>
            </View>
            {[
              { top: "15", bottom: "129", color: "#FFEB3B" },
              { top: "130", bottom: "175", color: "#00B0FF" },
              { top: "176", bottom: "220", color: "#388E3C" },
              { top: "221", bottom: "335", color: "#F44336" },
            ].map((item, i) => (
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

      {/* DADOS */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerWrapper}>
          {rows.map((row, i) => (
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
          ))}
        </View>
      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <View style={styles.innerWrapper}>
          <View style={styles.row}>
            <View style={styles.freqLabel}>
              <Text style={styles.freqLabelText}>FREQUENCY</Text>
            </View>
            {[335, 258, 120, 69].map((val, i) => (
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
    </View>
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
  sliderRow: { flexDirection: "row", gap: 8 },
  filterButton: {
    width: 124,
    height: 38,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dateLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 32,
    width: 75,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 6,
    fontSize: 13,
    textAlign: "center",
  },
  gridHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    gap: 8,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT - 80,
    paddingBottom: FOOTER_HEIGHT + 10,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
    justifyContent: "center",
  },
  dateBox: {
    width: 80,
    backgroundColor: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: { fontSize: 14 },
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
    paddingHorizontal: 22,
    paddingVertical: 6,
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
