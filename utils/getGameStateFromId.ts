// /utils/getGameStateFromId.ts
export function getGameStateFromId(id: string): string {
  if (!id) return "";
  const parts = id.split("_");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
}
