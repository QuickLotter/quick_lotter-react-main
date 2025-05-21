// Path: utils/generate-random.ts

// Gera números aleatórios únicos entre 1 e max
export function generateRandomNumbers(
  quantity: number,
  max: number,
  exclude: number[] = []
): number[] {
  const result: number[] = [];
  while (result.length < quantity) {
    const random = Math.floor(Math.random() * max) + 1;
    if (!result.includes(random) && !exclude.includes(random)) {
      result.push(random);
    }
  }
  return result;
}
