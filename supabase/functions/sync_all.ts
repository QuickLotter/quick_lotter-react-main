// ✅ Correto com base na estrutura que você mostrou
import { parseGame } from "./main/parsers/universalParser.ts";
import { gamesConfig } from "./main/services/gamesConfig.ts";
import { insertResult } from "./main/services/insertResult.ts";
import { insertNextDraw } from "./main/services/insertNextDraw.ts";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define se apenas imprime (true) ou insere no banco (false)
const dryRun = false;

export async function syncAllGames() {
  for (const state of Object.keys(gamesConfig)) {
    const stateGames = gamesConfig[state];
    for (const gameKey of Object.keys(stateGames)) {
      const config = stateGames[gameKey];
      console.log(`🔄 Syncing: ${state.toUpperCase()} - ${gameKey}`);

      try {
        const data = await universalParser(state, gameKey, config);
        if (!data) {
          console.warn(`⚠️ No data returned for ${state}/${gameKey}`);
          continue;
        }

        if (dryRun) {
          console.log("📦 Result:", JSON.stringify(data, null, 2));
          continue;
        }

        const { date, numbers, extra, jackpot, nextDrawing } = data;

        // Upsert no Supabase
        const { error } = await supabase.from("results").upsert(
          {
            game_id: config.game_id,
            date_string: date,
            numbers,
            extra,
            jackpot,
          },
          { onConflict: "game_id,date_string" }
        );

        if (error) {
          console.error(`❌ Insert failed for ${gameKey}:`, error.message);
          continue;
        }

        // Atualiza próxima data do sorteio
        if (nextDrawing) {
          await supabase.from("game_next_drawing").upsert(
            {
              game_id: config.game_id,
              next_date: nextDrawing,
            },
            { onConflict: "game_id" }
          );
        }

        console.log(`✅ Saved: ${state}/${gameKey}`);
      } catch (err) {
        console.error(`🔥 Error on ${state}/${gameKey}:`, err.message || err);
      }
    }
  }
}

if (require.main === module) {
  syncAllGames();
}
