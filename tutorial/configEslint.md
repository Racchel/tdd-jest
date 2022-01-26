# Configurando o ESLInt

[ESLint e Prettier](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da)

1. Instalar extensão ESLint: [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Add nas configurações do VSCode: 
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}

3. yarn add eslint -D
4. yarn eslint --init: 
   * To check syntax, find problems and enforce code style.
   * Javascript modules (import/export)
   * None of these
   * Yes
   * Node
   * Use a popular style guide 
   * Airbnb
   * JSON
   * No (usamos yarn)
   
5.  yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest -D
(isso depende do que aparecer no terminal - só não instalar o eslint de novo)

6. yarn add -D eslint-plugin-import-helpers eslint-import-resolver-typescript
7. touch .eslintignore: 
/*.js
node_modules
dist

7. refazer eslintrc.json:

{
   "env": {
      "es2020": true,
      "node": true,
         "jest": true
   },
   "extends": [
      "airbnb-base",
      "plugin:@typescript-eslint/recommended"
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
   },
   "plugins": [
      "@typescript-eslint",
      "eslint-plugin-import-helpers"
   ],
   "rules": {
   "camelcase": "off",
      "import/no-unresolved": "error",
      "@typescript-eslint/naming-convention": [
         "error",
         {
            "selector": "interface",
            "format": ["PascalCase"],
            "custom": {
            "regex": "^I[A-Z]",
            "match": true
            }
         }
      ],
      "class-methods-use-this": "off",
      "import/prefer-default-export": "off",
      "no-shadow": "off",
      "no-console": "off",
      "no-useless-constructor": "off",
      "no-empty-function": "off",
      "lines-between-class-members": "off",
      "import/extensions": [
         "error",
         "ignorePackages",
         {
            "ts": "never"
         }
      ],
      "import-helpers/order-imports": [
         "warn",
         {
            "newlinesBetween": "always",
            "groups": ["module", "/^@shared/", ["parent", "sibling", "index"]],
            "alphabetize": { "order": "asc", "ignoreCase": true }
         }
      ],
      "import/no-extraneous-dependencies": [
         "error",
         { "devDependencies": ["**/*.spec.js"] }
      ]
   },
   "settings": {
      "import/resolver": {
         "typescript": {}
      }
   }
}