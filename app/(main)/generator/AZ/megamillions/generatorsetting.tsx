import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import GensettingButton from "@/components/generator/layout/gensettingbutton";
import MegaMillionsLogo from "@/assets/logos/AZ/megamillions.svg";

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

  useEffect(() => {
    if (matchCondition > numbersPerTicket) {
      setMatchCondition(numbersPerTicket);
    }
    if (guarantee > numbersPerTicket) {
      setGuarantee(numbersPerTicket);
    }
  }, [numbersPerTicket]);

  const renderInput = (
    label: string,
    value: number,
    onChange: ((v: number) => void) | undefined,
    editable: boolean = true
  ) => (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputBox}
          value={value.toString()}
          onChangeText={(val) => {
            const num = parseInt(val || "0");
            if (onChange) {
              if (
                (label.includes("Guarantee") || label.includes("Match")) &&
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
        />
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <GameHeader
        title="Generator Setting"
        subtitle="Arizona Mega Millions"
        logo={<MegaMillionsLogo width={120} height={48} />}
        headerColor="#0E4CA1"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ResponsiveContainer style={styles.card}>
          {renderInput(
            "Total numbers to cover",
            totalNumbers,
            undefined,
            false
          )}
          {renderInput("Total extra balls", totalExtras, undefined, false)}
          {renderInput(
            "Numbers per ticket",
            numbersPerTicket,
            undefined,
            false
          )}
          {renderInput("Guarantee desired >=", guarantee, setGuarantee)}
          {renderInput("Match condition", matchCondition, setMatchCondition)}
          {renderInput("Fixed numbers", fixedNumbers, setFixedNumbers)}
          {renderInput("Number of lines", lines, setLines)}

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Add Filters</Text>
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
    backgroundColor: "#F2F4FF",
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    width: "60%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputBox: {
    width: 120,
    height: 52,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  filterButton: {
    backgroundColor: "#1877F2",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  filterButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
