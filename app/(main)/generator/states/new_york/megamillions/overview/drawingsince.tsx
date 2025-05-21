import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import GameHeader from "@/components/generator/header/gameheader";
import MegamillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";

const columns = Array.from({ length: 70 }, (_, i) => `${i + 1}`);
const megaBalls = Array.from({ length: 24 }, (_, i) => `${i + 1}`);

const rows = Array.from({ length: 30 }, (_, idx) => ({
  date: `10/${8 + idx}/24`,
  values: Array.from({ length: 70 }, () => (Math.random() > 0.9 ? 1 : 0)),
  megas: Array.from({ length: 24 }, () => (Math.random() > 0.96 ? 1 : 0)),
}));

export default function DrawingSince() {
  const scrollXRef = useRef<ScrollView>(null);
  const scrollYRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState("DRAWING SINCE");

  return (
    <View style={styles.wrapper}>
      {/* 🔷 HEADER FIXO */}
      <View style={styles.fixedHeader}>
        <GameHeader
          logo={<MegamillionsLogo width={100} height={40} />}
          title="Analysis"
          subtitle="New York Mega Millions"
          headerColor="#0E4CA1"
        />

        {/* 🔷 TABS */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.tabsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {[
            "DRAWING SINCE",
            "POSITION 01",
            "POSITION 02",
            "POSITION 03",
            "POSITION 04",
            "POSITION 05",
            "POSITION PB",
          ].map((tab, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveTab(tab)}>
              <View
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 🔷 DATE PICKER */}
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

        {/* 🔷 CABEÇALHO FIXO COM SCROLL HORIZONTAL */}
        <ScrollView
          horizontal
          ref={scrollXRef}
          style={styles.scrollX}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            {columns.map((col, i) => (
              <View key={i} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.headerText}>{col}</Text>
              </View>
            ))}
            {megaBalls.map((col, i) => (
              <View key={`mb-${i}`} style={[styles.cell, styles.megaHeader]}>
                <Text style={styles.headerText}>{col}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 🔷 GRADE + DATAS COM ROLAGEM VERTICAL */}
      <View style={styles.tableWrapper}>
        <ScrollView
          ref={scrollYRef}
          style={styles.scrollY}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {/* 🔹 COLUNA DE DATAS */}
          <View style={styles.dateColumn}>
            <View style={styles.dateHeader}>
              <Text style={styles.headerText}>DATE</Text>
            </View>
            {rows.map((row, i) => (
              <View key={i} style={styles.dateCell}>
                <Text style={styles.dateText}>{row.date}</Text>
              </View>
            ))}
          </View>

          {/* 🔹 GRADE VERDE */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {rows.map((row, i) => (
                <View key={i} style={styles.row}>
                  {row.values.map((val, j) => (
                    <View
                      key={j}
                      style={[styles.cell, val ? styles.green : styles.empty]}
                    />
                  ))}
                  {row.megas.map((val, j) => (
                    <View
                      key={`mb-${j}`}
                      style={[styles.cell, val ? styles.yellow : styles.empty]}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      {/* 🔷 FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>FREQUENCY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...columns, ...megaBalls].map((_, i) => (
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
                    "#F44336",
                  ][i % 5],
                },
              ]}
            >
              <Text style={styles.freqText}>
                {Math.floor(Math.random() * 500)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#ECF1FF" },
  fixedHeader: { backgroundColor: "#ECF1FF", paddingTop: 40 },
  tabsContainer: { paddingHorizontal: 12, gap: 8 },
  tabButton: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  activeTab: { backgroundColor: "#0E4CA1" },
  tabText: { fontWeight: "600", fontSize: 14 },
  activeTabText: { color: "#FFF" },
  datesPad: {
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  filtersInner: { width: "100%", maxWidth: 768, alignSelf: "center" },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dateLabel: { fontSize: 14, fontWeight: "bold", color: "#333" },
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
  scrollX: { backgroundColor: "#FFF" },
  headerRow: { flexDirection: "row" },
  cell: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  headerCell: { backgroundColor: "#0E4CA1" },
  megaHeader: { backgroundColor: "#FFA500" },
  headerText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  dateColumn: { width: 80, backgroundColor: "#EDF0FB" },
  dateHeader: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  dateCell: { height: 30, justifyContent: "center", alignItems: "center" },
  dateText: { fontSize: 13 },
  tableWrapper: { flex: 1 },
  scrollY: { flex: 1 },
  row: { flexDirection: "row" },
  green: { backgroundColor: "#4CAF50" },
  yellow: { backgroundColor: "#FFD700" },
  empty: { backgroundColor: "#FFF" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    backgroundColor: "#ECF1FF",
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
  footerLabel: { fontWeight: "bold", paddingLeft: 10 },
  freqBox: {
    width: 30,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginRight: 2,
  },
  freqText: { color: "#000", fontWeight: "bold", fontSize: 12 },
});
