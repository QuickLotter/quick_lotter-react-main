// /utils/getNextDrawDate.ts
import { NY_DRAW_TIMES } from "@/constants/ny_draw_times";

/**
 * Retorna o Date do próximo sorteio para um dado jogo.
 * @param slug Ex: 'powerball', 'megamillions', 'win4_midday', etc.
 */
export function getNextDrawDate(slug: string): Date | null {
  const config = NY_DRAW_TIMES[slug as keyof typeof NY_DRAW_TIMES];
  if (!config) return null;

  const now = new Date();
  let testDate = new Date(now);

  for (let add = 0; add < 7; add++) {
    const dayOfWeek = (now.getDay() + add) % 7;
    if (config.days.includes(dayOfWeek)) {
      testDate = new Date(now);
      testDate.setDate(now.getDate() + add);
      testDate.setHours(config.hour, config.minute, 0, 0);

      // Se for hoje e já passou do horário, continua pro próximo
      if (add === 0 && testDate.getTime() <= now.getTime()) {
        continue;
      }
      return testDate;
    }
  }
  return null;
}
