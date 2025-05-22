import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import GameCard from "./GameCard";
import { useRouter } from "expo-router";
import { GameData } from "@/types/GameData";

// 🟦 Importando todos os logos
import MegaMillionsLogo from "@/assets/images/ny_game_logo/megamillions.svg";
import PowerballLogo from "@/assets/images/ny_game_logo/powerball.svg";
import Cash4LifeLogo from "@/assets/images/ny_game_logo/cash4life.svg";
import NYLottoLogo from "@/assets/images/ny_game_logo/nylotto.svg";
import Pick10Logo from "@/assets/images/ny_game_logo/pick10.svg";
import Take5MiddayLogo from "@/assets/images/ny_game_logo/take5_midday.svg";
import Take5EveningLogo from "@/assets/images/ny_game_logo/take5_evening.svg";
import Win4MiddayLogo from "@/assets/images/ny_game_logo/win4_midday.svg";
import Win4EveningLogo from "@/assets/images/ny_game_logo/win4_evening.svg";
import NumbersMiddayLogo from "@/assets/images/ny_game_logo/numbers_midday.svg";
import NumbersEveningLogo from "@/assets/images/ny_game_logo/numbers_evening.svg";

const mockGames: GameData[] = [
  {
    id: "1",
    name: "Powerball",
    slug: "powerball",
    logo: <PowerballLogo width={200} height={60} />,
    jackpot: "$175 Million",
    cashValue: "$87.5 Million",
    drawTime: "11h 30m 12s",
    drawDate: "Wed, May 29, 2024",
    numbers: ["12", "22", "33", "44", "55", "16"],
    bonusNumber: "16",
    powerPlay: "2x",
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
  },
  {
    id: "2",
    name: "Mega Millions",
    slug: "megamillions",
    logo: <MegaMillionsLogo width={200} height={60} />,
    jackpot: "$143 Million",
    cashValue: "$66.8 Million",
    drawTime: "12h 1m 24s",
    drawDate: "Tue, May 28, 2024",
    numbers: ["01", "02", "03", "04", "05", "22"],
    bonusNumber: "22",
    powerPlay: "3x",
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
  },
  {
    id: "3",
    name: "Cash 4 Life",
    slug: "cash4life",
    logo: <Cash4LifeLogo width={200} height={60} />,
    jackpot: "$1,000/DAILY",
    cashValue: "$7 Million",
    drawTime: "Tonight 9 PM",
    drawDate: "Tue, May 28, 2024",
    numbers: ["11", "23", "34", "45", "52", "04"],
    bonusNumber: "04",
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
    powerPlay: "",
  },
  {
    id: "4",
    name: "NY Lotto",
    slug: "nylotto",
    logo: <NYLottoLogo width={200} height={60} />,
    jackpot: "$10.3 Million",
    cashValue: "$6.1 Million",
    drawTime: "Sat 8:15 PM",
    drawDate: "Sat, May 25, 2024",
    numbers: ["07", "14", "25", "36", "48", "53", "45"],
    bonusNumber: "13",
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
    powerPlay: "",
  },
  {
    id: "5",
    name: "Pick 10",
    slug: "pick10",
    logo: <Pick10Logo width={200} height={60} />,
    jackpot: "$500,000",
    cashValue: "$500,000",
    drawTime: "Afternoon 2:30 PM",
    drawDate: "Tue, May 28, 2024",
    numbers: [
      "01",
      "05",
      "10",
      "15",
      "22",
      "25",
      "31",
      "36",
      "40",
      "45",
      "47",
      "49",
      "52",
      "54",
      "58",
      "59",
      "60",
      "63",
      "65",
      "68",
    ],
    bonusNumber: "",
    result: "3 Top Prize Winners",
    powerPlay: "",
  },
  {
    id: "6",
    name: "Take 5 Midday",
    slug: "take5_midday",
    logo: <Take5MiddayLogo width={200} height={60} />,
    jackpot: "$57,000",
    cashValue: "$57,000",
    drawTime: "Today 2:30 PM",
    drawDate: "Tue, May 28, 2024",
    numbers: ["03", "11", "18", "25", "31"],
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },
  {
    id: "7",
    name: "Take 5 Evening",
    slug: "take5_evening",
    logo: <Take5EveningLogo width={200} height={60} />,
    jackpot: "$63,000",
    cashValue: "$63,000",
    drawTime: "Tonight 10:30 PM",
    drawDate: "Mon, May 27, 2024",
    numbers: ["06", "13", "24", "32", "39"],
    result: "No Jackpot Winners | 1 Match 5 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },
  {
    id: "8",
    name: "Win 4 Midday",
    slug: "win4_midday",
    logo: <Win4MiddayLogo width={200} height={60} />,
    jackpot: "$5,000",
    cashValue: "$5,000",
    drawTime: "Today 2:30 PM",
    drawDate: "Tue, May 28, 2024",
    numbers: ["3", "1", "8", "9"],
    result: "No Jackpot Winners | 1 Match 4 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },
  {
    id: "9",
    name: "Win 4 Evening",
    slug: "win4_evening",
    logo: <Win4EveningLogo width={200} height={60} />,
    jackpot: "$5,000",
    cashValue: "$5,000",
    drawTime: "Tonight 10:30 PM",
    drawDate: "Mon, May 27, 2024",
    numbers: ["7", "4", "2", "1"],
    result: "No Jackpot Winners | 1 Match 4 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },
  {
    id: "10",
    name: "Numbers Midday",
    slug: "numbers_midday",
    logo: <NumbersMiddayLogo width={200} height={60} />,
    jackpot: "$500",
    cashValue: "$500",
    drawTime: "Today 2:30 PM",
    drawDate: "Tue, May 28, 2024",
    numbers: ["5", "2", "0"],
    result: "No Jackpot Winners | 1 Match 3 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },
  {
    id: "11",
    name: "Numbers Evening",
    slug: "numbers_evening",
    logo: <NumbersEveningLogo width={200} height={60} />,
    jackpot: "$500",
    cashValue: "$500",
    drawTime: "Tonight 10:30 PM",
    drawDate: "Mon, May 27, 2024",
    numbers: ["1", "1", "7"],
    result: "No Jackpot Winners | 1 Match 3 Winner | NY",
    bonusNumber: "",
    powerPlay: "",
  },

  // ...demais jogos
];

export default function GameCardSlider() {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Responsivo: largura do card entre 320 e 768
  const maxWidth = 384;
  const minWidth = 280;
  const cardWidth = Math.min(Math.max(width * 0.9, minWidth), maxWidth);
  const cardSpacing = 9;
  const fullItemWidth = cardWidth + cardSpacing;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / fullItemWidth);
        setCurrentIndex(index);
      },
    }
  );

  return (
    <View style={styles.sliderContainer}>
      <Animated.FlatList
        data={mockGames}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={fullItemWidth}
        decelerationRate="fast"
        pagingEnabled
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          // ⬇️ PADDING HORIZONTAL: centraliza o card
          // Tamanho atual depende do espaço sobrando (ex: (width - cardWidth) / 2)
          // Pode diminuir esse valor fixando um valor mínimo ou ajustando cardWidth
          paddingHorizontal: (width - cardWidth) / 0,

          // ⬇️ PADDING VERTICAL: pode adicionar aqui se quiser afastar de topo/fundo
          // paddingVertical: 20,
        }}
        onScroll={handleScroll}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * fullItemWidth,
            index * fullItemWidth,
            (index + 1) * fullItemWidth,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: cardWidth,
                marginHorizontal: cardSpacing / 2,
                transform: [{ scale }],
              }}
            >
              <GameCard
                data={item}
                onPress={() =>
                  router.push(`/generator/states/new_york/${item.slug}`)
                }
              />
            </Animated.View>
          );
        }}
      />

      {/* Indicador de página (dots) */}
      <View style={styles.dotsContainer}>
        {mockGames.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentIndex === i ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: -30, // ⬅️ padding top atual: pode mudar para 0 se quiser mais compacto
    marginBottom: -40, // ⬅️ padding bottom atual: use -50 ou 0 para reduzir
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: "#007EFF",
  },
  dotInactive: {
    backgroundColor: "#C4D9FF",
  },
});
