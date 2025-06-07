import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import EditFilterModal from "./editFilterModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, number[]>) => void;
};

const FILTER_KEYS: {
  key: string;
  mode: "range" | "select";
  color: string;
}[] = [
  { key: "SUM", mode: "range", color: "#9E9E9E" },
  { key: "ODD", mode: "select", color: "#4CAF50" },
  { key: "LOW", mode: "select", color: "#9575CD" },
  { key: "PRIME", mode: "select", color: "#FF8A65" },
  { key: "FIBONACCI", mode: "select", color: "#F06292" },
  { key: "MULT_OF_3", mode: "select", color: "#4DD0E1" },
  { key: "VERTICAL", mode: "select", color: "#B71C1C" },
  { key: "ADJACENT", mode: "select", color: "#388E3C" },
  { key: "REPEATED", mode: "select", color: "#FB8C00" },
  { key: "SEQUENCE", mode: "select", color: "#000000" },
  { key: "DIGITS", mode: "select", color: "#FFEB3B" },
  { key: "LINES", mode: "select", color: "#1976D2" },
  { key: "COLUMNS", mode: "select", color: "#F44336" },
];

const POPUP_WIDTH = Math.min(Dimensions.get("window").width * 0.97, 410);

export default function FiltersFormModal({ visible, onClose, onApply }: Props) {
  const [filters, setFilters] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(FILTER_KEYS.map((f) => [f.key, [0, 0]]))
  );
  const [activeFilter, setActiveFilter] = useState<{
    key: string;
    mode: "range" | "select";
  } | null>(null);

  const handleFilterChange = (key: string, newValue: number[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleClear = () => {
    setFilters(() =>
      Object.fromEntries(FILTER_KEYS.map((f) => [f.key, [0, 0]]))
    );
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.35}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={onClose}
      style={styles.modalCentered}
    >
      <View style={[styles.popupSheet, { width: POPUP_WIDTH }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity
            onPress={() => onApply(filters)}
            style={styles.headerBtn}
          >
            <Text style={[styles.headerBtnText, { color: "#007EFF" }]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters List */}
        <ScrollView
          style={{ maxHeight: 430 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {FILTER_KEYS.map(({ key, mode, color }) => {
            const min = filters[key][0];
            const max = filters[key][1];
            return (
              <TouchableOpacity
                key={key}
                style={styles.filterRow}
                activeOpacity={0.82}
                onPress={() => setActiveFilter({ key, mode })}
              >
                <View
                  style={[
                    styles.labelPill,
                    { backgroundColor: color },
                    key === "DIGITS" && { borderWidth: 1, borderColor: "#BBB" },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelPillText,
                      {
                        color:
                          key === "DIGITS" || color === "#FFEB3B"
                            ? "#222"
                            : "#FFF",
                      },
                    ]}
                  >
                    {key.replace(/_/g, " ")}
                  </Text>
                </View>
                <View style={styles.valueGroup}>
                  <View style={styles.valueBox}>
                    <Text style={styles.valueText}>
                      {min === 0 ? "Min" : min}
                    </Text>
                  </View>
                  <Text style={styles.valueDash}>–</Text>
                  <View style={styles.valueBox}>
                    <Text style={styles.valueText}>
                      {max === 0 ? "Max" : max}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popup for editing filter */}
      {activeFilter && (
        <EditFilterModal
          visible={true}
          filterKey={activeFilter.key}
          mode={activeFilter.mode}
          value={filters[activeFilter.key]}
          onCancel={() => setActiveFilter(null)}
          onConfirm={(newVal) => {
            handleFilterChange(activeFilter.key, newVal);
            setActiveFilter(null);
          }}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalCentered: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  popupSheet: {
    backgroundColor: "#ECF1FF",
    borderRadius: 24,
    paddingTop: 0,
    paddingHorizontal: 0,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 10,
    width: 360,
    maxWidth: 420,
    minWidth: 290,
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D1D5DB",
    paddingHorizontal: 16,
    backgroundColor: "#ECF1FF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerBtn: {
    minWidth: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007EFF",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#121C3D",
    letterSpacing: 0.03,
  },

  // ========== Filters List ========== //
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    borderRadius: 17,
    backgroundColor: "#F7F8FE",
    marginHorizontal: 14,
    marginBottom: 0,
    shadowColor: "#CAD5FA",
    shadowOpacity: 0.11,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    gap: 12,
    height: 48,
    paddingHorizontal: 10,
  },
  labelPill: {
    width: 110,
    height: 35,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 4,
  },
  labelPillText: {
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.04,
  },
  valueGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: 3,
  },
  valueBox: {
    backgroundColor: "#fff",
    borderColor: "#BFC8E8",
    borderWidth: 1.2,
    borderRadius: 9,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#34395A",
  },
  valueDash: {
    fontSize: 15,
    fontWeight: "700",
    color: "#BFC8E8",
    marginHorizontal: 3,
  },

  // ========== Footer ========== //
  footer: {
    marginTop: 16,
    alignItems: "center",
    paddingBottom: 12,
    width: "100%",
  },
  clearBtn: {
    backgroundColor: "#F44336",
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderRadius: 24,
    width: "89%",
    alignSelf: "center",
    shadowColor: "#F44336",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.02,
    textAlign: "center",
  },
});
