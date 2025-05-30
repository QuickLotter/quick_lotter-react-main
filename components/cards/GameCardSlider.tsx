//gamecardslider para todos os estados

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

type Props = {
  games: GameData[]; // Recebe por props!
};

export default function GameCardSlider({ games }: Props) {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Responsivo: largura do card entre 280 e 384
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
        data={games} // <-- agora é dinâmico!
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
                onPress={() =>
                  router.push(
                    `/generator/states/${item.state || "ny"}/${item.slug}`
                  )
                }
              />
            </Animated.View>
          );
        }}
      />

      {/* Indicador de página (dots) */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: -30,
    marginBottom: -40,
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
