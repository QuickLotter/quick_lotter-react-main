import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface GeneratePickRequest {
  game_id: string
  numbers_to_cover: number[]
  numbers_per_ticket: number
  prize_types: string[]
  lines?: number
}

// Função simples para gerar combinações (exemplo para Pick3, Pick4, Pick5)
function getCombinations(numbers: number[], size: number): number[][] {
  function combine(arr: number[], len: number, start: number, path: number[], result: number[][]) {
    if (path.length === len) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      combine(arr, len, i + 1, path, result);
      path.pop();
    }
  }
  const result: number[][] = [];
  combine(numbers, size, 0, [], result);
  return result;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST allowed" }), { status: 405 });
  }

  const body: GeneratePickRequest = await req.json();

  // Gera combinações
  const combs = getCombinations(body.numbers_to_cover, body.numbers_per_ticket);

  // Cria os jogos para cada tipo de prêmio selecionado
  const games = [];
  for (const t of body.prize_types) {
    for (const c of combs) {
      games.push({ numbers: c, type: t });
    }
  }

  // Limita a quantidade, se for necessário
  const output = body.lines ? games.slice(0, body.lines) : games;

  return new Response(JSON.stringify({
    games: output,
    total_generated: output.length,
  }), { headers: { "Content-Type": "application/json" } });
});
