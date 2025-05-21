// Path: states/new_york/games.ts
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
    numbers: ["01", "02", "03", "04", "05", "09"], // 👈 Fictício por enquanto
    bonusNumber: "",
    powerPlay: "5", // 👈 Exemplo
    result: "1 Match 5 Winner\nNY", // 👈 Exemplo
    logo: item.games.logo || "https://example.com/default_logo.svg", // 👈 Fallback
  }));
}
