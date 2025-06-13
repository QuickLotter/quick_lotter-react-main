// app/(main)/generator/ny/gamesPickConfig.ts

import Win4MiddayLogo from "@/assets/logos/ny/win4midday.svg";
import Win4EveningLogo from "@/assets/logos/ny/win4evening.svg";
import NumbersMiddayLogo from "@/assets/logos/ny/numbersmidday.svg";
import NumbersEveningLogo from "@/assets/logos/ny/numbersevening.svg";

export const pickGamesConfig = [
  {
    id: "win4_midday_ny",
    name: "Win 4 Midday",
    type: "pick",
    headerColor: "#7E0C6E",
    ballCount: 4,
    ballRange: [0, 9],
    logo: Win4MiddayLogo,
    pickConfig: {
      ballColor: "#7E0C6E",
      textColor: "#fff",
      selectedBallColor: "#7E0C6E",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/MyLines",
  },
  {
    id: "win4_evening_ny",
    name: "Win 4 Evening",
    type: "pick",
    headerColor: "#7E0C6E",
    ballCount: 4,
    ballRange: [0, 9],
    logo: Win4EveningLogo,
    pickConfig: {
      ballColor: "#7E0C6E",
      textColor: "#fff",
      selectedBallColor: "#7E0C6E",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/MyLines",
  },
  {
    id: "numbers_midday_ny",
    name: "Numbers Midday",
    type: "pick",
    headerColor: "#2E73B5",
    ballCount: 3,
    ballRange: [0, 9],
    logo: NumbersMiddayLogo,
    pickConfig: {
      ballColor: "#2E73B5",
      textColor: "#fff",
      selectedBallColor: "#2E73B5",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/MyLines",
  },
  {
    id: "numbers_evening_ny",
    name: "Numbers Evening",
    type: "pick",
    headerColor: "#2E73B5",
    ballCount: 3,
    ballRange: [0, 9],
    logo: NumbersEveningLogo,
    pickConfig: {
      ballColor: "#2E73B5",
      textColor: "#fff",
      selectedBallColor: "#2E73B5",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
      
    },
    resultsRoute: "/generator/ny/MyLines",
  },
];
