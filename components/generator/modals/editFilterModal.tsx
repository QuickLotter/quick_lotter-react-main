import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  filterKey: string;
  mode: "range" | "select";
  value: number[];
  onCancel: () => void;
  onConfirm: (newValue: number[]) => void;
};

export default function EditFilterModal({
  visible,
  filterKey,
  mode,
  value,
  onCancel,
  onConfirm,
}: Props) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    if (visible && value.length === 2) {
      setMin(value[0]?.toString() || "0");
      setMax(value[1]?.toString() || "0");
    }
  }, [visible, value]);

  const handleApply = () => {
    const parsed = [parseInt(min), parseInt(max)];
    if (parsed.some(isNaN)) return;
    onConfirm(parsed);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onCancel}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.centered}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Edit {filterKey}</Text>

          <View style={styles.inputsRow}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={min}
              onChangeText={setMin}
              placeholder="Min"
            />
            <Text style={styles.dash}>-</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={max}
              onChangeText={setMax}
              placeholder="Max"
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.applyBtn}>
              <Text style={styles.applyText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    maxWidth: 340,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 4,
  },
  dash: {
    fontSize: 18,
    marginHorizontal: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelText: {
    fontWeight: "bold",
    color: "#333",
  },
  applyBtn: {
    backgroundColor: "#007EFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
