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
import Constants from "expo-constants";

// Map of slug → logo component
const logoMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  megamillions: MegaMillionsLogo,
  powerball: PowerballLogo,
  cash4life: Cash4LifeLogo,
  lotto: NYLottoLogo,
  take5midday: Take5MiddayLogo,
  take5evening: Take5EveningLogo,
  win4midday: Win4MiddayLogo,
  win4evening: Win4EveningLogo,
  numbersmidday: NumbersMiddayLogo,
  numbersevening: NumbersEveningLogo,
  pick10: Pick10Logo,
};

const SUPABASE_URL = Constants.expoConfig!.extra!.supabaseUrl as string;
const SUPABASE_KEY = Constants.expoConfig!.extra!.supabaseAnonKey as string;

export async function fetchNewYorkGames(): Promise<GameData[]> {
  // ordena ascending pelo código de jogo (game_code)
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/game_cards?status=eq.true&order=order.asc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar jogos: ${res.status} ${res.statusText}`);
  }

  const records = await res.json();
  console.log("Supabase records:", records);

  return records.map((rec: any): GameData => {
    // extração dos campos do Supabase
    const {
      id,
      state_code,
      game_code,
      game_name,
      jackpot_estimated,
      draw_time,
      next_draw_date,
      last_draw_result,
      config_ui: ui,
    } = rec;

    // gera slug e id no mesmo padrão
    const slug = game_code.replace(/^ny_/, "");
    const generatedId = `${slug}_${state_code.toLowerCase()}`;

    // formata valores
    const formatMoney = (n: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

    const jackpot = formatMoney(jackpot_estimated);
    const cashValue = jackpot; // ou outro campo, se houver

    const drawTime = draw_time.length === 5 ? `${draw_time}:00` : draw_time;
    const drawDate = next_draw_date;

    const numbers: string[] = (last_draw_result.main_numbers as number[]).map(
      (n) => String(n).padStart(1, "0")
    );

    const powerPlay = last_draw_result.megaplier;
    // identifica a chave extra (ex: "MegaMillions", "Take 5 Midday", etc.)
    const extraKey = Object.keys(last_draw_result).find(
      (k) => k !== "main_numbers" && k !== "megaplier"
    );
    const bonusNumber = extraKey ? String(last_draw_result[extraKey]) : "";

    const result = Object.entries(last_draw_result)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(",") : v}`)
      .join("    ");

    // seleciona o componente de logo pelo slug
    const LogoComponent = logoMap[slug] || MegaMillionsLogo;

    // merge do config_ui do banco com alguns defaults
    const config_ui = {
      borderColor: ui.borderColor,
      borderWidth: ui.borderWidth ?? 4,
      borderRadius: ui.borderRadius ?? 22,
      background: ui.headerBackground ?? "#FFF",
      gradient: ui.gradient,
      ballGradient: ui.ballGradient,
      ballTextColor: ui.textColor,
      lastBallGradient: ui.lastBallGradient,
      lastBallTextColor: ui.lastBallTextColor ?? "#fff",
      playButtonColor: ui.playButtonColor,
      playButtonBorder: ui.playButtonBorder,
      playButtonTextColor: ui.playButtonTextColor ?? "#fff",
      logoMarginBottom: ui.logoMarginBottom ?? 10,
    };

    return {
      id: generatedId,
      name: game_name,
      slug,
      logo: LogoComponent,
      jackpot,
      cashValue,
      drawTime,
      drawDate,
      numbers,
      bonusNumber,
      powerPlay,
      result,
      config_ui,
    };
  });
}
