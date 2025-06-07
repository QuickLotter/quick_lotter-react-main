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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FiltersFormModal from "@/components/generator/modals/filtersformmodal";

// ------- CÁLCULOS POR MODALIDADE E PRIZE TYPE -----

// Combinatória auxiliar
function combination(n: number, k: number) {
  if (k > n) return 0;
  let res = 1;
  for (let i = 0; i < k; ++i) res *= n - i;
  for (let i = 1; i <= k; ++i) res /= i;
  return Math.floor(res);
}

// Fatorial
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Permutações com repetição
function permutationsWithRepetition(n: number, counts: number[]): number {
  const totalCount = counts.reduce((sum, count) => sum + count, 0);
  if (totalCount !== n) return 0;

  let denominator = 1;
  for (const count of counts) {
    denominator *= factorial(count);
  }

  return factorial(n) / denominator;
}

// Função para calcular o número de maneiras de organizar dígitos com repetição
function calculateWaysForDigits(digits: number[]): number {
  // Conta a frequência de cada dígito
  const frequency: Record<number, number> = {};
  for (const digit of digits) {
    frequency[digit] = (frequency[digit] || 0) + 1;
  }

  // Calcula o número de maneiras usando permutações com repetição
  return permutationsWithRepetition(digits.length, Object.values(frequency));
}

// Pick 3
function calcPick3Straight(selected: number[]) {
  if (selected.length < 3) return 0;
  return combination(selected.length, 3) * 6; // Permutações de 3 elementos
}

function calcPick3Box(selected: number[]) {
  if (selected.length < 3) return 0;
  return combination(selected.length, 3);
}

function calcPick3StraightBox(selected: number[]) {
  if (selected.length < 3) return 0;
  return combination(selected.length, 3);
}

function calcPick3Combination(selected: number[]) {
  if (selected.length < 3) return 0;
  return combination(selected.length, 3) * 6; // Cada combinação gera 6 permutações
}

function calcPick3Pair(selected: number[]) {
  if (selected.length < 2) return 0;
  return combination(selected.length, 2) * 2; // Front pair e back pair
}

// Pick 4
function calcPick4Straight(selected: number[]) {
  if (selected.length < 4) return 0;
  return combination(selected.length, 4) * 24; // Permutações de 4 elementos
}

function calcPick4Box(selected: number[]) {
  if (selected.length < 4) return 0;
  return combination(selected.length, 4);
}

function calcPick4StraightBox(selected: number[]) {
  if (selected.length < 4) return 0;
  return combination(selected.length, 4);
}

function calcPick4Combination(selected: number[]) {
  if (selected.length < 4) return 0;
  return combination(selected.length, 4) * 24; // Cada combinação gera 24 permutações
}

function calcPick4Pair(selected: number[]) {
  if (selected.length < 2) return 0;
  return combination(selected.length, 2) * 2; // Front pair e back pair
}

// Pick 5
function calcPick5Straight(selected: number[]) {
  if (selected.length < 5) return 0;
  return combination(selected.length, 5) * 120; // Permutações de 5 elementos
}

function calcPick5Box(selected: number[]) {
  if (selected.length < 5) return 0;
  return combination(selected.length, 5);
}

function calcPick5StraightBox(selected: number[]) {
  if (selected.length < 5) return 0;
  return combination(selected.length, 5);
}

function calcPick5Combination(selected: number[]) {
  if (selected.length < 5) return 0;
  return combination(selected.length, 5) * 120; // Cada combinação gera 120 permutações
}

function calcPick5Pair(selected: number[]) {
  if (selected.length < 2) return 0;
  return combination(selected.length, 2) * 2; // Front pair e back pair
}

// Tipos de prêmios disponíveis
const PRIZE_TYPES = [
  { key: "STRAIGHT", title: "STRAIGHT PLAY" },
  { key: "BOX", title: "BOX PLAYS" },
  { key: "STRAIGHT_BOX", title: "STRAIGHT/BOX PLAYS" },
  { key: "COMBINATION", title: "COMBINATION PLAYS" },
  { key: "PAIR", title: "PAIR PLAYS" },
];

