import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, useColorScheme } from "react-native";
import Logo from "@/assets/images/logo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 950,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 38,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1100),
    ]).start(() => {
      router.replace("/login");
    });
  }, []);

  // Escolhe cor de fundo pelo tema
  const gradientColors =
    colorScheme === "dark" ? ["#021529", "#223354"] : ["#007AFF", "#42A1F7"];

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Animated.Image
        source={Logo}
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
            shadowColor: "#00294A",
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 18,
            shadowOpacity: 0.2,
            elevation: 9,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  logo: {
    width: 220,
    height: 110,
    borderRadius: 28,
    backgroundColor: "transparent",
  },
});
