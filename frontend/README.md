## Front-End
O cliente do [NOME PROJETO] utiliza as seguintes ferramentas: [npm](https://www.npmjs.com/), [Capacitor](https://capacitorjs.com/), [Vite](https://vitejs.dev/) e [React](https://reactjs.org/). O unico pacote requirido é o npm, que pode ser instalado em seu respectivo link.

Para executar o cliente, apenes instale as depedencias com o seguinte comando:
```
npm install
```

E execute o seguinte comando para iniciar um ambiente de teste:

```
npm run dev
```

Para extrair um apk, execute a seguinte seguencia de comandos:

```
npm run build
npx cap sync
cd android
gradlew assembleDebug
```

O apk será criado na pasta *app/build/outputs/apk/debug*.
