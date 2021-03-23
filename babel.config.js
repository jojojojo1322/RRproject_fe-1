module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '@components': './src/components',
          '@images': './src/imgs',
          '@store': './src/store',
          '@module': './src/store/module',
          '@style': './src/style',
          '@context': './src/context',
          '@repository': './src/repository',
          '@lib': './src/lib',
        },
      },
    ],
  ],
};
