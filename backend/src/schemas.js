const mongoose = require('mongoose');
//;

// Modelos do MongoDB
// Schemas definem as "linhas"/"cabeçario"
const userSchema = new mongoose.Schema({
    username: { type: String,
                required: true,
                unique: false},

    //userID: { Schema.Types.ObjectId),

    password: { type: String,
                required: true},

    email:    { type: String,
                required: true,
                unique: true},

    data_cadastro:{ type: String,
                    required: false}
});

const communitySchema = new mongoose.Schema({
  nameCommunity: {
              type: String,
              required: true,
              unique: true
  },

  descricaoCommunity: {
              type: String,
              required: false
  },

  data_cadastro:{
              type: String,
              required: false
  },

  posts: {
              type: String,
              required: false
  }

})

// Comunidades: adicionar ids de usuarios que seguem, para fazer uma lista para saber o numero de usuarios.
// Usuarios: add ids de comunidades que ele segue, adicionar somatorio de karma como atributo tambem
// api - adicionar par adicionar post na comunidade, dar upvote no post, sistema de comentarios (inclusive upvote no comentario), atualizar upvote (para controlar os de tras) 
// -- acho que add comunidade pode ser manual por enquanto, mas se der tempo fazer tambem. todos tem que ter interface com o frontend de diferete formas

module.exports = { userSchema, communitySchema };
