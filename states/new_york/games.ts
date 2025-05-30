import MegaMillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";
import PowerballLogo from "@/assets/images/ny_game_logo/powerball.svg";
// outros logos

import { GameData } from "@/types/GameData";

export async function fetchNewYorkGames(): Promise<GameData[]> {
  return [
    {
      id: "megamillions_ny",
      name: "Mega Millions",
      slug: "megamillions",
      logo: MegaMillionsLogo,
      jackpot: "$143 Million",
      cashValue: "$66.8 Million",
      drawTime: "12h 1m 24s",
      drawDate: "Wed, May 29, 2025",
      numbers: ["01", "22", "33", "44", "55", "16"],
      bonusNumber: "16",
      powerPlay: "2x",
      result: "No Jackpot Winners | 1 Match 5 Winner | NY",
    },
    // ...
  ];
}
