// constants/gamesByState.ts

// ------- IMPORTAÇÕES DE SVGs -------
// Arizona
import PowerballAZ from "@/assets/logos/AZ/powerball.svg";
import Fantasy5AZ from "@/assets/logos/AZ/fantasy5.svg";
import ThePickAZ from "@/assets/logos/AZ/thepick.svg";
import TripleTwistAZ from "@/assets/logos/AZ/tripletwist.svg";
import Pick3AZ from "@/assets/logos/AZ/pick3.svg";

// New York
import PowerballNY from "@/assets/logos/NY/powerball.svg";
import MegaMillionsNY from "@/assets/logos/NY/megamillions.svg";
import Cash4LifeNY from "@/assets/logos/NY/cash4life.svg";
import NYLottoNY from "@/assets/logos/NY/nylotto.svg";
import Win4MiddayNY from "@/assets/logos/NY/win4midday.svg";
import Win4EveningNY from "@/assets/logos/NY/win4evening.svg";
import NumbersMiddayNY from "@/assets/logos/NY/numbersmidday.svg";
import NumbersEveningNY from "@/assets/logos/NY/numbersevening.svg";
import Take5MiddayNY from "@/assets/logos/NY/take5midday.svg";
import Take5EveningNY from "@/assets/logos/NY/take5evening.svg";
import Pick10NY from "@/assets/logos/NY/pick10.svg";

// ...continue para outros estados se precisar

// ------- DICIONÁRIO DE JOGOS POR ESTADO -------
export const GAMES_BY_STATE: Record<
  string,
  Array<{ route: string; Logo: any; color: string }>
> = {
  AZ: [
    { route: "powerball", Logo: PowerballAZ, color: "#C7102E" },
    { route: "fantasy5", Logo: Fantasy5AZ, color: "#1E90FF" },
    { route: "thepick", Logo: ThePickAZ, color: "#2D7F67" },
    { route: "tripletwist", Logo: TripleTwistAZ, color: "#D31245" },
    { route: "pick3", Logo: Pick3AZ, color: "#F2A900" },
    // ...outros jogos de AZ
  ],
  NY: [
    { route: "powerball", Logo: PowerballNY, color: "#C7102E" },
    { route: "megamillions", Logo: MegaMillionsNY, color: "#0E4CA1" },
    { route: "cash4life", Logo: Cash4LifeNY, color: "#2D7F67" },
    { route: "nylotto", Logo: NYLottoNY, color: "#D31245" },
    { route: "win4_midday", Logo: Win4MiddayNY, color: "#7E0C6E" },
    { route: "win4_evening", Logo: Win4EveningNY, color: "#7E0C6E" },
    { route: "numbers_midday", Logo: NumbersMiddayNY, color: "#2E73B5" },
    { route: "numbers_evening", Logo: NumbersEveningNY, color: "#2E73B5" },
    { route: "take5_midday", Logo: Take5MiddayNY, color: "#CA3092" },
    { route: "take5_evening", Logo: Take5EveningNY, color: "#CA3092" },
    { route: "pick10", Logo: Pick10NY, color: "#E7CE5C" },
    // ...outros jogos de NY
  ],
  // ...outros estados
};
