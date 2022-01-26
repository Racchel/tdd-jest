[Babel com Typescript](https://jestjs.io/docs/getting-started#using-typescript)

1. yarn add --dev babel-jest @babel/core @babel/preset-env
2. yarn add --dev @babel/preset-typescript
3. criar babel.config.js:

module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};