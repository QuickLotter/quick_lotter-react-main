import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Dados fictícios
const rows = Array.from({ length: 100 }, () => ({
  date: "10/08/24",
  sum: 335,
  values: [1, 1, 1, 1],
}));

export default function SumAnalysisTable() {
  return (
    <View style={styles.wrapper}>
      {/* 🔒 Header fixo com as faixas */}
      <View style={styles.fixedHeader}>
        {/* Espaços vazios alinhados com colunas de data e total */}
        <View style={styles.dateSpacer} />
        <View style={styles.sumSpacer} />

        {/* Blocos únicos com top/bottom e linha divisória */}
        {[
          { top: "15", bottom: "129", color: "#FFFF00", textColor: "#000" },
          { top: "130", bottom: "175", color: "#00B0F0", textColor: "#000" },
          { top: "176", bottom: "220", color: "#00B050", textColor: "#000" },
          { top: "221", bottom: "335", color: "#FF0000", textColor: "#FFF" },
        ].map((range, i) => (
          <View
            key={i}
            style={[
              styles.rangeBlock,
              {
                backgroundColor: range.color,
                borderColor: "#000",
              },
            ]}
          >
            <Text style={[styles.rangeTopText, { color: range.textColor }]}>
              {range.top}
            </Text>
            <View style={styles.separator} />
            <Text style={[styles.rangeBottomText, { color: range.textColor }]}>
              {range.bottom}
            </Text>
          </View>
        ))}
      </View>

      {/* 🔁 Scroll abaixo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ height: 70 }} /> {/* Espaço pro header fixo */}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
    alignItems: "center",
  },

  fixedHeader: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    flexDirection: "row",
    paddingHorizontal: 5,
    backgroundColor: "#ECF1FF",
    paddingTop: 5,
  },

  scrollContent: {
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, //Margem de baixo entre os quadrados verde
  },

  dateBox: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "400",
  },
  dateSpacer: {
    width: 75,
    height: 0,
    marginRight: 8,
  },

  sumBox: {
    width: 40,
    height: 30,
    backgroundColor: "#00B0F0",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#222",
  },
  sumText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  sumSpacer: {
    width: 50,
    height: 0,
    marginRight: 8,
  },

  greenBox: {
    backgroundColor: "#D9EAD3",
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 5, //Margem lateral entre os quadrados verdes
  },
  greenText: {
    fontWeight: "bold",
    fontSize: 14,
  },

  // 🔴 Faixa com dois números empilhados
  rangeBlock: {
    width: 30,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    paddingVertical: 2,
  },
  rangeTopText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 14,
  },
  separator: {
    width: "80%",
    height: 2,
    backgroundColor: "#333333",
    marginVertical: 1,
  },
  rangeBottomText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 14,
  },
  frequencyGroup: {
    flexDirection: "row", // ✅ Exibir os quadrados lado a lado
    alignItems: "center", // ✅ Alinhar verticalmente ao centro
    justifyContent: "flex-start", // ✅ Alinhamento horizontal (mude para center/right se preferir)
    gap: 8, // ✅ Espaço entre os quadrados
    marginTop: 100, // ✅ Espaço externo superior
    marginLeft: 16, // ✅ Move o grupo horizontalmente (ajuste aqui)
  },
  frequencyBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
