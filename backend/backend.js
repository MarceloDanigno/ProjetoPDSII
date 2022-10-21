// ---- INIT ----

// Testa a linha de comando para ver se será realizado conexão local ou remota
var local = false;

if (process.argv[2] == "-local"){
    local = true;
}
console.log(local)
//teste 2022

const schemas = require("./src/schemas");
const user = require("./src/user");
const community = require("./src/community");
const router = express.Router()

const short = require('shortid');

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
app.use(express.static("test-site/")); // todo arquivo estático de site/ pode ser servido pelo servidor

// Inicializa o Mongoose, para tratar os dados do MongoDB.
const mongoose = require('mongoose');

if (local){
  mongoose.connect('mongodb://127.0.0.1:27017/projetopds').then(()=>{
    console.log("Conectado ao MongoDB em modo local")
  }).catch((err)=>{
    console.log("Houve um erro ao se conectar ao mongoDB: "+err)
  })
}
 else {
  // Criar novo servidor online
  mongoose.connect('mongodb+srv://pds2:jwm4EkWGtWkIvDcf@pds2.k1uqoph.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  console.log("Conectado ao MongoDB em modo remoto.")
  }).catch((err)=>{
  console.log("Houve um erro ao se conectar ao mongoDB: "+err)
  })
}

// ---- DATABASE ----

// Abre o banco de dados
const db=mongoose.connection;
db.once('open', () =>{console.log("Sucesso na Conexão com o banco.");})

// Models definem as "tabelas"
const User = mongoose.model('Users', schemas.userSchema, 'users');
const Community = mongoose.model('Communities', schemas.communitySchema, 'community')

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
        await user.computeNewUser(User, req.body.username,
                                        req.body.userID,
                                        req.body.password,
                                        req.body.email,
                                        req.body.data_cadastro).catch(next);
        // Manda resposta de sucesso -- Pode ser qualquer coisa, como send(JSON.stringify({username : req.body.username}))
        res.status(201).send();
    } catch (error) {
        console.log("[ERRO] " + error);
        // Manda resposta de sucesso -- Util mandar algo para mostrar para o cliente de oque deu errado -- fazer ifs para cada um que encontrar
        res.status(500).send(JSON.stringify({code : 0, value : "username"}));
    }
});

//Tentativa para cadastro de comunidades
router.get("/community", (req, res) =>{
  res.render("teste-site/community")
})

app.post("/commu", async (req, res, next) => {

    // Roda a função de adicionar usuario e retorna erro se necessário
  //  try {
        console.log("[LOG] Comunidade " + req.body.nameCommunity + " sendo registrada.");
      //  await community.computeNewCommunity(Community, req.body.nameCommunity,
          //                              req.body.descricaoCommunity,
                //                        req.body.data_cadastro).catch(next);

      //  res.status(201).send();
  //  } catch (error) {
  //      console.log("[ERRO] " + error);
       // Manda resposta de sucesso -- Util mandar algo para mostrar para o cliente de oque deu errado -- fazer ifs para cada um que encontrar
  //      res.status(500).send(JSON.stringify({code : 0, value : "nameCommunity"}));
  //  }
});





// Código fica escutando
app.listen(port, ()=>{console.log("Escutando na porta " + port + "!")});
