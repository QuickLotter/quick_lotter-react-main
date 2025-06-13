// services/generateService.ts
export async function generateGames({ jwt, payload }) {
  // 👇 LOGA O PAYLOAD ANTES DE ENVIAR!
  console.log("Payload enviado para API:", payload);

  const res = await fetch(
    "https://hlthyxpkwvfdqqrihlkg.functions.supabase.co/generate-pick",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    // Aqui você pode logar o erro de resposta também:
    const errorText = await res.text();
    console.error("Resposta de erro da API:", errorText);
    throw new Error("Erro ao gerar jogos (API): " + errorText);
  }

  // Opcional: logar resposta OK também
  const json = await res.json();
  console.log("Resposta da API:", json);

  return json;
}
