// ✅ Path: app/(main)/generator/ny/win4_midday/MyLines.tsx

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
import Win4MiddayLogo from "@/assets/logos/ny/win4midday.svg";

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
      setGames([
        { mainNumbers: [4, 2, 5, 3] },
        { mainNumbers: [7, 8, 1, 2] },
        { mainNumbers: [4, 1, 5, 3] },
        { mainNumbers: [7, 9, 5, 0] },
        { mainNumbers: [4, 2, 1, 5] },
        { mainNumbers: [7, 8, 2, 0] },
        { mainNumbers: [4, 2, 5, 3] },
        { mainNumbers: [7, 8, 9, 5] },
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
      pathname: "/generator/ny/win4_midday/edit",
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
        logo={<Win4MiddayLogo width={90} height={40} />}
        title="My Lines"
        subtitle="New York Win 4 Midday"
        headerColor="#7E0C6E"
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
  // ---- ITENS PARA PERSONALIZAR A COR DAS BOLAS ----
  mainBall: {
    backgroundColor: "#7E0C6E", // Troque para a cor desejada!
  },
  mainBallText: {
    color: "#FFF", // Troque para a cor do texto que quiser!
  },
});
