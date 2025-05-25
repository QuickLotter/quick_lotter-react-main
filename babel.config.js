module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // <-- Adicione isso primeiro
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@assets": "./assets",
            "@states": "./states",
          },
        },
      ],
    ],
  };
};
