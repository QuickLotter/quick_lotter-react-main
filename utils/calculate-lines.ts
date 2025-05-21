// Path: utils/calculate-lines.ts

// Fatorial básico
function factorial(n: number): number {
  if (n < 2) return 1;
  return n * factorial(n - 1);
}

// Combinação simples C(n, r)
function combination(n: number, r: number): number {
  if (r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Tipagem dos tipos de jogos
type LineCalculatorParams =
  | {
      type: "basic";
      picked: number[];
      rules: { pick: number };
    }
  | {
      type: "withExtraBall";
      picked: number[];
      extras: number[];
      rules: { pick: number; extraPick: number };
    }
  | {
      type: "digits";
      picked: number[];
      rules: { digits: number };
    };

// Função principal que calcula quantas combinações serão geradas
export function calculateLines(config: LineCalculatorParams): number {
  if (config.type === "basic") {
    return combination(config.picked.length, config.rules.pick);
  }

  if (config.type === "withExtraBall") {
    const mainComb = combination(config.picked.length, config.rules.pick);
    return mainComb * config.extras.length;
  }

  if (config.type === "digits") {
    const base = config.picked.length;
    return Math.pow(base, config.rules.digits);
  }

  return 0;
}
