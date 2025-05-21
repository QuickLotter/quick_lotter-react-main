import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography } from "@/theme";
import HeaderLogoBack from "@/components/layout/HeaderLogoBack";

const numbersRange = Array.from({ length: 70 }, (_, i) => i + 1);
const megaBallRange = Array.from({ length: 25 }, (_, i) => i + 1);

export default function GeneratorMegaMillions() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedMegaBalls, setSelectedMegaBalls] = useState<number[]>([]);
  const [smartFilter, setSmartFilter] = useState(false);

  const toggleNumber = (number: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const toggleMegaBall = (number: number) => {
    setSelectedMegaBalls((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const quickPick = () => {
    const shuffled = numbersRange.sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 5);
    const shuffledMega = megaBallRange.sort(() => 0.5 - Math.random());
    const pickedMega = shuffledMega.slice(0, 1);

    setSelectedNumbers((prev) => [...new Set([...prev, ...picked])]);
    setSelectedMegaBalls((prev) => [...new Set([...prev, ...pickedMega])]);
  };

  const clearAll = () => {
    setSelectedNumbers([]);
    setSelectedMegaBalls([]);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Generator – New York Mega Millions</Text>

        <View style={styles.subHeader}>
          <Text style={styles.label}>Picked: {selectedNumbers.length}</Text>
          <Text style={styles.label}>
            Lines: {/* Placeholder for real calc */}10000
          </Text>
          <TouchableOpacity style={styles.quickPickBtn} onPress={quickPick}>
            <Ionicons name="flash" size={20} color="#fff" />
            <Text style={styles.quickPickText}>Quick Pick</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {numbersRange.map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.ball,
                selectedNumbers.includes(num) && styles.ballSelected,
              ]}
              onPress={() => toggleNumber(num)}
            >
              <Text style={styles.ballText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.title, { marginTop: 16 }]}>Pick Mega Ball</Text>
        <Text style={styles.label}>
          Pick {selectedMegaBalls.length} Mega ball
        </Text>
        <View style={styles.grid}>
          {megaBallRange.map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.ball,
                selectedMegaBalls.includes(num) && styles.megaBallSelected,
              ]}
              onPress={() => toggleMegaBall(num)}
            >
              <Text style={styles.ballText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.smartFilter}
          onPress={() => setSmartFilter((prev) => !prev)}
        >
          <MaterialIcons
            name={smartFilter ? "check-circle" : "check-circle-outline"}
            size={20}
            color={smartFilter ? Colors.success : Colors.textMuted}
          />
          <View>
            <Text style={styles.smartText}>Smart Filter</Text>
            <Text style={styles.smartSubText}>
              Generate powerful combinations by AI
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.generateBtn}>
            <Text style={styles.generateText}>Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
            <Text style={styles.clearText}>Clear Selector</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    ...Typography.heading,
    fontSize: 18,
    marginVertical: 12,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  quickPickBtn: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  quickPickText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ballSelected: {
    backgroundColor: "#E53935",
  },
  megaBallSelected: {
    backgroundColor: "#0033CC",
  },
  ballText: {
    color: Colors.text,
    fontWeight: "600",
  },
  smartFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 16,
    backgroundColor: "#F1F5FF",
    padding: 12,
    borderRadius: 12,
    width: "100%",
  },
  smartText: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.text,
  },
  smartSubText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  generateBtn: {
    backgroundColor: Colors.success,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  generateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearBtn: {
    backgroundColor: Colors.danger,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
