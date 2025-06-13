// types.ts

export interface ParsedResult {
  game_id: number;
  numbers: number[];
  extra?: number;
  date_string: string;
  jackpot: string;
  cash_value?: string;
  power_play?: string;
}

export interface ParsedNextDraw {
  game_id: number;
  date_string: string;
  jackpot: string;
  cash_value: string;
  date_next_drawing: string;
  date_next_drawing_2: string;
}

export interface GameDefinition {
  name: string;
  game_id: number;
  url: string;
}
