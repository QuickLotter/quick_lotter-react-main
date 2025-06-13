// states/new_york/games.ts
import { GameData } from "@/types/GameData";
import Constants from "expo-constants";
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

// DEBUG: inspeciona se o app.json foi carregado
console.log("expoConfig:", Constants.expoConfig);
console.log("manifest:", Constants.manifest);

// fallback entre expoConfig e manifest
const rawConfig = Constants.expoConfig ?? (Constants.manifest as any);
if (!rawConfig?.extra) {
  console.warn(
    "⚠️ Could not find expoConfig.extra or manifest.extra! Check your app.json"
  );
}

// retira das configurações
const SUPABASE_URL = rawConfig.extra.supabaseUrl as string;
const SUPABASE_KEY = rawConfig.extra.supabaseAnonKey as string;

// DEBUG: confirma que as variáveis não são undefined
console.log({ SUPABASE_URL, SUPABASE_KEY });

// mapeia slug → React SVG component
const logoMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
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

export async function fetchNewYorkGames(): Promise<GameData[]> {
  const url = `${SUPABASE_URL}/rest/v1/game_cards?select=*&status=eq.true&order=game_code.asc`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar jogos: ${res.status} ${res.statusText}`);
  }

  const records: any[] = await res.json();

  return records.map((rec) => {
    const {
      state_code,
      game_code,
      game_name,
      jackpot_estimated,
      draw_time,
      next_draw_date,
      last_draw_result,
      config_ui: ui,
    } = rec;

    // slug e id
    const slug = game_code.replace(/^ny_/, "");
    const id = `${slug}_${state_code.toLowerCase()}`;

    // formata moeda USD sem centavos
    const moneyFmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const jackpot = moneyFmt.format(jackpot_estimated);
    const cashValue = jackpot;

    // normaliza horário e data
    const drawTime = draw_time.length === 5 ? `${draw_time}:00` : draw_time;
    const drawDate = next_draw_date;

    // formata números principais como ["01","22",...]
    const numbers = (last_draw_result.main_numbers as number[]).map((n) =>
      String(n).padStart(1, "0")
    );

    // extrai bonus e megaplier
    const powerPlay = last_draw_result.megaplier as string;
    const extraKey = Object.keys(last_draw_result).find(
      (k) => k !== "main_numbers" && k !== "megaplier"
    );
    const bonusNumber = extraKey ? String(last_draw_result[extraKey]) : "";

    // cria string de resultado
    const result = Object.entries(last_draw_result)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(",") : v}`)
      .join("    ");

    // escolhe logo
    const LogoComponent = logoMap[slug] || MegaMillionsLogo;

    // merge do config_ui do banco com defaults
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
      id,
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
    } as GameData;
  });
}
