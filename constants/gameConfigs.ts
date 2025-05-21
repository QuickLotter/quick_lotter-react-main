export const gameConfigs = {
  megamillions: {
    type: "withExtraBall",
    rules: {
      pick: 5,
      extraPick: 1,
    },
    main: { min: 1, max: 70, pick: 5 },
    mega: { min: 1, max: 24, pick: 1 },
  },

  powerball: {
    type: "withExtraBall",
    rules: {
      pick: 5,
      extraPick: 1,
    },
    main: { min: 1, max: 69, pick: 5 },
    mega: { min: 1, max: 26, pick: 1 },
  },

  cash4life: {
    type: "withExtraBall",
    rules: {
      pick: 5,
      extraPick: 1,
    },
    main: { min: 1, max: 60, pick: 5 },
    mega: { min: 1, max: 4, pick: 1 },
  },

  luckyforlife: {
    type: "withExtraBall",
    rules: {
      pick: 5,
      extraPick: 1,
    },
    main: { min: 1, max: 48, pick: 5 },
    mega: { min: 1, max: 18, pick: 1 },
  },

  nylotto: {
    type: "noExtraBall",
    rules: {
      pick: 6,
    },
    main: { min: 1, max: 59, pick: 6 },
  },

  take5: {
    type: "noExtraBall",
    rules: {
      pick: 5,
    },
    main: { min: 1, max: 39, pick: 5 },
  },

  pick10: {
    type: "noExtraBall",
    rules: {
      pick: 10,
    },
    main: { min: 1, max: 80, pick: 10 },
  },

  win4: {
    type: "digit",
    rules: {
      pick: 4,
    },
    main: { min: 0, max: 9, pick: 4 },
  },

  numbers: {
    type: "digit",
    rules: {
      pick: 3,
    },
    main: { min: 0, max: 9, pick: 3 },
  },

  pick5: {
    type: "digit",
    rules: {
      pick: 5,
    },
    main: { min: 0, max: 9, pick: 5 },
  },

  fivecardcash: {
    type: "cards",
    rules: {
      pick: 5,
    },
    main: { min: 1, max: 52, pick: 5 },
  },

  keno: {
    type: "keno",
    rules: {
      pick: 10, // pode variar por estado
    },
    main: { min: 1, max: 80, pick: 10 },
  },
};
