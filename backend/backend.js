// ---- INIT ----

// Testa a linha de comando para ver se será realizado conexão local ou remota
var local = false;
if (process.argv[2] == "-local"){
    local = true;
}

//importações
const schemas = require("./src/schemas");
const user = require("./src/user");
const community = require("./src/community");
const admin = require("./routes/admin")
const handlebars = require('express-handlebars')

//manipular senhas
const path = require('path')

// Inicializa Express para simplificar o código node.
const express = require('express');
const app=express()

// CORS é requirido por utilizar arquivos de pastas diferentes mas todos no localhost
const cors = require('cors');
app.use(cors());

//bodyParser permite interagir com o formulario
const bodyParser = require('body-parser'); // body-parser para tratar forms no html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Site de teste ficará na porta 3001 do localhost
const port = 3001;
app.use(express.static("test-site/")); // todo arquivo estático de site/ pode ser servido pelo servidor

// Inicializa o Mongoose, para tratar os dados do MongoDB.
const mongoose = require('mongoose');
const { post } = require("./routes/admin");

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
const db = mongoose.connection;
db.once('open', () =>{console.log("Sucesso na Conexão com o banco.");})

// Models definem as "tabelas"                            nome da coleção no mongodb
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

        //Verifica no banco de dados se
        await user.computeNewUser(User, req.body.username,
                                        req.body.password, 
                                        req.body.password2,                                    
                                        req.body.email,
                                        req.body.data_cadastro).catch(next);
        // Manda resposta de sucesso -- Pode ser qualquer coisa, como send(JSON.stringify({username : req.body.username}))
       //res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
       res.sendFile(path.join(__dirname + '/test-site/login.html'))

    } catch (error) {
        console.error("[ERRO] " + error);

        // Manda resposta de sucesso -- Util mandar algo para mostrar para o cliente de oque deu errado -- fazer ifs para cada um que encontrar
    //    res.status(500).send(JSON.stringify({code : 0, value : "username"}));
        res.stats(500).json({ msg: "deu ruim"})
    }
});

app.get("/login", async (req, res) => {
  console.log("Entrou na tela de login")
  res.sendFile(path.join(__dirname + '/test-site/login.html'))
  });


app.post("/auth", async (req, res, next)=> {  
   try {
      console.log("[LOG] " + req.body.email + " sendo validado.");

      //Verifica no banco de dados se
      user.checkUser(User, req.body.email,req.body.password).then((result) => {         
        if(result){
          res.status(201).json({ msg: "Usuário logado com sucesso!" });
        }
        else{
          res.status(500).json({ msg: "deu ruim"})
        }


})
        

 // Manda resposta de sucesso -- Pode ser qualquer coisa, como send(JSON.stringify({username : req.body.username}))
  } catch (error) {
      console.error("[ERRO] " + error);
      res.status(500).json({ msg: "deu ruim"})
  }
});


/*app.get("/community", async (req, res) => {
  try {    
    await community.computeNewCommunity(Community, req.body.nameCommunity,
                                    req.body.descricaoCommunity,
                                    req.body.data_cadastro).catch(next);    
   
    res.sendFile(path.join(__dirname + '/test-site/community.html'))
  }
  });


app.get("/commuList", function(req, res){
  community.all().then(function (comunidades){
    res.render('community', {comunidades: comunidades})   
  })

})
*/
//community.find().then(nameCommunity => console.log(users)))
  

//Rotas
//app.use('/admin',admin);

//Redirecionamento para a tela de inicial

// Código fica escutando
app.listen(port, ()=>{console.log("Escutando na porta " + port + "!")});
