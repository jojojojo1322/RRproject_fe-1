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
          '@factory': './src/components/factory',
          '@defined': './src/defined',
          '@store': './src/store',
          '@module': './src/store/module',
          '@repository': './src/repository',
          '@context': './src/context',
          '@assets': './src/assets',
          '@style': './src/assets/style',
          '@images': './src/assets/imgs',
          '@lib': './src/lib',
        },
      },
    ],
  ],
};
