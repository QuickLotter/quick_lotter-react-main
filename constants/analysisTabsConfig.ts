// constants/analysisTabsConfig.ts
export const ANALYSIS_TABS = {
  megamillions: [
    { label: "SUM", color: "#E0E0E0", route: "sum" },
    { label: "ODD", color: "#4CAF50", route: "odd" },
    { label: "LOW", color: "#9575CD", route: "low" },
    { label: "PRIME", color: "#009BDE", route: "prime" },
    { label: "FIBONACCI", color: "#E1058C", route: "fibonacci" },
    { label: "MULT. OF 3", color: "#4DD0E1", route: "multipleof3" },
    { label: "VERTICAL", color: "#B71C1C", route: "vertical" },
    { label: "ADJACENT", color: "#8BC34A", route: "adjacent" },
    { label: "SEQUENCE", color: "#000000", route: "sequence" },
    { label: "REPEATED", color: "#FF9800", route: "repeated" },
    { label: "DIGITS", color: "#CDDC39", route: "digits" },
    { label: "LINES", color: "#005BAA", route: "lines" },
    { label: "COLUMNS", color: "#F8C1D9", route: "columns" },
  ],
  powerball: [
    { label: "SUM", color: "#E0E0E0", route: "sum" },
    { label: "ODD", color: "#4CAF50", route: "odd" },
    { label: "LOW", color: "#9575CD", route: "low" },
    { label: "PRIME", color: "#009BDE", route: "prime" },
    { label: "FIBONACCI", color: "#E1058C", route: "fibonacci" },
    // ...adicione outros filtros necessários
  ],
  pick3: [
    { label: "SUM", color: "#F2A900", route: "sum" },
    { label: "ODD", color: "#8BC34A", route: "odd" },
    { label: "DIGITS", color: "#CDDC39", route: "digits" },
    // ...adicione outros filtros para Pick3
  ],
  fantasy5: [
    { label: "SUM", color: "#9E87FF", route: "sum" },
    { label: "ODD", color: "#009BDE", route: "odd" },
    { label: "PRIME", color: "#9575CD", route: "prime" },
    // ...adicione outros filtros para Fantasy 5
  ],
  thepick: [
    { label: "SUM", color: "#C7102E", route: "sum" },
    { label: "ODD", color: "#F8C1D9", route: "odd" },
    // ...adicione outros filtros para The Pick
  ],
  // Adicione outros jogos de NY/AZ aqui!
};
