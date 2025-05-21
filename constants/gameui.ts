// ✅ Path: constants/gameui.ts
// 🎨 Centraliza todas as cores, textos e regras visuais por jogo, 100% comentado linha a linha.

export const gameUI = {
  // 🟢 CASH4LIFE
  cash4life: {
    headerColor: "#2D7F67", // 🟢 Cor do topo do Header
    accentColor: "#2D7F67", // 🟢 Cor de bordas e botões principais

    mainBallColor: "#2D7F67", // 🟢 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#3E4982", // 🟢 Cor do fundo da bola extra
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto dentro da bola extra

    quickPickButtonColor: "#ffffff", // 🟢 Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#2D7F67", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#2D7F67", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#2D7F67", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#2D7F67", // ⚪ Cor do texto "Pick 5 Main Numbers"
    extraTitleColor: "#3E4982", // ⚪ Cor do texto "Pick Cash Ball"

    totalMainBalls: 60, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 4, // 🎯 Quantidade total de bolas extras disponíveis
  },

  // 🟥 POWERBALL
  powerball: {
    headerColor: "#D0021B", // 🟥 Cor do topo do Header
    accentColor: "#000000", // 🟥 Cor de bordas e botões principais

    mainBallColor: "#000000", // ⚫ Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#D0021B", // 🟥 Cor do fundo da Powerball
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto dentro da Powerball

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#000000", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#000000", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#000000", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#000000", // ⚪ Cor do texto "Pick 5 Main Numbers"
    extraTitleColor: "#D0021B", // ⚪ Cor do texto "Pick Powerball"

    totalMainBalls: 69, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 26, // 🎯 Quantidade total de bolas extras disponíveis
  },

  // 🔵 MEGAMILLIONS
  megamillions: {
    headerColor: "#0E4CA1", // 🔵 Cor do topo do Header
    accentColor: "#0E4CA1", // 🔵 Cor de bordas e botões principais

    mainBallColor: "#0E4CA1", // 🔵 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#FDB927", // 🟡 Cor do fundo da Mega Ball
    extraTextColor: "#000000", // ⚫ Cor do texto dentro da Mega Ball

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#0E4CA1", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#0E4CA1", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#0E4CA1", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#0E4CA1", // ⚪ Cor do texto "Pick 5 Main Numbers"
    extraTitleColor: "#FFA000", // ⚪ Cor do texto "Pick Mega Ball"

    totalMainBalls: 70, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 24, // 🎯 Quantidade total de bolas extras disponíveis
  },

  // 🔵 NY LOTTO
  nylotto: {
    headerColor: "#155095", // 🔵 Cor do topo do Header
    accentColor: "#155095", // 🔵 Cor de bordas e botões principais

    mainBallColor: "#D40F41", // 🔴 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#155095", // 🔵 Cor do fundo da bola extra (não usado)
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto dentro da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#155095", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#155095", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#155095", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#155095", // ⚪ Cor do texto "Pick 6 Main Numbers"
    extraTitleColor: "#155095", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 59, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🟣 TAKE 5
  take5: {
    headerColor: "#00928F", // 🟣 Cor do topo do Header
    accentColor: "#00928F", // 🟣 Cor de bordas e botões principais

    mainBallColor: "#CA3092", // 🟣 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#CA3092", // 🟣 Cor da bola extra (não usado)
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#00928F", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#00928F", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#00928F", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#00928F", // ⚪ Cor do texto "Pick 5 Main Numbers"
    extraTitleColor: "#00928F", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 39, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🟣 TAKE 5
  take5_evening: {
    headerColor: "#00928F", // 🟣 Cor do topo do Header
    accentColor: "#00928F", // 🟣 Cor de bordas e botões principais

    mainBallColor: "#CA3092", // 🟣 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#CA3092", // 🟣 Cor da bola extra (não usado)
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#00928F", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#00928F", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#00928F", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#00928F", // ⚪ Cor do texto "Pick 5 Main Numbers"
    extraTitleColor: "#00928F", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 39, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🟡 PICK 10
  pick10: {
    headerColor: "#FFE363", // 🟡 Cor do topo do Header
    accentColor: "#FFE363", // 🟡 Cor de bordas e botões principais

    mainBallColor: "#FFE363", // 🟡 Cor do fundo das bolas principais
    mainTextColor: "#000000", // ⚫ Cor do texto dentro das bolas principais

    extraBallColor: "#FFE363", // 🟡 Cor da bola extra (não usado)
    extraTextColor: "#000000", // ⚪ Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#000000", // ⚫ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#FFE363", // 🟡 Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#000000", // ⚫ Cor do texto "Picked:"
    linesLabelTextColor: "#000000", // ⚫ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#000000", // ⚫ Cor do texto "Pick 10 Numbers"
    extraTitleColor: "#000000", // ⚫ Cor do texto da bola extra (não usado)

    totalMainBalls: 80, // 🎯 Quantidade total de bolas principais disponíveis
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🟪 WIN4
  win4: {
    headerColor: "#7E0C6E", // 🟣 Cor do topo do Header
    accentColor: "#7E0C6E", // 🟣 Cor de bordas e botões principais

    mainBallColor: "#7E0C6E", // 🟣 Fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Texto dentro das bolas principais

    extraBallColor: "#7E0C6E", // 🟣 Não usado
    extraTextColor: "#FFFFFF", // ⚪ Não usado

    quickPickButtonColor: "#FFFFFF", // ⚪ Texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡

    pickedCircleColor: "#7E0C6E", // 🟣 Fundo do círculo "Picked"
    pickedLabelTextColor: "#7E0C6E", // 🟣 Texto "Picked"
    linesLabelTextColor: "#7E0C6E", // 🟣 Texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Número no círculo Picked
    linesValueColor: "#000000", // ⚫ Número no quadrado Lines

    mainTitleColor: "#7E0C6E", // 🟣 Texto "Pick 4 Digits"
    extraTitleColor: "#7E0C6E", // 🟣 Não usado

    totalMainBalls: 10, // 🎯 Dígitos de 0–9 por coluna
    totalExtraBalls: 0, // 🔕 Sem bolas extras
  },

  win4_midday: {
    headerColor: "#7E0C6E", // 🟪 Cor do topo do Header
    accentColor: "#7E0C6E", // 🟪 Cor de bordas e botões principais

    mainBallColor: "#7E0C6E", // 🟪 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#7E0C6E", // 🟪 Cor da bola extra (não usado)
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#7E0C6E", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#7E0C6E", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#7E0C6E", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#7E0C6E", // ⚪ Cor do texto "Pick 4 Digits"
    extraTitleColor: "#7E0C6E", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 10, // 🎯 Quantidade total de dígitos (0–9)
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🌅 NUMBERS MIDDAY
  numbers_midday: {
    headerColor: "#2E73B5", // 🌅 Cor do topo do Header
    accentColor: "#2E73B5", // 🌅 Cor de bordas e botões principais

    mainBallColor: "#2E73B5", // 🌅 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#2C3E50", // 🌅 Cor da bola extra (não usado)
    extraTextColor: "#2E73B5", // 🌅 Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#2E73B5", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#2E73B5", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#2E73B5", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#2E73B5", // ⚪ Cor do texto "Pick 3 Digits"
    extraTitleColor: "#2E73B5", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 10, // 🎯 Quantidade total de dígitos (0–9)
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },

  // 🌃 NUMBERS EVENING
  numbers_evening: {
    headerColor: "#2E73B5", // 🌃 Cor do topo do Header
    accentColor: "#2E73B5", // 🌃 Cor de bordas e botões principais

    mainBallColor: "#2E73B5", // 🌃 Cor do fundo das bolas principais
    mainTextColor: "#FFFFFF", // ⚪ Cor do texto dentro das bolas principais

    extraBallColor: "#2E73B5", // 🌃 Cor da bola extra (não usado)
    extraTextColor: "#FFFFFF", // ⚪ Cor do texto da bola extra (não usado)

    quickPickButtonColor: "#FFFFFF", // ⚪ Cor do texto do botão "Quick Pick"
    quickPickIconColor: "#FFA000", // 🟡 Cor do ícone ⚡ do botão Quick Pick

    pickedCircleColor: "#2E73B5", // ⚪ Cor do fundo do círculo "Picked"
    pickedLabelTextColor: "#2E73B5", // ⚪ Cor do texto "Picked:"
    linesLabelTextColor: "#2E73B5", // ⚪ Cor do texto "Lines:"
    pickedValueColor: "#000000", // ⚫ Cor do número dentro do círculo Picked
    linesValueColor: "#000000", // ⚫ Cor do número dentro do quadrado Lines

    mainTitleColor: "#2E73B5", // ⚪ Cor do texto "Pick 3 Digits"
    extraTitleColor: "#2E73B5", // ⚪ Cor do texto da bola extra (não usado)

    totalMainBalls: 10, // 🎯 Quantidade total de dígitos (0–9)
    totalExtraBalls: 0, // 🎯 Quantidade total de bolas extras (não tem)
  },
};
