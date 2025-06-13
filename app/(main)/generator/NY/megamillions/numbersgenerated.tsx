// ✅ Path: app/(main)/generator/ny/megamillions/MyLines.tsx

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
import MegamillionsLogo from "@/assets/logos/ny/megamillions.svg";

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
      setGames([
        { mainNumbers: [4, 12, 15, 33, 54], extraNumbers: [16] },
        { mainNumbers: [7, 8, 19, 25, 60], extraNumbers: [3] },
        { mainNumbers: [4, 12, 15, 33, 54], extraNumbers: [16] },
        { mainNumbers: [7, 8, 19, 25, 60], extraNumbers: [3] },
        { mainNumbers: [4, 12, 15, 33, 54], extraNumbers: [16] },
        { mainNumbers: [7, 8, 19, 25, 60], extraNumbers: [3] },
        { mainNumbers: [4, 12, 15, 33, 54], extraNumbers: [16] },
        { mainNumbers: [7, 8, 19, 25, 60], extraNumbers: [3] },
      ]);
    }
  }, [data]);

  const handleDelete = (index: number) => {
    Alert.alert(
      "Are You Sure Want to delete this line?",
      "Your number selection will be gone if you delete this line.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Line",
          style: "destructive",
          onPress: () => {
            const updated = [...games];
            updated.splice(index, 1);
            setGames(updated);
          },
        },
      ]
    );
  };

  const handleEdit = (index: number) => {
    const game = games[index];
    router.push({
      pathname: "/generator/ny/megamillions/edit",
      params: {
        main: JSON.stringify(game.mainNumbers),
        extra: JSON.stringify(game.extraNumbers),
      },
    });
  };

  const handleSave = () => console.log("Salvar jogos:", games);
  const handlePrint = () => console.log("Imprimir jogos:", games);

  return (
    <View style={styles.wrapper}>
      <GameHeader
        logo={<MegamillionsLogo width={100} height={40} />}
        title="My Lines"
        subtitle="New York Mega Millions"
        headerColor="#0E4CA1"
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
                extraNumber={game.extraNumbers?.[0]}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
                ballStyle={styles.mainBall} // <--- ESTILO DA BOLA
                ballTextStyle={styles.mainBallText} // <--- ESTILO DO TEXTO
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
  // ---- ITENS PARA PERSONALIZAR A COR DAS BOLAS ----
  mainBall: {
    backgroundColor: "#0E4CA1", // Troque aqui para a cor da bola principal!
  },
  mainBallText: {
    color: "#FFF", // Troque aqui para a cor do texto principal!
  },
});
