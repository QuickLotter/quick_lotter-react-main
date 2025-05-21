import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { Colors } from "@/theme";
import Logo from "@/assets/images/logo.png";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const router = useRouter();

  useEffect(() => {
    // Aqui pode entrar a verificação de token/autenticação futura:
    // Exemplo:
    // 1. Verifique se o usuário já está logado via AsyncStorage/SecureStore/JWT
    // 2. Se estiver logado: router.replace("/home");
    // 3. Se não: router.replace("/login");

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(900),
    ]).start(() => {
      // 👉 Aqui faz a navegação real:
      router.replace("/auth/login"); // Mantenha assim se o login é a próxima tela!
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.Image
        source={Logo}
        style={[styles.logo, { opacity, transform: [{ scale }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#007AFF", // Pode usar Colors.primary ou gradiente
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 110,
  },
});
