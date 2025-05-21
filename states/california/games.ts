import { supabase } from "@/services/supabase";
import { GameData } from "@/types/GameData";

export async function fetchNewYorkGames(): Promise<GameData[]> {
  const { data, error } = await supabase
    .from("game_next_drawing")
    .select(
      `
      id,
      jackpot,
      cash_value: cash_value,
      date_string,
      date_next_drawing,
      games (
        id,
        name,
        logo
      )
    `
    )
    .order("date_next_drawing", { ascending: true });

  if (error) {
    console.error("Erro ao buscar jogos:", error.message);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id.toString(),
    name: item.games.name,
    jackpot: item.jackpot,
    cashValue: item.cash_value,
    drawTime: item.date_string,
    drawDate: item.date_next_drawing,
    numbers: [], // você pode popular isso mais tarde
    bonusNumber: "",
    powerPlay: "",
    result: "",
    logo: item.games.logo || "", // ou uma logo default se quiser
  }));
}
