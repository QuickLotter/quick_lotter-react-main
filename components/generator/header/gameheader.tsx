// ✅ Path: components/generator/header/gameheader.tsx
// Atualizado para aceitar rota de voltar customizada (ex: OverviewSelector) e seguir padrão iOS

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";

type Props = {
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  headerColor: string; // 🎨 cor de fundo (dinâmica por jogo)
  textColor?: string; // 🖋️ cor do texto (opcional, padrão branco)
  backTo?: string; // 🛣️ rota para voltar (opcional)
};

export default function GameHeader({
  logo,
  title,
  subtitle,
  headerColor,
  textColor = "#FFFFFF", // padrão branco
  backTo = "/home", // padrão: home
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingTop: insets.top + 24, backgroundColor: headerColor },
      ]}
    >
      <ResponsiveContainer style={styles.inner}>
        {/* 🔙 Botão de voltar */}
        <Pressable
          onPress={() => router.push(backTo)}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color={textColor} />
        </Pressable>

        {/* 🧩 Logo e título */}
        <View style={styles.logoAndTitle}>
          {logo}
          <Text style={[styles.title, { color: textColor }]}>
            {title} –{" "}
            <Text style={[styles.bold, { color: textColor }]}>{subtitle}</Text>
          </Text>
        </View>

        {/* Placeholder para manter layout centralizado */}
        <View style={{ width: 30 }} />
      </ResponsiveContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 128,
    justifyContent: "center",
    zIndex: 999,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 6,
    paddingTop: 10,
  },
  logoAndTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    marginTop: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});
