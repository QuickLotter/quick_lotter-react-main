// ✅ Path: functions/main/parsers/universalParser.ts

import { DateTime } from "https://esm.sh/luxon";
import { gamesConfig } from "../configs/gamesConfig.ts";

function extractBetween(
  html: string,
  start: string,
  end: string
): string | null {
  const startIndex = html.indexOf(start);
  if (startIndex === -1) return null;
  const substring = html.substring(startIndex + start.length);
  const endIndex = substring.indexOf(end);
  if (endIndex === -1) return null;
  return substring.substring(0, endIndex).trim();
}

function extractBalls(html: string, count: number): number[] {
  const blocks = html.split(
    '<li class="c-ball c-ball--default c-result__item">'
  );
  const numbers: number[] = [];
  for (let i = 1; i <= count; i++) {
    const match = blocks[i]?.match(/>(\d+)</);
    if (match) numbers.push(parseInt(match[1], 10));
  }
  return numbers;
}

function extractExtra(html: string, color: string, index = 0): number | null {
  const parts = html.split(`c-ball--${color}`);
  if (parts.length > 1 + index) {
    const match = parts[1 + index].match(/>(\d+)</);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

function extractMultiplier(html: string, label: string): string | null {
  const raw = html.split(label);
  if (raw.length > 1) {
    return raw[1]
      .split("</li>")[0]
      .replace(/[^0-9x]/g, "")
      .trim();
  }
  return null;
}

function extractDrawDate(html: string): string | null {
  const raw = extractBetween(
    html,
    '<time class="c-result-card__title"',
    "</time>"
  );
  return raw?.split(">")[1].trim() ?? null;
}

function extractNextDrawDate(html: string): string | null {
  const raw = extractBetween(
    html,
    '<time class="c-next-draw-card__date"',
    "</time>"
  );
  return raw?.split(">")[1].trim() ?? null;
}

function extractPrize(html: string, selector: string): string | null {
  const raw = extractBetween(html, selector, "</dd>");
  return raw?.replace(/\s+/g, "") ?? null;
}

function extractCountdownSeconds(html: string): number {
  const blocks = html.split('<span class="c-countdown__time">');
  const values = blocks.slice(1, 4).map((block) => block.split("</span>")[0]);
  let [days, hours, minutes] = [0, 0, 0];

  if (values[0].includes("day")) {
    days = parseInt(values[0]) || 0;
    hours = parseInt(values[1]) || 0;
    minutes = parseInt(values[2]) || 0;
  } else if (values[0].includes("hour")) {
    hours = parseInt(values[0]) || 0;
    minutes = parseInt(values[1]) || 0;
  } else {
    minutes = parseInt(values[0]) || 0;
  }

  return days * 86400 + hours * 3600 + minutes * 60 + 60;
}

// ✅ MAIN UNIVERSAL PARSER EXPORT
export async function universalParser(
  state: string,
  slug: string,
  config
): Promise<{
  date: string;
  numbers: number[];
  extra?: number;
  jackpot?: string;
  nextDrawing?: string;
}> {
  const response = await fetch(config.url);
  const html = await response.text();

  const numbers = extractBalls(html, config.mainBalls);
  let extra: number | undefined = undefined;
  if (config.extraBall) {
    const e = extractExtra(html, config.extraBall.selector);
    if (e !== null) extra = e;
  }

  const date = extractDrawDate(html);
  const jackpot = extractPrize(html, config.prizeSelector) || "$0";
  const nextDrawingText = extractNextDrawDate(html);
  const secondsToAdd = extractCountdownSeconds(html);
  const nextDrawing = DateTime.now()
    .setZone("America/New_York")
    .plus({ seconds: secondsToAdd })
    .toISODate();

  return {
    date,
    numbers,
    extra,
    jackpot,
    nextDrawing: nextDrawingText || nextDrawing,
  };
}
