// app/(main)/generator/ny/win4_midday/GeneratorSettingModalPick.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GameHeader from "@/components/generator/header/gameheader";
import FiltersPickFormModal from "@/components/generator/modals/filterspickformmodal";
import { generateGames } from "@/services/generateService"; // <- SERVIÇO DE GERAÇÃO
import { supabase } from "@/app/(auth)/supabaseClient"; // <- AUTENTICAÇÃO

// Ativa animação de layout no Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ----------- GAME ALIASES -----------
const GAME_ALIASES = [
  { type: "pick3", aliases: ["pick3", "numbers", "ny_numbers"] },
  { type: "pick4", aliases: ["pick4", "win4", "ny_win4"] },
  { type: "pick5", aliases: ["pick5"] },
];

// ----------- PRIZE TYPES STRUCT DYNAMIC -----------
function getPrizeTypesByGame(gameId: string) {
  const id = (gameId || "").toLowerCase();
  const isPick3 = GAME_ALIASES[0].aliases.some((a) => id.includes(a));
  const isPick4 = GAME_ALIASES[1].aliases.some((a) => id.includes(a));
  const isPick5 = GAME_ALIASES[2].aliases.some((a) => id.includes(a));

  if (isPick3) {
    return [
      {
        key: "STRAIGHT",
        label: "STRAIGHT PLAY",
        items: [{ key: "STRAIGHT", label: "Straight" }],
      },
      {
        key: "BOX",
        label: "BOX PLAYS",
        items: [
          { key: "BOX_3WAY", label: "3-Way Box" },
          { key: "BOX_6WAY", label: "6-Way Box" },
        ],
      },
      {
        key: "STRAIGHT_BOX",
        label: "STRAIGHT/BOX PLAYS",
        items: [
          { key: "SB_3WAY", label: "3-Way Straight/Box" },
          { key: "SB_6WAY", label: "6-Way Straight/Box" },
        ],
      },
      {
        key: "COMBINATION",
        label: "COMBINATION PLAYS",
        items: [
          { key: "COMBO_3WAY", label: "3-Way Combination" },
          { key: "COMBO_6WAY", label: "6-Way Combination" },
        ],
      },
      {
        key: "PAIR",
        label: "PAIR PLAYS",
        items: [
          { key: "PAIR_FRONT", label: "Front Pair" },
          { key: "PAIR_BACK", label: "Back Pair" },
        ],
      },
    ];
  }
  if (isPick4) {
    return [
      {
        key: "STRAIGHT",
        label: "STRAIGHT PLAY",
        items: [{ key: "STRAIGHT", label: "Straight" }],
      },
      {
        key: "BOX",
        label: "BOX PLAYS",
        items: [
          { key: "BOX_4WAY", label: "4-Way Box" },
          { key: "BOX_6WAY", label: "6-Way Box" },
          { key: "BOX_12WAY", label: "12-Way Box" },
          { key: "BOX_24WAY", label: "24-Way Box" },
        ],
      },
      {
        key: "STRAIGHT_BOX",
        label: "STRAIGHT/BOX PLAYS",
        items: [
          { key: "SB_4WAY", label: "4-Way Straight/Box" },
          { key: "SB_6WAY", label: "6-Way Straight/Box" },
          { key: "SB_12WAY", label: "12-Way Straight/Box" },
          { key: "SB_24WAY", label: "24-Way Straight/Box" },
        ],
      },
      {
        key: "COMBINATION",
        label: "COMBINATION PLAYS",
        items: [
          { key: "COMBO_4WAY", label: "4-Way Combination" },
          { key: "COMBO_6WAY", label: "6-Way Combination" },
          { key: "COMBO_12WAY", label: "12-Way Combination" },
          { key: "COMBO_24WAY", label: "24-Way Combination" },
        ],
      },
      {
        key: "PAIR",
        label: "PAIR PLAYS",
        items: [
          { key: "PAIR_FRONT", label: "Front Pair" },
          { key: "PAIR_BACK", label: "Back Pair" },
        ],
      },
    ];
  }
  if (isPick5) {
    return [
      {
        key: "STRAIGHT",
        label: "STRAIGHT PLAY",
        items: [{ key: "STRAIGHT", label: "Straight" }],
      },
      {
        key: "BOX",
        label: "BOX PLAYS",
        items: [
          { key: "BOX_5WAY", label: "5-Way Box" },
          { key: "BOX_10WAY", label: "10-Way Box" },
          { key: "BOX_20WAY", label: "20-Way Box" },
          { key: "BOX_30WAY", label: "30-Way Box" },
          { key: "BOX_60WAY", label: "60-Way Box" },
          { key: "BOX_120WAY", label: "120-Way Box" },
        ],
      },
      {
        key: "STRAIGHT_BOX",
        label: "STRAIGHT/BOX PLAYS",
        items: [
          { key: "SB_5WAY", label: "5-Way Straight/Box" },
          { key: "SB_10WAY", label: "10-Way Straight/Box" },
          { key: "SB_20WAY", label: "20-Way Straight/Box" },
          { key: "SB_30WAY", label: "30-Way Straight/Box" },
          { key: "SB_60WAY", label: "60-Way Straight/Box" },
          { key: "SB_120WAY", label: "120-Way Straight/Box" },
        ],
      },
      {
        key: "COMBINATION",
        label: "COMBINATION PLAYS",
        items: [
          { key: "COMBO_5WAY", label: "5-Way Combination" },
          { key: "COMBO_10WAY", label: "10-Way Combination" },
          { key: "COMBO_20WAY", label: "20-Way Combination" },
          { key: "COMBO_30WAY", label: "30-Way Combination" },
          { key: "COMBO_60WAY", label: "60-Way Combination" },
          { key: "COMBO_120WAY", label: "120-Way Combination" },
        ],
      },
      {
        key: "PAIR",
        label: "PAIR PLAYS",
        items: [
          { key: "PAIR_FRONT", label: "Front Pair" },
          { key: "PAIR_BACK", label: "Back Pair" },
        ],
      },
    ];
  }
  return [];
}