// Mapeamento Prize Type X função
const prizeTypeCalculators = {
  PICK3: {
    STRAIGHT: calcPick3Straight,
    BOX: calcPick3Box,
    STRAIGHT_BOX: calcPick3StraightBox,
    COMBINATION: calcPick3Combination,
    PAIR: calcPick3Pair,
  },
  PICK4: {
    STRAIGHT: calcPick4Straight,
    BOX: calcPick4Box,
    STRAIGHT_BOX: calcPick4StraightBox,
    COMBINATION: calcPick4Combination,
    PAIR: calcPick4Pair,
  },
  PICK5: {
    STRAIGHT: calcPick5Straight,
    BOX: calcPick5Box,
    STRAIGHT_BOX: calcPick5StraightBox,
    COMBINATION: calcPick5Combination,
    PAIR: calcPick5Pair,
  },
  NUMBERS: {
    STRAIGHT: calcPick3Straight,
    BOX: calcPick3Box,
    STRAIGHT_BOX: calcPick3StraightBox,
    COMBINATION: calcPick3Combination,
    PAIR: calcPick3Pair,
  },
  WIN4: {
    STRAIGHT: calcPick4Straight,
    BOX: calcPick4Box,
    STRAIGHT_BOX: calcPick4StraightBox,
    COMBINATION: calcPick4Combination,
    PAIR: calcPick4Pair,
  },
};

const DEFAULT_GAME_ID = "PICK3";

type PrizeState = {
  checked: boolean;
  count: number;
  max: number;
};

type GeneratorSettingModalPickProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (
    settings: {
      lines: number;
      numbersPerTicket: number;
      prizes: Record<string, PrizeState>;
    },
    filters?: Record<string, number[]>
  ) => void;
  game: any;
  gameId: string;
  selectedMain: number[];
  prizeLines: Record<string, any>;
  setPrizeLines: (lines: Record<string, any>) => void;
};

export default function GeneratorSettingModalPick({
  visible,
  onClose,
  onConfirm,
  game,
  gameId = DEFAULT_GAME_ID,
  selectedMain = [],
  prizeLines,
  setPrizeLines,
}: GeneratorSettingModalPickProps) {
  const windowHeight = Dimensions.get("window").height;
  const maxModalHeight = Math.min(windowHeight * 0.98, 730);

  // Determina o número de dígitos por ticket com base no tipo de jogo
  const numbersPerTicket =
    gameId === "PICK3" || gameId === "NUMBERS"
      ? 3
      : gameId === "PICK4" || gameId === "WIN4"
      ? 4
      : gameId === "PICK5"
      ? 5
      : 3;

  const totalNumbers = Array.isArray(selectedMain) ? selectedMain.length : 0;

  // Função para calcular o máximo de jogos possíveis para cada tipo de prêmio
  function getPrizeMax(type: string) {
    const calcFn =
      prizeTypeCalculators[gameId] && prizeTypeCalculators[gameId][type];
    return calcFn ? calcFn(selectedMain) : 0;
  }

  // Estado para armazenar as seleções de tipos de prêmio
  const [prizes, setPrizes] = useState<Record<string, PrizeState>>({});

  // Inicializa os prêmios quando o modal é aberto
  useEffect(() => {
    if (visible) {
      const newPrizes: Record<string, PrizeState> = {};
      for (const type of PRIZE_TYPES) {
        const max = getPrizeMax(type.key);
        newPrizes[type.key] = {
          checked: false,
          count: max,
          max,
        };
      }
      setPrizes(newPrizes);
    }
  }, [visible, selectedMain.join(","), gameId]);

  // Atualiza os prêmios quando os números selecionados mudam
  useEffect(() => {
    setPrizes((old) => {
      const np = { ...old };
      for (const type of PRIZE_TYPES) {
        const max = getPrizeMax(type.key);
        np[type.key] = {
          ...np[type.key],
          max,
          count: Math.min(np[type.key]?.count ?? max, max),
        };
      }
      return np;
    });
    // eslint-disable-next-line
  }, [selectedMain.join(","), gameId]);

  // Calcula o número total de linhas
  const lines = Object.values(prizes)
    .filter((p) => p.checked)
    .reduce((acc, p) => acc + (p.count || 0), 0);

  // Estados para o modal de filtros
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [filters, setFilters] = useState<Record<string, number[]>>({});

  // ===== UI =====

  // Componente para exibir uma linha de entrada somente leitura
  function InputRow({ label, value }: { label: string; value: number }) {
    return (
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.inputBoxReadonly}>
          <Text style={styles.inputText}>{value}</Text>
        </View>
      </View>
    );
  }

  // Componente para exibir um divisor
  function Divider() {
    return <View style={styles.divider} />;
  }

  // Checkbox com input numérico e botões
  const renderPrizeCheckboxRow = (prize: (typeof PRIZE_TYPES)[0]) => (
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
      <Text style={styles.prizeLabel}>{prize.title}</Text>
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
                  prev[prize.key].max || 0
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { maxHeight: maxModalHeight }]}>
          <View
            style={[
              styles.headerFigma,
              {
                backgroundColor: game?.headerColor || "#0E4CA1",
              },
            ]}
          >
            {game?.logo ? (
              <View style={styles.logoWrapper}>
                <game.logo width={90} height={34} />
              </View>
            ) : null}
            <Text style={styles.headerTitleFigma}>
              Generator Setting{"\n"}
              <Text style={styles.headerSubtitleFigma}>
                – New York {game?.name ? game.name : ""}
              </Text>
            </Text>
          </View>
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={{ paddingBottom: 22, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.card}>
              <InputRow label="Total numbers to cover" value={totalNumbers} />
              <Divider />
              <InputRow label="Numbers per ticket" value={numbersPerTicket} />
              <Divider />
              <InputRow label="Total Number of lines" value={lines} />
              <Text style={styles.sectionTitle}>Choose Prize Types</Text>
              <View style={styles.checkboxGroupPrize}>
                {PRIZE_TYPES.map(renderPrizeCheckboxRow)}
              </View>
            </View>
          </ScrollView>
          <View style={styles.filterFixed}>
            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.85}
              onPress={() => setFiltersModalVisible(true)}
            >
              <Text style={styles.filterButtonText}>+ Add Filters</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomActionsFixed}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.generateBtn]}
              onPress={() => {
                // Atualiza o estado de prizeLines antes de chamar onConfirm
                setPrizeLines(prizes);

                onConfirm(
                  {
                    lines,
                    numbersPerTicket,
                    prizes,
                  },
                  filters
                );
              }}
            >
              <Ionicons
                name="flash"
                size={22}
                color="#000"
                style={{ marginRight: 3, marginTop: 1 }}
              />
              <Text style={[styles.actionText, { color: "#000" }]}>
                Generate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FiltersFormModal
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

