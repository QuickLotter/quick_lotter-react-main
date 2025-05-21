import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import GamesGenerated from "@/components/generator/smart_filter/gamesgenerated";

export default function NumbersGeneratedPage() {
  const router = useRouter();
  const { data } = useLocalSearchParams();

  const parsedGames = data
    ? JSON.parse(decodeURIComponent(data as string))
    : [];

  const [games, setGames] = useState(parsedGames);

  const handleDelete = (index: number) => {
    const updated = [...games];
    updated.splice(index, 1);
    setGames(updated);
  };

  const handleEdit = (index: number) => {
    // TO DO: Abrir modal ou navegar para edição
    console.log("Editar jogo:", index);
  };

  const handleSave = () => {
    // TO DO: salvar no banco/local storage
    console.log("Salvar jogos:", games);
  };

  const handlePrint = () => {
    // TO DO: lógica de impressão
    console.log("Imprimir jogos:", games);
  };

  return (
    <GamesGenerated
      games={games}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onPrint={handlePrint}
      onSave={handleSave}
    />
  );
}
