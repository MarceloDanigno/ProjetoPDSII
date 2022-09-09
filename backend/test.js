// ---- INIT ----

const schemas = require("./src/schemas");
const user = require("./src/user");

// Inicializa o Mongoose, para tratar os dados do MongoDB.
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projetopdstest');

// Abre o banco de dados
const db=mongoose.connection;
db.once('open', () =>{});

//Models definem as "tabelas"
const UserTestModel = mongoose.model('UsersTest', schemas.userSchema, 'test');

// Inicializa o modulo de criptografia
const argon2 = require('argon2');

// ---- CONTROLE ----

var green = 0;
var red = 0;

// Incrementa o contador de sucesso. Utilizado em todas funções teste.
function greenFlag() {
    green++;
    console.log("    - ✓ Sucesso\n");
}

// Incrementa o contador de erros. Utilizado em todas funções teste.
function redFlag(error) {
    console.log(error);
    red++;
    console.log("    - ✕ Erro\n");
}

// ---- UNIT TESTS ----

// --> Registrar usuário
//     --> Coverage: computeNewUser, checkUser.
async function userRegister(callback) {
    console.log("1. Registro de usuário.");
    try {
        // Cria um novo usuário de nome e senha teste.
        await user.computeNewUser(UserTestModel, "test", "test", false);
        // Testa se o usuario consegue logar (compara senha "test" com a criptografada)
        if(!(await user.checkUser("test", "test", UserTestModel))){
            throw "Password não são iguais.";
        }
        await UserTestModel.findOneAndDelete({ username : "test" });
        greenFlag();
    } catch (e) {
        redFlag(e);
    }
    await UserTestModel.deleteMany({});
}

// --> Registrar usuário de nome repetido
//     --> Coverage: userSchema (unique flag).
async function duplicateRegister(callback) {
    console.log("2. Registro de usuário repetido.");
    try {
        // Cria dois usuários de mesmo nome
        await user.computeNewUser(UserTestModel, "test", "test", false);
        await user.computeNewUser(UserTestModel, "test", "test", false);
        // Deve retornar um erro pois username deve ser unico
        redFlag("DB aceitou username duplicado.");
    } catch (e) {
        greenFlag();
    }
    await UserTestModel.deleteMany({});
}

// --> Registrar usuário sem informações suficientes
//     --> Coverage: userSchema (required flag).
async function missingRegister(callback) {
    console.log("2. Registro de usuário sem todos os campos completos.");
    let failure = false;
    try {
        // Cria usuario sem username
        await user.computeNewUser(UserTestModel, "", "test", false);
        // Deve retornar um erro pois deve ter username
        failure = true;
    } catch (e) {}
    try {
        // Cria usuario sem nada
        await user.computeNewUser(UserTestModel, "", "", false);
        // Deve retornar um erro pois deve ter todos os campos
        failure = true;
    } catch (e) {}
    // Se um dos blocos try/catch não resultou em erro o DB aceitou um usuarios sem todos os campos completos.
    if (failure){
        redFlag("DB aceitou sem informações.");
    } else {
        greenFlag();
    }
    await UserTestModel.deleteMany({});
}

// ---- Report ----

// Define formato de saida
async function compileReport() {
    console.log("----- REPORT -----")
    console.log("Green = " + green.toString() + ".")
    console.log("Red = " + red.toString() + ".\n")
    if (red) {
        console.log("Ocorreu uma falha nos testes!")
    } else {
        console.log("Nenhuma falha encontrada!")
    }
    process.exit();
}

// Roda unit tests
(async () => {
    console.log("--> Começando unit tests.\n");
    await userRegister();
    await duplicateRegister();
    await missingRegister();
    await compileReport();
}) ();
