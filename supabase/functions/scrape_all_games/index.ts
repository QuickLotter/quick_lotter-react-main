// supabase/functions/scrape_all_games/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.12.1";
import { DateTime } from "https://esm.sh/luxon";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // 1) Buscar todos os jogos ativos com scrape_url
    const { data: games, error: gamesErr } = await supabase
      .from("game_cards")
      .select("id, game_code, state_code, scrape_url")
      .eq("status", true);
    if (gamesErr) throw gamesErr;
    if (!games?.length) {
      throw new Error("Nenhum jogo ativo com scrape_url definido.");
    }

    let count = 0;
    for (const g of games) {
      const { id: game_id, scrape_url } = g as any;
      if (!scrape_url) continue;

      // 2) Scraping do HTML
      const page = await fetch(scrape_url);
      if (!page.ok) continue;
      const html = await page.text();

      // 3) Extrair dados padrão
      const nextJackpot =
        html.split('<dd class="c-next-draw-card__prize-value">')[1]
          ?.split("</dd>")[0]
          .trim() || "";

      const balls = html.split(
        '<li class="c-ball c-ball--default c-result__item">'
      );
      const main_numbers = balls
        .slice(1, 6)
        .map((c) => parseInt(c.trim().split("\n")[1].trim(), 10));

      const bonus =
        html
          .split('<span class="c-ball   c-ball--yellow c-ball--">')[1]
          ?.split("</span>")[0]
          .trim() || "";

      const multMatch = html
        .match(/<li class="c-result__multiplier">[^x]*x(\d+)/);
      const megaplier = multMatch ? multMatch[1] : "";

      const dateString =
        html
          .split('<time class="c-result-card__title"')[1]
          ?.split('">')[1]
          .split("</time>")[0]
          .trim() || "";

      const parts = html.split('<span class="c-countdown__time">');
      const days = parseInt(parts[1]?.split("</span>")[0], 10) || 0;
      const hrs = parseInt(parts[2]?.split("</span>")[0], 10) || 0;
      const mins = parseInt(parts[3]?.split("</span>")[0], 10) || 0;
      const secondsToAdd = days * 86400 + hrs * 3600 + mins * 60 + 60;
      const nextDrawUtc = DateTime.now().plus({ seconds: secondsToAdd }).toISO();

      const nextDateString =
        html
          .split('<time class="c-next-draw-card__date"')[1]
          ?.split("</span>")[1]
          .split("</time>")[0]
          .trim() || "";

      // 4) Inserir em results
      const { data: exR } = await supabase
        .from("results")
        .select("id")
        .eq("game_id", game_id)
        .eq("date_string", dateString);
      if (!exR?.length) {
        const { error: insErr } = await supabase.from("results").insert([
          {
            game_id,
            date_string: dateString,
            result: {
              main_numbers,
              bonus_number: bonus,
              megaplier,
            },
            jackpot: nextJackpot.replace(/\s+/g, ""),
            power_play: megaplier,
            cash_value: 0,
          },
        ]);
        if (insErr) throw insErr;
      }

      // 5) Inserir em game_next_drawing
      const { data: exN } = await supabase
        .from("game_next_drawing")
        .select("id")
        .eq("game_id", game_id)
        .eq("date_string", nextDateString);
      if (!exN?.length) {
        const { error: insNextErr } = await supabase
          .from("game_next_drawing")
          .insert([
            {
              game_id,
              date_string: nextDateString,
              jackpot: nextJackpot.replace(/\s+/g, ""),
              cash_value: 0,
              date_next_drawing: nextDrawUtc,
            },
          ]);
        if (insNextErr) throw insNextErr;
      }

      count++;
    }

    return new Response(
      JSON.stringify({ success: true, processed: count }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