// ----------- UTILS --------------
function allCombinations(arrays: number[][]): number[][] {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const restComb = allCombinations(rest);
  return first.flatMap((v) => restComb.map((comb) => [v, ...comb]));
}

function countNums(arr: number[]) {
  const count: Record<number, number> = {};
  arr.forEach((n) => (count[n] = (count[n] || 0) + 1));
  return count;
}

function countForType(type, combinations) {
  switch (type) {
    case "STRAIGHT":
      return combinations.length;
    // PICK 3
    case "BOX_3WAY":
    case "SB_3WAY":
    case "COMBO_3WAY":
      return combinations.filter((a) => new Set(a).size === 2).length;
    case "BOX_6WAY":
    case "SB_6WAY":
    case "COMBO_6WAY":
      return combinations.filter((a) => new Set(a).size === a.length).length;
    // PICK 4
    case "BOX_4WAY":
    case "SB_4WAY":
    case "COMBO_4WAY":
      return combinations.filter((a) => Object.values(countNums(a)).includes(3))
        .length;
    case "BOX_12WAY":
    case "SB_12WAY":
    case "COMBO_12WAY":
      return combinations.filter(
        (a) => Object.values(countNums(a)).sort().join(",") === "1,1,2"
      ).length;
    case "BOX_24WAY":
    case "SB_24WAY":
    case "COMBO_24WAY":
      return combinations.filter((a) => new Set(a).size === a.length).length;
    case "BOX_6WAY": // Pick 4
    case "SB_6WAY":
    case "COMBO_6WAY":
      return combinations.filter(
        (a) => Object.values(countNums(a)).filter((x) => x === 2).length === 2
      ).length;
    // PICK 5
    case "BOX_5WAY":
    case "SB_5WAY":
    case "COMBO_5WAY":
      return combinations.filter((a) => Object.values(countNums(a)).includes(4))
        .length;
    case "BOX_10WAY":
    case "SB_10WAY":
    case "COMBO_10WAY":
      return combinations.filter(
        (a) =>
          Object.values(countNums(a)).includes(3) &&
          Object.values(countNums(a)).includes(2)
      ).length;
    case "BOX_20WAY":
    case "SB_20WAY":
    case "COMBO_20WAY":
      return combinations.filter(
        (a) => Object.values(countNums(a)).filter((x) => x === 2).length === 2
      ).length;
    case "BOX_30WAY":
    case "SB_30WAY":
    case "COMBO_30WAY":
      return combinations.filter(
        (a) => Object.values(countNums(a)).includes(2) && new Set(a).size === 4
      ).length;
    case "BOX_60WAY":
    case "SB_60WAY":
    case "COMBO_60WAY":
      return combinations.filter(
        (a) => Object.values(countNums(a)).includes(2) && new Set(a).size === 5
      ).length;
    case "BOX_120WAY":
    case "SB_120WAY":
    case "COMBO_120WAY":
      return combinations.filter((a) => new Set(a).size === a.length).length;
    case "PAIR_FRONT":
    case "PAIR_BACK":
      return combinations.length;
    default:
      return 0;
  }
}

