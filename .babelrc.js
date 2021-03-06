module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 2% in CN and not ie <= 8 and not dead'
        /*  "useBuiltIns": "usage",
        "corejs": 3,
        "modules": false */
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    /* [
      "@babel/plugin-transform-runtime",
      {
        "corejs": true,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ], */
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  comments: false,
  sourceType: 'unambiguous'
}
