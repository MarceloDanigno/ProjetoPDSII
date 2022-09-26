// ---- INIT ----

// Testa a linha de comando para ver se será realizado conecção local ou remota
var local = false;
if (process.argv[2] == "-local"){
    local = true;
}
//teste 2022

const schemas = require("./src/schemas");
const user = require("./src/user");

// Inicializa Express para simplificar o código node.
const express=require("express");
const app=express()
const cors = require('cors');
// CORS é requirido por utilizar arquivos de pastas diferentes mas todos no localhost
app.use(cors());
const bodyParser = require('body-parser'); // body-parser para tratar forms no html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Site de teste ficará na porta 3001 do localhost
const port = 3001;
app.use(express.static("test-site/")); // todo arquivo stático de site/ pode ser servido pelo servidor

// Inicializa o Mongoose, para tratar os dados do MongoDB.
const mongoose = require('mongoose');
if (local){
  mongoose.connect('mongodb://127.0.0.1:27017/projetopds').then(()=>{
    console.log("Conectado ao MongoDB em modo local.");
  }).catch((err)=>{
    console.log("Houve um erro ao se conectar ao mongoDB: "+err)
  })
} else {
  // Criar novo servidor online
  //mongoose.connect('TODO').then(()=>{
  //  console.log("Conectado ao MongoDB em modo remoto.")
  //}).catch((err)=>{
  //  console.log("Houve um erro ao se conectar ao mongoDB: "+err)
  //})
}

// ---- DATABASE ----

// Abre o banco de dados
const db=mongoose.connection;
db.once('open', () =>{console.log("Conecção ao banco com sucesso.");})


// Models definem as "tabelas"
const User = mongoose.model('Users', schemas.userSchema, 'users');

// ---- BACKEND FUNCTIONS ----

// Ação para quando o usuário conectar na porta do localhost --> retorna a página
app.get('/', function(req, res) {
    console.log("[LOG] Usuário se conectou ao site.")
    res.render('index', {});
});

// Ação para quando o usuário manda informações do cadastro
app.post("/register", async (req, res, next) => {
    // Roda a função de adicionar usuario e retorna erro se necessário
    try {
        console.log("[LOG] Usuario " + req.body.username + " sendo registrado.");
        await user.computeNewUser(User, req.body.username, req.body.password);
        // Manda resposta de sucesso -- Pode ser qualquer coisa, como send(JSON.stringify({username : req.body.username}))
        res.status(201).send();
    } catch (error) {
        console.log("[ERRO] " + error);
        // Manda resposta de sucesso -- Util mandar algo para mostrar para o cliente de oque deu errado -- fazer ifs para cada um que encontrar
        res.status(500).send(JSON.stringify({code : 0, value : "username"}));
    }
});

// Código fica escutando
app.listen(port, ()=>{console.log("Escutando na porta " + port + "!")});
