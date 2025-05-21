const API_URL = "https://fast-generator-v1.onrender.com/generate";
const API_KEY = "quicklotter-2025-key"; // deve bater com o backend

export async function generateWithFilters(
  game_id: string,
  mainNumbers: number[],
  extraNumbers: number[],
  filters: Record<string, number[]> | null
) {
  const body = {
    game_id,
    total_numbers: mainNumbers.length,
    per_ticket: 5,
    guarantee: 4,
    match_condition: "any",
    fixed_numbers: [],
    number_of_games: 20,
    extra_balls: extraNumbers,
    filters: filters || {},
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Erro na geração dos jogos");
  return await response.json();
}
