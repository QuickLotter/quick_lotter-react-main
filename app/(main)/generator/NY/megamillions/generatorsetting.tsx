import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import GensettingButton from "@/components/generator/layout/gensettingbutton";
import { Ionicons } from "@expo/vector-icons";
import MegaMillionsLogo from "@/assets/logos/ny/megamillions.svg";

export default function GeneratorSetting() {
  const { gameSlug, total_numbers, extra_balls, per_ticket } =
    useLocalSearchParams<{
      gameSlug: string;
      total_numbers: string;
      extra_balls: string;
      per_ticket: string;
    }>();

  const totalNumbers = parseInt(total_numbers || "0");
  const totalExtras = parseInt(extra_balls || "0");
  const numbersPerTicket = parseInt(per_ticket || "0");

  const [guarantee, setGuarantee] = useState(1);
  const [matchCondition, setMatchCondition] = useState(1);
  const [fixedNumbers, setFixedNumbers] = useState(0);
  const [lines, setLines] = useState(0);

  // Limitar valores aos máximos permitidos
  useEffect(() => {
    if (matchCondition > numbersPerTicket) setMatchCondition(numbersPerTicket);
    if (guarantee > numbersPerTicket) setGuarantee(numbersPerTicket);
  }, [numbersPerTicket]);

  // Linha de input: label à esquerda, input à direita
  const renderInputRow = (
    label: string,
    value: number,
    onChange?: (v: number) => void,
    editable: boolean = true
  ) => (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputControl}>
        {editable && (
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => onChange && onChange(Math.max(0, value - 1))}
            disabled={value <= 0}
          >
            <Ionicons
              name="remove"
              size={20}
              color={value <= 0 ? "#CCC" : "#007EFF"}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.inputBox, !editable && styles.inputBoxReadonly]}
          value={value.toString()}
          onChangeText={(val) => {
            const num = parseInt(val || "0");
            if (onChange) {
              if (
                (label.toLowerCase().includes("guarantee") ||
                  label.toLowerCase().includes("match")) &&
                num > numbersPerTicket
              ) {
                onChange(numbersPerTicket);
              } else {
                onChange(num);
              }
            }
          }}
          editable={editable}
          keyboardType="number-pad"
          textAlign="center"
        />
        {editable && (
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => onChange && onChange(value + 1)}
          >
            <Ionicons name="add" size={20} color="#007EFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Generator Setting"
        subtitle="New York Mega Millions"
        logo={<MegaMillionsLogo width={120} height={48} />}
        headerColor="#0E4CA1"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer style={styles.card}>
          {renderInputRow(
            "Total numbers to cover",
            totalNumbers,
            undefined,
            false
          )}
          <View style={styles.divider} />
          {renderInputRow("Total extra balls", totalExtras, undefined, false)}
          <View style={styles.divider} />
          {renderInputRow(
            "Numbers per ticket",
            numbersPerTicket,
            undefined,
            false
          )}
          <View style={styles.divider} />
          {renderInputRow("Guarantee desired >=", guarantee, setGuarantee)}
          <View style={styles.divider} />
          {renderInputRow("Match condition", matchCondition, setMatchCondition)}
          <View style={styles.divider} />
          {renderInputRow("Fixed numbers", fixedNumbers, setFixedNumbers)}
          <View style={styles.divider} />
          {renderInputRow("Number of lines", lines, setLines)}

          <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
            <Text style={styles.filterButtonText}>+ Add Filters</Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
      <GensettingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  scrollContent: {
    paddingVertical: 22,
    paddingBottom: 120,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
  },
  inputLabel: {
    fontSize: 16.5,
    fontWeight: "600",
    color: "#232B44",
    flex: 1.4,
    letterSpacing: 0.03,
  },
  inputControl: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    gap: 5,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4ECFA",
    marginHorizontal: 2,
  },
  inputBox: {
    width: 64,
    height: 38,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#F7F8FA",
    color: "#232B44",
    borderRadius: 10,
    borderWidth: 1.1,
    borderColor: "#D6DBF4",
    paddingHorizontal: 6,
    marginHorizontal: 1,
    textAlign: "center",
  },
  inputBoxReadonly: {
    backgroundColor: "#F1F3F9",
    color: "#A6AAC3",
    borderColor: "#E4E6F5",
  },
  divider: {
    height: 1.1,
    backgroundColor: "#F3F5F8",
    width: "90%",
    alignSelf: "center",
    marginVertical: 0,
  },
  filterButton: {
    backgroundColor: "#007EFF",
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 6,
    width: "92%",
    alignSelf: "center",
    shadowColor: "#007EFF",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.15,
  },
});
