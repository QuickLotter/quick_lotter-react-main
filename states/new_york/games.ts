// Path: states/new_york/games.ts

import { supabase } from "@/services/supabase";
import { GameData } from "@/types/GameData";

/**
 * Busca os próximos jogos de Nova York no Supabase.
 * Retorna um array de GameData padronizado.
 */
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
        slug,
        logo
      )
    `
    )
    .order("date_next_drawing", { ascending: true });

  if (error) {
    console.error("Erro ao buscar jogos:", error.message);
    return [];
  }

  // Garante compatibilidade com GameCardSlider
  return (data ?? []).map((item: any) => ({
    id: String(item.id),
    name: item.games?.name || "Unknown",
    slug: item.games?.slug || "megamillions", // Para mapear UI (ex: megamillions, powerball, etc)
    jackpot: item.jackpot,
    cashValue: item.cash_value,
    drawTime: item.date_string,
    drawDate: item.date_next_drawing,
    numbers: ["12", "22", "33", "44", "55", "16"], // MOCK: Troque por dados reais depois
    bonusNumber: "16", // MOCK
    powerPlay: "2x", // MOCK
    result: "No Jackpot Winners | 1 Match 5 Winner | NY", // MOCK
    logo: item.games?.logo || "https://example.com/default_logo.svg",
  }));
}
