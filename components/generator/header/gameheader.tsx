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
  headerColor: string;
  // NOVAS PROPS:
  titleColor?: string; // cor do título "Results"
  subtitleColor?: string; // cor do subtítulo "New York Pick 10"
  backIconColor?: string; // cor da seta de voltar
  backTo?: string;
};

export default function GameHeader({
  logo,
  title,
  subtitle,
  headerColor,
  titleColor = "#FFF", // padrão: branco
  subtitleColor = "#FFF", // padrão: branco
  backIconColor = "#FFF", // padrão: branco
  backTo = "/home",
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
          onPress={() => router.replace(backTo)}
          style={styles.backButton}
        >
          {/* seta customizada */}
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={backIconColor}
          />
        </Pressable>

        {/* 🧩 Logo e título */}
        <View style={styles.logoAndTitle}>
          {logo}
          {/* Título e subtítulo com cores independentes */}
          <Text style={[styles.title, { color: titleColor }]}>
            {title}
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              {" – "}
              {subtitle}
            </Text>
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
    fontWeight: "normal",
  },
  subtitle: {
    fontWeight: "bold", // Subtítulo sem bold
    fontSize: 14,
  },
});
