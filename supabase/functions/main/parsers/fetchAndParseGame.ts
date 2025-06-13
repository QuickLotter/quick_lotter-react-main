import { GameDefinition, ParsedResult, ParsedNextDraw } from "../../types.ts";
import { getHtmlFromUrl } from "../../utils/getHtmlFromUrl.ts";
import { extractNumbers } from "../../utils/extractNumbers.ts";
import { calculateNextDraw } from "../../utils/calculateNextDraw.ts";

export async function fetchAndParseGame(game: GameDefinition): Promise<{
  result: ParsedResult;
  nextDraw: ParsedNextDraw;
}> {
  const html = await getHtmlFromUrl(game.url);

  const { numbers, extra } = extractNumbers(html);
  const dateString = html.match(/<time[^>]*>(.*?)<\/time>/)?.[1]?.trim() || "";

  const jackpotMatch = html.match(
    /<dd class="c-result-card__prize-value">(.*?)<\/dd>/
  );
  const jackpot = jackpotMatch?.[1]?.replace(/\s+/g, " ") ?? "0";

  const powerPlayMatch =
    html.match(/Power Play: x(\d+)/) || html.match(/Megaplier: x(\d+)/);
  const powerPlay = powerPlayMatch?.[1] ?? undefined;

  const result: ParsedResult = {
    numbers,
    extra,
    date_string: dateString,
    jackpot,
    power_play: powerPlay,
    cash_value: "0",
    game_id: game.game_id,
  };

  const nextDraw = calculateNextDraw(html, game);

  return { result, nextDraw };
}
