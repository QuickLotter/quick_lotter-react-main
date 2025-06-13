import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SaveLinesModal({ visible, onSave, onCancel }) {
  const [name, setName] = useState("");

  // Limpa ao fechar
  const handleCancel = () => {
    setName("");
    onCancel();
  };

  const handleSave = () => {
    onSave(name.trim());
    setName("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Fechar */}
          <Pressable
            style={styles.closeBtn}
            hitSlop={16}
            onPress={handleCancel}
          >
            <Ionicons name="close" size={22} color="#888" />
          </Pressable>
          {/* Título */}
          <Text style={styles.title}>Save Your Lines</Text>
          <Text style={styles.subtitle}>
            Give a name for this set of numbers:
          </Text>
          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter a name"
            value={name}
            onChangeText={setName}
            maxLength={30}
            placeholderTextColor="#B6B6B6"
            autoFocus
            returnKeyType="done"
          />
          {/* Botões */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.save, !name.trim() && styles.saveDisabled]}
              onPress={handleSave}
              activeOpacity={name.trim() ? 0.85 : 1}
              disabled={!name.trim()}
            >
              <Text
                style={[
                  styles.saveText,
                  !name.trim() && styles.saveTextDisabled,
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancel}
              onPress={handleCancel}
              activeOpacity={0.78}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(20,20,40,0.17)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 19,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 10,
    zIndex: 2,
    padding: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#22223B",
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 14.7,
    color: "#63637A",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderColor: "#E0E0E0",
    borderWidth: 1.6,
    borderRadius: 9,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 19,
    fontSize: 16.1,
    color: "#222",
    backgroundColor: "#FCFCFF",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
    width: "100%",
  },
  save: {
    flex: 1,
    backgroundColor: "#FFD600",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#FFD600",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  saveDisabled: {
    backgroundColor: "#FFF3AC",
  },
  saveText: {
    color: "#1A1A1A",
    fontWeight: "700",
    fontSize: 15.3,
  },
  saveTextDisabled: {
    color: "#1A1A1A",
  },
  cancel: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  cancelText: {
    color: "#444",
    fontWeight: "600",
    fontSize: 15.3,
  },
});
