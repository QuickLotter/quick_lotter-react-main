import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ButtonNav({
  onGenerate,
  onClear,
  showSmartFilter = false,
  SmartFilterComponent,
}: {
  onGenerate: () => void;
  onClear: () => void;
  showSmartFilter?: boolean;
  SmartFilterComponent?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
        },
      ]}
    >
      {/* Smart Filter opcional */}
      {showSmartFilter && SmartFilterComponent && (
        <View style={styles.smartWrapper}>{SmartFilterComponent}</View>
      )}

      {/* Botões principais */}
      <View style={styles.buttonRow}>
        {/* Botão Generator (verde com letras pretas) */}
        <TouchableOpacity style={styles.generateButton} onPress={onGenerate}>
          <Feather name="zap" size={20} color="#1A1A1A" />
          <Text style={styles.generateText}>Done</Text>
        </TouchableOpacity>

        {/* Botão Clear (vermelho com letras brancas) */}
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <MaterialIcons name="clear" size={20} color="#fff" />
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
    alignItems: "center",
  },
  smartWrapper: {
    width: "100%",
    maxWidth: 768,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    maxWidth: 768,
    paddingHorizontal: 16,
  },
  generateButton: {
    flex: 1,
    backgroundColor: "#3DF14A", // Verde limão
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  generateText: {
    color: "#1A1A1A", // Preto
    fontWeight: "bold",
    fontSize: 16,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#EE3E33", // Vermelho
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  clearText: {
    color: "#FFFFFF", // Branco
    fontWeight: "bold",
    fontSize: 16,
  },
});
