import { NY_DRAW_TIMES } from "@/constants/countdowns/NY/draw_times";
import { AZ_DRAW_TIMES } from "@/constants/countdowns/AZ/draw_times";
import { AR_DRAW_TIMES } from "@/constants/countdowns/AR/draw_times";
import { CA_DRAW_TIMES } from "@/constants/countdowns/CA/draw_times";
import { CO_DRAW_TIMES } from "@/constants/countdowns/CO/draw_times";
// ...import outros estados conforme precisar

const DRAW_TIME_MAP = {
  NY: NY_DRAW_TIMES,
  AZ: AZ_DRAW_TIMES,
  AR: AR_DRAW_TIMES,
  CA: CA_DRAW_TIMES,
  CO: CO_DRAW_TIMES,
  // ...
};

type DrawState = keyof typeof DRAW_TIME_MAP;

export function getNextDrawDate(state: DrawState, slug: string): Date | null {
  const drawTimes = DRAW_TIME_MAP[state];
  if (!drawTimes) return null;
  const config = drawTimes[slug as keyof typeof drawTimes];
  if (!config) return null;

  const now = new Date();
  let testDate = new Date(now);

  for (let add = 0; add < 7; add++) {
    const dayOfWeek = (now.getDay() + add) % 7;
    if (config.days.includes(dayOfWeek)) {
      testDate = new Date(now);
      testDate.setDate(now.getDate() + add);
      testDate.setHours(config.hour, config.minute, 0, 0);

      // Se for hoje e já passou do horário, pula pro próximo
      if (add === 0 && testDate.getTime() <= now.getTime()) {
        continue;
      }
      return testDate;
    }
  }
  return null;
}
