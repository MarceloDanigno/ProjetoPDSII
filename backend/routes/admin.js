const express = require("express");
const router = express.Router();


router.post("/login", async (req, res) =>{
  res.render('login', {});
  const {email, password} = req.body

  if (pass[0]  == "" & email == ""){
    res.stats(420).json({ msg: "Campo não preenchido"})}

  if (pass[0] === "") {
      res.stats(421).json({ msg: "Senha não informada"})}

  if (email == ""){
      res.stats(421).json({ msg: "Email não informado." });}

  //Verificar se existe no banco de dados
  const userExists = await User.findOne({email: email})
  if(!userExists){
     throw "Email não consta no banco de dados"
  }

  try {
    console.log("[LOG] Email " + req.body.email + " sendo verificado.");

  const teste = await user.checkUser(User, req.body.password,
                                           req.body.email)
  console.log(teste)
  res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });

  } catch (error) {
      console.error("[ERRO] " + error);
      res.stats(500).json({ msg: "deu ruim"})
  }

});


module.exports = router
