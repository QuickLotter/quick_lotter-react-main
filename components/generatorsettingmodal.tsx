import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GameHeader from "@/components/generator/header/gameheader";
import FiltersFormModal from "@/components/generator/modals/filtersformmodal"; // <-- Adicione o import do seu modal de filtros aqui

// Props e tipos
type GeneratorSettingModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (
    settings: GeneratorSettings,
    filters?: Record<string, number[]>
  ) => void;
  game: any;
  selectedMain: number[];
  selectedExtra?: number[];
};

export type GeneratorSettings = {
  guarantee: number;
  matchCondition: number;
  fixedNumbers: number;
  lines: number;
};

export default function GeneratorSettingModal({
  visible,
  onClose,
  onConfirm,
  game,
  selectedMain,
  selectedExtra,
}: GeneratorSettingModalProps) {
  const totalNumbers = selectedMain.length;
  const totalExtras = selectedExtra?.length || 0;
  const numbersPerTicket = game?.mainGrid?.pick || 0;

  const [guarantee, setGuarantee] = useState(1);
  const [matchCondition, setMatchCondition] = useState(1);
  const [fixedNumbers, setFixedNumbers] = useState(0);
  const [lines, setLines] = useState(0);

  // State para filtros
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [filters, setFilters] = useState<Record<string, number[]>>({});

  useEffect(() => {
    if (matchCondition > numbersPerTicket) setMatchCondition(numbersPerTicket);
    if (guarantee > numbersPerTicket) setGuarantee(numbersPerTicket);
  }, [visible, numbersPerTicket]);

  const renderInputRow = (
    label: string,
    value: number,
    onChange?: (v: number) => void,
    editable: boolean = true
  ) => (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputCol}>
        <TouchableOpacity
          style={[styles.arrowBtn, !editable && styles.arrowBtnHidden]}
          onPress={() => onChange && onChange(Math.max(0, value - 1))}
          disabled={!editable || value <= 0}
        >
          <Ionicons
            name="remove"
            size={20}
            color={editable ? (value <= 0 ? "#CCC" : "#007EFF") : "transparent"}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={[styles.arrowBtn, !editable && styles.arrowBtnHidden]}
          onPress={() => onChange && onChange(value + 1)}
          disabled={!editable}
        >
          <Ionicons
            name="add"
            size={20}
            color={editable ? "#007EFF" : "transparent"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Header SEM a seta de voltar!
  const renderHeader = () => (
    <GameHeader
      title="Generator Setting"
      subtitle={`New York ${game?.name ?? ""}`}
      logo={game?.logo ? <game.logo width={110} height={40} /> : null}
      headerColor={game?.headerColor || "#0E4CA1"}
      textColor="#fff"
      style={styles.modalHeader}
      // ** Não passe onBack nem exiba seta **
      showBack={false}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* BLUR overlay: cor cinza translúcida */}
      <Pressable style={styles.modalOverlay} onPress={onClose} />

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {renderHeader()}
          <View style={styles.card}>
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
            {renderInputRow(
              "Match condition",
              matchCondition,
              setMatchCondition
            )}
            <View style={styles.divider} />
            {renderInputRow("Fixed numbers", fixedNumbers, setFixedNumbers)}
            <View style={styles.divider} />
            {renderInputRow("Number of lines", lines, setLines)}

            {/* [+ Add Filters] abre o modal de filtros */}
            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.85}
              onPress={() => setFiltersModalVisible(true)}
            >
              <Text style={styles.filterButtonText}>+ Add Filters</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomActions}>
            {/* Botão Generate com Bolt e texto preto */}
            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  backgroundColor: "#3DF14A",
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                },
              ]}
              onPress={() => {
                onConfirm(
                  {
                    guarantee,
                    matchCondition,
                    fixedNumbers,
                    lines,
                  },
                  filters
                );
              }}
            >
              <Ionicons
                name="flash"
                size={22}
                color="#000"
                style={{ marginRight: 1, marginTop: 1 }}
              />
              <Text style={[styles.actionText, { color: "#000" }]}>
                Generate
              </Text>
            </TouchableOpacity>
            {/* Botão Cancel */}
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#F23D3D" }]}
              onPress={onClose}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal de filtros */}
      <FiltersFormModal
        visible={filtersModalVisible}
        onClose={() => setFiltersModalVisible(false)}
        onApply={(f) => {
          setFilters(f);
          setFiltersModalVisible(false);
        }}
      />
    </Modal>
  );
}

const INPUT_COL_WIDTH = 122;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(36,37,48,0.33)", // cinza translúcido tipo blur iOS
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  modalView: {
    width: "94%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingBottom: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 10,
    overflow: "hidden",
  },
  modalHeader: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
    width: "100%",
  },
  card: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginTop: 4,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  inputLabel: {
    fontSize: 15.5,
    fontWeight: "600",
    color: "#232B44",
    flex: 1.5,
    letterSpacing: 0.03,
  },
  inputCol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: INPUT_COL_WIDTH,
    minWidth: INPUT_COL_WIDTH,
    maxWidth: INPUT_COL_WIDTH,
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
    opacity: 1,
  },
  arrowBtnHidden: {
    opacity: 0,
  },
  inputBox: {
    width: 52,
    height: 36,
    fontSize: 17,
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
    width: "96%",
    alignSelf: "center",
    marginVertical: 0,
  },
  filterButton: {
    backgroundColor: "#007EFF",
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
    marginBottom: 6,
    width: "97%",
    alignSelf: "center",
    shadowColor: "#007EFF",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15.8,
    letterSpacing: 0.14,
  },
  bottomActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 8,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.1,
  },
});
