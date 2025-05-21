// ✅ Path: components/generator/smart_filter/PrintSettingsModal.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // para select dropdown
import MegamillionsCard from "@/assets/images/ny_game_logo/megamillionscard.png";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function PrintSettingsModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={MegamillionsCard}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            {/* Printing Paper */}
            <Text style={styles.label}>Printing Paper:</Text>
            <View style={styles.inputWrapper}>
              <Picker style={styles.picker}>
                <Picker.Item label="Play-Slip Card" value="play_slip" />
              </Picker>
            </View>

            {/* Marker Color */}
            <Text style={styles.label}>Marker:</Text>
            <View style={styles.markerRow}>
              <View style={[styles.marker, { backgroundColor: "#1976D2" }]} />
              <View style={[styles.marker, { backgroundColor: "#000000" }]} />
              <View style={[styles.marker, { backgroundColor: "#333333" }]} />
            </View>

            {/* Feature Settings */}
            <Text style={styles.sectionTitle}>Feature Settings</Text>
            <View style={styles.separator} />

            {/* Options (fake for now) */}
            <Text style={styles.label}>Megaplier:</Text>
            <View style={styles.radioPlaceholder} />

            <Text style={styles.label}>Multidraws:</Text>
            <View style={styles.inputWrapper}>
              <Picker style={styles.picker}>
                <Picker.Item label="None" value="none" />
              </Picker>
            </View>

            {/* Print Settings */}
            <Text style={styles.sectionTitle}>Print Settings</Text>
            <View style={styles.separator} />

            <Text style={styles.label}>Alignment:</Text>
            <View style={styles.inputWrapper}>
              <Picker style={styles.picker}>
                <Picker.Item label="Right" value="right" />
              </Picker>
            </View>

            {/* Top / Side Offsets */}
            <View style={styles.offsetRow}>
              <View style={styles.offsetItem}>
                <Text style={styles.smallLabel}>(1) Top:</Text>
                <View style={styles.offsetInput} />
                <Text style={styles.unitText}>Millimeters</Text>
              </View>

              <View style={styles.offsetItem}>
                <Text style={styles.smallLabel}>(2) Side:</Text>
                <View style={styles.offsetInput} />
                <Text style={styles.unitText}>Millimeters</Text>
              </View>
            </View>

            {/* Small Image of Slip */}
            <Image
              source={MegamillionsCard}
              style={styles.cardImage}
              resizeMode="contain"
            />

            {/* Print Button */}
            <TouchableOpacity style={styles.printButton}>
              <Feather name="printer" size={20} color="#FFFFFF" />
              <Text style={styles.printText}>Print</Text>
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
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#0E4CA1",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 30,
  },
  body: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  markerRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#555",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 8,
  },
  radioPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
    marginVertical: 8,
  },
  offsetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  offsetItem: {
    flex: 1,
    alignItems: "center",
  },
  smallLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  offsetInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginBottom: 4,
  },
  unitText: {
    fontSize: 12,
    color: "#777",
  },
  cardImage: {
    width: 150,
    height: 200,
    alignSelf: "center",
    marginTop: 12,
  },
  printButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  printText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
