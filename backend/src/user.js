// Inicializa o modulo de criptografia para senhas e o mongoose.
const argon2 = require('argon2');
const mongoose = require('mongoose');
const router = express.Router()

// Função para adicionar um novo usuario no modelo User
async function computeNewUser(User, name, pass, email, data_cadastro, log = true) {
    if (pass === "") {
        throw "Campo de senha vazio.";
    }
    // Por enquanto username é unico, mas recomendo criar um ID aqui para várias pessoas poderem usar o mesmo nome. Tipo o Discord.
    let hashedPass = await argon2.hash(pass);
    let newUser = new User({
                      username : name,
                    //userID: userID,
                      password : hashedPass,
                      email :  email,
                      data_cadastro: new Date()
                          });
    await newUser.save();

    if (log) {console.log("[LOG] Entries added to DB.");};
}

// Função para validar login -- Retorna true se passwords batem e false se não.
async function checkUser(name, pass, User) {
    // Pega o usuario (1 já que username é unico) e testa a senha
    const userQuery = await User.find({ username : name }).limit(1);
    return await argon2.verify(userQuery[0].password, pass);
}

module.exports = { computeNewUser , checkUser };
