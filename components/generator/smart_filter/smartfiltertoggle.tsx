import React from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

export default function SmartFilterToggle({ enabled, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Feather
          name="activity"
          size={20}
          color="#FFBD2F"
          style={{ marginRight: 8 }}
        />
        <View>
          <Text style={styles.title}>Smart Filter</Text>
          <Text style={styles.subtitle}>
            Generate powerful combinations by AI
          </Text>
        </View>
      </View>

      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#ccc", true: "#3DF14A" }}
        thumbColor={enabled ? "#fff" : "#fff"}
        ios_backgroundColor="#ccc"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});
