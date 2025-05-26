import React from "react";
import { Pressable, Animated, StyleSheet, Platform } from "react-native";

const COLORS = {
  on: "#007AFF",
  off: "#E5E7EB",
  thumb: "#FFF",
};

export default function IOSSwitch({
  value,
  onValueChange,
  disabled = false,
  style,
}: {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  style?: any;
}) {
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 27],
  });

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.off, COLORS.on],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.switchBase, style, disabled && { opacity: 0.5 }]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]} />
      <Animated.View style={[styles.thumb, { left: thumbLeft }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchBase: {
    width: 51,
    height: 31,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: COLORS.off,
  },
  thumb: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: COLORS.thumb,
    top: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "web" ? 0.09 : 0.16,
    shadowRadius: 3,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
});
