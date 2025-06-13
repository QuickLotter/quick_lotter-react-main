// ✅ Path: app/(main)/generator/ny/win4_midday/MyLines.tsx

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import GameHeader from "@/components/generator/header/gameheader";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import SelectorSliderOptions from "@/components/generator/smart_filter/selectorslideroptions";
import GeneratedBottomNav from "@/components/generator/layout/generatedbottomnav";
import GameRow from "@/components/generator/smart_filter/gamerow";
import SaveLinesModal from "@/components/savelinesmodal";
import Win4MiddayLogo from "@/assets/logos/ny/win4midday.svg";
import Win4PrintModal from "@/app/(main)/printing/ny/win4/win4printmodal"; // ⬅️ Importe o modal de impressão!
import { supabase } from "@/app/(auth)/supabaseClient"; // <= GARANTA ESSE ARQUIVO!

export default function MyLinesPage() {
  const { data, game } = useLocalSearchParams();
  const [games, setGames] = useState<any[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const router = useRouter();

  // Caminho da logo deste jogo (ajuste conforme o arquivo da página!)
  const logo_path = "/assets/logos/ny/win4midday.svg";

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data as string));
        if (Array.isArray(parsed)) {
          setGames(parsed);
        } else {
          setGames([]);
        }
      } catch (error) {
        setGames([]);
      }
    } else {
      setGames([]);
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
    // Implemente edição se quiser!
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  // Abre o modal de impressão
  const handlePrint = () => {
    setShowPrintModal(true);
  };

  // SALVA NO SUPABASE COM O CAMINHO DA LOGO!
  const handleModalSave = async (lineName: string) => {
    setShowSaveModal(false);
    setLoading(true);
    try {
      // Pega o usuário logado
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error("User not authenticated.");
      }
      // Salva na tabela com logo_path!
      const { error } = await supabase.from("saved_lines").insert([
        {
          user_id: userData.user.id,
          name: lineName,
          game_id: game || "win4_midday_ny", // ajuste conforme navegação/params!
          logo_path, // <<---- Salva o caminho da logo deste jogo!
          lines: games,
        },
      ]);
      if (error) throw error;
      Alert.alert("Success", "Saved successfully!");
      // Redireciona para My Saved Lines (exemplo, ajuste o path se necessário)
      router.replace("/my-lines");
    } catch (err: any) {
      Alert.alert("Save Error", err.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <GameHeader
        logo={<Win4MiddayLogo width={90} height={40} />}
        title="My Lines"
        subtitle="New York Win 4 Midday"
        headerColor="#7E0C6E"
        backTo="/generator/ny/generator?game=win4evening_ny"
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
                mainNumbers={game.mainNumbers || game.numbers} // aceita ambos formatos!
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

      {/* ---- MODAL PARA SALVAR NOME DA LINHA ---- */}
      <SaveLinesModal
        visible={showSaveModal}
        onSave={handleModalSave}
        onCancel={() => setShowSaveModal(false)}
        loading={loading}
      />

      {/* ---- MODAL DE IMPRESSÃO ---- */}
      <Win4PrintModal
        visible={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        onPrint={(printSettings) => {
          setShowPrintModal(false);
          // Aqui você executa a ação de impressão com printSettings!
          console.log("Configuração de impressão:", printSettings);
        }}
      />
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
    backgroundColor: "#7E0C6E",
  },
  mainBallText: {
    color: "#FFF",
  },
});
