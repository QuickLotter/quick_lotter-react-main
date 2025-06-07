// components/generator/utils/calculationUtils.ts

import { PickType, CombinationCalculations, PrizeType, getGameRules } from '../../../constants/pickPrizeTypesConfig';

// Função para calcular o fatorial de um número
export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// Função para calcular combinações (n escolhe k)
export const combinations = (n: number, k: number): number => {
  if (k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n - k));
};

// Função para calcular permutações (n escolhe k, com ordem)
export const permutations = (n: number, k: number): number => {
  if (k > n) return 0;
  return factorial(n) / factorial(n - k);
};

// Função para calcular o número de permutações com repetição
export const permutationsWithRepetition = (n: number, counts: number[]): number => {
  const totalCount = counts.reduce((sum, count) => sum + count, 0);
  if (totalCount !== n) return 0;
  
  let denominator = 1;
  for (const count of counts) {
    denominator *= factorial(count);
  }
  
  return factorial(n) / denominator;
};

// Função para calcular o número de maneiras de organizar dígitos com repetição
export const calculateWaysForDigits = (digits: number[]): number => {
  // Conta a frequência de cada dígito
  const frequency: Record<number, number> = {};
  for (const digit of digits) {
    frequency[digit] = (frequency[digit] || 0) + 1;
  }
  
  // Calcula o número de maneiras usando permutações com repetição
  return permutationsWithRepetition(digits.length, Object.values(frequency));
};

// Função para determinar o tipo de box com base nos dígitos (Pick 3)
export const determineBoxTypePick3 = (digits: number[]): string => {
  // Conta a frequência de cada dígito
  const frequency: Record<number, number> = {};
  for (const digit of digits) {
    frequency[digit] = (frequency[digit] || 0) + 1;
  }
  
  const uniqueDigits = Object.keys(frequency).length;
  const maxFrequency = Math.max(...Object.values(frequency));
  
  if (uniqueDigits === 2 && maxFrequency === 2) {
    return '3-way'; // Ex: 112
  } else if (uniqueDigits === 3) {
    return '6-way'; // Ex: 123
  }
  
  return 'unknown';
};

// Função para determinar o tipo de box com base nos dígitos (Pick 4)
export const determineBoxTypePick4 = (digits: number[]): string => {
  // Conta a frequência de cada dígito
  const frequency: Record<number, number> = {};
  for (const digit of digits) {
    frequency[digit] = (frequency[digit] || 0) + 1;
  }
  
  const uniqueDigits = Object.keys(frequency).length;
  const frequencies = Object.values(frequency);
  const maxFrequency = Math.max(...frequencies);
  
  if (uniqueDigits === 2) {
    if (maxFrequency === 3) {
      return '4-way'; // Ex: 1112
    } else if (maxFrequency === 2 && frequencies.filter(f => f === 2).length === 2) {
      return '6-way'; // Ex: 1122
    }
  } else if (uniqueDigits === 3 && maxFrequency === 2) {
    return '12-way'; // Ex: 1123
  } else if (uniqueDigits === 4) {
    return '24-way'; // Ex: 1234
  }
  
  return 'unknown';
};

// Função para determinar o tipo de box com base nos dígitos (Pick 5)
export const determineBoxTypePick5 = (digits: number[]): string => {
  // Conta a frequência de cada dígito
  const frequency: Record<number, number> = {};
  for (const digit of digits) {
    frequency[digit] = (frequency[digit] || 0) + 1;
  }
  
  const uniqueDigits = Object.keys(frequency).length;
  const frequencies = Object.values(frequency);
  const maxFrequency = Math.max(...frequencies);
  
  if (uniqueDigits === 2) {
    if (maxFrequency === 4) {
      return '5-way'; // Ex: 11112
    } else if (maxFrequency === 3) {
      return '10-way'; // Ex: 11122
    } else if (maxFrequency === 2 && frequencies.filter(f => f === 2).length === 2) {
      return '10-way'; // Ex: 11223
    }
  } else if (uniqueDigits === 3) {
    if (maxFrequency === 3) {
      return '20-way'; // Ex: 11123
    } else if (maxFrequency === 2 && frequencies.filter(f => f === 2).length === 1) {
      return '30-way'; // Ex: 11234
    } else if (maxFrequency === 2 && frequencies.filter(f => f === 2).length === 2) {
      return '30-way'; // Ex: 11223
    }
  } else if (uniqueDigits === 4 && maxFrequency === 2) {
    return '60-way'; // Ex: 11234
  } else if (uniqueDigits === 5) {
    return '120-way'; // Ex: 12345
  }
  
  return 'unknown';
};

