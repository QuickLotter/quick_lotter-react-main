// states/new_york/games.ts
import { GameData } from "@/types/GameData";
import MegaMillionsLogo from "@/assets/logos/ny/megamillions.svg";
import PowerballLogo from "@/assets/logos/ny/powerball.svg";
import Cash4LifeLogo from "@/assets/logos/ny/cash4life.svg";
import NYLottoLogo from "@/assets/logos/ny/nylotto.svg";
import Take5MiddayLogo from "@/assets/logos/ny/take5midday.svg";
import Take5EveningLogo from "@/assets/logos/ny/take5evening.svg";
import Win4MiddayLogo from "@/assets/logos/ny/win4midday.svg";
import Win4EveningLogo from "@/assets/logos/ny/win4evening.svg";
import NumbersMiddayLogo from "@/assets/logos/ny/numbersmidday.svg";
import NumbersEveningLogo from "@/assets/logos/ny/numbersevening.svg";
import Pick10Logo from "@/assets/logos/ny/pick10.svg";

// Mapeamento de slug → componente de logo
const logoMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  megamillions: MegaMillionsLogo,
  powerball: PowerballLogo,
  cash4life: Cash4LifeLogo,
  nylotto: NYLottoLogo,
  take5midday: Take5MiddayLogo,
  take5evening: Take5EveningLogo,
  win4midday: Win4MiddayLogo,
  win4evening: Win4EveningLogo,
  numbersmidday: NumbersMiddayLogo,
  numbersevening: NumbersEveningLogo,
  pick10: Pick10Logo,
};

import Constants from "expo-constants";

const SUPABASE_URL = Constants.expoConfig!.extra!.supabaseUrl as string;
const SUPABASE_KEY = Constants.expoConfig!.extra!.supabaseAnonKey as string;

export async function fetchNewYorkGames(): Promise<GameData[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/game_cards?status=eq.true&order=order.asc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        // Se quiser ordenar ou selecionar colunas específicas:
        // Prefer: select=id,name,slug,jackpot,cash_value,draw_time,draw_date,last_draw_result,config_ui
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar jogos: ${res.status} ${res.statusText}`);
  }

  const records = await res.json();

  return records.map((rec: any) => {
    const {
      id,
      name,
      slug,
      logo_svg_url,
      jackpot,
      cash_value,
      draw_time,
      draw_date,
      last_draw_result,
      config_ui,
    } = rec;

    // Extrai os números principais e formata como strings com 2 dígitos
    const numbers: string[] = (last_draw_result.main_numbers as number[]).map(
      (n) => String(n).padStart(2, "0")
    );

    // Exemplo de extração de “megaplier” e possível “bonusNumber”
    const powerPlay: string | undefined = last_draw_result.megaplier;
    // Se houver outro campo de bônus, ajuste aqui:
    const bonusNumber: string =
      last_draw_result.bonus_number ??
      last_draw_result["Pick 2 Midday"]?.toString() ??
      "";

    // Monta a string de resultado (se preferir um JSON puro, use JSON.stringify)
    const resultText = Object.entries(last_draw_result)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(",") : v}`)
      .join("    ");

    return {
      id,
      name,
      slug,
      logo: logo_svg_url ?? MegaMillionsLogo, // fallback
      jackpot,
      cashValue: cash_value,
      drawTime: draw_time,
      drawDate: draw_date,
      numbers,
      bonusNumber,
      powerPlay,
      result: resultText,
      config_ui, // já é JSON com borderColor, gradients, etc.
    } as GameData;
  });
}