// -- Styles --
const INPUT_COL_WIDTH = 120;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(36,37,48,0.34)",
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
    width: "98%",
    maxWidth: 430,
    backgroundColor: "#fff",
    borderRadius: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 11,
    overflow: "hidden",
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: "flex-start",
    position: "relative",
  },
  headerFigma: {
    width: "100%",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    alignItems: "center",
    paddingVertical: 21,
    marginBottom: 4,
    paddingBottom: 8,
    position: "relative",
    justifyContent: "center",
    minHeight: 92,
    flexDirection: "row",
  },
  logoWrapper: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -17 }],
    zIndex: 5,
  },
  headerTitleFigma: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17.7,
    textAlign: "center",
    width: "100%",
    letterSpacing: 0.08,
    lineHeight: 25,
  },
  headerSubtitleFigma: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 15.4,
  },
  scrollContent: {
    width: "100%",
    maxHeight: 400,
    flexGrow: 1,
  },
  card: {
    width: "98%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginTop: 4,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 15.6,
    fontWeight: "600",
    color: "#232B44",
    flex: 1.5,
    letterSpacing: 0.03,
  },
  inputBoxReadonly: {
    width: INPUT_COL_WIDTH,
    minWidth: INPUT_COL_WIDTH,
    maxWidth: INPUT_COL_WIDTH,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.1,
    borderColor: "#D6DBF4",
    backgroundColor: "#F1F3F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    marginHorizontal: 1,
  },
  inputText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#232B44",
    textAlign: "center",
  },
  divider: {
    height: 1.1,
    backgroundColor: "#F3F5F8",
    width: "96%",
    alignSelf: "center",
    marginVertical: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E4CA1",
    marginTop: 18,
    marginBottom: 8,
    marginLeft: 4,
  },
  checkboxGroupPrize: {
    marginBottom: 8,
    width: "100%",
    alignSelf: "center",
  },
  prizeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FE",
    borderRadius: 13,
    marginBottom: 10,
    padding: 8,
    minHeight: 47,
    shadowColor: "#CAD5FA",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
    gap: 9,
    paddingHorizontal: 7,
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
    fontSize: 15.2,
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
  filterFixed: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 7,
    paddingTop: 2,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 70,
    zIndex: 6,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    elevation: 1,
  },
  filterButton: {
    backgroundColor: "#007EFF",
    height: 43,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 2,
    width: "92%",
    alignSelf: "center",
    shadowColor: "#007EFF",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.14,
  },
  bottomActionsFixed: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 22 : 14,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
    elevation: 7,
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
