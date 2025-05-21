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

const HEADER_HEIGHT = 375;
const FOOTER_HEIGHT = 70;

const rows = Array.from({ length: 30 }, () => ({
  date: "10/08/24",
  digits: 3,
  values: [1, 1, 1, 1, 1, 1],
}));

const filterButtons = [
  { label: "SUM", color: "#B9B9B9", textColor: "#000" },
  { label: "ODD", color: "#4CAF50", textColor: "#000" }, //0-5
  { label: "LOW", color: "#9575CD", textColor: "#000" }, //0-5
  { label: "PRIME", color: "#009BDE", textColor: "#000" }, //0-4
  { label: "FIBONACCI 3", color: "#E1058C", textColor: "#FFF" }, //0-3
  { label: "MULT. OF 3", color: "#4DD0E1", textColor: "#000" }, //0-5
  { label: "VERTICAL", color: "#B71C1C", textColor: "#FFF" }, //0-5
  { label: "ADJACENT", color: "#8BC34A", textColor: "#000" }, //0-3
  { label: "SEQUENCE", color: "#000000", textColor: "#FFF" }, //0-2
  { label: "REPEATED", color: "#FF9800", textColor: "#000" }, //0-3
  { label: "DIGITS", color: "#CDDC39", textColor: "#000" }, //4-9
  { label: "LINES", color: "#005BAA", textColor: "#FFF" }, //2-5
  { label: "COLUMNS", color: "#ff0004", textColor: "#fff" }, //2-5
];

const valueBoxes = [
  { label: "4", bgColor: "#1A1AFF", textColor: "#FFF" }, //0
  { label: "5", bgColor: "#FF8C00", textColor: "#000" }, //1
  { label: "6", bgColor: "#1B5E20", textColor: "#fff" }, //2
  { label: "7", bgColor: "#F8BBD0", textColor: "#000" }, //3
  { label: "8", bgColor: "#FFD700", textColor: "#000" }, //4
  { label: "9", bgColor: "#3E2723", textColor: "#fff" }, //5
];

const freqBoxes = [
  { value: 95, bgColor: "#43A047", textColor: "#000" }, //0
  { value: 78, bgColor: "#388E3C", textColor: "#000" }, //1
  { value: 50, bgColor: "#FFEB3B", textColor: "#000" }, //2
  { value: 49, bgColor: "#FB8C00", textColor: "#000" }, //3
  { value: 29, bgColor: "#F44336", textColor: "#000" }, //4
  { value: 29, bgColor: "#ff0000", textColor: "#000" }, //5
];

export default function Analysisdigits() {
  const [active, setActive] = useState("digits");
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
        />

        <View style={styles.filtersPad}>
          <View style={styles.filtersInner}>
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
                        { color: btn.textColor },
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

        <View style={styles.datesPad}>
          <View style={styles.filtersInner}>
            <View style={styles.datesRow}>
              <Text style={styles.dateLabel}>Drawn date:</Text>
              <TextInput style={styles.input} value="05/12/25" />
              <Text style={styles.dateLabel}>to the</Text>
              <TextInput style={styles.input} value="05/12/25" />
              <TextInput style={styles.input} value="1000" />
            </View>
          </View>
        </View>

        <View style={styles.tableContent}>
          <View style={styles.tableRow}>
            <View style={styles.dateBox}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            <View style={styles.digitsBoxGreen}>
              <Text style={styles.digitsBoxGreenText}>DIG</Text>
            </View>
            {valueBoxes.map((box, i) => (
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tableContent}>
          {rows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{row.date}</Text>
              </View>
              <View style={styles.digitsBoxGreen}>
                <Text style={styles.digitsBoxGreenText}>{row.digits}</Text>
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

      <View style={styles.footer}>
        <View style={styles.tableRow}>
          <View style={styles.freqLabel}>
            <Text style={styles.freqLabelText}>FREQUENCY</Text>
          </View>
          {freqBoxes.map((box, i) => (
            <View
              key={i}
              style={[styles.freqBox, { backgroundColor: box.bgColor }]}
            >
              <Text style={[styles.freqText, { color: box.textColor }]}>
                {box.value}
              </Text>
            </View>
          ))}
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
    gap: 6,
    marginBottom: 6,
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
  digitsBoxGreen: {
    width: 38,
    height: 30,
    backgroundColor: "#CDDC39",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  digitsBoxGreenText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000", // ✅ letra branca dentro do bloco digits
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
