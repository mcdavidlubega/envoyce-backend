module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/controllers',
          '@routes': './src/routes',
          '@utils': './src/utils',
          '@middleware': './src/middleware',
        },
      },
    ],
  ],
};
