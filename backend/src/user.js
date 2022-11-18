// Inicializa o modulo de criptografia para senhas e o mongoose.
const argon2 = require('argon2');
const mongoose = require('mongoose');
//const router = express.Router()

const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of itetations
}



// Função para adicionar um novo usuario no modelo User
async function computeNewUser(User, name, pass1, pass2, email, data_cadastro, log = true) {
    console.log(pass1)
    // Erros de preenchimento
    if (pass1[0]  == "" & name  == "" & email == ""){
      throw "Campos vazios.";
    }

    if (pass1[0] === "") {
        throw "Campo de senha vazio.";
    }

    if (name == ""){
        throw "Usuario não informado.";
    }

    if (email == ""){
        throw "Email não informado.";
    }
    if (pass1!= pass2){
        throw "Senha não confere."
    }

    //Erros de dados já existentes (email)
    const userExists = await User.findOne({email: email})
    if(userExists){
       throw "Email já cadastrado"
    }
    // Por enquanto username é unico, mas recomendo criar um ID aqui para várias pessoas poderem usar o mesmo nome. Tipo o Discord.
    let hashedPass = await argon2.hash(pass1);
    let newUser = new User({
                      username : name,
                      password : hashedPass,
                      email :  email,
                      data_cadastro: new Date()
                          });

    await newUser.save();

    if (log) {console.log("[LOG] Entries added to DB.");
    };
}

// Função para validar login -- Retorna true se passwords batem e false se não.
async function checkUser(User, email, pass1) {
    // Pega o usuario (1 já que email é unico) e testa a senha
    const userQuery = await User.find({ email : email }).limit(1);

    const  correct = await argon2.verify(userQuery[0].password, pass1)
    
    if(correct){
        return true;
    } else {
        return false;
    } 
   
}




module.exports = { computeNewUser , checkUser };