// constants/pickLines.ts
// Funções utilitárias para calcular linhas em Pick 3/4/5 (Straight, Box, Pair etc.)

// Fatorial simples (usado para permutações com repetição)
export function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Conta permutações únicas para cada combinação de dígitos (Box, Combination)
export function permWithRepetition(digits: number[]): number {
  const counts: Record<number, number> = {};
  digits.forEach((d) => {
    counts[d] = (counts[d] || 0) + 1;
  });
  let denominator = 1;
  Object.values(counts).forEach((v) => {
    denominator *= factorial(v);
  });
  return factorial(digits.length) / denominator;
}

// Gera todas as combinações possíveis dos arrays selecionados (cartesiano)
export function getAllCombos(arrays: number[][]): number[][] {
  return arrays.reduce(
    (acc, curr) =>
      acc.flatMap((a) => curr.map((c) => a.concat(c))),
    [[]] as number[][]
  );
}

// Calcula o número de linhas/apostas para cada play type em Pick 3/4/5
export function getPickLines(
  selected: number[][],
  playType: string // "STRAIGHT", "BOX", "STRAIGHT/BOX", "COMBINATION", "PAIR_FRONT", "PAIR_BACK"
) {
  const D = selected.length;
  let lines = 0;

  if (playType === "STRAIGHT") {
    lines = selected.reduce((acc, col) => acc * col.length, 1);
  }

  if (playType === "BOX" || playType === "COMBINATION") {
    const combos = getAllCombos(selected);
    lines = combos.reduce((acc, digits) => acc + permWithRepetition(digits), 0);
  }

  if (playType === "STRAIGHT/BOX") {
    const combos = getAllCombos(selected);
    lines = combos.reduce((acc, digits) => {
      const straight = 1; // sempre uma ordem exata
      const box = permWithRepetition(digits);
      // só soma straight extra se box for diferente
      return acc + (box === straight ? straight : box + straight);
    }, 0);
  }

  if (playType === "PAIR_FRONT") {
    lines = selected[0].length * selected[1].length;
  }
  if (playType === "PAIR_BACK") {
    lines = selected[D - 2].length * selected[D - 1].length;
  }

  return lines;
}
