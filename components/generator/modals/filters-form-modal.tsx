import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView style={{ maxHeight: 500 }}>
          {FILTER_KEYS.map(({ key, mode, color }) => {
            const min = filters[key][0];
            const max = filters[key][1];
            return (
              <TouchableOpacity
                key={key}
                style={styles.row}
                onPress={() => setActiveFilter({ key, mode })}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.labelBox,
                    { backgroundColor: color, borderColor: "#333" },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelText,
                      { color: key === "SEQUENCE" ? "#FFF" : "#000" },
                    ]}
                  >
                    {key.replace(/_/g, " ")}
                  </Text>
                </View>

                <View style={styles.valueBox}>
                  <View style={styles.minMaxBox}>
                    <Text style={styles.minMaxText}>
                      {min === 0 ? "Min" : min}
                    </Text>
                  </View>
                  <Text style={styles.dash}>-</Text>
                  <View style={styles.minMaxBox}>
                    <Text style={styles.minMaxText}>
                      {max === 0 ? "Max" : max}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => onApply(filters)}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  modalContainer: {
    backgroundColor: "#ECF1FF",
    borderRadius: 16,
    padding: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
    justifyContent: "center",
  },
  labelBox: {
    width: 120,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5, // ✅ stroke 1.5px
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  valueBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  minMaxBox: {
    backgroundColor: "#fff",
    borderColor: "#333",
    borderWidth: 1, // ✅ stroke 1px
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  minMaxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  dash: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  clearButton: {
    backgroundColor: "#F44336",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  clearText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#00C851",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
