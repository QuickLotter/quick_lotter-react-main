// utils/pickCombinations.ts

// Conta combinações válidas por wage type, baseado nos números selecionados por coluna
export type PickSelection = number[][]; // exemplo: [[1,2,3], [4,5], [6], [7,8]]

export function countWageTypeCombinations(
  selection: PickSelection,
  wageType: string
): { count: number; reason?: string } {
  // Junta todas as bolas selecionadas de cada coluna em arrays separados
  const numCols = selection.length;

  // Todas as possibilidades (produto cartesiano)
  function cartesian(arrays: number[][]): number[][] {
    return arrays.reduce(
      (a, b) => a.flatMap((d) => b.map((e) => [...d, e])),
      [[]] as number[][]
    );
  }
  const combos = cartesian(selection);

  // Aux: checar quantos dígitos repetidos existem
  function countRepeats(arr: number[]): Record<number, number> {
    return arr.reduce((acc, n) => {
      acc[n] = (acc[n] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  // Filtra combos válidos por tipo
  if (wageType === "STRAIGHT") {
    return { count: combos.length };
  }

  if (wageType === "BOX_4WAY") {
    // Exige 3 dígitos iguais + 1 diferente (ex: 1112)
    const filtered = combos.filter((arr) => {
      const rep = Object.values(countRepeats(arr));
      return (
        rep.length === 2 && rep.includes(3) && rep.includes(1)
      );
    });
    if (filtered.length === 0) return { count: 0, reason: "Need 3 digits the same + 1 different" };
    return { count: filtered.length };
  }
  if (wageType === "BOX_6WAY") {
    // Exige 2 pares de dígitos iguais (ex: 1122)
    const filtered = combos.filter((arr) => {
      const rep = Object.values(countRepeats(arr));
      return (
        rep.length === 2 && rep[0] === 2 && rep[1] === 2
      );
    });
    if (filtered.length === 0) return { count: 0, reason: "Need 2 pairs (AABB)" };
    return { count: filtered.length };
  }
  if (wageType === "BOX_12WAY") {
    // Exige 2 iguais + 2 dígitos diferentes (ex: 1123)
    const filtered = combos.filter((arr) => {
      const rep = Object.values(countRepeats(arr)).sort((a, b) => b - a);
      return (
        rep.length === 3 && rep[0] === 2 && rep[1] === 1 && rep[2] === 1
      );
    });
    if (filtered.length === 0) return { count: 0, reason: "Need 2 same + 2 different (AABC)" };
    return { count: filtered.length };
  }
  if (wageType === "BOX_24WAY") {
    // Todos diferentes (ex: 1234)
    const filtered = combos.filter((arr) => new Set(arr).size === arr.length);
    if (filtered.length === 0) return { count: 0, reason: "Need all digits different" };
    return { count: filtered.length };
  }
  // Adicione outros tipos, ex: STRAIGHT_BOX, PAIR, etc, conforme seu app

  // Fallback
  return { count: combos.length };
}

// Retorna os jogos válidos para preview
export function generateWageTypeCombinations(
  selection: PickSelection,
  wageType: string
): number[][] {
  // ...igual ao acima, mas retorna os combos em vez de só contar
  // Implemente conforme necessário
  // (Pode copiar o filtro do countWageTypeCombinations)
  return [];
}
