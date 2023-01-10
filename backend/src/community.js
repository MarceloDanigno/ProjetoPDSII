// Inicializa o modulo de criptografia para senhas e o mongoose.
const argon2 = require('argon2');
const mongoose = require('mongoose');




// Função para adicionar uma nova comunidade no modelo community
async function computeNewCommunity(Community, name, descricaoCommunity, insertedPosts ="", log = true) {

    let newCommunity = new Community({
                          nameCommunity : name,
                          descricaoCommunity: descricaoCommunity,
                          data_cadastro: new Date(),
                          posts: insertedPosts
                                    });
    await newCommunity.save();

    if (log) {console.log("[LOG] Entries added to DB.");};
}

module.exports = { computeNewCommunity };
