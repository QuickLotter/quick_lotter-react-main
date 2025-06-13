// services/insertNextDraw.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.12.1";
import { ParsedNextDraw } from "./types.js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

export async function insertNextDrawIfNew(draw: ParsedNextDraw) {
  const { data: existing, error: checkError } = await supabase
    .from("game_next_drawing")
    .select("id")
    .eq("game_id", draw.game_id)
    .eq("date_string", draw.date_string);

  if (checkError)
    throw new Error(`Erro ao verificar duplicação: ${checkError.message}`);
  if (existing.length > 0) return; // já existe

  const { error } = await supabase.from("game_next_drawing").insert([
    {
      game_id: draw.game_id,
      date_string: draw.date_string,
      jackpot: draw.jackpot,
      cash_value: draw.cash_value,
      date_next_drawing: draw.date_next_drawing,
      date_next_drawing_2: draw.date_next_drawing_2,
    },
  ]);

  if (error)
    throw new Error(`Erro ao inserir próximo sorteio: ${error.message}`);
}
