import { GameData } from "@/types/GameData";
// Importando o SVG como referência
import Pick3Logo from "@/assets/logos/AZ/pick3.svg";
import Fantasy5Logo from "@/assets/logos/AZ/fantasy5.svg";

export async function fetchArizonaGames(): Promise<GameData[]> {
  return [
    {
      id: "pick3_az",
      name: "Pick 3",
      slug: "pick3",
      logo: Pick3Logo, // <-- SÓ a referência, sem JSX!
      jackpot: "$500",
      cashValue: "$500",
      drawTime: "Daily 8:00 PM",
      drawDate: "Wed, May 29, 2025",
      numbers: ["01", "02", "03"],
      bonusNumber: "",
      result: "",
      powerPlay: "",
    },
    {
      id: "fantasy5_az",
      name: "Fantasy 5",
      slug: "fantasy5",
      logo: Fantasy5Logo,
      jackpot: "$75,000",
      cashValue: "$75,000",
      drawTime: "Daily 8:00 PM",
      drawDate: "Wed, May 29, 2025",
      numbers: ["05", "12", "21", "33", "37"],
      bonusNumber: "",
      result: "",
      powerPlay: "",
    },
  ];
}
