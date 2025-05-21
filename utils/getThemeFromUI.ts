// ✅ Path: utils/getThemeFromUI.ts
// 🎯 Retorna automaticamente o conjunto de cores e configurações para o jogo baseado no gameId.

import { gameUI } from "@/constants/gameui";

// ✅ Define todos os gameIds possíveis que existem no gameUI
export type GameId =
  | "cash4life" // 🎯 Cash 4 Life
  | "powerball" // 🎯 Powerball
  | "megamillions" // 🎯 Mega Millions
  | "nylotto" // 🎯 NY Lotto
  | "take5" // 🎯 Take 5 (Midday e Evening usam mesmo tema)
  | "take5_midday" // 🎯 Take 5 Midday (variante para tema separado se quiser)
  | "take5_evening" // 🎯 Take 5 Evening (variante para tema separado se quiser)
  | "pick10" // 🎯 Pick 10
  | "win4" // 🎯 Win 4 (tema padrão)
  | "win4_midday" // 🎯 Win 4 Midday
  | "win4_evening" // 🎯 Win 4 Evening
  | "numbers_midday" // 🎯 Numbers Midday (Pick 3)
  | "numbers_evening"; // 🎯 Numbers Evening (Pick 3)

// ✅ Define o tipo de retorno automático baseado no gameUI (cash4life como exemplo de estrutura)
export type GameUIConfig = typeof gameUI.cash4life;

// ✅ Função principal que retorna o tema visual baseado no gameId
export function getThemeFromUI(gameId: GameId): GameUIConfig {
  // Corrige gameIds alternativos que usam o mesmo tema base
  let id = gameId;

  if (gameId === "take5_midday" || gameId === "take5_evening") {
    id = "take5"; // usa o tema base do take5
  } else if (gameId === "win4_midday" || gameId === "win4_evening") {
    id = "win4"; // usa o tema base do win4
  }

  const theme = gameUI[id as keyof typeof gameUI];

  if (!theme) {
    throw new Error(`Theme not found for gameId: ${gameId}`);
  }

  return theme;
}
