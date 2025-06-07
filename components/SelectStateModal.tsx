// /components/SelectStateModal.tsx serve para selecionar o Estado que quer jogar
import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const STATES = [
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "VT",
  "VA",
  "WA",
  "DC",
  "WV",
  "WI",
  "WY",
];

type Props = {
  visible: boolean;
  onSelect: (code: string) => void;
};

export default function SelectStateModal({ visible, onSelect }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Select your state</Text>
          <FlatList
            data={STATES}
            keyExtractor={(item) => item}
            numColumns={4}
            contentContainerStyle={{ alignSelf: "center", width: 374 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.stateItem}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.stateText}>{item}</Text>
                <MaterialIcons name="check" size={0} color="#fff" />{" "}
                {/* Placeholder for alignment */}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  content: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 300,
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  stateItem: {
    paddingVertical: 12,
    margin: 6,
    borderRadius: 8,
    width: 78,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "transparent",
  },
  stateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
