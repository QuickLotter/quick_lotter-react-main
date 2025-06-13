// utils/extractNumbers.ts

export function extractNumbers(html: string): {
  numbers: number[];
  extra?: number;
} {
  const ballRegex =
    /<li class="c-result-card__ball(?: c-result-card__ball--[^"]+)?">(\d+)<\/li>/g;
  const matches = [...html.matchAll(ballRegex)];
  const allNumbers = matches.map((m) => parseInt(m[1], 10));

  let numbers = allNumbers;
  let extra: number | undefined = undefined;

  if (allNumbers.length > 5) {
    // Considera a última bola como extra (MegaBall ou Powerball)
    extra = allNumbers.pop();
    numbers = allNumbers;
  }

  return { numbers, extra };
}
