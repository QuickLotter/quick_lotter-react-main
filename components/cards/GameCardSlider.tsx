import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import GameCard from "./GameCard";
import { useRouter } from "expo-router";
import { GameData } from "@/types/GameData";

type Props = {
  games: GameData[];
};

export default function GameCardSlider({ games }: Props) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  // Responsivo para Card
  const maxWidth = 384;
  const minWidth = 320;
  const cardWidth = Math.min(Math.max(width * 0.92, minWidth), maxWidth);
  const cardHeight = cardWidth * 1.45; // Ajuste aqui conforme o layout real

  // Dots e posição
  const [activeIndex, setActiveIndex] = useState(0);

  function getGeneratorRoute(game: GameData) {
    if (game.id.endsWith("_ny"))
      return `/generator/ny/generator?game=${game.id}`;
    if (game.id.endsWith("_az"))
      return `/generator/az/generator?game=${game.id}`;
    if (game.state && game.slug)
      return `/generator/states/${game.state}/${game.slug}`;
    return "#";
  }

  if (!games?.length) return null;

  return (
    <View style={styles.sliderContainer}>
      <Carousel
        loop
        width={cardWidth}
        height={cardHeight}
        autoPlay={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 38,
        }}
        pagingEnabled
        snapEnabled
        data={games}
        style={{
          alignSelf: "center",
        }}
        onSnapToItem={setActiveIndex}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.cardWrapper,
              index === activeIndex && styles.activeCardShadow,
            ]}
          >
            <GameCard
              data={item}
              onPress={() => {
                const route = getGeneratorRoute(item);
                if (route && route !== "#") router.push(route);
              }}
            />
          </View>
        )}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        customConfig={() => ({
          type: "positive",
        })}
      />

      {/* Dots iOS-style */}
      <View style={styles.dotsContainer}>
        {games.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                isActive && styles.dotActive,
                {
                  opacity: isActive ? 1 : 0.4,
                  transform: [{ scale: isActive ? 1.16 : 1 }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 6,
    alignSelf: "center",
    width: "100%",
    maxWidth: 1080,
    minHeight: 350,
    paddingVertical: 12,
  },
  cardWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#194D91",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    borderRadius: 22,
    backgroundColor: "transparent",
    elevation: 2,
    paddingBottom: 2,
  },
  activeCardShadow: {
    shadowOpacity: 0.19,
    shadowRadius: 22,
    shadowColor: "#007EFF",
    elevation: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 0,
    gap: 7,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#B5CCF9",
    marginHorizontal: 4,
    transitionProperty: "all",
    transitionDuration: "160ms",
  },
  dotActive: {
    backgroundColor: "#007EFF",
    width: 15,
    height: 10,
    borderRadius: 7,
    shadowColor: "#007EFF",
    shadowOpacity: 0.19,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});
