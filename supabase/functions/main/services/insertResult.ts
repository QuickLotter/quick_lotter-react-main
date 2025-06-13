// ============================
// ✅ services/insertResult.ts
// ============================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.12.1";
import { ParsedResult } from "./types.js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

export async function insertResultIfNew(result: ParsedResult) {
  const { data: existing, error: checkError } = await supabase
    .from("results")
    .select("id")
    .eq("game_id", result.game_id)
    .eq("date_string", result.date_string);

  if (checkError)
    throw new Error(`Erro ao verificar duplicacao: ${checkError.message}`);
  if (existing.length > 0) return; // resultado ja existe

  const { error } = await supabase.from("results").insert([
    {
      game_id: result.game_id,
      result: {
        ...result.numbers.reduce((acc, n, i) => {
          acc[`number${i + 1}`] = n;
          return acc;
        }, {} as Record<string, number>),
        ...(result.extra !== undefined ? { number6: result.extra } : {}),
      },
      date_string: result.date_string,
      jackpot: result.jackpot,
      cash_value: result.cash_value || "0",
      power_play: result.power_play || null,
    },
  ]);

  if (error) throw new Error(`Erro ao inserir resultado: ${error.message}`);
}
