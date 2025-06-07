export function getGeneratorRoute(game) {
  const state = (game.id.match(/_([a-z]{2})$/i)?.[1] || "ny").toLowerCase();
  return `/generator/${state}/generator?game=${game.id}`;
}
