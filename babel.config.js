module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@components': './src/components',
        },
      },
    ],
  ],
};
