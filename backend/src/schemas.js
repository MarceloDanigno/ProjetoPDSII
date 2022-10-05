const mongoose = require('mongoose');
//;

// Modelos do MongoDB
// Schemas definem as "linhas"/"cabeçario"
const userSchema = new mongoose.Schema({
    username: { type: String,
                required: true,
                unique: false,},

    password: { type: String,
                required: true},

    email:    { type: String,
                required: true,
                unique: true},

    data_cadastro:{ type: String,
                    required: false}
});

module.exports = { userSchema };
