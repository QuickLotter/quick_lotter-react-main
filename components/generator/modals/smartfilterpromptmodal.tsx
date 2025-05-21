import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onAddFilters: () => void;
  onSkip: () => void;
};

export default function SmartFilterPromptModal({
  visible,
  onAddFilters,
  onSkip,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>🎯 Apply Smart Filters?</Text>
          <Text style={styles.text}>
            Would you like to apply filters to increase your chances and reduce
            the number of games?
          </Text>
          <View style={styles.buttons}>
            <Pressable onPress={onAddFilters} style={styles.addButton}>
              <Text style={styles.addText}>Add Filters</Text>
            </Pressable>
            <Pressable onPress={onSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  addButton: {
    backgroundColor: "#1E6FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  skipText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});
