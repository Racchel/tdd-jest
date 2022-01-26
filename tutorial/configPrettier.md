# Configurando o Prettier

[ESLint e Prettier](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da)


1. remover a extensão Prettier - Code Formatter
2. yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
3. adicionar em .eslintrc.json:
{
	...
  "extends": [
		...
    "prettier",
    "plugin:prettier/recommended"
  ],
  ...
  "plugins": [
    ...
    "prettier"
  ],
  "rules": {
    ...
		"prettier/prettier": "error"
  },
  ...
}

4. criar um prettier.config.js:
module.exports = {
   singleQuote: false
}