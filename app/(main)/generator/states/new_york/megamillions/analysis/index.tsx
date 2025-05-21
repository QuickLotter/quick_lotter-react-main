import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";

const pages = [
  { name: "SUM", route: "sum" },
  { name: "ODD", route: "odd" },
  { name: "LOW", route: "low" },
  { name: "PRIME", route: "prime" },
  { name: "FIBONACCI", route: "fibonacci" },
  { name: "VERTICAL", route: "vertical" },
  { name: "ADJACENT", route: "adjacent" },
  { name: "REPEATED", route: "repeated" },
  { name: "SEQUENCE", route: "sequence" },
  { name: "LINES", route: "lines" },
  { name: "DIGITS", route: "digits" },
  { name: "COLUMNS", route: "columns" },
  { name: "MULTIPLE OF 3", route: "multipleof3" },
];

export default function AnalysisIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slider}
      >
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              router.push(
                `/generator/states/new_york/megamillions/analysis/${page.route}`
              )
            }
          >
            <Text style={styles.buttonText}>{page.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ECF1FF",
    paddingVertical: 12,
  },
  slider: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 24,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
