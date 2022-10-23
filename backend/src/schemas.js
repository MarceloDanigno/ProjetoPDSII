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
              required: false}

})

module.exports = { userSchema, communitySchema };
