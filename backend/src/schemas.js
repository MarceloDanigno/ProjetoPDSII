const mongoose = require('mongoose');

// Modelos do MongoDB
// Schemas definem as "linhas"/"cabeçario"
const userSchema = new mongoose.Schema({
    username: { type: String,
                required: true,
                unique: true},
    password: { type: String,
                required: true}
});

module.exports = { userSchema };
