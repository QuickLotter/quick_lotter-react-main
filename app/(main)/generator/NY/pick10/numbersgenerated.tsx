// ✅ Path: app/(main)/generator/ny/pick10/MyLines.tsx

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// Componentes visuais
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import SelectorSliderOptions from "@/components/generator/smart_filter/selectorslideroptions";
import GeneratedBottomNav from "@/components/generator/layout/generatedbottomnav";
import GameRow from "@/components/generator/smart_filter/gamerow";

// Assets
import Pick10Logo from "@/assets/logos/ny/pick10.svg";

export default function MyLinesPage() {
  const { data } = useLocalSearchParams();
  const [games, setGames] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data as string));
        if (Array.isArray(parsed)) setGames(parsed);
        else console.error("Data recebido não é um array:", parsed);
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    } else {
      // MOCK de jogos Pick 10 (10 números por jogo)
      setGames([
        { mainNumbers: [2, 7, 11, 18, 21, 32, 39, 44, 56, 69] },
        { mainNumbers: [4, 13, 19, 25, 29, 38, 45, 51, 63, 78] },
        { mainNumbers: [6, 12, 20, 22, 33, 41, 47, 53, 65, 80] },
        { mainNumbers: [1, 9, 15, 24, 30, 40, 48, 54, 68, 77] },
      ]);
    }
  }, [data]);

  const handleDelete = (index: number) => {
    Alert.alert("Delete this line?", "Your number selection will be removed.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = [...games];
          updated.splice(index, 1);
          setGames(updated);
        },
      },
    ]);
  };

  const handleEdit = (index: number) => {
    const game = games[index];
    router.push({
      pathname: "/generator/ny/pick10/edit",
      params: {
        main: JSON.stringify(game.mainNumbers),
      },
    });
  };

  const handleSave = () => {
    // Aqui pode salvar na API/local
    console.log("Salvar jogos:", games);
  };

  const handlePrint = () => {
    // Aqui pode imprimir ou gerar PDF
    console.log("Imprimir jogos:", games);
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        logo={<Pick10Logo width={100} height={40} />}
        title="My Lines"
        subtitle="New York Pick 10"
        headerColor="#FF5E13"
      />

      <View style={styles.sliderContainer}>
        <SelectorSliderOptions />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ResponsiveContainer>
          {games.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No games generated yet.</Text>
            </View>
          ) : (
            games.map((game, index) => (
              <GameRow
                key={index}
                index={index + 1}
                mainNumbers={game.mainNumbers}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
                ballStyle={styles.mainBall}
                ballTextStyle={styles.mainBallText}
              />
            ))
          )}
        </ResponsiveContainer>
      </ScrollView>

      <GeneratedBottomNav onPrint={handlePrint} onSave={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  sliderContainer: {
    backgroundColor: "#F1F1F1",
    height: 56,
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    paddingTop: 12,
    paddingBottom: 100,
    alignItems: "center",
  },
  empty: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  // Personalização das bolas para Pick 10
  mainBall: {
    backgroundColor: "#000", // Troque aqui a cor da bola principal do Pick 10!
  },
  mainBallText: {
    color: "#FFF", // Troque aqui a cor do texto!
  },
});
