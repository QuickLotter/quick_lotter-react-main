import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  seconds: number;
  labelColor?: string;
  digitColor?: string;
  fontSize?: number;
};

export default function SimpleTimer({
  seconds,
  labelColor = "#888",
  digitColor = "#1a1a1a",
  fontSize = 22,
}: Props) {
  const [[d, h, m, s], setTime] = useState([0, 0, 0, 0]);

  useEffect(() => {
    function getParts(secs: number) {
      const days = Math.floor(secs / 86400);
      const hours = Math.floor((secs % 86400) / 3600);
      const mins = Math.floor((secs % 3600) / 60);
      const secsLeft = secs % 60;
      return [days, hours, mins, secsLeft];
    }
    setTime(getParts(seconds));
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        const total =
          prev[0] * 86400 + prev[1] * 3600 + prev[2] * 60 + prev[3] - 1;
        return getParts(Math.max(0, total));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <TimerPart
        label="Days"
        value={d}
        color={digitColor}
        labelColor={labelColor}
        fontSize={fontSize}
      />
      <Text style={{ fontSize, color: labelColor }}>:</Text>
      <TimerPart
        label="Hours"
        value={h}
        color={digitColor}
        labelColor={labelColor}
        fontSize={fontSize}
      />
      <Text style={{ fontSize, color: labelColor }}>:</Text>
      <TimerPart
        label="Min"
        value={m}
        color={digitColor}
        labelColor={labelColor}
        fontSize={fontSize}
      />
      <Text style={{ fontSize, color: labelColor }}>:</Text>
      <TimerPart
        label="Sec"
        value={s}
        color={digitColor}
        labelColor={labelColor}
        fontSize={fontSize}
      />
    </View>
  );
}

function TimerPart({
  value,
  label,
  color,
  labelColor,
  fontSize,
}: {
  value: number;
  label: string;
  color: string;
  labelColor: string;
  fontSize: number;
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={[timerStyles.timerBox, { minWidth: fontSize * 1.2 }]}>
        <Text style={{ color, fontWeight: "bold", fontSize }}>
          {String(value).padStart(2, "0")}
        </Text>
      </View>
      <Text style={{ color: labelColor, fontSize: fontSize * 0.7 }}>
        {label}
      </Text>
    </View>
  );
}

const timerStyles = StyleSheet.create({
  timerBox: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#101820",
    alignItems: "center",
    justifyContent: "center",
  },
});
