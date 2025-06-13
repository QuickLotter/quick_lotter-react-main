// supabase/functions/main/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { fetchAndParseGame } from "./parsers/fetchAndParseGame.js";
import { insertResultIfNew } from "./services/insertResult.js";
import { insertNextDrawIfNew } from "./services/insertNextDraw.js";
import { gamesByState } from "./services/gamesConfig.js";
import { corsHeaders } from "./utils/corsHeaders.js";

serve(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state")?.toLowerCase() || "ny";

  // Pré-verificação (CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const games = gamesByState[state];
  if (!games) {
    return new Response(JSON.stringify({ error: "Estado inválido" }), {
      headers: corsHeaders,
      status: 400,
    });
  }

  const results = [];

  for (const game of games) {
    try {
      const { result, nextDraw } = await fetchAndParseGame(game);
      await insertResultIfNew(result);
      await insertNextDrawIfNew(nextDraw);
      results.push({
        game: game.name,
        status: "success",
        date: result.date_string,
      });
    } catch (err) {
      results.push({ game: game.name, status: "error", error: err.message });
    }
  }

  return new Response(JSON.stringify({ status: "completed", results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
