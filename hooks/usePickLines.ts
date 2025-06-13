// hooks/usePickLines.ts
import { useEffect, useState } from "react";
import { prizeTypeCalculators } from "@/utils/pickCombos";

export function usePickLines(
  gameType: "PICK3" | "PICK4" | "PICK5",
  pickSelected: number[][],
  prizeList: { key: string }[]
) {
  const [linesByType, setLinesByType] = useState<{ [k: string]: number }>({});

  useEffect(() => {
    const newLines: Record<string, number> = {};
    if (!prizeTypeCalculators[gameType]) {
      setLinesByType({});
      return;
    }
    for (const prize of prizeList) {
      const calcFn = prizeTypeCalculators[gameType][prize.key];
      newLines[prize.key] = typeof calcFn === "function" ? calcFn(pickSelected) : 0;
    }
    setLinesByType(newLines);
  }, [pickSelected, gameType, prizeList]);
  return linesByType;
}