// ----------- REMOVE DUPLICATE GAMES -----------
function removeDuplicateGames(games) {
  const seen = new Set();
  return games.filter((g) => {
    // Suporta tanto numbers: [..] quanto mainNumbers: [..]
    const key = Array.isArray(g.numbers)
      ? g.numbers.join(",")
      : Array.isArray(g.mainNumbers)
      ? g.mainNumbers.join(",")
      : "";
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ------------- MAIN COMPONENT ---------------
type PrizeTypeState = {
  checked: boolean;
  count: number;
  max: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (
    games: any[], // jogos gerados
    filters?: Record<string, number[]>
  ) => void;
  game: any;
  gameId: string;
  selectedColumns: number[][];
};

export default function GeneratorSettingModalPick({
  visible,
  onClose,
  onConfirm,
  game,
  gameId,
  selectedColumns,
}: Props) {
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [filters, setFilters] = useState<Record<string, number[]>>({});
  const [accordion, setAccordion] = useState<string[]>(["STRAIGHT"]);
  const PRIZE_TYPE_GROUPS = getPrizeTypesByGame(gameId);
  const combinations = allCombinations(selectedColumns);
  const [prizes, setPrizes] = useState<Record<string, PrizeTypeState>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (visible) {
      const state: Record<string, PrizeTypeState> = {};
      PRIZE_TYPE_GROUPS.forEach((group) => {
        group.items.forEach((item) => {
          const max = countForType(item.key, combinations);
          state[item.key] = {
            checked: false,
            count: max,
            max,
          };
        });
      });
      setPrizes(state);
    }
  }, [visible, JSON.stringify(selectedColumns), gameId]);

  useEffect(() => {
    setPrizes((old) => {
      const next = { ...old };
      PRIZE_TYPE_GROUPS.forEach((group) => {
        group.items.forEach((item) => {
          const max = countForType(item.key, combinations);
          next[item.key] = {
            ...next[item.key],
            max,
            count: Math.min(next[item.key]?.count ?? max, max),
          };
        });
      });
      return next;
    });
  }, [JSON.stringify(selectedColumns), gameId]);

  const lines = Object.values(prizes)
    .filter((p) => p.checked)
    .reduce((acc, p) => acc + (p.count || 0), 0);

  function toggleAccordion(key: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAccordion((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key]
    );
  }

  function renderPrizeCheckboxRow(prize) {
    return (
      <View key={prize.key} style={styles.prizeRow}>
        <TouchableOpacity
          style={styles.checkboxTouch}
          onPress={() =>
            setPrizes((prev) => ({
              ...prev,
              [prize.key]: {
                ...prev[prize.key],
                checked: !prev[prize.key].checked,
              },
            }))
          }
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.checkbox,
              prizes[prize.key]?.checked && styles.checkboxChecked,
            ]}
          >
            {prizes[prize.key]?.checked && (
              <Ionicons name="checkmark" size={17} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.prizeLabel}>{prize.label}</Text>
        <View style={styles.inputColPrize}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() =>
              setPrizes((prev) => ({
                ...prev,
                [prize.key]: {
                  ...prev[prize.key],
                  count: Math.max(0, prev[prize.key].count - 1),
                },
              }))
            }
            disabled={
              !prizes[prize.key]?.checked || prizes[prize.key]?.count <= 0
            }
          >
            <Ionicons
              name="remove"
              size={18}
              color={
                !prizes[prize.key]?.checked || prizes[prize.key]?.count <= 0
                  ? "#CCC"
                  : "#007EFF"
              }
            />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.inputBox,
              styles.inputPrizeBox,
              { textAlign: "center", color: "#1976D2" },
            ]}
            value={prizes[prize.key]?.count?.toString() ?? "0"}
            editable={prizes[prize.key]?.checked}
            keyboardType="number-pad"
            onChangeText={(val) => {
              let num = parseInt(val || "0");
              if (isNaN(num)) num = 0;
              num = Math.max(0, Math.min(num, prizes[prize.key]?.max || 0));
              setPrizes((prev) => ({
                ...prev,
                [prize.key]: {
                  ...prev[prize.key],
                  count: num,
                },
              }));
            }}
          />
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() =>
              setPrizes((prev) => ({
                ...prev,
                [prize.key]: {
                  ...prev[prize.key],
                  count: Math.min(
                    prev[prize.key].count + 1,
                    prev[prize.key]?.max || 0
                  ),
                },
              }))
            }
            disabled={
              !prizes[prize.key]?.checked ||
              prizes[prize.key]?.count >= (prizes[prize.key]?.max || 0)
            }
          >
            <Ionicons
              name="add"
              size={18}
              color={
                !prizes[prize.key]?.checked ||
                prizes[prize.key]?.count >= (prizes[prize.key]?.max || 0)
                  ? "#CCC"
                  : "#007EFF"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ----------- CHAMADA DA API DE GERAÇÃO -----------
  async function handleGenerateAPI() {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const jwt = session?.access_token;
      if (!jwt) {
        setError("Você precisa estar logado.");
        setLoading(false);
        return;
      }

      const selectedNumbers = selectedColumns.flat();
      const numbersPerTicket = selectedColumns.length;
      const prizeTypes = Object.keys(prizes).filter((k) => prizes[k].checked);

      if (prizeTypes.length === 0) {
        setError("Selecione ao menos um Prize Type");
        setLoading(false);
        return;
      }

      // PREPARE O PAYLOAD EXATAMENTE COMO A API ESPERA
      const payload = {
        game_id: gameId,
        numbers_to_cover: selectedNumbers,
        numbers_per_ticket: numbersPerTicket,
        prize_types: prizeTypes,
        lines,
        filters,
      };

      const result = await generateGames({ jwt, payload });
      // Remover jogos repetidos
      const uniqueGames = removeDuplicateGames(result.games);

      // ----> FILTRA SÓ O QUE O USUÁRIO MARCOU:
      const prizeTypesSelecionados = Object.keys(prizes).filter(
        (k) => prizes[k].checked
      );

      // Suporte tanto type, wagerType, quanto mainNumbers.type se vier aninhado:
      const jogosFinais = uniqueGames.filter(
        (g) =>
          (g.type && prizeTypesSelecionados.includes(g.type)) ||
          (g.wagerType && prizeTypesSelecionados.includes(g.wagerType)) ||
          (g.mainNumbers?.type &&
            prizeTypesSelecionados.includes(g.mainNumbers.type))
      );

      // fallback se o backend não retornar o type preenchido (exibe tudo)
      const jogosToShow = jogosFinais.length > 0 ? jogosFinais : uniqueGames;

      // Pode remover onConfirm() se só navega:
      // onConfirm(jogosToShow);

      // Navega direto para a tela de linhas:
      router.push({
        pathname: "/generator/ny/win4_midday/mylines",
        params: {
          data: encodeURIComponent(JSON.stringify(jogosToShow)),
          game: gameId,
        },
      });
    } catch (err: any) {
      setError(err.message || "Erro ao gerar jogos");
    } finally {
      setLoading(false);
    }
  }

  // RENDER
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <GameHeader
            title="Generator Setting"
            subtitle={`New York ${game?.name ?? ""}`}
            logo={game?.logo ? <game.logo width={110} height={38} /> : null}
            headerColor={game?.headerColor || "#0E4CA1"}
            textColor="#fff"
            style={styles.header}
            showBack={false}
          />
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total numbers to cover</Text>
              <View style={styles.summaryInputBox}>
                <Text style={styles.summaryInputText}>
                  {selectedColumns.flat().length}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Numbers per ticket</Text>
              <View style={styles.summaryInputBox}>
                <Text style={styles.summaryInputText}>
                  {selectedColumns.length}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Number of lines</Text>
              <View style={styles.summaryInputBox}>
                <Text style={styles.summaryInputText}>{lines}</Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          >
            <Text style={styles.sectionTitle}>Choose Prize Types</Text>
            {PRIZE_TYPE_GROUPS.map((group) => (
              <View key={group.key}>
                <TouchableOpacity
                  style={styles.groupHeader}
                  onPress={() => toggleAccordion(group.key)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.groupHeaderText}>{group.label}</Text>
                  <Ionicons
                    name={
                      accordion.includes(group.key)
                        ? "chevron-up-outline"
                        : "chevron-down-outline"
                    }
                    size={21}
                    color="#1976D2"
                  />
                </TouchableOpacity>
                {accordion.includes(group.key) && (
                  <View>{group.items.map(renderPrizeCheckboxRow)}</View>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.85}
              onPress={() => setFiltersModalVisible(true)}
            >
              <Text style={styles.filterButtonText}>+ Add Filters</Text>
            </TouchableOpacity>
          </ScrollView>
          {error && (
            <Text style={{ color: "red", textAlign: "center", marginTop: 7 }}>
              {error}
            </Text>
          )}
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.generateBtn]}
              onPress={handleGenerateAPI}
              disabled={loading}
            >
              {loading && (
                <ActivityIndicator
                  color="#000"
                  size="small"
                  style={{ marginRight: 8 }}
                />
              )}
              <Ionicons
                name="flash"
                size={22}
                color="#000"
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={[styles.actionText, { color: "#000" }]}>
                {loading ? "Gerando..." : "Generate"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FiltersPickFormModal
        visible={filtersModalVisible}
        onClose={() => setFiltersModalVisible(false)}
        onApply={(f) => {
          setFilters(f);
          setFiltersModalVisible(false);
        }}
      />
    </Modal>
  );
}

// Adicione seu StyleSheet styles aqui abaixo normalmente.

// ... (os styles permanecem os mesmos do seu código)

// ------------ Styles -----------
const INPUT_COL_WIDTH = 122;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(36,37,48,0.33)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  modalView: {
    width: "96%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 10,
    overflow: "hidden",
    paddingBottom: 4,
    justifyContent: "flex-start",
    position: "relative",
  },
  header: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
    width: "100%",
  },
  summaryBox: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 9,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
    marginBottom: 0,
  },
  summaryLabel: {
    fontSize: 15.2,
    fontWeight: "600",
    color: "#232B44",
    flex: 1.5,
    letterSpacing: 0.03,
  },
  summaryInputBox: {
    width: INPUT_COL_WIDTH,
    minWidth: INPUT_COL_WIDTH,
    maxWidth: INPUT_COL_WIDTH,
    height: 34,
    borderRadius: 10,
    borderWidth: 1.1,
    borderColor: "#D6DBF4",
    backgroundColor: "#F1F3F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    marginHorizontal: 1,
  },
  summaryInputText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#232B44",
    textAlign: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: 13,
    flexGrow: 1,
    maxHeight: 430,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: "700",
    color: "#0E4CA1",
    marginTop: 8,
    marginBottom: 6,
    marginLeft: 4,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    backgroundColor: "#EEF3FE",
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 8,
    marginBottom: 0,
    shadowColor: "#CAD5FA",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: "space-between",
  },
  groupHeaderText: {
    fontWeight: "bold",
    color: "#007EFF",
    fontSize: 15.3,
    letterSpacing: 0.07,
  },
  prizeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FE",
    borderRadius: 12,
    marginBottom: 8,
    padding: 7,
    minHeight: 43,
    gap: 8,
    paddingHorizontal: 8,
  },
  checkboxTouch: {
    padding: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2.1,
    borderColor: "#007EFF",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginLeft: 2,
  },
  checkboxChecked: {
    backgroundColor: "#007EFF",
    borderColor: "#007EFF",
  },
  prizeLabel: {
    fontWeight: "700",
    fontSize: 15.1,
    color: "#191C31",
    flex: 1,
    marginLeft: 7,
    letterSpacing: 0.01,
  },
  inputColPrize: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 108,
    maxWidth: 128,
  },
  inputBox: {
    width: 54,
    height: 36,
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#F7F8FA",
    color: "#232B44",
    borderRadius: 10,
    borderWidth: 1.1,
    borderColor: "#D6DBF4",
    paddingHorizontal: 4,
    marginHorizontal: 2,
    textAlign: "center",
  },
  inputPrizeBox: {
    backgroundColor: "#EEF6FF",
    borderColor: "#C6DAFF",
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 17,
  },
  filterButton: {
    backgroundColor: "#007EFF",
    height: 44,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 11,
    marginBottom: 2,
    width: "97%",
    alignSelf: "center",
    shadowColor: "#007EFF",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16.2,
    letterSpacing: 0.14,
  },
  bottomActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    gap: 12,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 17 : 10,
    marginTop: 1,
  },
  actionBtn: {
    flex: 1,
    height: 46,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    flexDirection: "row",
    gap: 7,
  },
  generateBtn: {
    backgroundColor: "#3DF14A",
  },
  cancelBtn: {
    backgroundColor: "#F23D3D",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.1,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
