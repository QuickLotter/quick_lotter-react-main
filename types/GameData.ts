export type GameData = {
  id: string;
  name: string;
  slug: string; // caminho da página do jogo (ex: ny/megamillions)
  jackpot: string;
  cashValue: string;
  drawTime: string;
  drawDate: string;
  numbers: string[]; // números sorteados (em formato string ex: "01", "02")
  bonusNumber: string; // se existir
  powerPlay: string; // ex: "2x", "5x", etc
  result: string; // texto com o resultado (ex: "No Jackpot Winners")
  logo: string | React.ReactNode; // ✅ aceita URL (string) ou SVG (JSX)
};
