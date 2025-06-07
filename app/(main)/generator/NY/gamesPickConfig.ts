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
    headerColor: "#8E24AA",
    ballCount: 4,
    ballRange: [0, 9],
    logo: Win4MiddayLogo,
    pickConfig: {
      ballColor: "#8E24AA",
      textColor: "#fff",
      selectedBallColor: "#5E168A",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/numbersgenerated",
  },
  {
    id: "win4_evening_ny",
    name: "Win 4 Evening",
    type: "pick",
    headerColor: "#8E24AA",
    ballCount: 4,
    ballRange: [0, 9],
    logo: Win4EveningLogo,
    pickConfig: {
      ballColor: "#8E24AA",
      textColor: "#fff",
      selectedBallColor: "#5E168A",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/numbersgenerated",
  },
  {
    id: "numbers_midday_ny",
    name: "Numbers Midday",
    type: "pick",
    headerColor: "#2196F3",
    ballCount: 3,
    ballRange: [0, 9],
    logo: NumbersMiddayLogo,
    pickConfig: {
      ballColor: "#2196F3",
      textColor: "#fff",
      selectedBallColor: "#1769AA",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/numbersgenerated",
  },
  {
    id: "numbers_evening_ny",
    name: "Numbers Evening",
    type: "pick",
    headerColor: "#2196F3",
    ballCount: 3,
    ballRange: [0, 9],
    logo: NumbersEveningLogo,
    pickConfig: {
      ballColor: "#2196F3",
      textColor: "#fff",
      selectedBallColor: "#1769AA",
      selectedTextColor: "#fff",
      boltColor: "#FFD700",
    },
    resultsRoute: "/generator/ny/numbersgenerated",
  },
];
