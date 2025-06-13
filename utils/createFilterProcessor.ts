// utils/createFilterProcessor.ts
import { getColor, defaultColorMapping } from "./colors.ts";

export function createFilterProcessor(
  checkFn: (num: number, list?: number[]) => boolean,
  colorMap = defaultColorMapping
) {
  return function process(results: any[]) {
    const frequency = { v0: 0, v1: 0, v2: 0, v3: 0, v4: 0 };
    const counters = [0, 0, 0, 0, 0];

    const processedResults = results.map(
      ({ result, date_string, date_export }) => {
        const numbers = [
          result.number1,
          result.number2,
          result.number3,
          result.number4,
          result.number5,
        ];
        const hit = numbers.reduce(
          (acc, num) => acc + (checkFn(num, numbers) ? 1 : 0),
          0
        );

        const filter: Record<string, number> = { hit };
        for (let i = 0; i <= 4; i++) {
          filter[`v${i}`] = hit === i ? 0 : ++counters[i];
          if (filter[`v${i}`] === 0) {
            frequency[`v${i}`]++;
            counters[i] = 0;
          }
        }

        const filter_color: Record<string, string> = {};
        for (let i = 0; i <= 4; i++) {
          const { background, textColor } = getColor(counters[i], colorMap);
          filter_color[`v${i}_cor_fundo`] = background;
          filter_color[`v${i}_cor_letra`] = textColor;
        }

        return {
          ...result,
          date_string,
          date_export,
          filter,
          filter_color,
        };
      }
    );

    return {
      processedResults,
      frequency,
    };
  };
}
