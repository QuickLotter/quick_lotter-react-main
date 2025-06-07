// states/az/games.ts
import { GameData } from "@/types/GameData";
import MegaMillionsLogo from "@/assets/logos/az/megamillions.svg";
import PowerballLogo from "@/assets/logos/az/powerball.svg";
import Fantasy5Logo from "@/assets/logos/az/fantasy5.svg";
import ThePickLogo from "@/assets/logos/az/thepick.svg";
import TripleTwistLogo from "@/assets/logos/az/tripletwist.svg";
import Pick3Logo from "@/assets/logos/az/pick3.svg";

// MOCK AZ GAMES
export async function fetchArizonaGames(): Promise<GameData[]> {
  return [
    // Mega Millions
    {
      id: "megamillions_az",
      name: "Mega Millions",
      slug: "megamillions",
      logo: MegaMillionsLogo,
      jackpot: "$143 Million",
      cashValue: "$66.8 Million",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["01", "22", "33", "44", "55", "16"],
      bonusNumber: "16",
      powerPlay: "3x",
      result:
        "No Jackpot Winners                                                                                             3 Match 5 Winner                                                          AZ",
      config_ui: {
        borderColor: "#0E4CA1",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFFFFF", "#0E4CA1", "#FFFFFF"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#101820",
        lastBallGradient: ["#FFD700", "#B8860B"],
        lastBallTextColor: "#fff",
        playButtonColor: "#0E4CA1",
        playButtonBorder: "#EE3E33",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },

    // Powerball
    {
      id: "powerball_az",
      name: "Powerball",
      slug: "powerball",
      logo: PowerballLogo,
      jackpot: "$95 Million",
      cashValue: "$45.7 Million",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["05", "09", "22", "34", "51", "10"],
      bonusNumber: "10",
      powerPlay: "2x",
      result:
        "No Jackpot Winners                                                                                             3 Match 5 Winner                                                          AZ",
      config_ui: {
        borderColor: "#C7102E",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFFFFF", "#C7102E", "#FFFFFF"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#101820",
        lastBallGradient: ["#FF6666", "#B1001C"],
        lastBallTextColor: "#fff",
        playButtonColor: "#C7102E",
        playButtonBorder: "#0E4CA1",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },

    // Fantasy 5
    {
      id: "fantasy5_az",
      name: "Fantasy 5",
      slug: "fantasy5",
      logo: Fantasy5Logo,
      jackpot: "$75,000",
      cashValue: "$75,000",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["05", "12", "21", "33", "37"],
      bonusNumber: "",
      powerPlay: "",
      result:
        "No Jackpot Winners                                                                                             3 Match 5 Winner                                                          AZ",
      config_ui: {
        borderColor: "#4358A6",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFF8F3", "#4358A6", "#FFF8F3"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#000",
        lastBallGradient: ["#FFFFFF", "#BBBBBB"],
        lastBallTextColor: "#000",
        playButtonColor: "#92BE37",
        playButtonBorder: "#4358A6",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },

    // The Pick
    {
      id: "thepick_az",
      name: "The Pick",
      slug: "thepick",
      logo: ThePickLogo,
      jackpot: "$3.5 Million",
      cashValue: "$2.4 Million",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["09", "15", "24", "31", "38", "44"],
      bonusNumber: "",
      powerPlay: "",
      result:
        "No Jackpot Winners                                                                                             3 Match 5 Winner                                                          AZ",
      config_ui: {
        borderColor: "#004785",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFF", "#004785", "#FFF"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#000",
        lastBallGradient: ["#FFFFFF", "#BBBBBB"],
        lastBallTextColor: "#000",
        playButtonColor: "#FDB825",
        playButtonBorder: "#004785",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },

    // Triple Twist
    {
      id: "tripletwist_az",
      name: "Triple Twist",
      slug: "tripletwist",
      logo: TripleTwistLogo,
      jackpot: "$215,000",
      cashValue: "$215,000",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["03", "10", "17", "23", "36", "39"],
      bonusNumber: "",
      powerPlay: "",
      result:
        "No Jackpot Winners                                                                                             3 Match 5 Winner                                                          AZ",
      config_ui: {
        borderColor: "#F07D25",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFFDF3", "#F07D25", "#FFFDF3"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#000",
        lastBallGradient: ["#FFFFFF", "#BBBBBB"],
        lastBallTextColor: "#000",
        playButtonColor: "#A0CB3A",
        playButtonBorder: "#F5AA3A",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },

    // Pick 3
    {
      id: "pick3_az",
      name: "Pick 3",
      slug: "pick3",
      logo: Pick3Logo,
      jackpot: "$500",
      cashValue: "$500",
      drawTime: "00:00:00",
      drawDate: "Wed, May 29, 2025",
      numbers: ["01", "02", "03"],
      bonusNumber: "",
      powerPlay: "",
      result:
        "DAILY                                                                                             5 Match Straight                                                        NY",

      config_ui: {
        borderColor: "#004785",
        borderWidth: 4,
        borderRadius: 22,
        background: "#FFF",
        gradient: ["#FFF", "#004785", "#FFF"],
        ballGradient: ["#FFFFFF", "#BBBBBB"],
        ballTextColor: "#000",
        lastBallGradient: ["#FFFFFF", "#BBBBBB"],
        lastBallTextColor: "#000",
        playButtonColor: "#FDB825",
        playButtonBorder: "#004785",
        playButtonTextColor: "#fff",
        logoMarginBottom: 10,
      },
    },
  ];
}
