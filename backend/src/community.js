// Inicializa o modulo de criptografia para senhas e o mongoose.
const argon2 = require('argon2');
const mongoose = require('mongoose');
const router = express.Router()



// Função para adicionar uma nova comunidade no modelo community
async function computeNewCommunity(Community, name, descricaoCommunity, data_cadastro, log = true) {

    let newCommunity = new Community({
                          nameCommunity : name,
                          descricaoCommunity: descricaoCommunity,
                          data_cadastro: new Date()
                                    });
    await newCommunity.save();

    if (log) {console.log("[LOG] Entries added to DB.");};
}

module.exports = { computeNewCommunity };
