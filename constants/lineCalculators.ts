// Função utilitária para fatorial
function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, val) => acc * val,
    1
  );
}

// Combinação: C(n, r) = n! / ((n - r)! * r!)
function combinations(n: number, r: number): number {
  if (r > n || n < 0 || r < 0) return 0;
  return factorial(n) / (factorial(n - r) * factorial(r));
}

// Tipos disponíveis de jogos
export type GameType =
  | "withExtraBall" // Mega Millions, Powerball, Cash4Life, Lucky for Life
  | "noExtraBall" // NY Lotto, Take 5, Pick 10
  | "digit" // Win 4, Pick 3, Pick 4, Pick 5
  | "cards" // 5 Card Cash
  | "keno"; // Keno

// Interface com os dados necessários
interface LineCalculationInput {
  type: GameType;
  picked: number[]; // números principais selecionados
  extras?: number[]; // números extras selecionados (se houver)
  rules: {
    pick: number; // quantidade exigida de números principais
    extraPick?: number; // quantidade exigida de extras
  };
}

// Função principal de cálculo
export function calculateLines({
  type,
  picked,
  extras = [],
  rules,
}: LineCalculationInput): number {
  switch (type) {
    case "withExtraBall": {
      const mainComb = combinations(picked.length, rules.pick);
      const extraComb = extras.length;
      return mainComb * extraComb;
    }

    case "noExtraBall": {
      return combinations(picked.length, rules.pick);
    }

    case "digit": {
      // Ex: Pick 3 → combinações com repetição: 10^3
      return Math.pow(picked.length, rules.pick);
    }

    case "cards": {
      return combinations(picked.length, rules.pick);
    }

    case "keno": {
      return combinations(picked.length, rules.pick);
    }

    default:
      return 0;
  }
}
