## Sequência de comandos e ações:

- npm init -y
- git init
- npm i typescript @types/node -D
- .gitignore
- tsconfig.json
- _Para buildar:_ npx tsc
- script: "build": "npx tsc"

---

#### Rodar automaticamente:

- npm i ts-node nodemon -D
- nodemon.json
- script: "dev": "npx nodemon"

#### eslint

- npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
- .eslintrc
- .eslintignore

#### prettier

- npm i prettier -D
- npm i eslint-config-prettier -D
- .prettierrc

#### criar .env com:

- MONGO_URL
