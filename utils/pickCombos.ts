// utils/pickCombos.ts

// Gera todas as combinações pegando 1 de cada coluna
export function generateCombinations(arrays: number[][]): number[][] {
  if (!arrays.length) return [[]];
  return arrays.reduce(
    (acc, curr) =>
      acc.flatMap((comb) => curr.map((val) => [...comb, val])),
    [[]] as number[][]
  );
}

// STRAIGHT: Produto cartesiano (ordem importa)
export function countStraightCombinations(pickSelected: number[][]): number {
  if (pickSelected.some((col) => col.length === 0)) return 0;
  return pickSelected.reduce((acc, col) => acc * col.length, 1);
}

// BOX: Únicas combinações de números, ordem não importa (ex: 123, 231, 312 = 1 box)
export function countBoxCombinations(pickSelected: number[][]): number {
  if (pickSelected.some((col) => col.length === 0)) return 0;
  const all = generateCombinations(pickSelected);
  const set = new Set<string>();
  for (const arr of all) {
    set.add(arr.slice().sort((a, b) => a - b).join(","));
  }
  return set.size;
}

// Pairs
export function countFrontPair(pickSelected: number[][]): number {
  if (pickSelected.length < 2) return 0;
  return pickSelected[0].length * pickSelected[1].length;
}
export function countBackPair(pickSelected: number[][]): number {
  if (pickSelected.length < 2) return 0;
  return pickSelected[pickSelected.length - 2].length * pickSelected[pickSelected.length - 1].length;
}
export function countMiddlePair(pickSelected: number[][]): number {
  if (pickSelected.length !== 3) return 0;
  return pickSelected[1].length * pickSelected[2].length;
}

// Config de tipos de prêmio por jogo (Pick 3, 4, 5)
export const prizeTypeCalculators = {
  PICK3: {
    STRAIGHT: countStraightCombinations,
    BOX: countBoxCombinations,
    FRONT_PAIR: countFrontPair,
    BACK_PAIR: countBackPair,
  },
  PICK4: {
    STRAIGHT: countStraightCombinations,
    BOX: countBoxCombinations,
    FRONT_PAIR: countFrontPair,
    BACK_PAIR: countBackPair,
    MIDDLE_PAIR: countMiddlePair,
  },
  PICK5: {
    STRAIGHT: countStraightCombinations,
    BOX: countBoxCombinations,
    FRONT_PAIR: countFrontPair,
    BACK_PAIR: countBackPair,
  },
};
