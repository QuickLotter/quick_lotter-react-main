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
import SimpleTimer from "@/components/SimpleTimer";
import { getNextDrawDate } from "@/utils/getNextDrawDate";
import { getGameStateFromId } from "@/utils/getGameStateFromId"; // NOVO!

type Props = {
  data: GameData;
  onPress?: () => void;
};

function renderLogo(logo: GameData["logo"], width: number, height: number) {
  if (!logo) return null;
  if (typeof logo === "string") {
    return (
      <Image
        source={{ uri: logo }}
        style={{
          width,
          height,
          resizeMode: "contain",
        }}
      />
    );
  } else {
    return React.createElement(logo, { width, height });
  }
}

const MAX_BALLS_PER_ROW = 8;

export default function GameCard({ data, onPress }: Props) {
  const { width } = useWindowDimensions();
  const maxWidth = 384;
  const minWidth = 260;
  const cardWidth = Math.min(Math.max(width * 0.95, minWidth), maxWidth);
  const scale = cardWidth / 380;

  // Extrai o estado do id do jogo (ex: powerball_ny -> NY)
  const gameState = getGameStateFromId(data.id);

  // Timer logic
  let seconds = 0;
  if (data.nextDrawInSeconds !== undefined) {
    seconds = data.nextDrawInSeconds;
  } else if (data.nextDrawDate) {
    const target = new Date(data.nextDrawDate);
    seconds = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  } else if (gameState && data.slug) {
    const nextDraw = getNextDrawDate(gameState, data.slug);
    if (nextDraw) {
      seconds = Math.max(
        0,
        Math.floor((nextDraw.getTime() - Date.now()) / 1000)
      );
    }
  }

  const ui =
    data.config_ui || gameSliderUI[data.slug] || gameSliderUI["megamillions"];

  // Ball size logic (mantido)
  const ballSize = Math.max(
    32 * scale,
    Math.min(
      48 * scale,
      (cardWidth - 12 - (MAX_BALLS_PER_ROW - 1) * 4) / MAX_BALLS_PER_ROW
    )
  );

  return (
    <View
      style={[
        styles.cardWrapper,
        {
          width: cardWidth,
          borderColor: ui.borderColor,
          borderWidth: ui.borderWidth ?? 6,
          borderRadius: ui.borderRadius ?? 24 * scale,
          backgroundColor: ui.background ?? "#fff",
          alignSelf: "center",
        },
      ]}
    >
      {/* Logo centralizado */}
      <View style={[styles.logoWrapper, { marginBottom: 8 * scale }]}>
        {renderLogo(data.logo, 200 * scale, 60 * scale)}
      </View>

      <LinearGradient
        colors={ui.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 15 * scale,
          width: 300 * scale,
          marginTop: 5 * scale,
          marginBottom: 5 * scale,
          borderRadius: 4 * scale,
        }}
      />

      <Text
        style={[
          styles.label,
          {
            fontSize: 18 * scale,
            color: ui.labelColor ?? "#444",
            fontFamily: ui.labelFontFamily,
          },
        ]}
      >
        ESTIMATED JACKPOT
      </Text>
      <Text
        style={[
          styles.jackpot,
          {
            fontSize: 28 * scale,
            marginTop: -2 * scale,
            marginBottom: -5 * scale,
            color: ui.jackpotColor ?? ui.playButtonColor ?? "#0E4CA1",
            fontFamily: ui.jackpotFontFamily,
          },
        ]}
      >
        {data.jackpot}
      </Text>

      <Text
        style={[
          styles.muted,
          { fontSize: 14 * scale, color: ui.cashLabelColor ?? "#999" },
        ]}
      >
        CASH VALUE
      </Text>
      <Text
        style={[
          styles.cash,
          {
            fontSize: 18 * scale,
            color: ui.cashValueColor ?? "#222",
            fontWeight: ui.cashFontWeight ?? "bold",
          },
        ]}
      >
        {data.cashValue}
      </Text>

      <Text
        style={[
          styles.muted,
          {
            fontSize: 14 * scale,
            marginTop: 6 * scale,
            color: ui.nextDrawLabelColor ?? "#999",
            fontFamily: ui.drawLabelFontFamily,
          },
        ]}
      >
        NEXT DRAWING
      </Text>

      {/* TIMER */}
      <SimpleTimer
        seconds={seconds}
        labelColor="#888"
        digitColor={ui.borderColor || "#007EFF"}
        fontSize={18 * scale}
      />

      <Text
        style={[
          styles.label,
          {
            fontSize: 18 * scale,
            color: ui.numbersLabelColor ?? "#444",
            fontFamily: ui.numbersLabelFontFamily,
            marginTop: 8 * scale,
          },
        ]}
      >
        WINNING NUMBERS
      </Text>
      <Text
        style={[
          styles.drawDate,
          {
            fontSize: 16 * scale,
            marginBottom: 12 * scale,
            color: ui.drawDateColor ?? "#000",
          },
        ]}
      >
        {data.drawDate}
      </Text>

      {/* BOLAS */}
      <View
        style={[
          styles.numberRow,
          {
            gap: 4 * scale,
            marginBottom: 2 * scale,
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
            minHeight: ballSize * 1.1,
          },
        ]}
      >
        {data.numbers.map((num, index) => {
          const isLast =
            index === data.numbers.length - 1 && !!ui.lastBallGradient;
          const ballColors = isLast
            ? ui.lastBallGradient ?? ui.ballGradient
            : ui.ballGradient;
          const ballTextColor = isLast
            ? ui.lastBallTextColor ?? "#fff"
            : Array.isArray(ui.ballTextColor)
            ? ui.ballTextColor[index % ui.ballTextColor.length]
            : ui.ballTextColor ?? "#101820";

          const marginRight =
            (index + 1) % MAX_BALLS_PER_ROW === 0 ? 0 : 1 * scale;
          const marginBottom =
            index < data.numbers.length - MAX_BALLS_PER_ROW ? 7 * scale : 0;

          return (
            <LinearGradient
              key={index}
              colors={ballColors}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                width: ballSize,
                height: ballSize,
                borderRadius: ballSize / 2,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FFFFFF",
                marginRight,
                marginBottom,
              }}
            >
              <Text
                style={{
                  fontSize: ballSize * 0.53,
                  fontWeight: "700",
                  color: ballTextColor,
                  fontFamily: ui.ballFontFamily,
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
            {
              fontSize: 14 * scale,
              marginBottom: 10 * scale,
              color: ui.powerLabelColor ?? "#444",
              fontFamily: ui.powerLabelFontFamily,
            },
          ]}
        >
          POWER PLAY: {data.powerPlay}
        </Text>
      )}

      <Text
        style={[
          styles.result,
          {
            fontSize: 14 * scale,
            marginBottom: 20 * scale,
            color: ui.resultColor ?? "#222",
          },
        ]}
      >
        {data.result}
      </Text>

      <TouchableOpacity
        style={{
          paddingVertical: 12 * scale,
          paddingHorizontal: 60 * scale,
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
          style={{
            color: ui.playButtonTextColor ?? "#fff",
            fontWeight: ui.playButtonFontWeight ?? "700",
            fontSize: 16 * scale,
            fontFamily: ui.playButtonFontFamily,
          }}
        >
          Play Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#000",
    borderRadius: 24,
    borderWidth: 6,
    padding: 16,
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
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
    width: "100%",
    minHeight: 44,
  },
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
    paddingHorizontal: 60,
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
