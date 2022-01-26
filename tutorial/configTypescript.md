# Configurando e iniciando projeto Node.js com Typescript

# Configurando o Typescript

[Criando projeto com typescript](https://app.rocketseat.com.br/node/chapter-ii-2/group/typescript/lesson/criando-projeto-com-typescript)

1. mkdir nodejs-typescript-project
2. cd nodejs-typescript-project
3. yarn init -y
4. yarn add typescript ts-node-dev -D
5. yarn tsc --init
6. alterar tsconfig.json em :
   "include": ["./src/**/*"],
   "exclude": ["node_modules"],
   {
      "rootDir": "./src",
      "outDir": "./dist",
   }
     

7. criar script no package.js {
   "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --resp src/server.js"
}