// Função para determinar o tipo de box com base nos dígitos e no tipo de jogo
export const determineBoxType = (digits: number[], pickType: PickType): string => {
  switch (pickType) {
    case PickType.PICK3:
      return determineBoxTypePick3(digits);
    case PickType.PICK4:
      return determineBoxTypePick4(digits);
    case PickType.PICK5:
      return determineBoxTypePick5(digits);
    default:
      return 'unknown';
  }
};

// Função para calcular o número máximo de jogos possíveis para cada tipo de prêmio
export const calculateMaxPossibleGames = (
  selectedNumbers: number[],
  numbersPerTicket: number,
  pickType: PickType
): CombinationCalculations => {
  const gameRules = getGameRules(pickType);
  const totalNumbersToCover = selectedNumbers.length;
  
  // Inicializa o objeto de resultado
  const result: CombinationCalculations = {
    [PrizeType.STRAIGHT_PLAY]: 0,
    [PrizeType.BOX_PLAYS]: 0,
    [PrizeType.STRAIGHT_BOX_PLAYS]: 0,
    [PrizeType.COMBINATION_PLAYS]: 0,
    [PrizeType.PAIR_PLAYS]: 0
  };
  
  // Calcula o número de combinações possíveis
  const possibleCombinations = combinations(totalNumbersToCover, numbersPerTicket);
  
  // STRAIGHT PLAY: Cada combinação gera um jogo straight
  result[PrizeType.STRAIGHT_PLAY] = possibleCombinations;
  
  // BOX PLAYS: Depende do tipo de jogo e das combinações possíveis
  // Para simplificar, assumimos que todas as combinações podem ser jogos box
  result[PrizeType.BOX_PLAYS] = possibleCombinations;
  
  // STRAIGHT/BOX PLAYS: Mesmo número que BOX PLAYS
  result[PrizeType.STRAIGHT_BOX_PLAYS] = possibleCombinations;
  
  // COMBINATION PLAYS: Depende do tipo de jogo
  // Para Pick 3 e Pick 4, cada combinação pode gerar múltiplos jogos
  if (pickType === PickType.PICK3) {
    // Para Pick 3, cada combinação de 3 números pode gerar até 6 jogos (6-way)
    result[PrizeType.COMBINATION_PLAYS] = possibleCombinations * 6;
  } else if (pickType === PickType.PICK4) {
    // Para Pick 4, cada combinação de 4 números pode gerar até 24 jogos (24-way)
    result[PrizeType.COMBINATION_PLAYS] = possibleCombinations * 24;
  } else if (pickType === PickType.PICK5) {
    // Para Pick 5, cada combinação de 5 números pode gerar até 120 jogos (120-way)
    result[PrizeType.COMBINATION_PLAYS] = possibleCombinations * 120;
  }
  
  // PAIR PLAYS: Depende do tipo de jogo
  // Para simplificar, assumimos que cada par de números pode ser um jogo de par
  if (numbersPerTicket >= 2) {
    const possiblePairs = combinations(totalNumbersToCover, 2);
    // Multiplicamos por 2 para considerar front pair e back pair
    result[PrizeType.PAIR_PLAYS] = possiblePairs * 2;
  }
  
  return result;
};

// Função para ajustar o número de jogos com base nas limitações do usuário
export const adjustGameCount = (
  maxPossibleGames: CombinationCalculations,
  maxLines: number
): CombinationCalculations => {
  const result = { ...maxPossibleGames };
  
  // Limita cada tipo de jogo ao número máximo de linhas
  for (const type of Object.keys(result) as PrizeType[]) {
    result[type] = Math.min(result[type], maxLines);
  }
  
  return result;
};

