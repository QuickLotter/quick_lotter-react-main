// ✅ Path: components/generator/smart_filter/generatedlist.tsx
// Lista de jogos gerados usando GeneratedLine.tsx

import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import GeneratedLine from "./generatedline";

type Game = {
  numbers: number[];
  megaball?: number;
};

type Props = {
  games: Game[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export default function GeneratedList({ games, onEdit, onDelete }: Props) {
  if (games.length === 0) {
    return (
      <View style={styles.noGamesWrapper}>
        <Text style={styles.noGamesText}>No games generated yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {games.map((game, index) => (
        <GeneratedLine
          key={index}
          index={index}
          numbers={game.numbers}
          megaball={game.megaball}
          onDelete={() => onDelete?.(index)}
          onEdit={() => onEdit?.(index)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 120, // espaço para o bottom nav
  },
  noGamesWrapper: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  noGamesText: {
    fontSize: 16,
    color: "#A0A0A0",
  },
});
