// /utils/getStateFromIP.ts

export async function getStateFromIP(): Promise<string | null> {
  try {
    // Você pode trocar por sua API custom ou serviço público
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    // Exemplo: retorna NY, CA, FL, etc (region_code)
    return data.region_code?.toUpperCase() || null;
  } catch {
    return null;
  }
}
