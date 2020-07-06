var express = require('express');
const { check, validationResult } = require('express-validator');
module.exports = (aplicacao)=>{
    aplicacao.post('/painel_admin/autenticar',[
        // username must be an email
        check('usuario').not().isEmpty().withMessage("Usuário não pode ser vazio!"),
        // password must be at least 5 chars long
        check('senha').not().isEmpty().withMessage("Senha não pode ser vazia")
      ],(req, res) => {
        const erro_validacao = validationResult(req);
        if (!erro_validacao.isEmpty()) {
          //houve erro
          let erro_autenticacao = {};
          aplicacao.app.controllers.loginController.visualizar_login(aplicacao, req, res, erro_validacao.errors,erro_autenticacao);
        }else{
          //não houve erro
          aplicacao.app.controllers.loginController.autenticar(aplicacao,req,res);
        }
       
   })

   aplicacao.get('/painel_admin/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/painel_admin');
    });  
  
   })

}

