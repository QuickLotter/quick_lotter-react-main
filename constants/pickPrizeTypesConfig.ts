// constants/pickPrizeTypesConfig.ts

export const pickPrizeTypesConfig = {
  PICK3: {
    digits: 3,
    types: [
      {
        key: "straight",
        label: "STRAIGHT PLAY",
        calculate: (n) => (n < 3 ? 0 : permut(n, 3)),
      },
      {
        key: "box_3way",
        label: "BOX 3-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2) * 2), // 2 iguais + 1 diferente (ex: 112)
      },
      {
        key: "box_6way",
        label: "BOX 6-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3)), // 3 diferentes (ex: 123)
      },
      {
        key: "straightbox_3way",
        label: "STRAIGHT/BOX 3-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2) * 2), // mesma lógica do box_3way
      },
      {
        key: "straightbox_6way",
        label: "STRAIGHT/BOX 6-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3)), // mesma lógica do box_6way
      },
      {
        key: "combination_3way",
        label: "COMBINATION 3-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2) * 2), // cada combinação de 2 números, 3 permutações possíveis
      },
      {
        key: "combination_6way",
        label: "COMBINATION 6-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3)), // cada combinação de 3 números, 6 permutações possíveis
      },
      {
        key: "pair_front",
        label: "PAIR PLAYS - FRONT PAIR",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 primeiros dígitos
      },
      {
        key: "pair_back",
        label: "PAIR PLAYS - BACK PAIR",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 últimos dígitos
      },
    ],
  },

  PICK4: {
    digits: 4,
    types: [
      {
        key: "straight",
        label: "STRAIGHT PLAY",
        calculate: (n) => (n < 4 ? 0 : permut(n, 4)),
      },
      {
        key: "box_4way",
        label: "BOX 4-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 3 iguais + 1 diferente (ex: 1112)
      },
      {
        key: "box_6way",
        label: "BOX 6-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 pares (ex: 1122)
      },
      {
        key: "box_12way",
        label: "BOX 12-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3) * 2), // 2 iguais + 2 diferentes (ex: 1123)
      },
      {
        key: "box_24way",
        label: "BOX 24-WAY",
        calculate: (n) => (n < 4 ? 0 : comb(n, 4)), // 4 diferentes (ex: 1234)
      },
      {
        key: "straightbox_4way",
        label: "STRAIGHT/BOX 4-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // igual ao box_4way
      },
      {
        key: "straightbox_6way",
        label: "STRAIGHT/BOX 6-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // igual ao box_6way
      },
      {
        key: "straightbox_12way",
        label: "STRAIGHT/BOX 12-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3) * 2),
      },
      {
        key: "straightbox_24way",
        label: "STRAIGHT/BOX 24-WAY",
        calculate: (n) => (n < 4 ? 0 : comb(n, 4)),
      },
      {
        key: "combination_4way",
        label: "COMBINATION 4-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 3 iguais + 1 diferente
      },
      {
        key: "combination_6way",
        label: "COMBINATION 6-WAY",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 pares
      },
      {
        key: "combination_12way",
        label: "COMBINATION 12-WAY",
        calculate: (n) => (n < 3 ? 0 : comb(n, 3) * 2), // 2 iguais + 2 diferentes
      },
      {
        key: "combination_24way",
        label: "COMBINATION 24-WAY",
        calculate: (n) => (n < 4 ? 0 : comb(n, 4)), // 4 diferentes
      },
      {
        key: "pair_front",
        label: "PAIR PLAYS - FRONT PAIR",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 primeiros
      },
      {
        key: "pair_back",
        label: "PAIR PLAYS - BACK PAIR",
        calculate: (n) => (n < 2 ? 0 : comb(n, 2)), // 2 últimos
      },
    ],
  },

  PICK5: {
    digits: 5,
    types: [
      {
        key: "straight",
        label: "STRAIGHT",
        calculate: (n) => (n < 5 ? 0 : permut(n, 5)),
      },
      {
        key: "box_5way",
        label: "BOX 5-WAY",
        calculate: (n) => (n < 2 ? 0 : box5way(n)),
      },
      {
        key: "box_10way",
        label: "BOX 10-WAY",
        calculate: (n) => (n < 2 ? 0 : box10way(n)),
      },
      {
        key: "box_20way",
        label: "BOX 20-WAY",
        calculate: (n) => (n < 3 ? 0 : box20way(n)),
      },
      {
        key: "box_30way",
        label: "BOX 30-WAY",
        calculate: (n) => (n < 3 ? 0 : box30way(n)),
      },
      {
        key: "box_60way",
        label: "BOX 60-WAY",
        calculate: (n) => (n < 4 ? 0 : box60way(n)),
      },
      {
        key: "box_120way",
        label: "BOX 120-WAY",
        calculate: (n) => (n < 5 ? 0 : comb(n, 5)), // 5 diferentes
      },
      {
        key: "straightbox_5way",
        label: "STRAIGHT/BOX 5-WAY",
        calculate: (n) => (n < 2 ? 0 : box5way(n)),
      },
      {
        key: "straightbox_10way",
        label: "STRAIGHT/BOX 10-WAY",
        calculate: (n) => (n < 2 ? 0 : box10way(n)),
      },
      {
        key: "straightbox_20way",
        label: "STRAIGHT/BOX 20-WAY",
        calculate: (n) => (n < 3 ? 0 : box20way(n)),
      },
      {
        key: "straightbox_30way",
        label: "STRAIGHT/BOX 30-WAY",
        calculate: (n) => (n < 3 ? 0 : box30way(n)),
      },
      {
        key: "straightbox_60way",
        label: "STRAIGHT/BOX 60-WAY",
        calculate: (n) => (n < 4 ? 0 : box60way(n)),
      },
      {
        key: "straightbox_120way",
        label: "STRAIGHT/BOX 120-WAY",
        calculate: (n) => (n < 5 ? 0 : comb(n, 5)),
      },
    ],
  },
};

// ======= FUNÇÕES DE APOIO =======

// Combinações simples (C(n, k))
export function comb(n: number, k: number): number {
  if (k > n) return 0;
  let res = 1;
  for (let i = 0; i < k; ++i) res *= n - i;
  for (let i = 1; i <= k; ++i) res /= i;
  return Math.round(res);
}

// Permutação simples (P(n, k))
export function permut(n: number, k: number): number {
  if (k > n) return 0;
  let res = 1;
  for (let i = 0; i < k; ++i) res *= n - i;
  return res;
}

// ==== Pick 5 Box Functions ====
// 5-Way: 4 iguais, 1 diferente (ex: 11112)
function box5way(n: number): number {
  // Para cada número, combinações possíveis do outro diferente
  return n * (n - 1);
}

// 10-Way: 3 iguais + 2 iguais (ex: 11122)
function box10way(n: number): number {
  // Escolhe 2 números: um para o triplo, outro para o par
  // Para cada combinação, as permutações são fixas
  return comb(n, 2);
}

// 20-Way: 3 iguais + dois outros diferentes (ex: 11123)
function box20way(n: number): number {
  // Escolhe o número do triplo, depois 2 outros para os diferentes
  return n * comb(n - 1, 2);
}

// 30-Way: 2 pares + 1 diferente (ex: 11223)
function box30way(n: number): number {
  // Escolhe 2 números para os pares e 1 diferente
  return comb(n, 2) * (n - 2);
}

// 60-Way: 2 iguais + 3 diferentes (ex: 11234)
function box60way(n: number): number {
  // Escolhe 1 número para o par, depois 3 diferentes dos demais
  return n * comb(n - 1, 3);
}
