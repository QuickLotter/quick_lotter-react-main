import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function GamesGenerated({
  games,
  onEdit,
  onDelete,
}: {
  games: any[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <View style={styles.wrapper}>
      {games.length > 0 ? (
        games.map((game, index) => (
          <View key={index} style={styles.card}>
            {/* Renderize os números ou jogos aqui */}
            <Text>Jogo {index + 1}</Text>

            {/* Botões de Editar ou Deletar cada jogo */}
            {/* Você pode adicionar ícones ou botões aqui se quiser */}
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No games generated yet.game</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 768,
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  emptyText: {
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },
});
