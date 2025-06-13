// ✅ Path: app/(main)/generator/ny/nylotto/MyLines.tsx

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
import NYLottoLogo from "@/assets/logos/ny/nylotto.svg";

// --- Personalize as cores abaixo ---
const BALL_COLOR = "#E93030"; // Vermelho das bolas principais
const BALL_TEXT_COLOR = "#fff"; // Texto branco
const LAST_BALL_COLOR = "#007EFF"; // Azul da bola bônus (exemplo)
const LAST_BALL_TEXT_COLOR = "#fff"; // Texto branco bônus

export default function MyLinesPage() {
  const { data } = useLocalSearchParams();
  const [games, setGames] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data as string));
        if (Array.isArray(parsed)) {
          setGames(parsed);
        } else {
          console.error("Data recebido não é um array:", parsed);
        }
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    } else {
      // MOCK para NY Lotto: 6 números principais + 1 bônus (bonus é sempre o último)
      setGames([
        { mainNumbers: [9, 16, 23, 34, 42, 54], bonus: 17 },
        { mainNumbers: [4, 8, 19, 29, 41, 47], bonus: 36 },
        { mainNumbers: [11, 18, 28, 35, 51, 53], bonus: 6 },
        { mainNumbers: [1, 10, 21, 33, 39, 49], bonus: 22 },
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
      pathname: "/generator/ny/nylotto/edit",
      params: {
        main: JSON.stringify(game.mainNumbers),
        bonus: game.bonus?.toString() ?? "",
      },
    });
  };

  const handleSave = () => {
    // Salvar na API/local
    console.log("Salvar jogos:", games);
  };

  const handlePrint = () => {
    // Imprimir ou gerar PDF
    console.log("Imprimir jogos:", games);
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        logo={<NYLottoLogo width={100} height={38} />}
        title="My Lines"
        subtitle="New York Lotto"
        headerColor="#E93030"
      />

      <View style={styles.sliderContainer}>
        <SelectorSliderOptions />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ResponsiveContainer>
          {games.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No numbers generated yet.</Text>
            </View>
          ) : (
            games.map((game, index) => (
              <GameRow
                key={index}
                index={index + 1}
                mainNumbers={game.mainNumbers}
                extraNumber={game.bonus}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
                // Cor das bolas principais
                ballStyle={{
                  backgroundColor: BALL_COLOR,
                  borderColor: "#fff",
                }}
                ballTextStyle={{
                  color: BALL_TEXT_COLOR,
                }}
                // Cor da última bola (bônus)
                extraBallStyle={{
                  backgroundColor: LAST_BALL_COLOR,
                  borderColor: "#fff",
                }}
                extraBallTextStyle={{
                  color: LAST_BALL_TEXT_COLOR,
                }}
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
    paddingBottom: 100,
    paddingTop: 12,
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
});
