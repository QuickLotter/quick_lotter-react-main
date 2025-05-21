import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

export default function DateRangeFilter() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatted = (date: Date) => format(date, "MM/dd/yy");

  return (
    // 🔵 Fundo azul claro ocupando 100% da largura da tela
    <View style={styles.outer}>
      {/* 🔲 Bloco branco centralizado com maxWidth */}
      <View style={styles.wrapper}>
        <Text style={styles.label}>Drawn date:</Text>

        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.dateText}>{formatted(startDate)}</Text>
        </TouchableOpacity>

        <Text style={styles.toText}>to the</Text>

        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.dateText}>{formatted(endDate)}</Text>
        </TouchableOpacity>

        <View style={styles.rangeBox}>
          <Text style={styles.rangeText}>1000</Text>
        </View>
      </View>

      {/* ⏳ Date pickers nativos */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // 🔵 Container que ocupa 100% da largura e aplica fundo azul claro
  outer: {
    width: "100%",
    backgroundColor: "#ECF1FF",
    alignItems: "center",
    paddingVertical: -10, // altura externa (ajuste aqui)
  },

  // 🔲 Caixa branca centralizada com limite de largura
  wrapper: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5, // altura interna do bloco branco
    paddingHorizontal: 16,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 2440, // 🔐 tamanho do pad central
    width: "100%", // ocupa toda a largura até o máximo
    flexWrap: "nowrap",
  },

  // 🏷️ Texto "Drawn date:"
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    marginRight: 5,
  },

  // 🔁 Texto "to the"
  toText: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 5,
  },

  // 🗓️ Bloco de data clicável
  inputBox: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  // 📆 Texto da data
  dateText: {
    fontSize: 14,
    color: "#000",
  },

  // 🔢 Caixa com valor "1000"
  rangeBox: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
  },

  // Texto dentro da caixa "1000"
  rangeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
  },
});
