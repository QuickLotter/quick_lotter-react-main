import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GameCard from "./GameCard";
import { useRouter } from "expo-router";
import { GameData } from "@/types/GameData";

type Props = {
  games: GameData[];
};

export default function GameCardSlider({ games }: Props) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  // FlatList para MOBILE/TABLET
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsivo para Card
  const maxWidth = 384;
  const minWidth = 280;
  const cardWidth = Math.min(Math.max(width * 0.9, minWidth), maxWidth);
  const cardSpacing = 9;
  const fullItemWidth = cardWidth + cardSpacing;

  // Verifica se é Desktop (>=1080)
  const isDesktop = width >= 1080;

  // ------ DESKTOP Slider com Setas ------
  const [desktopIndex, setDesktopIndex] = useState(0);
  function goPrev() {
    setDesktopIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  }
  function goNext() {
    setDesktopIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  }

  // ------ MOBILE Slider com FlatList ------
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

  if (!games?.length) return null;

  // --- Função para montar a rota do generator (NY, CA, etc)
  function getGeneratorRoute(game: GameData) {
    // NY Mega Millions, Powerball, etc.
    if (game.id === "megamillions_ny") {
      return "/generator/NY/megamillions";
    }
    if (game.id === "powerball_ny") {
      return "/generator/NY/powerball";
    }
    if (game.id === "cash4life_ny") {
      return "/generator/NY/cash4life";
    }
    if (game.id === "nylotto_ny") {
      return "/generator/NY/nylotto";
    }
    if (game.id === "pick10_ny") {
      return "/generator/NY/pick10";
    }
    if (game.id === "take5_midday_ny") {
      return "/generator/NY/take5_midday";
    }
    if (game.id === "take5_evening_ny") {
      return "/generator/NY/take5_evening";
    }
    if (game.id === "win4_midday_ny") {
      return "/generator/NY/win4_midday";
    }
    if (game.id === "win4_evening_ny") {
      return "/generator/NY/win4_evening";
    }
    if (game.id === "numbers_midday_ny") {
      return "/generator/NY/nylotto";
    }
    if (game.id === "numbers_evening_ny") {
      return "/generator/NY/numbers_evening";
    }
    if (game.id === "megamillions_az") {
      return "/generator/AZ/megamillions";
    }
    if (game.id === "powerball_az") {
      return "/generator/AZ/powerball";
    }

    // ...adicione outros casos conforme sua estrutura!
    // Para fallback dinâmico (exemplo para outros estados):
    if (game.state && game.slug) {
      return `/generator/states/${game.state}/${game.slug}`;
    }
    return "#";
  }

  return (
    <View style={styles.sliderContainer}>
      {isDesktop ? (
        // DESKTOP: Card central + setas laterais
        <View style={styles.desktopRow}>
          <TouchableOpacity onPress={goPrev} style={styles.arrowBtn}>
            <Ionicons name="chevron-back-circle" size={48} color="#bbb" />
          </TouchableOpacity>

          <View
            style={[
              styles.cardDesktop,
              { width: 400, maxWidth: 440, minWidth: 240 },
            ]}
          >
            <GameCard
              data={games[desktopIndex]}
              onPress={() => {
                const route = getGeneratorRoute(games[desktopIndex]);
                if (route && route !== "#") router.push(route);
              }}
            />
          </View>

          <TouchableOpacity onPress={goNext} style={styles.arrowBtn}>
            <Ionicons name="chevron-forward-circle" size={48} color="#bbb" />
          </TouchableOpacity>
        </View>
      ) : (
        // MOBILE/TABLET: FlatList horizontal, centralizado, com dots
        <>
          <Animated.FlatList
            data={games}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={fullItemWidth}
            decelerationRate="fast"
            pagingEnabled
            bounces={false}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: (width - cardWidth) / 2,
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
                    onPress={() => {
                      const route = getGeneratorRoute(item);
                      if (route && route !== "#") router.push(route);
                    }}
                  />
                </Animated.View>
              );
            }}
          />

          {/* Dots de navegação */}
          <View style={styles.dotsContainer}>
            {games.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  currentIndex === i ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 0,
    marginBottom: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1080,
  },
  desktopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cardDesktop: {
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 16,
  },
  arrowBtn: {
    padding: 0,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
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
