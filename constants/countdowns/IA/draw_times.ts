export const IA_DRAW_TIMES = {
  megamillions: {
    days: [2, 5], // Terça, Sexta
    hour: 22, // 21h AZ time = 9pm MST/PDT
    minute: 0,
    timezone: "America/Chicago",
  },
  powerball: {
    days: [1, 3, 6], // Domingo, Quarta, Sábado
    hour: 21, // 20h AZ time = 8pm MST/PDT
    minute: 59,
    timezone: "America/Chicago",
  },
  lotto: {
    days: [3, 6], // 3 = Quarta-feira, 6 = Sábado
    hour: 21, // 21h = 9:00 PM
    minute: 0,
    timezone: "America/Chicago",
  },
  naturalstatejackpot: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 20,
    minute: 0,
    timezone: "America/Chicago",
  },
  luckyforlife: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 21, // 21h = 9pm (Central Time = Arkansas)
    minute: 30, // 9:30 PM
    timezone: "America/Chicago", // Central Time
  },
  cash4midday: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 12,
    minute: 59,
    timezone: "America/Chicago", // <<<<< AQUI
  },
  cash4evening: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 18,
    minute: 59,
    timezone: "America/Chicago",
  },
  cash3midday: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 12,
    minute: 59,
    timezone: "America/Chicago",
  },
  cash3evening: {
    days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
    hour: 18,
    minute: 59,
    timezone: "America/Chicago", // <<<<< AQUI
  },
};
