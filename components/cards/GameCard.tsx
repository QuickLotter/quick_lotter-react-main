import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GameData } from "@/types/GameData";
import { gameSliderUI } from "@/constants/gamesliderui";

type Props = {
  data: GameData;
  onPress?: () => void;
};

export default function GameCard({ data, onPress }: Props) {
  const { width } = useWindowDimensions();

  // Responsividade: largura do card entre 320 e 768
  const maxWidth = 384;
  const minWidth = 192;
  const cardWidth = Math.min(Math.max(width * 0.9, minWidth), maxWidth);

  // Escala proporcional com base na largura base de 375
  const scale = cardWidth / 375;

  const ui = gameSliderUI[data.slug] || gameSliderUI["megamillions"];

  return (
    <View
      style={[
        styles.cardWrapper,
        {
          width: cardWidth,
          borderColor: ui.borderColor,
          padding: 28 * scale, // padding ajustado (era 32)
          borderRadius: 24 * scale,
        },
      ]}
    >
      {/* Logo centralizado */}
      <View style={[styles.logoWrapper, { marginBottom: 8 * scale }]}>
        {typeof data.logo === "string" ? (
          <Image
            source={{ uri: data.logo }}
            style={{
              width: 200 * scale,
              height: 60 * scale,
              resizeMode: "contain",
            }}
          />
        ) : (
          <View
            style={{
              width: 160 * scale,
              height: 48 * scale,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.logo}
          </View>
        )}
      </View>

      {/* Barra gradiente */}
      <LinearGradient
        colors={ui.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 10 * scale,
          width: 245 * scale,
          marginTop: 12 * scale,
          marginBottom: 18 * scale,
          borderRadius: 4 * scale,
        }}
      />

      <Text style={[styles.label, { fontSize: 16 * scale }]}>
        ESTIMATED JACKPOT
      </Text>
      <Text
        style={[
          styles.jackpot,
          { fontSize: 28 * scale, color: ui.playButtonColor },
        ]}
      >
        {data.jackpot}
      </Text>

      <Text style={[styles.muted, { fontSize: 12 * scale }]}>CASH VALUE</Text>
      <Text style={[styles.cash, { fontSize: 14 * scale }]}>
        {data.cashValue}
      </Text>

      <Text
        style={[styles.muted, { fontSize: 12 * scale, marginTop: 6 * scale }]}
      >
        NEXT DRAWING
      </Text>
      <Text
        style={[
          styles.drawing,
          { fontSize: 14 * scale, marginBottom: 12 * scale },
        ]}
      >
        {data.drawTime}
      </Text>

      <Text style={[styles.label, { fontSize: 16 * scale }]}>
        WINNING NUMBERS
      </Text>
      <Text
        style={[
          styles.drawDate,
          { fontSize: 14 * scale, marginBottom: 12 * scale },
        ]}
      >
        {data.drawDate}
      </Text>

      <View
        style={[styles.numberRow, { gap: 8 * scale, marginBottom: 16 * scale }]}
      >
        {data.numbers.map((num, index) => {
          const isLast = index === data.numbers.length - 1;
          const ballColors = isLast ? ui.lastBallGradient : ui.ballGradient;
          const ballTextColor = isLast ? "#000" : "#101820";

          return (
            <LinearGradient
              key={index}
              colors={ballColors}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                width: 36 * scale,
                height: 36 * scale,
                borderRadius: 40 * scale,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FFFFFF",
              }}
            >
              <Text
                style={{
                  fontSize: 14 * scale,
                  fontWeight: "700",
                  color: ballTextColor,
                }}
              >
                {String(num).padStart(2, "0")}
              </Text>
            </LinearGradient>
          );
        })}
      </View>

      {!!data.powerPlay?.trim() && (
        <Text
          style={[
            styles.powerLabel,
            { fontSize: 14 * scale, marginBottom: 10 * scale },
          ]}
        >
          POWER PLAY: {data.powerPlay}
        </Text>
      )}

      <Text
        style={[
          styles.result,
          { fontSize: 14 * scale, marginBottom: 20 * scale },
        ]}
      >
        {data.result}
      </Text>

      <TouchableOpacity
        style={{
          paddingVertical: 12 * scale,
          paddingHorizontal: 40 * scale,
          borderRadius: 24 * scale,
          borderWidth: 2,
          backgroundColor: ui.playButtonColor,
          borderColor: ui.playButtonBorder,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        }}
        onPress={onPress}
      >
        <Text
          style={{ color: "#fff", fontWeight: "700", fontSize: 16 * scale }}
        >
          Play Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 6,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 10,
    alignSelf: "center",
  },
  logoWrapper: { width: "100%", alignItems: "center", position: "relative" },
  svgWrapper: {
    width: 160,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: { width: 200, height: 60, resizeMode: "contain" },
  infoButton: { position: "absolute", right: 0, top: 0 },
  infoIcon: { fontSize: 20, fontWeight: "700" },
  separator: {
    height: 10,
    width: 245,
    marginTop: 12,
    marginBottom: 18,
    borderRadius: 4,
  },
  label: { fontSize: 16, fontWeight: "750", color: "#444" },
  jackpot: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  muted: { fontSize: 12, color: "#999", marginTop: 6 },
  cash: { fontWeight: "bold", fontSize: 14, color: "#222" },
  drawing: { fontSize: 14, fontWeight: "600", marginBottom: 12, color: "#333" },
  drawDate: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  numberRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  numberBall: {
    width: 36,
    height: 36,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  numberText: { fontWeight: "700", fontSize: 14 },
  powerLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
    color: "#444",
  },
  result: {
    fontSize: 14,
    color: "#222",
    textAlign: "center",
    marginBottom: 20,
  },
  playButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  playText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
