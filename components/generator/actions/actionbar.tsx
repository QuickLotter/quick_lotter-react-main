// Path: components/generator/selector/actionbar.tsx

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onGenerate: () => void;
  onClear: () => void;
  onSmartFilter?: () => void;
  showSmartFilter?: boolean;
};

export default function ActionBar({
  onGenerate,
  onClear,
  onSmartFilter,
  showSmartFilter = false,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.buttonGenerate} onPress={onGenerate}>
          <Text style={styles.textGenerate}>Generator</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClear} onPress={onClear}>
          <Text style={styles.textClear}>Clear Selector</Text>
        </TouchableOpacity>
      </View>

      {showSmartFilter && (
        <TouchableOpacity style={styles.smartFilter} onPress={onSmartFilter}>
          <Text style={styles.textSmart}>🎯 Smart Filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ECF1FF",
    paddingVertical: 12,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  inner: {
    flexDirection: "row",
    gap: 16,
    maxWidth: 768,
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  buttonGenerate: {
    flex: 1,
    backgroundColor: "#00FF57",
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: "center",
  },
  buttonClear: {
    flex: 1,
    backgroundColor: "#EE3E33",
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: "center",
  },
  textGenerate: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  textClear: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
  smartFilter: {
    marginTop: 10,
    backgroundColor: "#007EFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textSmart: {
    color: "#FFF",
    fontWeight: "600",
  },
});
